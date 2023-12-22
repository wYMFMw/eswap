import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router/index.jsx'
import Vuelazyload from 'vue3-lazyload'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import JSconfetti from "js-confetti"
const confetti = new JSconfetti()
const app = createApp(App)
app.config.globalProperties.$confetti = confetti//用globalproperties或者依赖注入的方式都可以
app.use(Antd)
app.use(Vuelazyload,{
    preload:1.3,
    error:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/ikun2.png"
})
app.use(createPinia())
app.use(router)
app.use(hljsVuePlugin)

app.mount('#app')
