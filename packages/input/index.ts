import { App } from 'vue'
import Input from './src/input.vue'

// 定义 install 方法， App 作为参数
Input.install = (app: App): void => {
    app.component(Input.name, Input)
}

export default Input