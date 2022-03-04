import { App } from 'vue'
import Badge from './src/badge.vue'

// 定义 install 方法， App 作为参数
Badge.install = (app: App): void => {
    app.component(Badge.name, Badge)
}

export default Badge