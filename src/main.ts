import { createApp } from 'vue'
import './reset.css'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import TypeNav from './components/TypeNav.vue'
// mock虚拟 使用一次
import '@/mock/mockServer'
import { register } from 'swiper/element/bundle'
import GoodsPagination from './components/GoodsPagination.vue'
register()

const app = createApp(App)
app.component('TypeNav', TypeNav)
app.component('GoodsPagination', GoodsPagination)
app.use(pinia)
app.use(router)
// 这里全局挂在hhttp
// app.config.globalProperties.$http = url
// 使用方式
// const globalProperties = getCurrentInstance().appContext.config.globalProperties; // 获取全局挂载
// const http = globalProperties.$http;
app.mount('#app')
