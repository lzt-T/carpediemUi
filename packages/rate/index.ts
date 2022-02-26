import { App } from 'vue'
import Rate from './src/rate.vue'

// 定义 install 方法， App 作为参数
Rate.install = (app: App): void => {
    app.component(Rate.name, Rate)
}

export default Rate