import { App } from 'vue'
import Scrollbar from './src/scrollbar.vue'

// 定义 install 方法， App 作为参数
Scrollbar.install = (app: App): void => {
    app.component(Scrollbar.name, Scrollbar)
}

export default Scrollbar