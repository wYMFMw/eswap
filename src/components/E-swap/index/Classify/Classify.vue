<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { doQuery, doQueryTree } from "@/functions/mysql";
import { LeftOutlined, SearchOutlined, PaperClipOutlined, CloseOutlined, CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons-vue";
import { useCommodityStore } from "@/stores/useCommodityStore"
import { message } from "ant-design-vue";
const commodityStore = useCommodityStore();
const router = useRouter();
const state = reactive({
    alllevel: [],
    level1: [],
    selectLevel1ID: "",
    level2: [],
    selectLevel2ID: "",
    level3: [],
    selectLevel3ID: "",
    isTopbarShow: true,
    searchText: "",
    searchedLevel: {},
    searchedLevelIndex: -1,
    allSearchedLevels: []
})
onMounted(async () => {
    if (commodityStore.state.categories.length == 0) {
        await getLevel1();
        await initSelectLevel1();
        await initSelectLevel2();
        await initSelectLevel3();
        await getAllLevel();
        commodityStore.state.categories = state.alllevel;
    } else {
        state.alllevel = commodityStore.state.categories;
        await getLevel1();
        await initSelectLevel1();
        await initSelectLevel2();
        await initSelectLevel3();
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
    state.selectLevel1ID = item.id;
    await getLevel2()
    state.selectLevel2ID = state.level2[0]?.id;
}
const selectLevel2 = async () => {
    await getLevel3()
    state.selectLevel3ID = state.level3[0]?.id;
}
const initSelectLevel1 = async () => {
    await selectLevel1(state.level1[0])
}
const initSelectLevel2 = async () => {
    state.selectLevel2ID = state.level2[0]?.id;
    await selectLevel2()
}
const initSelectLevel3 = async () => {
    state.selectLevel3ID = state.level3[0]?.id;
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

const clickItem=(item)=>{
    state.selectLevel3ID = item.id;
    router.push({path:"/index",query:{category:item.text}});
}

const searchBox = ref();
const toSearchType = () => {
    state.isTopbarShow = false;
    setTimeout(() => {
        searchBox.value.focus();
    }, 500)
}
const toBaseType = () => {
    state.searchText = "";
    state.isTopbarShow = true;
}
const targetSelect = async (targetLevel) => {
    const ancestorArr = targetLevel.ancestor.split("#").filter(item => item != "");
    switch (ancestorArr.length) {
        case 0:
            selectLevel1(targetLevel);
            break;
        case 1:
            await selectLevel1({ id: ancestorArr[0] });
            state.selectLevel2ID = targetLevel.id;
            break;
        case 2:
            await selectLevel1({ id: ancestorArr[0] });
            state.selectLevel2ID = ancestorArr[1];
            setTimeout(() => {
                state.selectLevel3ID = targetLevel.id;
            }, 50);
            break;
    }
}
const searchKind = async () => {
    const filterLevel = state.alllevel.filter((item) => item.text.includes(state.searchText));
    state.allSearchedLevels = [...filterLevel];
    var targetLevel = {};
    if (filterLevel.length > 0) {
        filterLevel.forEach((level, index) => {
            if (level.text == state.searchText) {
                targetLevel = { ...level };
                state.searchedLevelIndex = index;
            }
        })
        if (Object.keys(targetLevel).length == 0) {
            targetLevel = filterLevel[filterLevel.length - 1];
            state.searchedLevelIndex = filterLevel.length - 1;
        }
        targetSelect(targetLevel);
    } else {
        message.warning("没有找到商品类别");
    }

}
const prevLevel = () => {
    if (state.searchedLevelIndex > 0) {
        state.searchedLevelIndex--;
        const targetLevel = state.allSearchedLevels.filter((item, index) => index == state.searchedLevelIndex)[0];
        targetSelect(targetLevel);
    }
}
const nextLevel = () => {
    if (state.searchedLevelIndex < state.allSearchedLevels.length - 1) {
        state.searchedLevelIndex++;
        const targetLevel = state.allSearchedLevels.filter((item, index) => index == state.searchedLevelIndex)[0];
        targetSelect(targetLevel);
    }
}


</script>

<template>
    <div class="classify">
        <div class="topbar" v-show="state.isTopbarShow">
            <div class="goback">
                <LeftOutlined @click="router.go(-1)" />
            </div>
            <div class="title">
                分类
            </div>
            <div class="search">
                <SearchOutlined @click="toSearchType" />
            </div>
        </div>
        <div class="topbar2" v-show="!state.isTopbarShow">
            <div class="closebtn">
                <CloseOutlined @click="toBaseType" />
            </div>
            
            <a-input-search ref="searchBox" size="large" class="searchbox" v-model:value="state.searchText"
                    placeholder="输入您想搜索的类别" allowClear enter-button @search="searchKind" />

            <a-button-group class="shiftBtns">
                <a-button type="primary" size="small" @click="prevLevel"
                    :disabled="state.searchedLevelIndex <= 0">
                    <template #icon>
                        <CaretUpOutlined />
                    </template>
                </a-button>
                <a-button type="primary" size="small" @click="nextLevel"
                    :disabled="state.searchedLevelIndex >= state.allSearchedLevels.length - 1">
                    <template #icon>
                        <CaretDownOutlined />
                    </template>
                </a-button>
            </a-button-group>
            
        </div>
        <div class="mid">
            <div class="sidebar">
                <a-list :data-source="state.level1">
                    <template #renderItem="{ item }">
                        <a-list-item @click="selectLevel1(item)"
                            :class="item.id == state.selectLevel1ID ? 'checkedItem' : 'uncheckedItem'">
                            {{ item.text }}
                        </a-list-item>
                    </template>
                </a-list>

            </div>
            <div class="content">
                <div class="tabs">
                    <a-tabs class="xtabs" v-model:activeKey="state.selectLevel2ID">
                        <a-tab-pane v-for="item of state.level2" :key="item.id" :tab="item.text" class="tabitem">
                            <div class="classItem" v-for="item of state.level3" @click="clickItem(item)"
                                :style="{ backgroundColor: item.id == state.selectLevel3ID ? '#e6f7ff' : '#ffffff' }">
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

.topbar2{
    display: flex;
    justify-content: space-between;
    background-color: @topbarGray;
    padding: 0 1.5em;
    align-items: center;
    height: 10vh;
    .closebtn{
        margin-right: 0.5em;
    }
    .shiftBtns{
        margin-left: 0.5em;
    }
}
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
    height: 10vh;
    background-color: @topbarGray;

    .title {
        font-size: 1.2em;
    }

    .goback {
        .title();
    }

    .search {
        .title();
    }


    .closebtn {
        .title();
    }
}

// .sideList {
//     &:deep(.ant-list-item) {
//         // background-color: @topbarGray;

//         // &:hover {
//         //     background-color: #ffffff;
//         //     color: @checkRed;

//         //     &::before {
//         //         content: "";
//         //         position: absolute;
//         //         left: 0;
//         //         width: 0.3em;
//         //         height: 2em;
//         //         background-color: @checkRed;
//         //     }
//         // }
//     }
// }
.uncheckedItem {
    background-color: @topbarGray;
}

.checkedItem {
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

.classify {
    width: 100vw;
    height: 88vh;
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
}</style>