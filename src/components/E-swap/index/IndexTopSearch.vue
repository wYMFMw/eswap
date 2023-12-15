<script setup>
import { ScanOutlined, SearchOutlined, BarsOutlined } from "@ant-design/icons-vue"
import { reactive } from "vue";
import {useRouter} from "vue-router"
const router=useRouter()
const state=reactive({
    value:""
})
const emit=defineEmits(["doSearch"])
const enterdoSearch=(e)=>{
    if(e.keyCode===13){
        doSearch();
    }
}
const doSearch=()=>{
    emit("doSearch",state.value)
}
const goClassify=()=>{
    router.push("/classify")
}
</script>

<template>
    <div class="topSearch">
        <div class="searchbar">
            <a-input placeholder="双肩包|冬季搭配一整套" size="large" v-model:value="state.value" @keydown="enterdoSearch">
                <template #prefix>
                    <ScanOutlined />
                </template>
                <template #suffix>
                    <SearchOutlined @click="doSearch"/>
                </template>
            </a-input>

        </div>
        <div class="classify">
            <a-button type="link" size="large" class="classsifybtn">
                <template #icon>
                    <BarsOutlined @click="goClassify"/>
                </template>
            </a-button>
        </div>
    </div>
</template>

<style scoped>

.topSearch {
    width: 100%;
    height: 8vh;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5em;
}

.searchbar {
    flex: 0.85;
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0.8em;
    &:deep(span){
        border-radius: 999em;
    }
}

.classify {
    flex: 0.15;
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
}</style>