import { App } from 'vue'
import Tag from './src/tag.vue'

// 定义 install 方法， App 作为参数
Tag.install = (app: App): void => {
    app.component(Tag.name, Tag)
}

export default Tag


