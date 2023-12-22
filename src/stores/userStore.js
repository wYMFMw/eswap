import { defineStore } from "pinia"
import { reactive, ref } from "vue";
import { useRouter } from "vue-router"
export const useUserStore = defineStore("userStore", () => {
    const router = useRouter();
    let userInfo = reactive({
        userid: "",
        username: "",
        password: "",
        phoneno: "",
        avater: "https://pic4.zhimg.com/80/v2-2189b7ca8f3a68eedf7f016fb0a9786b_1440w.webp"
    })
    const goLogin = () => {
        router.push("/login");
    }
    return { userInfo, goLogin };
});