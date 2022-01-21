import { App } from 'vue'
import Cascader from './src/cascader.vue'

// 定义 install 方法， App 作为参数
Cascader.install = (app: App): void => {
    app.component(Cascader.name, Cascader)
}

export default Cascader