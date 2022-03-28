import { App } from 'vue'
import Alert from './src/alert.vue'

// 定义 install 方法， App 作为参数
Alert.install = (app: App): void => {
    app.component(Alert.name, Alert)
}

export default Alert