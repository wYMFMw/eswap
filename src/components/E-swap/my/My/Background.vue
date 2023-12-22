<script setup>

</script>

<template>
<div class="background">
        <div class="title">
            <slot class="title" name="title"></slot>
        </div>
        <slot name="inner"></slot>

</div>
</template>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 767px)";
@tablet: ~"only screen and (min-width: 768px) and (max-width: 991px)";
@desktop: ~"only screen and (min-width: 992px)";
.background{
    width: 100vw;
    height: 88vh;
    /* background: linear-gradient(135deg,#00005C,#3B185F,#C060A1,#F0CAA3); */
    background: #A0E9FF;
}
.title{
    width: 100vw;
    height:10vh;
    color:#fff;
    font-size: 2em;
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: textlight 2s infinite ease-in-out;
}
@keyframes textlight{
    0%{
        text-shadow: 0 0 20px #ffff;
    }
    50%{
        text-shadow: 0 0 0px #f7f4f4;
        /* filter: blur(2px); */
    }
    100%{
        text-shadow: 0 0 20px #ffff;
    }
}

</style>