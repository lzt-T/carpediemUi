import { App } from 'vue'
import PageHeader from './src/pageheader.vue'

// 定义 install 方法， App 作为参数
PageHeader.install = (app: App): void => {
    app.component(PageHeader.name, PageHeader)
}

export default PageHeader