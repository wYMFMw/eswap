<script setup>
import { FolderTwoTone, FolderOpenTwoTone } from "@ant-design/icons-vue"
const props=defineProps(['filename'])
const showName=()=>{
    alert(props.filename)
}
</script>

<template>
    <div class="docitem" @click="showName">
        <FolderTwoTone class="foldericon" />
        <div class="desc">
            <div class="filename">
                {{ props.filename }}
            </div>
            <div class="filedesc">
                23-09-19 &nbsp共{{(3+Math.random()*10).toFixed(0)}}个文件
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.desc{
    margin-left: 1em;
    .filename{
        font-size: 1.2em;
        font-weight: bold;
    }
    .filedesc{
        font-size: 0.9em;
        color: rgb(102, 102, 102);
    }
}

.foldericon {
    font-size: 3em;
    background-color: rgb(98, 154, 218);
    border-radius: 0.1em;
}

.docitem {
    display: flex;
    padding:1em 1.5em;
    border: 1px solid rgb(239, 239, 239);
    &:active{
        background-color: #ddd;
    }
}

</style>