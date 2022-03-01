import { App } from 'vue'
import Switch from './src/switch.vue'

// 定义 install 方法， App 作为参数
Switch.install = (app: App): void => {
    app.component(Switch.name, Switch)
}

export default Switch