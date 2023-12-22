<script setup>
import Background from './Background.vue';
import { message, Modal } from 'ant-design-vue';
import { doQuery, doUpdate } from "@/functions/mysql";
import { reactive, onMounted, nextTick, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { cryptoOut } from "@/functions/crypto.js"

import { useUserStore } from "@/stores/userStore.js"
const userStore = useUserStore();
const router = useRouter();

let state = reactive({
    data: [],
    loginform: {
        userid: "",
        password: "",
        crypto: ""
    },
    isAutologin: false,
    cryptoword: "Ak47"
})
const getUsers = async () => {
    let p = {};
    p.selectsql = "select userid,username,password,phoneno,userstatus from users";
    doQuery(p).then(res => {
        state.data.splice(0);
        state.data.push(...res.data);
    });
}
const checkNoEmpty = () => {
    const form = state.loginform;
    for (let x in form) {
        if (form[x] == "") return false;
    }
    return true;
}
const clearLoginForm = () => {
    Object.keys(state.loginform).map(item => {
        state.loginform[item] = "";
    });
}
const checkLogin = () => {
    if (!checkNoEmpty()) {
        message.error("登录信息不可为空,请输入缺失的信息！");
        return false;
    } else if (state.loginform.crypto != state.cryptoword) {
        message.error("验证码错误，请重新输入！")
    } else {
        let searchMatch = state.data.filter(item => item.userid == state.loginform.userid);
        let isExists = (searchMatch.length >= 1);
        if (isExists) {
            if (searchMatch[0].password == state.loginform.password) {
                let matchone = searchMatch[0];
                return matchone;
            } else {
                message.error("密码错误，请仔细检查！");
                return false;
            }

        } else {
            message.error("该账号不存在！")
            return false;
        }
    }
    return false;
}
const doLogin = async () => {
    let matchone = null;
    if (matchone = checkLogin()) {
        if (state.isAutologin) {
            nextAutoLogin();
        }
        clearLoginForm();
        userStore.userInfo.userid = matchone.userid;//修改userStore
        userStore.userInfo.username = matchone.username;
        userStore.userInfo.password = matchone.password;
        userStore.userInfo.phoneno = matchone.phoneno;
        showLoginResult(matchone);
        router.push("/index")
    }
}
const proxy=getCurrentInstance().proxy
const showLoginResult = (matchone) => {
    
    if (matchone.userstatus == 'su') {
        message.success("尊贵的的管理员" + matchone.username + "恭喜您登录成功！");
    } else if (matchone.userstatus == 'ssu') {
        message.success("超级无敌美丽可爱的" + matchone.username + "恭喜您登录成功！");
    } else {
        message.success("亲爱的用户" + matchone.username + "恭喜您登录成功！");
    }
    setTimeout(() => {
        proxy.$confetti.addConfetti();
    }, 1000);

}
const nextAutoLogin = () => {
    localStorage.setItem("loginform", JSON.stringify(state.loginform));
}
const autoLogin = () => {
    let lastLoginForm = JSON.parse(localStorage.getItem("loginform")) ?? {};
    if (Object.keys(lastLoginForm).length >= 1) {
        Object.keys(lastLoginForm).map(item => {
            state.loginform[item] = lastLoginForm[item];
        })
    }
}
const forgotPass = () => {
    Modal.confirm({
        title: "请选择重新注册或者重置密码",
        okText: "去注册",
        cancelText: "重置密码",
        onOk: () => {
            goRegister();
        },
        onCancel: () => {
            findBack();
        },
        maskClosable: true,
        centered: true
    })
}
const findBack = () => {
    router.push("/findbackpass")
}
const goRegister = () => {
    router.push("/register")
}
const gerCryptoWord = () => {
    state.cryptoword = cryptoOut();
}
onMounted(async () => {
    await getUsers();
    autoLogin();
})
</script>

<template>
    <div class="login">
        <Background>
            <template #title>小易同学</template>
            <template #inner>
                <a-form v-model="state.loginform" class="loginform">
                    <a-form-item label="账号">
                        <a-input allow-clear v-model:value="state.loginform.userid" placeholder="请输入账号" />
                    </a-form-item>
                    <a-form-item label="密码">
                        <a-input allow-clear type="password" v-model:value="state.loginform.password" placeholder="请输入密码" />
                    </a-form-item>
                    <div class="crypto">
                        <a-form-item label="验证码" class="crypto-form">
                            <a-input v-model:value="state.loginform.crypto" placeholder="请输入验证码" />
                        </a-form-item>
                        <button class="cryptoword" @click="gerCryptoWord">{{ state.cryptoword }}</button>
                    </div>
                    <div class="midFlex">
                        <div class="autoLogin">
                            <a-checkbox v-model:checked="state.isAutologin">下次自动登录</a-checkbox>
                        </div>
                        <div class="forgotPassword">
                            <a-button type="link" @click="forgotPass">忘记密码?/还没注册?</a-button>
                        </div>
                    </div>
                    <div class="loginbtn">
                        <a-button class="loginbtn" type="primary" @click="doLogin">登录</a-button>
                    </div>
                </a-form>
            </template>
        </Background>
    </div>
</template>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 767px)";
@tablet: ~"only screen and (min-width: 768px) and (max-width: 991px)";
@desktop: ~"only screen and (min-width: 992px)";
.loginform {
    width: 90vw;
    height: 85%;
    background-color: rgba(237, 245, 252, .6);
    border-radius: 10px;
    padding: 5vh 3vw;
    margin: 0 auto;
    @media @desktop {
        width:60vw;
    }
}

.loginform input {
    height: 6vh;
}

.loginbtn {
    width: 20vw;
    margin: 0 auto;
}

.midFlex {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 2vh 0;
}

.cryptoword {
    color: #fff;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    letter-spacing: 0.3em;
    font-style: italic;
    background-color: rgb(211, 210, 210);
    border-width: 0;
    animation: crypto infinite 3s ease-in-out;

}

.crypto {
    height: 14vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.crypto input {
    width: 30vw;
    @media @desktop {
        width:15vw;
    }
    
}

.crypto button {
    width: 40vw;
    height: 9vh;
    @media @desktop {
        width:20vw;
    }

}

@keyframes crypto {
    0% {
        font-size: 2.5em;
    }

    50% {
        font-size: 1em;
    }

    100% {
        font-size: 2.5em;
    }
}</style>