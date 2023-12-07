<script setup>
import { SearchOutlined, LikeOutlined, DislikeOutlined } from "@ant-design/icons-vue"
import EGPT from "./EGPT/EGPT.vue";
import { onMounted, reactive, watch } from "vue";
import Capsule from "./../index/Capsule.vue";
import BbwItem from './BBwall/BbwItem.vue';
import TagsBar from "./BBwall/TagsBar.vue"
import Docs from "./Docs.vue";
import { useRoute } from "vue-router";
const route=useRoute();
const state = reactive({
    tabactivekey: "1"
})
const bbwalltags = ["捞女生", "选课推荐", "帮推", "+"];
// watch(state,(newVal,oldVal)=>{
//     console.log(newVal);
// });
onMounted(()=>{
    state.tabactivekey=route.query.activeKey??"1";
})
</script>

<template>
    <div class="campuspage">
        <div class="toptabs">

            <a-tabs class="xtabs" size="large" v-model:activeKey="state.tabactivekey">
                <a-tab-pane key="1" tab="表白墙">
                    <div class="bbwall">
                        <TagsBar :tagsarr="bbwalltags"/>
                        <div class="bbwitems">
                            <BbwItem v-for="item of new Array(20)"/>
                        </div>

                    </div>

                </a-tab-pane>
                <a-tab-pane key="2" tab="学习资料">
                    <Docs></Docs>
                </a-tab-pane>
                <a-tab-pane key="3" tab="E-GPT" class="egpt">
                    <EGPT></EGPT>
                </a-tab-pane>
            </a-tabs>
        </div>
        <SearchOutlined v-show="state.tabactivekey != '3'" class="searchbtn" />

    </div>
</template>

<style scoped lang="less">
.bbwitems{
    height:80vh;
    overflow-y: scroll;
}


.bbwall {
    width: 100vw;
    height: 86vh;
    margin-top: -2vh;
    background-color: rgb(245, 245, 245);
}

.toptabs {
    width: 100vw;
}

.xtabs {
    &:deep(.ant-tabs-nav-list) {
        margin: auto;
    }

    &:deep(.ant-tabs-tab-btn) {
        font-size: 1.1em;
    }
}

.searchbtn {
    font-size: 1.3em;
    color: #747373;
    position: absolute;
    top: 3vh;
    right: 6vw;

    &:hover {
        color: black;
        font-size: 1.4em;
    }
}
</style>