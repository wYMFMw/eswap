<script setup>
import { CloseOutlined, AimOutlined,EnvironmentOutlined,PayCircleOutlined} from "@ant-design/icons-vue"
import {computed} from "vue"
const props=defineProps(["width","fontsize","borderradius","bgColor","color"])
let width=computed(()=>props.width??"100%")
let fontsize=computed(()=>props.fontsize??"16px")
let borderradius=computed(()=>props.borderradius??"5px")
let bgColor=computed(()=>props.bgColor??"#575757a9")
let color=computed(()=>props.color??"#ffffff")
</script>

<template>
    <div class="location">
        <EnvironmentOutlined class="locationicon" />
        <slot name="address">
            浙江理工大学生活{{ (1 + Math.random() * 2).toFixed(0) }}区
        </slot>
        <slot name="distance">
        </slot>
    </div>
</template>

<style scoped lang="less">
.location {
    width: v-bind(width);
    font-size: v-bind(fontsize);
    border-radius: v-bind(borderradius);
    color: v-bind(color);
    background-color: v-bind(bgColor);
    margin-left: 0.8em;
    padding: 0.4em 0.3em;
}

.locationicon {
    font-size: v-bind(fontsize);
}
</style>