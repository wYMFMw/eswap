<script setup>
import {computed} from "vue"
    let props=defineProps(["height","imgs"]);
    let height=computed(()=>{
        return props.height??"28vh";
    })
</script>

<template>
    <div class="wheelImg">
        <a-carousel autoplay>
            <div v-for="img of props.imgs">
                <img v-lazy="img"/>
            </div>
        </a-carousel>
    </div>
</template>

<style scoped>
.wheelImg {
    width:96vw;
    height:v-bind(height);
    margin:0 auto;
    margin-top: 1vh;
    border-radius: 10px;
    overflow: hidden;
}
:deep(.slick-slide) {
  text-align: center;
  height: v-bind(height);
  line-height: v-bind(height);
  overflow: hidden;
}
img{
    width: 100vw;
    height:v-bind(height);
}

</style>