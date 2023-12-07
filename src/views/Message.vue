<script setup>
import AuthWall from "@/components/E-swap/my/My/AuthWall.vue";
import {useUserStore} from "@/stores/userStore";
import { onMounted, reactive } from 'vue';
import {useRouter} from "vue-router";
import Msgpage from "../components/E-swap/message/Msgpage.vue";
const router=useRouter();
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
<AuthWall @do-operation="goLogin" :is-auth="state.isAuth" msg="抱歉，您还未登录，无权访问消息页面"/>
<Msgpage v-if="state.isAuth"></Msgpage>
</template>

<style scoped>

</style>