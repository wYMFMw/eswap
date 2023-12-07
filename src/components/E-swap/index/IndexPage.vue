<script setup>
import { onMounted, ref, reactive } from "vue";
import IndexTopSearch from "./IndexTopSearch.vue";
import WheelImgs from "./WheelImgs.vue";
import Kingkong from "./Kingkong.vue";
import Capsule from "./Capsule.vue";
import {useCommodityStore} from "@/stores/useCommodityStore"
import { doQuery } from "@/functions/mysql"
import { AimOutlined } from "@ant-design/icons-vue"
const commodityStore = useCommodityStore()

const state = reactive({
    cimgs: []
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
const hobbyitems = ["高数A", "JAVA", "玄幻", "+"];
onMounted(async () => {
    let p = {};
    p.selectsql = "select id,name,price,image,category,brand,userid,avater from commodity limit 1000,50";
    await doQuery(p).then((res) => {
        state.cimgs.splice(0);
        state.cimgs.push(...res.data);
        commodityStore.commodityList.splice(0);
        commodityStore.commodityList.push(...res.data);
    });
})
const getRandomColor = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}
</script>

<template>
    <div class="indexpage">
        <IndexTopSearch />
        <div class="scrollPart">
            <WheelImgs :imgs="imgs" />
            <Kingkong :items="kkitems" />
            <div class="hobbytab">
                <Capsule bgcolor="rgb(212, 237, 250)">
                    <b>猜你喜欢</b>
                </Capsule>
                <Capsule v-for="item of hobbyitems">
                    {{ item }}
                </Capsule>
            </div>
            <div class="recommend">
                <RouterLink class="card" v-for="item of state.cimgs" :to="{ path: 'details', query: { cid: item.id } }">
                    <img class="cimg" v-lazy="item.image" />
                    <div class="location">
                        <AimOutlined class="locationicon" />
                        浙江理工大学生活{{ (1 + Math.random() * 2).toFixed(0) }}区
                    </div>
                    <div class="desc">
                        <a-tag v-if="(item.price / 100) % 2 == 0" color="#2db7f5" class="tag">包邮</a-tag>
                        <a-tag v-else color="pink" class="tag">自取</a-tag>
                        {{ item.name }}
                    </div>
                    <div class="priceetc">
                        <span class="price">{{ item.price / 100 }}</span>
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
</template>

<style scoped lang="less">
.scrollPart{
    width:100vw;
    height:78.2vh;
    overflow-y: scroll;
}
.location {
    position: relative;
    width: 36vw;
    top: -6em;
    font-size: 0.3em;
    border-radius: 5px;
    color: #ffffff;
    background-color: #575757a9;
    margin-left: 0.8em;
    padding: 0.4em 0.2em;
}

.locationicon {
    font-size: 2.5em;
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
    width: 45vw;
    margin: 0.5em 0;
    box-shadow: 0 0 0.5em #ddd;
    border-radius: 0.5em;
    overflow: hidden;
    color: #000;
    text-decoration: none;
}

.cimg img{
    width:42vw;
    margin-left: 2vw;
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
}
</style>