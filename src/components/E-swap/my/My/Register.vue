<script setup>
import { reactive, onMounted, getCurrentInstance } from "vue";
import { message } from 'ant-design-vue';
import { doQuery, doUpdate } from "@/functions/mysql";
import Background from './Background.vue';
import { useRouter } from "vue-router"
const router = useRouter();

let state = reactive({
    data: [],
    invcodes: [],
    regisform: {
        userid: "",
        password: "",
        password2: "",
        phoneno: "",
        username: "",
        inviteCode: ""
    }
})
const getUsers = async () => {
    let p = {};
    p.selectsql = "select userid,username,password,phoneno from users";
    doQuery(p).then(res => {
        state.data.splice(0);
        state.data.push(...res.data);
    });
}
const getInvCodes = async () => {
    let p = {};
    p.selectsql = "select invcode from invcodes where usable=1";
    await doQuery(p).then(res => {
        state.invcodes.splice(0);
        state.invcodes.push(...res.data);
    });
    
    
}
const checkNoEmpty = () => {
    const form = state.regisform;
    for (let x in form) {
        if (form[x] == "") return false;
    }
    return true;
}
const checkInvCodes = async () => {
    //注意这些判断的函数最好不要加async,因为async返回的是promise而不是true或false容易出问题
    //如果一定要加async那下面调用时要用await拿到最终的布尔值结果
    let invcodes = state.invcodes.map(item => item.invcode);
    if (!invcodes.includes(state.regisform.inviteCode)) {
        return false;
    } else {
        let p = {};
        p.sqlprocedure = "demox001";
        p.invcode = state.regisform.inviteCode;
        p.userid = state.regisform.userid;
        p.usedate = new Date().toLocaleString('zh', { dateStyle: "short" });
        await doUpdate(p);
        return true;
    }
}
const checkRegis = async () => {
    if (!checkNoEmpty()) {
        message.error("注册信息不可为空,请输入缺失的信息！");
        return false;
    } else if (state.regisform.password != state.regisform.password2) {
        message.error("两次密码输入不一致，请重新输入!");
        return false;
    } else if (!(await checkInvCodes())) {
        message.error("邀请码错误，请输入正确的邀请码！");
        return false;
    } else {
        let isExists = (state.data.filter(item => item.userid == state.regisform.userid).length >= 1);
        if (isExists) {
            message.error("该账号已经存在，请重新输入！");
            return false;
        }
    }
    return true;
}
const doRegister = async () => {
    if (await checkRegis()) {
        let p = {
            userid: state.regisform.userid,
            username: state.regisform.username,
            password: state.regisform.password,
            phoneno: state.regisform.phoneno
        };
        p.sqlprocedure = "demox002";
        doUpdate(p).then(res => {
            getUsers();
            clearRegisForm();
            message.success("亲爱的用户" + p.username + "恭喜您注册成功！");
            router.push("/login");
            setTimeout(() => {
                proxy.$confetti.addConfetti();
            }, 1000);
        })
    }
}
const clearRegisForm = () => {
    Object.keys(state.regisform).map(item => {
        state.regisform[item] = "";
    });
}
const returnLogin = () => {
    router.push("/login");
}
const reGenerateInvCode = async () => {
    let p2={};
    p2.sqlprocedure="g01";
    if(state.invcodes.length<=3){
        await doQuery(p2);//这里要用doQuery，因为doUpdate我是不支持无参数的
    }
}
const proxy=getCurrentInstance().proxy;
onMounted(async () => {
    
    await getUsers();
    await getInvCodes();
    await reGenerateInvCode();
})

</script>

<template>
    <div class="register">
        <a-form v-model="state.regisform" class="regisform">
            <a-form-item label="账号" class="item">
                <a-input allow-clear v-model:value="state.regisform.userid" placeholder="请输入账号" />
            </a-form-item>
            <a-form-item label="用户名" class="item">
                <a-input allow-clear v-model:value="state.regisform.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item label="密码" class="item">
                <a-input allow-clear type="password" v-model:value="state.regisform.password" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item label="确认密码" class="item">
                <a-input allow-clear type="password" v-model:value="state.regisform.password2" placeholder="请再次输入密码" />
            </a-form-item>
            <a-form-item label="手机号" class="item">
                <a-input allow-clear v-model:value="state.regisform.phoneno" placeholder="请输入您的手机号用于找回密码" />
            </a-form-item>
            <a-form-item label="邀请码" class="item">
                <a-input allow-clear v-model:value="state.regisform.inviteCode" placeholder="请输入邀请码" />
            </a-form-item>
            <div class="btns">
                <a-button @click="returnLogin">返回登录</a-button>
                <a-button class="regisbtn" type="primary" @click="doRegister">注册</a-button>
            </div>
        </a-form>
    </div>
</template>
<style scoped lang="less">
@mobile: ~"only screen and (max-width: 767px)";
@tablet: ~"only screen and (min-width: 768px) and (max-width: 991px)";
@desktop: ~"only screen and (min-width: 992px)";
.register{
    width:100vw;
    height:88vh;
    display: flex;
    justify-content: center;
    padding-top: 1.5em;
    background: #A0E9FF;
}
.regisform {
    width: 90vw;
    height: 98%;
    background-color: rgba(237, 245, 252, .6);
    border-radius: 10px;
    padding: 1em;
    margin: 0 auto;
    /* overflow-y: scroll; */
    @media @desktop {
        width:60vw;
    }

}

.regisform input {
    height: 6vh;
}

.btns {
    display: flex;
    justify-content: space-around;
    margin-top: 2vh;
    @media @desktop {
        margin-top:0;
    }
}

.regisbtn {
    width: 20vw;
}

.item {
    /* background-color: blue; */
    height: 12vh;
    margin: 0 auto;
}
</style>