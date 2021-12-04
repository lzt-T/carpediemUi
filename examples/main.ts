import { createApp } from 'vue'
import App from './App.vue'
//测试
import NanditVue from '~/index'
//按需使用
// import NanditVue from 'carpediem-ui'
// import 'carpediem-ui/lib/index.css'

const app = createApp(App)
app.use(NanditVue)
app.mount('#app')
