export default {
    mounted(el: any, binding: any) {

    },
    updated(el: any, binding: any) {
        let input = el.querySelector('.cd-cascader')
        function setBorderColor() {
            input.style.borderColor = "#dde0e7"
            // console.log("失去焦点");
        }
        if (binding.value.isFocus == true) {
            input.style.borderColor = "#a8d3ff"
            window.addEventListener("click", setBorderColor)
            window.removeEventListener('click', setBorderColor)
            // console.log("得到焦点");
        } else {
            input.style.borderColor = "#dde0e7"
            // console.log("失去焦点");

        }
    }
}
