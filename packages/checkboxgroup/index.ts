import { App } from 'vue'
import CheckboxGroup from './src/checkboxgroup.vue'

// 定义 install 方法， App 作为参数
CheckboxGroup.install = (app: App): void => {
    app.component(CheckboxGroup.name, CheckboxGroup)
}

export default CheckboxGroup