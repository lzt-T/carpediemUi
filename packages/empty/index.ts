import { App } from 'vue'
import Empty from './src/empty.vue'

// 定义 install 方法， App 作为参数
Empty.install = (app: App): void => {
    app.component(Empty.name, Empty)
}

export default Empty