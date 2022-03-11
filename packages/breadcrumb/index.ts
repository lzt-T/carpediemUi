import { App } from 'vue'
import Breadcrumb from './src/breadcrumb.vue'

// 定义 install 方法， App 作为参数
Breadcrumb.install = (app: App): void => {
    app.component(Breadcrumb.name, Breadcrumb)
}

export default Breadcrumb