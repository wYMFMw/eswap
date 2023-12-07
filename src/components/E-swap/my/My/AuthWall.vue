<script setup>
import { computed } from "vue";
let props = defineProps(["isAuth", "operation", "msg"])
let emit = defineEmits(["doOperation"])
let operation = computed(() => props.operation ?? "去登录")
let msg = computed(() => props.msg ?? "抱歉，您还未登录，无权访问本页面");
const doOperation = () => {
    emit("doOperation");
}
</script>

<template>
    <div class="outer" v-if="!props.isAuth">
        <a-result class="authwall" status="403" title="403" :sub-title="msg">
            <template #extra>
                <a-button type="primary" @click="doOperation">{{ operation }}</a-button>
            </template>
        </a-result>
    </div>
</template>

<style scoped>
.outer {
    height:88vh;
    background-color: #A0E9FF;
}
</style>