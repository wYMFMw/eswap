<script setup>
const props=defineProps(["no"])
</script>

<template>
    <div class="msgitem">
        <div class="avatar">
            <a-badge dot>
                <a-avatar size="large">
                    <template #icon>
                        <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/ikun.png'" />
                    </template>
                </a-avatar>
            </a-badge>

        </div>
        <div class="content">
            <div class="username">
                ikun{{props.no}}号
            </div>
            <div class="text">
                胶皮是狂飙和G888，刚买了不到2个月，便宜出给你
            </div>
            <div class="msgtime">
                23-10-11
            </div>
        </div>
        <div class="img">
            <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/dragon2.png'" />
        </div>
    </div>
</template>

<style scoped lang="less">
.content{
    width:50vw;
    margin-left: 0.2em;
}
.username{
    font-size: 1.1em;
    font-weight: 500;
}
.text{
    font-size: 0.8em;
    color:#999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin:0.4em 0;
}
.msgtime{
    font-size: 0.5em;
    color:#999;
}
.msgitem{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:1em;
}
.img{
    img{
        width:4em;
        height:4em;
        border-radius: 0.5em;
    }
}
.avatar{
    &:deep(.ant-avatar){
        width:2.5em;
        height:2.5em;
    }
}
</style>