<script setup>
import { computed } from "vue"
let props = defineProps(["height", "imgs"]);
let height = computed(() => {
    return props.height ?? "28vh";
})
</script>

<template>
    <div class="wheelImg">
        <a-carousel autoplay>
            <div v-for="img of props.imgs">
                <img v-lazy="img" />
            </div>
        </a-carousel>
    </div>
</template>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 767px)";
@tablet: ~"only screen and (min-width: 768px) and (max-width: 991px)";
@desktop: ~"only screen and (min-width: 992px)";
@desktopheight:60vh;
.wheelImg {

    width: 96vw;
    height: v-bind(height);
    margin: 0 auto;
    margin-top: 1vh;
    border-radius: 10px;
    overflow: hidden;
    @media @desktop {
        height: @desktopheight;
    }
}

:deep(.slick-slide) {
    text-align: center;
    height: v-bind(height);
    @media @desktop {
        height:@desktopheight;
    }
    line-height: v-bind(height);
    overflow: hidden;
}

:deep(.slick-list) {
    border-radius: 0.7em;
}

img {
    width: 100vw;
    height: v-bind(height);
    @media @desktop {
        height: @desktopheight;
    }
}
</style>