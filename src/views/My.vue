<script setup>
import Mypage from '../components/E-swap/my/Mypage.vue';
import AuthWall from "@/components/E-swap/my/My/AuthWall.vue";
import {useUserStore} from "@/stores/userStore";
import { onMounted, reactive } from 'vue';
import {useRouter} from "vue-router";
const router=useRouter();
const userStore=useUserStore();
const state=reactive({
    isAuth:false
})
onMounted(()=>{
    state.isAuth = (userStore.userInfo.userid != "");
})
const goLogin=()=>{
    router.push("/login");
}
</script>

<template>
    <AuthWall @do-operation="goLogin" :is-auth="state.isAuth" msg="抱歉，您还未登录，请登录后使用"/>
    <Mypage v-if="state.isAuth"/>
</template>

<style scoped></style>