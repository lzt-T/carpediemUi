import { App } from 'vue'
import Select from './src/select.vue'

// 定义 install 方法， App 作为参数
Select.install = (app: App): void => {
    app.component(Select.name, Select)
}

export default Select