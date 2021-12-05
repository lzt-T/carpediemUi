import { App } from 'vue'
import Row from './src/row.vue'

// 定义 install 方法， App 作为参数
Row.install = (app: App): void => {
    app.component(Row.name, Row)
}

export default Row