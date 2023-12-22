<script setup>
import BottomBar from './PageFrame/BottomBar.vue';
import Content from './PageFrame/Content.vue';
import { reactive, provide } from 'vue'
import JSconfetti from "js-confetti"
provide('confetti', new JSconfetti())


</script>

<template>
        <Content />
        <BottomBar />
        <!-- 444 -->
</template>

<style scoped></style>
<style>

</style>
