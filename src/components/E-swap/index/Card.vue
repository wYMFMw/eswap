<script setup>
import { RouterLink } from 'vue-router';

const props=defineProps(["cid", "url", "desc", "price","location","fetchway"])
</script>

<template>
    <div class="card">
        <RouterLink :to="{path:'/details',query:{cid:props.cid}}">
            <div class="img">
                <img :src="props.url" :alt="props.cid">
                <!-- location组件 -->
            </div>
            <div class="desc">
                <!-- 根据fetchway打标签 -->
                {{ props.desc }}
            </div>
            <div class="priceetc">
                {{ props.price }}
            </div>
            <div class="userinfo">
                <!-- 根据传入的userid查头像和名字 -->
            </div>
        </RouterLink>
    </div>
</template>

<style scoped></style>