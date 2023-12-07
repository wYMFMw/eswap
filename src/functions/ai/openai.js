import OpenAI from "openai";
import axios from "axios";
const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export const myGPT = async (content) => {
  return await openai.chat.completions.create({
    messages: [
      { "role": "system", "content": content }
    ],
    model: "gpt-3.5-turbo",
    stream: true
  });

}
export const myGPT2 = async (content) => {//axios非流式
  const url = 'https://api.openai-hk.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer hk-0swula10000051718052839690e9e2d1fe99ce43f002d361'
  };
  const data = {
    max_tokens: 1000,
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    top_p: 1,
    presence_penalty: 1,
    messages: [
      {
        role: 'system',
        content: content
      }
    ]
  };
  return await axios.post(url, data, { headers });
}
export const myGPT3 = async (query, historyList = []) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer hk-0swula10000051718052839690e9e2d1fe99ce43f002d361'
  };
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant'
    }
  ];
  messages.push(...historyList);
  const data = {
    max_tokens: 1000,
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    top_p: 1,
    presence_penalty: 1,
    messages,
    stream: true
  };
  return await fetch("https://api.openai-hk.com/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  });
}

export const getGptReader = async (content) => {
  const response = await myGPT(content);
  const msStream = response.toReadableStream();
  return msStream.getReader();
}

export const readChunk = async (reader, callback) => {
  let result = "";
  let i = 1;
  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      console.log('Stream finished');
      break;
    }

    const textChunk = new TextDecoder().decode(value);
    const res = JSON.parse(textChunk);
    const content = res.choices[0]?.message?.content;
    if (content != undefined & content != "") {
      result += content;
    }
    callback(result, i);
    i++;
  }

  return result;
}
export const readChunk2 = async (query, callback) => {
  const res = (await myGPT2(query)).data.choices[0].message.content;
  let partstr = "";
  let count = 1;
  const timer = setInterval(() => {
    if (partstr.length >= res?.length) {
      clearInterval(timer);
    } else {
      partstr = res.slice(0, count);
      callback(partstr, count);
      count++;
    }
  }, 40);
}

export const readChunk3 = async (query, callback, state) => {
  let result = "";
  let i = 1;
  const reader = (await myGPT3(query)).body.getReader();

  while (true) {
    let { done, value } = await reader.read();
    if (done) {
      console.log("finish");
    }
    const chunk = new TextDecoder().decode(value);

    const chunkArr = chunk.replace(/data:/g, "").split(/\n/).filter(res => res != "" && !res.includes("DONE"));
    chunkArr.map(ele => {
      const strlet = JSON.parse(ele).choices[0].delta.content;
      if (strlet != "" && strlet != undefined) {
        result += strlet;
      }
    });
    callback(result, i);
    i++;

  }

}