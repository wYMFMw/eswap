<script setup>
import { computed } from "vue"
const props = defineProps(["bgcolor"])
const bgcolor=computed(()=>props.bgcolor??"#eee")
</script>

<template>
    <div class="capsule">
        <button class="capbtn">
            <slot></slot>
        </button>
    </div>
</template>

<style scoped>

.capbtn{
    border: none;
    padding:0.2em 0.7em;
    background-color: v-bind(bgcolor);
    border-radius: 999em;
    font-size: 1.08em;
    &:hover{
        background-color: rgb(174, 223, 240);
    }
}
</style>