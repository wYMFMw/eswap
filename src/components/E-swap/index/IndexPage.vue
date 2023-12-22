<script setup>
import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import IndexTopSearch from "./IndexTopSearch.vue";
import WheelImgs from "./WheelImgs.vue";
import Kingkong from "./Kingkong.vue";
import Capsule from "./Capsule.vue";
import { CloseOutlined, AimOutlined } from "@ant-design/icons-vue"
import { useCommodityStore } from "@/stores/useCommodityStore"
import { doQuery } from "@/functions/mysql"
import { useRouter,useRoute } from "vue-router"
import Location from "./Location.vue";
const router = useRouter()
const route=useRoute();
const commodityStore = useCommodityStore()

const state = reactive({
    cimgs: [],
    xcimgs: [],
    showTags: false,
    xtags: ["乒乓球", "台球", "BJD娃娃", "垂钓", "今日降价", "民族乐器", "手风琴", "皮包", "汽车养护", "足球", "跑步装备", "穿搭", "电脑零件", "桌游", "电动车"],
    plustags: ["香水", "电子琴", "吉他", "健身", "汉服", "阅读", "配饰", "化妆品", "JK制服", "影音", "收纳", "Cosplay"]

})
const imgs = [
    "https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/w05.png",
    "https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/w07.png",
    "https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/w08.png"
]
const prefix = "https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/";
const kkitems = [
    { url: prefix + "dd1.png", label: "跑腿服务" },
    { url: prefix + "dd2.png", label: "兼职悬赏" },
    { url: prefix + "dd3.png", label: "找个搭子" },
    { url: prefix + "dd4.png", label: "互助问答" },
    { url: prefix + "dd5.png", label: "学习资料" },
    { url: prefix + "dd6.png", label: "失物招领" },
    { url: prefix + "dd7.png", label: "EGPT" },
    { url: prefix + "dd8.png", label: "纸飞机" }
]


const hobbyitems = ["拉杆箱", "手机", "牛奶", "+"];
const searchByCategory=async ()=>{
    // if(route.query.category){
    //     state.cimgs=commodityStore.state.allCommodity.filter(item=>item.category.includes(route.query.category));
    // }
}
const getAllCommodity=async()=>{
    let p={};
    p.selectsql="select * from commodity2";
    await doQuery(p).then(res=>{
        commodityStore.state.allCommodity=res.data;
        console.log(commodityStore.state.allCommodity);
    })
}
onMounted(async () => {
    
    if (commodityStore.state.commodityList.length == 0) {
        await getCommoditys();
        state.xcimgs = state.cimgs;
        // await getAllCommodity();
    } else {
        state.cimgs = state.xcimgs = commodityStore.state.commodityList;
    }
    // await searchByCategory();
})
const getCommoditys = async () => {
    let p = {};
    p.selectsql = "select id,name,price,image,category,brand,userid,avater from commodity2 order by rowno desc limit 100";
    await doQuery(p).then((res) => {
        state.cimgs = [...res.data];
        commodityStore.state.commodityList = [...res.data];
    });
}
const getRandomColor = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}
const openTags = (item) => {
    if (item == "+") {
        state.showTags = true;
    } else if (item == "") {
        state.cimgs = state.xcimgs;
    } else {
        state.cimgs = state.xcimgs.filter(xitem => xitem.category.includes(item));
    }
}
const guesslike = () => {
    state.cimgs = state.xcimgs;
}
const deletexTag = (type, tag) => {
    if (type == 1) {
        state.xtags = state.xtags.filter(item => item != tag);
    } else if (type == 2) {
        state.plustags = state.plustags.filter(item => item != tag);
        state.xtags.push(tag);
    }

}
</script>

<template>
    <div class="indexpage">
        <IndexTopSearch @do-search="openTags" />
        <div class="scrollPart">
            <WheelImgs :imgs="imgs" />
            <Kingkong :items="kkitems" />
            <div class="hobbytab">
                <Capsule bgcolor="rgb(212, 237, 250)" @click="guesslike">
                    <b>猜你喜欢</b>
                </Capsule>
                <Capsule v-for="item of hobbyitems" @click="openTags(item)">
                    {{ item }}
                </Capsule>
            </div>
            <div class="recommend">
                <RouterLink class="card" v-for="item of state.cimgs" :to="{ path: 'details', query: { cid: item.id } }">
                    <img class="cimg" v-lazy="item.image" />
                    <Location width="38vw" fontsize="0.3em" class="location">
                        <template #address>
                            浙江理工大学生活{{ (1 + Math.random() * 2).toFixed(0) }}区
                        </template>

                    </Location>
                    <div class="desc">
                        <a-tag v-if="(item.price) % 2 == 0" color="#2db7f5" class="tag">包邮</a-tag>
                        <a-tag v-else color="pink" class="tag">自取</a-tag>
                        {{ item.name }}
                    </div>
                    <div class="priceetc">
                        <span class="price">{{ item.price }}</span>
                        <span class="wantcount">{{ (Math.random() * 300 + 80).toFixed(0) }}人想要</span>
                    </div>
                    <div class="userinfo">
                        <img class="avater" v-lazy="item.avater" />
                        <span class="userid">{{ item.userid }}</span>
                    </div>
                </RouterLink>

            </div>
        </div>
    </div>
    <a-drawer title="我的频道" class="tagDrawer" placement="bottom" height="90vh" :open="state.showTags"
        @close="state.showTags = false">
        <div class="xtagBody">
            <div class="xtag" v-for="item of state.xtags" @click="deletexTag(1, item)">
                {{ item }}
                <a-divider type="vertical" />
                <CloseOutlined />
            </div>
        </div>
        <a-tabs>
            <a-tab-pane key="x1" tab="为您推荐">
                <div class="plustagBody">
                    <div class="plustag" v-for="item of state.plustags" @click="deletexTag(2, item)">
                        <CloseOutlined class="toplus" />
                        <a-divider type="vertical" />
                        {{ item }}
                    </div>
                </div>

            </a-tab-pane>
            <a-tab-pane key="x2" tab="明星周边"></a-tab-pane>
            <a-tab-pane key="x3" tab="兴趣品类"></a-tab-pane>
            <a-tab-pane key="x4" tab="经典ip"></a-tab-pane>
            <a-tab-pane key="x5" tab="品牌"></a-tab-pane>
        </a-tabs>


    </a-drawer>
</template>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 767px)";
@tablet: ~"only screen and (min-width: 768px) and (max-width: 991px)";
@desktop: ~"only screen and (min-width: 992px)";

.location {
    position: relative;
    top: -3vh;
}

.xtagBody {
    display: flex;
    flex-wrap: wrap;
    padding: 0.2em;
}

.plustagBody {
    .xtagBody();
}

.toplus {
    transform: rotate(45deg);
}

.xtag {
    border: 1px solid #c8c7c7;
    width: 7em;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0.5em;
    border-radius: 0.6em;
    margin: 0 0.3em 0.8em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
}

.plustag {
    .xtag();
    padding-left: 0.7em;
    justify-content: left;
}

.scrollPart {
    width: 100vw;
    height: 78.2vh;
    overflow-y: scroll;
}


.userinfo {
    display: flex;
    align-items: center;
    margin: 0.4em;
}

.userid {
    font-size: 0.5em;
    color: #999;
}

.avater {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
}

.userid {
    margin-left: 0.5em;
    font-size: 0.8em;
}

.cimg {
    width: 100%;
    height: 10em;
    /* text-align: center; */
}

.priceetc {
    margin: 0.4em;
}

.price {
    color: #f3395b;
    font-size: 1.3em;

    &::before {
        content: "¥";
    }
}

.wantcount {
    font-size: 0.5em;
    color: #999;
    margin-left: 0.5em;
}

.tag {
    display: inline-block;
    margin-right: 0.2em;
}

.card {
    .basecard{
        margin: 0.5em 0;
        box-shadow: 0 0 0.5em #ddd;
        border-radius: 0.5em;
        overflow: hidden;
        color: #000;
        text-decoration: none;
    }
    @media @desktop {
        width: 18vw;
        .basecard();
    }

    @media @mobile {
        width: 45vw;
        .basecard();
    }
    @media @tablet {
        width:18vw;
        .basecard();
    }

}

.cimg img {
    @media @desktop {
        width: 18vw;
    }

    @media @mobile {
        width: 45vw;
    }
    @media @tablet {
        width:18vw;
    }
}

.desc {
    height: 2.8em;
    overflow: hidden;
    padding: 0 0.4em;
}

.indexpage {
    width: 100vw;
    height: 100%;
    overflow-y: scroll;
}

.hobbytab {
    width: 100vw;
    padding: 0 3vw;
    height: 7vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.recommend {
    width: 100vw;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}</style>