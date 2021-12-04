import { App } from 'vue'
import CdButton from './button'
import CdBorder from './border'

// 所有组件列表
const components = [CdButton, CdBorder]

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
    // 遍历注册所有组件
    components.map((component) => app.component(component.name, component))
}

export {
    CdButton,
    CdBorder
}

export default {
    install
}
