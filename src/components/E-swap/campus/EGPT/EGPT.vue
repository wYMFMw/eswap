<script setup>
import { ref, reactive, onMounted,onUpdated, inject } from "vue";
import RemarkItem from "./RemarkItem.vue";
import { getGptReader, readChunk, readChunk2, myGPT3 } from "@/functions/ai/openai.js";
import Loading from "./Loading.vue";
import GPTitem from "./GPTitem.vue";
import markdownIt from "markdown-it";
import WhenEmpty from "./WhenEmpty.vue";
import { compressText } from "@/functions/ai/utils";
let gptlist = reactive([]);
let txtarea = ref("");
let state = reactive({
    isLoading: false,
    isGenerating: false,
    historyList: []
})

const addremark = (e) => {
    if (e.code == "Enter") {
        clickaddremark();
    }
}
const xreadChunk3 = async (query, callback) => {
    let result = "";
    let i = 1;
    const reader = (await myGPT3(query, state.historyList.slice(-5))).body.getReader();
    //这里取历史的后5个，包含2对和1个新问题
    while (true) {
        let { done, value } = await reader.read();
        if (done) {
            console.log("finish");
            return result;//这里返回最终结果，通过await拿到
        }
        if (i != 1 && !state.isGenerating) {
            console.log("stop by hand");
            return result;//就算是手动停止也要返回最终结果，不然historyList会出问题
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
}//实乃下策，因为用参数只能转递第一次的参数，响应式变量变化之后无影响,只能把函数定义在这里使用词法作用域


const clickaddremark = async (xquestion) => {
    let question = txtarea.value;
    let result = "";
    if (question) {
        state.isLoading = true;
        gptlist.push({ content: question, type: 'Q' });
        localStorage.setItem("gptitem", JSON.stringify(gptlist))
        question = xquestion ?? question;
        state.historyList.push({//点击查询后将问题添加到历史
            role: "user",
            content: question
        });
        result = await xreadChunk3(question, (res, i) => {//其实用readChunk3就可以，但这里要做到停止生成情况特殊
            if (i != 1) {
                gptlist.pop();
            }
            if (i == 1) {
                state.isGenerating = true;
                state.isLoading = false;
                txtarea.value = "";
            }
            const md = new markdownIt();
            const mdcontent = md.render(res);
            gptlist.push({ content: mdcontent, type: 'A' });
            localStorage.setItem("gptitem", JSON.stringify(gptlist));

        });
        state.historyList.push({//查到结果后添加到历史
            role: "assistant",
            content: result
        });
        stopGenerate();
    }
}
const delcomment = (content) => {
    gptlist.splice(gptlist.indexOf(content), 1);
    localStorage.setItem("gptitem", JSON.stringify(gptlist));
}
onMounted(async () => {
    gptlist.push(...JSON.parse(localStorage.getItem("gptitem")) ?? []);
    initGPTHistory();
})
const initGPTHistory = () => {
    let role = ["user", "assistant"];
    gptlist.slice(-4).map((item, index) => {
        if (index % 2 == 0) {
            state.historyList.push({
                role: role[0],
                content: item.content?.replace(/<p>|<\/p>/g, "")
            })
        } else {
            state.historyList.push({
                role: role[1],
                content: item.content?.replace(/<p>|<\/p>/g, "")
            })
        }
    })
}
const doOptions = (option) => {
    txtarea.value = option[0];
    clickaddremark(option[1]);
}
const stopGenerate = () => {
    state.isGenerating = false;
}

</script>

<template>
    <div class="outer">
        <div class="remarks">
            <WhenEmpty v-if="gptlist.length == 0" @click-option="doOptions"></WhenEmpty>
            <GPTitem v-for="item of gptlist" @del-item="delcomment" :config="item" />
        </div>

        <Loading v-show="state.isLoading"></Loading>
        <div class="remarkinput">
            <a-input v-model:value="txtarea" class="txt" @keydown="addremark" size="large" allow-clear
                placeholder="请输入问题并耐心等待一会">
                <template #suffix>
                    <svg t="1700587632741" v-if="!state.isGenerating" @click="clickaddremark()"
                        :class="txtarea == '' ? 'icon2' : 'icon1'" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="13127" width="10" height="10">
                        <path
                            d="M868 545.5L536.1 163c-12.7-14.7-35.5-14.7-48.3 0L156 545.5c-4.5 5.2-0.8 13.2 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"
                            p-id="13128" fill="#ffffff"></path>
                    </svg>
                    <svg t="1700627736178" @click="stopGenerate" v-if="state.isGenerating" class="icon3"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4006" width="200"
                        height="200">
                        <path
                            d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m3.008-92.992a416 416 0 1 0 0-832 416 416 0 0 0 0 832zM320 320h384v384H320V320z"
                            fill="#262626" p-id="4007"></path>
                    </svg>
                </template>
            </a-input>
        </div>
    </div>
</template>
<style scoped lang="less">
.remarks {
    width: 100%;
    height: 66vh;
    overflow-y: scroll;
}

.remarkinput {
    position: absolute;
    bottom: 11vh;
    left: 5%;
}

.txt {
    width: 90vw;
    font-size: 1.05em;
}

.icon {
    display: inline-block;
    width: 50px;
}

.outer {
    width: 100vw;
    height: 86vh;
    // background:linear-gradient(to top,rgb(189, 236, 230),#ffff)
}

.icon1 {
    .icon3();
    background-color: #3ecd94;
}

.icon2 {
    .icon3();
    background-color: #969b99;

}

.icon3 {
    width: 2.6em;
    height: 2.6em;
    border-radius: 0.5em;
    opacity: 0.7;
}
</style>