<script setup>
import { onMounted, reactive, ref } from "vue"
import Eswap from "@/components/Eswap.vue";
import { doFileDownload } from "@/functions/file.js";
import { doAliQuery } from "./functions/ai/ali";

</script>

<template>
    <Eswap/>
</template>

<style scoped lang="less">

</style>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>