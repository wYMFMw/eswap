<script setup>
import { onMounted, reactive } from 'vue';
import { BackwardOutlined, PlusOutlined, MinusOutlined, LeftOutlined, MoreOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue"
import { useRoute, useRouter } from 'vue-router'
import {message} from "ant-design-vue";
import { useCommodityStore } from '@/stores/useCommodityStore';
import { useCartStore } from "@/stores/useCartStore"
const route = useRoute();
const router = useRouter();
const commodityStore = useCommodityStore();
const cartStore = useCartStore();
message.config({
    top:"40vh"
});

const state = reactive({
    currentCommodity: {
        id: "",
        name: "",
        image: "",
        price: "",
        avater: "",
        userid: "",
        brand: "",
        category: ""
    },
    count: 0,
    isFocus:false
})
onMounted(() => {
    state.currentCommodity = filterCommodity();//这样赋值会不会变成非响应式的
    initCount();
})
const filterCommodity = () => {
    return commodityStore.commodityList.filter(item => item.id == route.query.cid)?.[0];
}
const goBack = () => {
    router.go(-1);
}
const goCart = () => {
    router.push("/cart")
}
const delincart = () => {
    state.count--;
    cartStore.removeFromCart(state.currentCommodity);
}
const addincart = () => {
    state.count++;
    cartStore.addToCart(state.currentCommodity);
}
const initCount = () => {
    state.count = cartStore.getCommodityCount(state.currentCommodity.id);
}
const doFocusUser = () => {
    state.isFocus=!state.isFocus;
    message.success("关注成功");
}
const donFocusUser = () => {
    state.isFocus=!state.isFocus;
    message.info("已取消关注");
}
</script>

<template>
    <div class="details">
        <div class="topbar">
            <LeftOutlined class="goback" @click="goBack" />
            <!-- <MoreOutlined class="more"/> -->
            <ShoppingCartOutlined class="cart" @click="goCart" />
        </div>
        <div class="cbody">
            <div class="userinfo">
                <span>
                    <span class="avatar">
                        <a-avatar :src="state.currentCommodity.avater" size="large" />
                    </span>
                    <span class="username">
                        {{ state.currentCommodity.userid }}
                    </span>
                </span>

                <div class="focus">
                    <a-button @click="doFocusUser" v-if="!state.isFocus" class="focusbtn1">
                        <template #icon>
                            <PlusOutlined />
                        </template>
                        关注
                    </a-button>
                    <a-button @click="donFocusUser" v-if="state.isFocus" class="focusbtn2">
                        已关注
                    </a-button>
                </div>
            </div>
            <div class="commodityinfo">
                <div class="desc">
                    <div class="nums">
                        <span class="price">{{ state.currentCommodity.price / 100 }}</span>
                        <span class="count">
                            <span class="count1">{{ (Math.random() * 2500).toFixed(0) }}人想要</span>
                            <a-divider type="vertical" />
                            <span class="count2">{{ (Math.random() * 6500).toFixed(0) }}浏览</span>
                        </span>
                    </div>

                    <p>{{ state.currentCommodity.name }}</p>
                    类别：<RouterLink to="/index" class="classify">#{{ state.currentCommodity.category }}</RouterLink>
                    <p>品牌：#{{ state.currentCommodity.brand }}</p>
                </div>
                <div class="cimg">
                    <img v-lazy="state.currentCommodity.image" />
                </div>
            </div>
        </div>
        <div class="operations">
            <div class="op-btns">
                <a-button class="btns" @click="delincart" :disabled="state.count<=0">
                    <template #icon>
                        <MinusOutlined />
                    </template>
                </a-button>
                <span class="count">{{ state.count }}</span>
                <a-button class="btns" type="primary" @click="addincart">
                    <template #icon>
                        <PlusOutlined />
                    </template>
                </a-button>
            </div>
        </div>

    </div>
</template>

<style scoped lang="less">
.classify{
    text-decoration: none;
}
.userinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    .username{
        margin-left: 0.5em;
    }
}

.focusbtn {
    background-color: #f7f7f7;
    border-radius: 999em;
    font-weight: 600;
    border: none;
}
.focusbtn1{
    .focusbtn();
    color:rgb(43, 42, 42)}
.focusbtn2{
    .focusbtn();
    color:#858383
}

.nums {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
}

.count {
    font-size: 0.8em;
    font-weight: 400;
    color: #949393;
}

.cart {
    font-size: 1.5em;
    color: #4d4c4c;
}

.goback {
    font-size: 1.5em;
    color: #4d4c4c;
}

.topbar {
    width: 100vw;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
}

.userinfo {
    height: 10vh;
}

.operations {
    position: absolute;
    bottom: 12vh;
    width: 100vw;
    height: 10vh;
    background-color: #a0e9ff;
    display: flex;
    align-items: center;
    justify-content: center;

    .op-btns {
        display: flex;
        align-items: center;
    }

    .count {
        font-size: 2.1em;
        margin: 0.5em;
        color: #ffffff;
    }

    .btns {
        width: 10vw;
        height: 6vh;
    }
}

.cbody {
    height: 82vh;
    overflow-y: scroll;

    .commodityinfo {
        width: 100vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .desc {
            width: 90vw;

            .price {
                font-size: 1.7em;
                font-weight: 600;
                color: rgb(230, 63, 50);

                &::before {
                    content: "¥";
                    font-size: 0.7em;
                }
            }
        }

        .cimg {
            text-align: center;
            border-radius: 0.6em;
            padding: 5vh 0 20vh;

            img {
                width: 90vw;
            }
        }
    }
}</style>