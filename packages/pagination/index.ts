import { App } from 'vue'
import Pagination from './src/pagination.vue'

// 定义 install 方法， App 作为参数
Pagination.install = (app: App): void => {
    app.component(Pagination.name, Pagination)
}

export default Pagination