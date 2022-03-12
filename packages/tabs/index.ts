import { App } from 'vue'
import Tabs from './src/tabs.vue'

// 定义 install 方法， App 作为参数
Tabs.install = (app: App): void => {
    app.component(Tabs.name, Tabs)
}

export default Tabs