import { App } from 'vue'
import Tooltip from './src/tooltip.vue'

// 定义 install 方法， App 作为参数
Tooltip.install = (app: App): void => {
    app.component(Tooltip.name, Tooltip)
}

export default Tooltip