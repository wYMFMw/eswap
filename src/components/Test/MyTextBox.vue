<script setup>
import {reactive,computed} from "vue";
import {UserOutlined} from '@ant-design/icons-vue';

</script>

<template>

    <a-input allow-clear size="large">
        <template #suffix>
            <UserOutlined type="user" />
        </template>
    </a-input>
    
</template>

<style scoped lang="less">

</style>