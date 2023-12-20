<script setup>
import { RightOutlined } from "@ant-design/icons-vue"
import {useRouter} from "vue-router"
import {computed} from "vue"
const router=useRouter();
const props=defineProps(["name","desc","bgColor"])
const bgColor=computed(()=>props.bgColor??"#ffedda")

const showmsg=()=>{ 
    switch(props.name){
        case "发闲置":
            router.push("/sell")
            break;
        case "表白墙":
            router.push("/bbwall")
            break;
        case "发求购":
            router.push("/askbuy")
            break; 
    }
}
</script>

<template>
    <div class="alterItem" @click="showmsg">
        <div class="desc">
            <div class="name">
                {{ props.name }}
            </div>
            <p class="subdesc">
                {{ props.desc }}
            </p>

        </div>
        <RightOutlined class="xicon" />
    </div>
</template>

<style scoped lang="less">
.desc {
    margin-left: 2.5em;
}

.alterItem {
    padding: 1em;
    margin: 0 1.5em 1em;;
    background-color: v-bind(bgColor);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5em;

    .name {
        font-size: 1.4em;
        font-weight: 600;
    }

    .subdesc {
        font-size: 0.8em;
        font-style: normal;
        font-weight: 400;
        color: #999;
        margin:0.5em 0;
    }

    .xicon {
        color: #3a3939;
        font-size: 1.3em;
    }
}
</style>