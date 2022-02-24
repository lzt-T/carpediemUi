import { App } from 'vue'
import Radio from './src/radio.vue'

// 定义 install 方法， App 作为参数
Radio.install = (app: App): void => {
    app.component(Radio.name, Radio)
}

export default Radio