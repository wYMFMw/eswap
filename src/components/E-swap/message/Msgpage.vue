<script setup>
import { SettingOutlined, SearchOutlined } from "@ant-design/icons-vue"
import MsgItem from "./MsgItem.vue"
</script>

<template>
    <div class="msgpage">
        <div class="topbar">
            <div class="pagename">
                消息
            </div>
            <div class="config">
                <SettingOutlined />
            </div>
        </div>
        <div class="search">
            <a-input placeholder="搜索聊天记录/联系人" size="large">
                <template #prefix>
                    <SearchOutlined class="searchicon" />
                </template>
            </a-input>
        </div>
        <div class="msglist">
            <MsgItem v-for="(item,index) of new Array(30).fill(0)" :no="index+1"/>
        </div>
    </div>
</template>

<style scoped lang="less">
.msglist{
    height:70vh;
    overflow-y: scroll;
}

.search {
    padding: 0 1em 0.5em;

    .searchicon {
        font-size: 1.3em;
    }

    &:deep(span) {
        background-color: #eeeeef;
        border-radius: 999em;
    }

    &:deep(input) {
        background-color: #eeeeef;
        font-size: 1.1em;
    }
}

.topbar {
    display: flex;
    justify-content: space-between;
    padding: 1em;

    .config {
        font-size: 1.3em;
    }

    .pagename {
        .config();
        font-weight: bold;
    }
}</style>