import { App } from 'vue'
import Table from './src/table.vue'

// 定义 install 方法， App 作为参数
Table.install = (app: App): void => {
    app.component(Table.name, Table)
}

export default Table


