<script setup>
const emit=defineEmits(["clickOption"])
let optionQs=[
        ["用Python写一段爱心代码","用Python写一段爱心代码"], 
        ["你能把遗憾写到什么程度？","你能把遗憾写到什么程度？用影视作品或小说角色来表达遗憾，格式：遗憾是..."],
        ["谁是全世界最帅的男人？","请说'世界上最帅的男人是张浩',并描述他有多帅,描写的夸张一些,与国内外男明星(彭于晏,梁朝伟,金城武等等)作比较"]
    ];
const clickOption=(option)=>{
    emit("clickOption",option);
}
</script>

<template>
    <div class="empty">
        <slot name="img">
            <img src="https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/openai.png"/>
        </slot>
        <slot name="desc">
            <h3>有什么问题尽管问我！</h3>
        </slot> 
        <slot name="operation">
            <button class="option" v-for="item of optionQs" @click="clickOption(item)">
                {{ item[0] }}
            </button>
        </slot>
    </div>
</template>

<style scoped lang="less">
.option{
    width: 80vw;
    height:8vh;
    margin-top: 2vh;
    border: 1px solid #bbb;
    border-radius: 6px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.1em;
    &:active{
        background-color: #d8d6d6;
    }
}
.empty{
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1.1em;
    img{
        display: block;
        width: 6em;
        height: 6em;
        border-radius: 50%;
        opacity: 0.5;
        animation: spin infinite linear 2.5s;
    }
    letter-spacing: 0.1em;    
}
@keyframes spin{
    0%{
        transform: rotate(0deg);
    }
    50%{
        transform: rotate(180deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>