import { App } from 'vue'
import Avatar from './src/avatar.vue'

// 定义 install 方法， App 作为参数
Avatar.install = (app: App): void => {
    app.component(Avatar.name, Avatar)
}

export default Avatar