import { App } from 'vue'
import Link from './src/link.vue'

// 定义 install 方法， App 作为参数
Link.install = (app: App): void => {
    app.component(Link.name, Link)
}

export default Link