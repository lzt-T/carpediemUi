import { App } from 'vue'
import Carousel from './src/carousel.vue'

// 定义 install 方法， App 作为参数
Carousel.install = (app: App): void => {
    app.component(Carousel.name, Carousel)
}

export default Carousel