import { App } from 'vue'
import CdButton from './button'
import CdBorder from './border'
import CdIcon from './icon'
import CdRow from './row'
import CdCol from './col'
import CdLink from './link'
import CdScrollbar from './scrollbar'
import CdCascader from './cascader'
import CdCheckbox from './checkbox'
import CdCheckboxGroup from './checkboxgroup'
import CdDatePicker from './datepicker'
import CdInput from './input'
import CdInputNumber from './numberinput'

// 所有组件列表
const components = [CdButton, CdBorder, CdIcon, CdRow, CdCol, CdLink, CdScrollbar, CdCascader, CdCheckbox, CdCheckboxGroup, CdDatePicker, CdInput, CdInputNumber]

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
    // 遍历注册所有组件
    components.map((component) => app.component(component.name, component))
}

export {
    CdButton,
    CdBorder,
    CdIcon,
    CdRow,
    CdCol,
    CdLink,
    CdScrollbar,
    CdCascader,
    CdCheckbox,
    CdCheckboxGroup,
    CdDatePicker,
    CdInput,
    CdInputNumber
}

export default {
    install
}
