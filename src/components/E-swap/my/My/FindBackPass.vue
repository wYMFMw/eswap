<script setup>
import Background from './Background.vue';
import { message,Modal } from 'ant-design-vue';
import { doQuery,doUpdate } from "@/functions/mysql";
import { reactive, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

let state = reactive({
    data: [],
    findbackform: {
        userid: "",
        phoneno: ""
    },
    resetform:{
        password1:"",
        password2:""
    },
    isAuth:false
})
const getUsers = () => {
    let p = {};
    p.selectsql = "select userid,username,password,phoneno from users";
    doQuery(p).then(res => {
        state.data.splice(0);
        state.data.push(...res.data);
    });
}
const checkNoEmpty = (form) => {
    for (let x in form) {
        if (form[x] == "") return false;
    }
    return true;
}
// const clearFindBackForm = () => {
//     Object.keys(state.findbackform).map(item => {
//         state.findbackform[item] = "";
//     });
// }
const checkFindBack = () => {
    if (!checkNoEmpty(state.findbackform)) {
        message.error("登录信息不可为空,请输入缺失的信息！");
        return false;
    } else {
        let searchMatch = state.data.filter(item => item.userid == state.findbackform.userid);
        let isExists = (searchMatch.length >= 1);
        if (isExists) {
            if (searchMatch[0].phoneno == state.findbackform.phoneno) {
                return true;
            } else {
                message.error("手机号错误，请仔细检查！");
                return false;
            }

        } else {
            message.error("该账号不存在！")
            return false;
        }
    }
    return false;
}
const dofindback = () => {
    if (checkFindBack()) {
        message.success("亲爱的用户" + state.findbackform.userid + "恭喜您身份验证成功！请修改密码");
        state.isAuth=true;
    }
}
const checkReset=()=>{
    if(!checkNoEmpty(state.resetform)){
        message.error("登录信息不可为空,请输入缺失的信息！");
        return false;
    }else if(state.resetform.password1!=state.resetform.password2){
        message.error("两次密码输入不一致，请重新输入!");
        return false;
    }else{
        return true;
    }
}
const doReset=()=>{
    if(checkReset()){
        let p={
            userid:state.findbackform.userid,
            password:state.resetform.password1
        };
        p.sqlprocedure="demoxx3";
        doUpdate(p).then(res=>{
            message.success("亲爱的用户"+p.userid+"恭喜您已重置密码,快去登录吧！");
            router.push("/login");
        })
    }
}
const returnLogin=()=>{
    router.push("/login");
}
onMounted(async () => {
    getUsers();
})
</script>

<template>
<div class="findback">
    <Background>
            <template #title>找回密码</template>
            <template #inner>
                <a-form v-model="state.findbackform" class="findbackform" v-show="!state.isAuth">
                    <a-form-item label="账号">
                        <a-input v-model:value="state.findbackform.userid" placeholder="请输入账号" />
                    </a-form-item>
                    <a-form-item label="手机号">
                        <a-input v-model:value="state.findbackform.phoneno" placeholder="请输入注册时的手机号" />
                    </a-form-item>
                    
                    <div class="btn1">
                        <a-button class="findbackbtn" @click="returnLogin">返回登录</a-button>
                        <a-button class="findbackbtn" type="primary" @click="dofindback">找回密码</a-button>
                    </div>
                </a-form>
                <a-form v-model="state.resetform" class="resetpass" v-if="state.isAuth">
                    <a-form-item label="密码">
                        <a-input v-model:value="state.resetform.password1" placeholder="请输入密码" />
                    </a-form-item>
                    <a-form-item label="再次输入密码">
                        <a-input v-model:value="state.resetform.password2" placeholder="请再次输入密码" />
                    </a-form-item>
                    
                    <div class="btn2">
                        <a-button class="resetbtn" type="primary" @click="doReset">确认重置</a-button>
                    </div>
                </a-form>
            </template>
            
        </Background>
</div>
</template>

<style scoped lang="less">
.findbackform {
    width: 90vw;
    height: 60%;
    background-color: rgba(237, 245, 252, .6);
    border-radius: 10px;
    padding: 5vh 3vw;
    margin: 0 auto;
}

.findbackform input {
    height: 6vh;

}

.findbackbtn {
    width: 25vw;
}
.btn1{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.btn2{
    width: 100%;
    display: flex;
    justify-content: center;
}
.resetpass{
    .findbackform();
}
.resetpass input{
    height: 6vh;
}
</style>