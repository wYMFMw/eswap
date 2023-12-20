<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { doQuery, doQueryTree } from "@/functions/mysql";
import { LeftOutlined, SearchOutlined, PaperClipOutlined } from "@ant-design/icons-vue";
import { useCommodityStore } from "@/stores/useCommodityStore"
const commodityStore = useCommodityStore();
const router = useRouter();
const state = reactive({
    alllevel: [],
    level1: [],
    selectLevel1ID: "",
    level2: [],
    selectLevel2ID: "",
    level3: []
})
onMounted(async () => {
    if (commodityStore.state.categories.length == 0) {
        await getLevel1();
        await initSelectLevel1();
        await initSelectLevel2();
        await getAllLevel();
        commodityStore.state.categories = state.alllevel;
    }else{
        state.alllevel = commodityStore.state.categories;
        await getLevel1();
        await initSelectLevel1();
        await initSelectLevel2();
    }

})
const getAllLevel = async () => {
    let p = {};
    p.sqlprocedure = 'demox005';
    await doQuery(p).then(res => {
        state.alllevel = res.data
    })
}
const getLevel1 = async () => {
    if (state.alllevel.length > 0) {
        state.level1 = state.alllevel.filter(item => {
            if (item.level == 1) {
                return item;
            }
        })
    } else {
        let p = {};
        p.sqlprocedure = 'demox0051';
        await doQuery(p).then(res => {
            state.level1 = res.data
        })
    }

}
const getLevel2 = async () => {
    if (state.alllevel.length > 0) {
        state.level2 = state.alllevel.filter(item => {
            if (item.parentnodeid == state.selectLevel1ID && item.level == 2) {
                return item;
            }
        })
    } else {
        let p = {};
        p.sqlprocedure = 'demox0052';
        p.parentid = state.selectLevel1ID;
        await doQuery(p).then(res => {
            state.level2 = res.data;
        })
    }

}
const selectLevel1 = async (item) => {
    state.selectLevel1ID = item.id
    await getLevel2()
    state.selectLevel2ID = state.level2[0]?.id;
}
const selectLevel2 = async () => {
    await getLevel3()
}
const initSelectLevel1 = async () => {
    await selectLevel1(state.level1[0])
}
const initSelectLevel2 = async () => {
    state.selectLevel2ID = state.level2[0]?.id;
    await selectLevel2()
}
const getLevel3 = async () => {
    if (state.alllevel.length > 0) {
        state.level3 = state.alllevel.filter(item => {
            if (item.parentnodeid == state.selectLevel2ID && item.level == 3) {
                return item;
            }
        })
    } else {
        let p = {};
        p.sqlprocedure = 'demox0053';
        p.parentid = state.selectLevel2ID;
        await doQuery(p).then(res => {
            state.level3 = res.data;
        })
    }
}
watch(() => state.selectLevel2ID, () => {
    selectLevel2();
})
const showClass = (name) => {
    alert(name)
}
</script>

<template>
    <div class="classify">
        <div class="topbar">
            <div class="goback">
                <LeftOutlined @click="router.go(-1)" />
            </div>
            <div class="title">
                分类
            </div>
            <div class="search">
                <SearchOutlined />
            </div>
        </div>
        <div class="mid">
            <div class="sidebar">
                <a-list :data-source="state.level1" class="sideList">
                    <template #renderItem="{ item }">
                        <a-list-item @click="selectLevel1(item)">{{ item.text }}</a-list-item>
                    </template>
                </a-list>

            </div>
            <div class="content">
                <div class="tabs">
                    <a-tabs class="xtabs" v-model:activeKey="state.selectLevel2ID">
                        <a-tab-pane v-for="item of state.level2" :key="item.id" :tab="item.text" class="tabitem">
                            <div class="classItem" v-for="item of state.level3" @click="showClass(item.text)">
                                <div class="classImg">
                                    <PaperClipOutlined class="img" />
                                </div>
                                <div class="name">
                                    {{ item.text }}
                                </div>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </div>
                <div class="tcontent">

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
//侧边栏选中文字的红色
@checkRed: #4388ff;
@topbarGray: #efeeee;

.tabitem {
    height: 68vh;
    overflow-y: scroll;
}

.classItem {
    display: inline-block;
    width: 20vw;
    height: 15vh;
    margin: 0.5em 0.3em;

    .name {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .classImg {
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .img {
            font-size: 2.5em;
        }
    }


}

.topbar {
    display: flex;
    justify-content: space-between;
    padding: 0 1.5em;
    align-items: center;

    .title {
        font-size: 1.2em;
    }

    .goback {
        .title();
    }

    .search {
        .title();
    }
}

.sideList {
    &:deep(.ant-list-item) {
        background-color: @topbarGray;

        &:hover {
            background-color: #ffffff;
            color: @checkRed;

            &::before {
                content: "";
                position: absolute;
                left: 0;
                width: 0.3em;
                height: 2em;
                background-color: @checkRed;
            }
        }
    }
}

.classify {
    width: 100vw;
    height: 88vh;
}

.topbar {
    height: 10vh;
    background-color: @topbarGray;
}

.mid {
    height: 100%;
    display: flex;
}

.sidebar {
    width: 30vw;
    height: 78vh;
    overflow: scroll;
}

.content {
    height: 100%;
    width: 70vw;
}

.tabs {
    height: 8vh;
    background-color: #f3f3f3;
    padding: 0 0.3em;

    .xtabs {}
}

.tcontent {
    height: 70vh;
    width: 100%;
}
</style>