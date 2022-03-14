import { App } from 'vue'
import Message from './src/message.vue'

// 定义 install 方法， App 作为参数
Message.install = (app: App): void => {
    app.component(Message.name, Message)
}

export default Message