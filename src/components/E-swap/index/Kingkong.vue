<script setup>
import Citem from './Citem.vue';
import {computed} from 'vue';
const props=defineProps(['items','itemwidth'])
const itemwidth=computed(()=>props.itemwidth??"24vw");
</script>

<template>
    <div class="kingkong">
        <!-- <Citem v-for="item of props.items" :icon="item.url" :label="item.label"/> -->
        <Citem v-for="item of props.items" :icon="item.url" :itemwidth="itemwidth" :label="item.label"/>
    </div>
</template>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 767px)";
@tablet: ~"only screen and (min-width: 768px) and (max-width: 991px)";
@desktop: ~"only screen and (min-width: 992px)";

.kingkong {
    width: 100%;
    height: 26vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
</style>