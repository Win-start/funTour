import '@/styles/common.css'
import {
	createApp
} from 'vue';
import {
	createPinia
} from 'pinia'
import {
	Icon
} from 'vant';
import {
	Toast
} from 'vant';
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'vant/lib/index.css'; // vant样式
import '@vant/touch-emulator'; // 有些vant组件只监听移动端，需要该库监听pc端
import '@/components/index.js'
import pinia from '@/stores/index'

const app = createApp(App)

app.provide('$axios', axios)

app.use(createPinia())
app.use(router)
app.use(Toast);
app.use(pinia)
app.component('van-icon', Icon);
app.mount('#app')