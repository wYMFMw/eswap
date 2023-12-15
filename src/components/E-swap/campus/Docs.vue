<script setup lang="jsx">

import { onMounted, reactive } from 'vue';
import TagsBar from './BBwall/TagsBar.vue';
import DocItem from "./Docs/DocItem.vue"
import { doQueryTree } from "@/functions/mysql"
import { FolderOutlined, PlusOutlined } from "@ant-design/icons-vue"
import { components } from 'markdown-it/lib/presets/default';
import { doQuery } from '../../../functions/mysql';
import { doFileDownload } from "@/functions/file.js"
import { usePageStore } from "@/stores/usePageStore.js"
const pageStore = usePageStore();

const state = reactive({
    isShowFile: false,
    fileList: [],
    flatFiles: [],
    targetFileName: "",
    fileUrl: ""
})
const tagsarr = ["高数", "软件工程", "数字电路", "+"];
const docs = ["高数", "数据结构与算法", "软件开发工具", "大学英语",
    "大学物理", "计算机网络", "操作系统", "数学分析", "应用心理学",
    "Java", "计算机组成结构", "微观经济学", "有机化学"]
onMounted(async () => {
    await getFileTree()
    await getAllFiles();
})
const getFileTree = async () => {
    let p = {};
    p.sqlprocedure = "demox004";
    doQueryTree(p).then(res => {
        state.fileList = res.data;
    });
}
const getAllFiles = async () => {
    let p = {};
    p.selectsql = `select * from files`;
    doQuery(p).then(res => {
        state.flatFiles = res.data;
    })
}
const serachNameById = async (id) => {
    state.targetFileName = state.flatFiles.filter(item => item.fileid == id)[0].filename;
}
const SubMenu = {
    name: 'SubMenu',
    props: {
        menuInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    template: `
    <a-sub-menu :key="menuInfo.id">
      <template #title><b> {{menuInfo.text}} </b></template>
      <template v-for="item of menuInfo.children" :key="item.id">
        <template v-if="item.children.length==0">
          <a-menu-item :key="item.id">
            {{ item.text }}
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :menu-info="item" :key="item.id" />
        </template>
      </template>
    </a-sub-menu>
  `,
};
const doSelect = async (menu) => {
    await serachNameById(menu.key);

    let p = {};
    p.filename = state.targetFileName;
    doFileDownload(p).then(res => {
        const blobUrl = URL.createObjectURL(res.data);
        state.fileUrl = blobUrl;
    })
    state.isShowFile = true;
    pageStore.pagename = "showFile";

}
const closeFile = () => {
    state.isShowFile = false;
    state.fileUrl = '';
}

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
            <a-button v-if="state.isShowFile" @click="closeFile">
                <template #icon>
                    <PlusOutlined class="closeIcon"/>
                </template>
                关闭文件
            </a-button>
        </div>
        <div class="filelist" v-if="!state.isShowFile">
            <a-menu mode="inline" theme="light" @select="doSelect">
                <template v-for="item of state.fileList" :key="item.id">
                    <template v-if="item.children.length == 0">
                        <a-menu-item :key="item.key">
                            {{ item.text }}
                        </a-menu-item>
                    </template>
                    <template v-else>
                        <SubMenu :menu-info="item" :key="item.id" />
                    </template>
                </template>
            </a-menu>
        </div>

        <div class="fileouter" v-if="state.isShowFile">
            <iframe :src="state.fileUrl" class="fileIframe"></iframe>
        </div>

    </div>
</template>

<style scoped lang="less">
.closeIcon{
    transform: rotate(45deg);
}
.fileIframe {
    width: 100vw;
    height: 67vh;
    overflow-y: scroll;
}

.filelist {
    height: 67vh;
    overflow-y: scroll;
}

.docs {
    width: 100vw;
    height: 86vh;
    margin-top: -2vh;
    background-color: rgb(245, 245, 245);
}

.bread {
    height: 6vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.2em 1em;
}
</style>