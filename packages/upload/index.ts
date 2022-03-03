import { App } from 'vue'
import Upload from './src/upload.vue'

// 定义 install 方法， App 作为参数
Upload.install = (app: App): void => {
    app.component(Upload.name, Upload)
}

export default Upload