import { App } from 'vue'
import Backtop from './src/backtop.vue'

// 定义 install 方法， App 作为参数
Backtop.install = (app: App): void => {
    app.component(Backtop.name, Backtop)
}

export default Backtop