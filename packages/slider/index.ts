import { App } from 'vue'
import Slider from './src/slider.vue'

// 定义 install 方法， App 作为参数
Slider.install = (app: App): void => {
    app.component(Slider.name, Slider)
}

export default Slider