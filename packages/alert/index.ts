import { App } from 'vue'
import Alter from './src/alter.vue'

// 定义 install 方法， App 作为参数
Alter.install = (app: App): void => {
    app.component(Alter.name, Alter)
}

export default Alter