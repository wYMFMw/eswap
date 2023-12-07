<script setup>
import Capsule from '../../index/capsule.vue';
const props=defineProps(["tagsarr"])
</script>

<template>
    <div class="tags">
        <Capsule bgcolor="rgb(212, 237, 250)"><b>最热</b></Capsule>
        <Capsule v-for="item of tagsarr">{{ item }}</Capsule>
    </div>
</template>

<style scoped lang="less">
.tags {
    width: 100vw;
    height: 6vh;
    background-color: rgb(246, 249, 249);
    display: flex;
    justify-content: space-around;
    padding: 0.5em 1.5em;
}
</style>