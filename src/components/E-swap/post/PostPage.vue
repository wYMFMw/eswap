<script setup>
import AlterItem from './AlterItem.vue'
const alters=[
    {name:"表白墙",desc:"一键分享校园趣事",bgColor:"#ffedda"},
    {name:"发求购",desc:"这里一定有你想要的东西",bgColor:"#fdfed7"},
    {name:"发闲置",desc:"20s发布宝贝",bgColor:"#b6eafa"},
]
</script>

<template>
    <div class="postpage">
        <div class="alters">
            <AlterItem v-for="item of alters" :name="item.name" :desc="item.desc" :bg-color="item.bgColor"/>
        </div>
    </div>
</template>

<style scoped lang="less">
.alters{
    position: absolute;
    width:100vw;
    bottom:16vh;
}
</style>