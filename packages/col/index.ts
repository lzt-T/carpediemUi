import { App } from 'vue'
import Col from './src/col.vue'

// 定义 install 方法， App 作为参数
Col.install = (app: App): void => {
    app.component(Col.name, Col)
}

export default Col