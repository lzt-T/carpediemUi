import { App } from 'vue'
import TabPane from './src/tabpane.vue'

// 定义 install 方法， App 作为参数
TabPane.install = (app: App): void => {
    app.component(TabPane.name, TabPane)
}

export default TabPane