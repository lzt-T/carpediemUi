import { App } from 'vue'
import Checkbox from './src/checkbox.vue'

// 定义 install 方法， App 作为参数
Checkbox.install = (app: App): void => {
    app.component(Checkbox.name, Checkbox)
}

export default Checkbox