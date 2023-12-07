<script setup>
import { SettingOutlined } from "@ant-design/icons-vue"
import Kingkong from "../index/Kingkong.vue";
import {reactive,computed} from "vue"
import {useUserStore} from "@/stores/userStore";
const userStore = useUserStore()
const state=reactive({
    userinfo:{
        id:userStore.userid,
        name:userStore.username
    }
})
const memberid=computed(()=>{
    const uid=state.userinfo.id;
    const part1=uid[0];
    const part2=uid[uid.length-1];
    return  part1+"***"+part2;
})
const info1 = [
    { altername: "收藏", count: 12 },
    { altername: "历史浏览", count: 121 },
    { altername: "关注", count: 28 },
    { altername: "粉丝", count: 19 }
];
const trades=[
    {icon:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/t01.png",name:"我发布的"},
    {icon:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/t02.png",name:"我卖出的"},
    {icon:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/t03.png",name:"我买到的"},
]
const kingkong=[
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e01.png",label:"小易公约"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e02.png",label:"客服中心"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e03.png",label:"我的勋章"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e04.png",label:"退款售后"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e05.png",label:"个性装扮"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e06.png",label:"夜间模式"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e07.png",label:"红包奖券"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e08.png",label:"小易公益"},
]

</script>

<template>
    <div class="mypage">
        <div class="config">
            <SettingOutlined />
        </div>
        <div class="userinfo">
            <div class="avatar">
                <a-avatar size="large">
                    <template #icon>
                        <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/ikun.png'" />
                    </template>
                </a-avatar>
            </div>
            <div class="names">
                <div class="username">
                    {{ state.userinfo.name }}
                </div>
                <div class="membername">
                    会员名:{{ memberid}}
                </div>
            </div>

        </div>
        <div class="info1">
            <div class="alter" v-for="item of info1">
                <div class="count">
                    {{ item.count }}
                </div>
                <div class="altername">
                    {{ item.altername }}
                </div>
            </div>
        </div>
        <a-divider />
        <div class="mytrade">
            <div class="info">
                <div class="title">
                    我的交易
                </div>
                <div class="achieve">
                    在小易赚了{{ (200+Math.random()*1200).toFixed(0) }}.00元
                </div>
            </div>
            <div class="tradeinfo">
                <div class="tradealter" v-for="item of trades">
                    <div class="tradeicon">
                        <img v-lazy="item.icon" />
                    </div>
                    <div class="tradetext">
                        {{item.name}}&nbsp;{{ (5+Math.random()*20).toFixed(0) }}
                    </div>
                </div>
            </div>
        </div>
        <a-divider />
        <div class="extra">
            <div class="title">
                更多服务
            </div>
            <div class="extraitems">
                <Kingkong :items="kingkong" itemwidth="22vw"/>
            </div>
        </div>

    </div>
</template>

<style scoped lang="less">
.extraitems{
    width:100%;
    height:29vh;
    overflow-y: scroll;
}
.extra .title{
    font-size: 1.2em;
    font-weight: 600;
    margin-left: 1em;
}
.tradeinfo{
    display: flex;
    justify-content: space-around;
    margin-top: 1em;
}
.tradealter {
    img {
        width: 2.8em;
        height: 2.8em;
    }
    .tradetext{
        margin-top: 0.2em;
    }
    text-align: center;

}

.mytrade .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;

    .title {
        font-size: 1.2em;
        font-weight: bold;
    }

    .achieve {
        font-size: 0.9em;
        color: #999;
    }
}

.ant-divider {
    margin: 1em 0;
}

.altername {
    margin-top: 0.2em;
}

.alter {
    text-align: center;
}

.info1 {
    padding: 1.2em 0 0;
    display: flex;
    justify-content: space-around;
}

.names {
    margin-left: 0.5em;
}

.membername {
    font-size: 0.8em;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.username {
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 0.5em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.userinfo {
    width: 50vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin-left: 1em;
}

.ant-avatar {
    //直接这样修改avatar大小
    width: 3.2em;
    height: 3.2em;
}

.config {
    font-size: 1.3em;
    display: flex;
    justify-content: end;
    margin-top: 0.2em;
}

.mypage {
    padding: 1em;
}
</style>