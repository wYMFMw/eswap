<script setup>
    import {computed} from "vue" 
    let props=defineProps(["label","icon","iconwidth","iconheight","itemwidth"])
    import {useRouter} from "vue-router";
    const router=useRouter();
    let iconwidth=computed(()=>{
        return props.iconwidth??"6vh";
    }); 
    let itemwidth=computed(()=>{
        return props.itemwidth??"24vw";
    });
    let height=computed(()=>{
        return props.height??"6vh";
    });
    const citemClick=()=>{
        if(props.label=="EGPT"){
            router.push({path:'/campus',query:{activeKey:'3'}});
        }
        else if(props.label=='学习资料'){
            router.push({path:'/campus',query:{activeKey:'2'}});
        }else{
            alert(props.label)
        }
    }
</script>

<template>
    <div class="citem" @click="citemClick">
        <div class="icon">
            <img v-lazy="props.icon"/>
        </div>
        <div class="label">{{ props.label }}</div>
    </div>
</template>

<style scoped lang="less">
.citem{
    width:v-bind(itemwidth);
    display: flex;
    flex-direction: column;
}
.label{
    display: flex;
    justify-content: center;
}
.icon{
    display: flex;
    justify-content: center;
    img{
        width: v-bind(width);
        height: v-bind(height);
    }
}
</style>