<script setup>

import TagsBar from './BBwall/TagsBar.vue';
import DocItem from "./Docs/DocItem.vue"
const tagsarr = ["高数", "软件工程", "数字电路", "+"];
const docs=["高数","数据结构与算法","软件开发工具","大学英语","大学物理","计算机网络","操作系统","数学分析","应用心理学","Java","计算机组成结构","微观经济学","有机化学"]
</script>

<template>
    <div class="docs">
        <div class="tags">
            <TagsBar :tagsarr="tagsarr" />
        </div>
        <div class="bread">
            <a-breadcrumb>
                <a-breadcrumb-item>Docs</a-breadcrumb-item>
                <a-breadcrumb-item>数据结构与算法</a-breadcrumb-item>
                <a-breadcrumb-item>数据结构180题</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="docitems">
            <DocItem v-for="item of docs" :filename="item"/>
        </div>
    </div>
</template>

<style scoped lang="less">
.docitems{
    height:67vh;
    overflow-y: scroll;
}
.docs {
    width: 100vw;
    height: 86vh;
    margin-top: -2vh;
    background-color: rgb(245, 245, 245);
}
.bread{
    margin:0.2em 1em;
}
</style>