<script setup>
let props=defineProps(["content"]);
let emit=defineEmits(["delcomment"])
const delself=()=>{
    emit("delcomment",props.content);
}
</script>

<template>
    <div class="remarkitem">
        {{ props.content }}
        <a-button type="link" @click="delself">删除</a-button>
    </div>
    <a-divider/>
</template>

<style scoped>
.remarkitem{
    display: flex;
    margin: 1em 1em 0 1em;
    align-items: center;
    justify-content:space-between;
}

</style>