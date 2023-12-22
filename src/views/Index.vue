<script setup>
import IndexPage from "@/components/E-swap/index/IndexPage.vue";
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
    <div class="index">
        <AuthWall @do-operation="goLogin" :is-auth="state.isAuth" msg="抱歉，您还未登录，无权访问首页"/>
        <IndexPage v-if="state.isAuth"/>
    </div>
</template>

<style scoped>
.index {
    width: 100vw;
    height: 88vh;
}
</style>