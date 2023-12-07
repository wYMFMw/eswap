<script setup>
import Postpage from "./../components/E-swap/post/PostPage.vue"
import AuthWall from "@/components/E-swap/my/My/AuthWall.vue";
import {useUserStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
const router=useRouter();
import { onMounted, reactive } from 'vue';
const userStore=useUserStore();
const state=reactive({
    isAuth:false
})
onMounted(()=>{
    state.isAuth = (userStore.userid != "");
})
const goLogin=()=>{
    router.push("/login");
}
</script>

<template>
    <AuthWall @do-operation="goLogin" :is-auth="state.isAuth" msg="抱歉，您还未登录，无权访问发布页面"/>
    <Postpage v-if="state.isAuth"/>
</template>

<style scoped>

</style>