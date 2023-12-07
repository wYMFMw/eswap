<script setup>
let props=defineProps(["config"]);
let emit=defineEmits(["delItem"])
const delself=()=>{
    emit("delItem",props.config);
}
</script>

<template>
    <div class="GPTitem">
        
        <a-space align="start" v-if="props.config.type=='Q'">
            <a-avatar shape="square" src="
            https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/只因.png" />
            <div class="qcontent">{{ props.config.content }}</div>
            <a-button type="link" @click="delself">删除</a-button>
        </a-space>
        <a-space align="start" v-if="props.config.type=='A'">
            <a-avatar shape="square" src="
            https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/openai.png" />
            <div class="acontent" v-html="props.config.content"></div>
            <a-button type="link" @click="delself">删除</a-button>
        </a-space>
    </div>
    <a-divider :dashed="props.config.type=='Q'"/>
</template>

<style scoped lang="less">
.GPTitem{
    display: flex;
    margin: 1em 0 0 1em;
    align-items: center;
    justify-content:space-between;
    &:lang(zh){
        letter-spacing: 0.1em;
    }
}

.acontent{
    width: 66vw;
    overflow-x: scroll;
}
.qcontent{
    width: 66vw;
}

</style>