import {defineStore} from "pinia"
import {reactive,ref} from "vue";
import {useRouter} from "vue-router"
export const useUserStore=defineStore("userStore",()=>{
    const router=useRouter();
    let state=reactive({
        userInfo:{
            userid:"",
            username:"",
            password:"",
            phoneno:"",
            avater:""
        }
    })
    const goLogin=()=>{
        router.push("/login");
    }
    return {...state.userInfo,goLogin};
});