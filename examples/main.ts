import { createApp } from 'vue'
import App from './App.vue'
//测试
import NanditVue from '~/index'
//全局使用
// import NanditVue from 'carpediem-ui'
// import 'carpediem-ui/lib/index.css'
// 按需引入
// import { CdButton } from 'carpediem-ui'
// import 'carpediem-ui/lib/index.css'

const app = createApp(App)
const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000'

app.use(NanditVue)

app.mount('#app')
