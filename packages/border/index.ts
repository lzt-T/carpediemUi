import { App } from 'vue'
import Border from './src/border.vue'

// 定义 install 方法， App 作为参数
Border.install = (app: App): void => {
    app.component(Border.name, Border)
}

export default Border