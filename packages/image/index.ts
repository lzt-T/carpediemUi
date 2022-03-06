import { App } from 'vue'
import Image from './src/image.vue'

// 定义 install 方法， App 作为参数
Image.install = (app: App): void => {
    app.component(Image.name, Image)
}

export default Image