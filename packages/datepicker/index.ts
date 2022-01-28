import { App } from 'vue'
import DatePicker from './src/datepicker.vue'

// 定义 install 方法， App 作为参数
DatePicker.install = (app: App): void => {
    app.component(DatePicker.name, DatePicker)
}

export default DatePicker