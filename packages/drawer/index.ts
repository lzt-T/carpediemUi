import { App } from 'vue'
import Drawer from './src/drawer.vue'

// 定义 install 方法， App 作为参数
Drawer.install = (app: App): void => {
    app.component(Drawer.name, Drawer)
}

export default Drawer