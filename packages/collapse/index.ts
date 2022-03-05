import { App } from 'vue'
import Collapse from './src/collapse.vue'

// 定义 install 方法， App 作为参数
Collapse.install = (app: App): void => {
    app.component(Collapse.name, Collapse)
}

export default Collapse