export function compressText(text) {
    // 删除多余空格和换行符
    text = text.replace(/\s+/g, ' ');
  
    // 提取所有单词并统计出现次数
    let words = text.split(' ');
    let wordCount = {};
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
    
    // 按照出现次数排序单词
    let sortedWords = Object.keys(wordCount).sort((a, b) => {
      return wordCount[b] - wordCount[a];
    });
    
    // 取出现次数最多的前5个单词
    let keyWords = sortedWords.slice(0, 5);
  
    // 压缩文本，只保留出现次数最多的单词
    let compressedText = '';
    for (let i = 0; i < words.length; i++) {
      if (keyWords.includes(words[i])) {
        compressedText += words[i] + ' ';
      }
    }
  
    return compressedText.trim();
  }