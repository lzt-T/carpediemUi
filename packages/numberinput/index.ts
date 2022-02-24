import { App } from 'vue'
import InputNumber from './src/numberinput.vue'

// 定义 install 方法， App 作为参数
InputNumber.install = (app: App): void => {
    app.component(InputNumber.name, InputNumber)
}

export default InputNumber