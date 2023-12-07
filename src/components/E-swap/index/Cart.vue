<script setup>
import { useCartStore } from "@/stores/useCartStore"
import { LeftOutlined, DeleteOutlined } from "@ant-design/icons-vue"
import { onMounted, onUpdated, reactive, watch, computed } from "vue";
import router from "../../../router";
import Counter from "./Counter.vue"
const cartStore = useCartStore();
const state = reactive({
    cartList: []
})
onMounted(() => {
    getCartList();
})
const getCartList = () => {
    cartStore.cart.map(item => {
        const listids = state.cartList.map(item3 => item3.id);
        if (!listids.includes(item.id)) {
            state.cartList.push({ ...item, count: 1 });
        } else {
            let targetIndex = listids.indexOf(item.id);//原本这里写成了cartList.indexOf(item)太傻比了,item是没有count属性的
            state.cartList[targetIndex].count++;
        }

    });

}

const goBack = () => {
    router.go(-1);
}
const clearCart = () => {
    cartStore.clearCart();
    state.cartList.splice(0);
}


const editCartList = (item, flag) => {
    if (flag == 1) {
        const listids = state.cartList.map(item3 => item3.id);
        if (!listids.includes(item.id)) {
            state.cartList.push({ ...item, count: 1 });
        } else {
            let targetIndex = listids.indexOf(item.id);//原本这里写成了cartList.indexOf(item)太傻比了,item是没有count属性的
            state.cartList[targetIndex].count++;
        }
    } else {
        const listids = state.cartList.map(item3 => item3.id);
        if (listids.includes(item.id)) {
            let targetIndex = listids.indexOf(item.id);
            state.cartList[targetIndex].count--;
        }
    }
}
const addToCart = (item) => {
    cartStore.addToCart(item);
    editCartList(item, 1)
}
const removeFromCart = (item) => {
    cartStore.removeFromCart(item.id);//记住一定要根据id删
    editCartList(item, -1)
}
const goIndex = () => {
    router.push('/index');
}
// watch(state.cartList, (newValue, oldValue) => {
//     console.log(newValue, 99999);
// })
</script>

<template>
    <div class="cart">
        <div class="topbar">
            <LeftOutlined class="goback" @click="goBack" />
            <span class="title">购物车</span>
            <DeleteOutlined class="clearcart" @click="clearCart" />
        </div>
        <div class="items">
            <a-empty v-if="cartStore.cart.length==0" class="emptyCart">
                <template #description>
                    购物车空空如也，快去选购吧
                </template>
                <a-button type="primary" @click="goIndex">去选购</a-button>
            </a-empty>
            <div class="cartItem" v-for="item of state.cartList">
                <div class="itemcontent" v-show="item.count != 0">
                    <div class="left">
                        <div class="img">
                            <img v-lazy="item.image" />
                        </div>
                        <div class="info">
                            <div class="name">
                                <a-tooltip>
                                    <template #title>
                                        {{ item.name }}
                                    </template>
                                    {{ item.brand }}牌{{ item.category }}
                                </a-tooltip>
                            </div>
                            <div class="price">
                                {{ item.price / 100 }}
                            </div>

                        </div>
                    </div>

                    <div class="operation">
                        <Counter :count="item.count" @do-add="addToCart(item)" @do-minus="removeFromCart(item)" />
                    </div>
                </div>
            </div>
            <!-- <div class="sum" v-show="state.cartList.length!=0">这样看来通过数组下标来修改确实非响应 -->
            <div class="total" v-show="cartStore.sumMoney!=0">
                总计：{{ cartStore.sumMoney }}元
                <a-button class="goPay" size="large">去结算</a-button>
            </div>
        </div>


    </div>
</template>

<style scoped lang="less">
.goPay{
    margin-left: 1em;
}
.emptyCart{
    margin-top: 10vh;
}
.operation {
    display: flex;
    justify-content: center;
    align-items: center;
}

.goback {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
    color: #666;
}

.items {
    height: 80vh;
    overflow-y: scroll;
}

.total {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
}

.left {
    display: flex;
}

.price {
    color: rgb(230, 63, 50);
    font-size: 1.2em;
    font-weight: 600;

    &::before {
        content: "¥ ";
        font-size: 0.5em;
    }
}

.itemcontent {
    display: flex;
    justify-content: space-between;
    height: 12vh;
    padding: 1em;
    border-bottom: 1px solid rgb(239, 239, 239);

    .img {
        img {
            height: 10vh;
        }
    }

    .info {
        font-size: 0.9em;
        width: 40vw;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 2vw;

        .name {
            font-size: 1.1em;
            font-weight: 600;
            overflow: hidden;
            width: 40vw;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}

.goback {
    font-size: 1.5em;
    color: #4d4c4c;
}

.topbar {
    width: 100vw;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;

    .title {
        font-size: 1.3em;
        font-weight: 600;
    }

    .clearcart {
        font-size: 1.3em;
    }
}
</style>