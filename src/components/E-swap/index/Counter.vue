<script setup>
import { PlusOutlined, MinusOutlined} from "@ant-design/icons-vue";
import {reactive,ref} from "vue";
let props=defineProps(["count"])
let emit=defineEmits(["doAdd","doMinus"])
const count=ref(props.count);
const doAdd=()=>{
    count.value++;
    emit("doAdd");
}
const doMinus=()=>{
    count.value--;
    emit("doMinus");
}
</script>

<template>
    <div class="op-btns">
        <!-- 模板这里还是count而不是count.value -->
        <a-button class="btns" @click="doMinus" :disabled="count<=0">
            <template #icon>
                <MinusOutlined />
            </template>
        </a-button>
        <span class="count">{{ count }}</span>
        <a-button class="btns" type="primary" @click="doAdd">
            <template #icon>
                <PlusOutlined />
            </template>
        </a-button>
    </div>
</template>

<style scoped lang="less">
.op-btns {
    display: flex;
    align-items: center;
}

.count {
    font-size: 2.1em;
    margin: 0.3em;
    color: #000000;
}

.btns {
    width: 10vw;
    height: 5.5vh;
}
</style>