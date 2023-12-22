<script setup>
import Capsule from "./../../index/capsule.vue";
import { LikeOutlined, DislikeOutlined, MessageOutlined, ExportOutlined } from "@ant-design/icons-vue";
</script>

<template>
    <div class="bbwItem">
        <div class="userinfo">
            <a-avatar class="avatar" size="large">
                <template #icon>
                    <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/ikun.png'" />
                </template>
            </a-avatar>
            <span class="username">IKUN1号</span>

        </div>
        <div class="text">
            蚌埠住了家人们，万万没想到有一天外卖能被汪汪队给偷了。。。
        </div>
        <div class="media">
            <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/dog.png'" alt="dog" />
        </div>
        <div class="bbwTag">
            <Capsule bgcolor="rgb(212, 237, 250)">
                <b>
                    <span class="sharp">#</span>&nbsp;
                    家人们谁懂啊
                </b>&nbsp;
                >
            </Capsule>
        </div>
        <div class="hotremark">
            <div class="line1">
                <Capsule bgcolor="#f7749e">
                    <span class="hrtagtxt">神评</span>
                </Capsule>
                <div class="trp2">
                    <LikeOutlined /> {{ (89+Math.random()*2000).toFixed(0) }} &emsp;
                    <DislikeOutlined /> {{ (0+Math.random()*1).toFixed(0) }}
                </div>
            </div>
            <div class="content">
                学长吃点你的外卖有问题？
            </div>

        </div>
        <div class="trp">
            <div class="trans">
                <ExportOutlined />
                &nbsp;{{ (89+Math.random()*1000).toFixed(0) }}
            </div>
            <div class="remark">
                <MessageOutlined />
                &nbsp;{{ (89+Math.random()*1000).toFixed(0) }}
            </div>
            <div class="praise">
                <LikeOutlined />
                &nbsp;{{ (89+Math.random()*1000).toFixed(0) }}
            </div>
            <div class="dislike">
                <DislikeOutlined />
                &nbsp;{{ (0+Math.random()*1).toFixed(0) }}
            </div>
        </div>

    </div>
</template>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 767px)";
@tablet: ~"only screen and (min-width: 768px) and (max-width: 991px)";
@desktop: ~"only screen and (min-width: 992px)";
.trp{
    display: flex;
    justify-content: space-between;
    padding:0.2em 0.5em;
}
.hotremark .content {
    padding: 0 1em 0.5em;
    font-size: 1.1em;
}

.line1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8em 0.8em 0.5em;
}

.hrtagtxt {
    color: #ffffff;
}

.hotremark {
    margin: 0.6em 0;
    background-color: #f5f5f5;
    border-radius: 0.4em;
}

.bbwTag {
    margin: 0.3em 0;
}

.sharp {
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
    line-height: 1.2em;
    padding: 0.1em;
    border-radius: 50%;
    color: #ffffff;
    background-color: rgb(63, 172, 235);
    margin: 0.2em 0;
}

.text {
    font-size: 1.2em;
    margin: 0.3em 0;
}

.media {
    img {
        border-radius: 0.4em;
        width: 50%;
        @media @desktop {
            width:40%;
        }
    }
}

.username {
    margin-left: 0.8em;
}

.bbwItem {
    padding: 1.2em;
    background-color: #ffffff;
    border-radius: 0.5em;
    margin-bottom: 1em;
    @media @desktop {
        display: inline-block;
        width:45%;
        margin:2.3vw;
    }
}</style>