<template>
  <div
    :class="{
      'cd-inputnumber-frame': true,
      'cd-inputnumber-frame-focus':
        (isFocus || isLeftHover || isRightHover) && disabled != true,
      'cd-inputnumber-frame-disabled': disabled,
    }"
  >
    <cd-icon
      :class="{
        'cd-inputnumber-minus': true,
        'cd-inputnumber-minus-hover': isLeftHover && disabled != true,
      }"
      name="minus"
      :size="heightData / 2.5"
      :color="isLeftHover ? '#86c1fe' : '#8e9093'"
      @mouseenter="onMouseenter(0)"
      @mouseleave="onMouseleave(0)"
      @mousedown="onMousedown(0)"
    ></cd-icon>
    <input
      v-model="inputData"
      type="text"
      ref="input"
      :class="{
        'cd-inputnumber-input': true,
        'cd-inputnumber-input-disabled': disabled,
      }"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
      :disabled="disabled"
    />
    <cd-icon
      :class="{
        'cd-inputnumber-add': true,
        'cd-inputnumber-add-hover': isRightHover && disabled != true,
      }"
      name="add"
      :size="heightData / 2.5"
      :color="isRightHover ? '#86c1fe' : '#8e9093'"
      @mouseenter="onMouseenter(1)"
      @mouseleave="onMouseleave(1)"
      @mousedown="onMousedown(1)"
    ></cd-icon>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  name: "cd-input-number",
  components: {
    cdIcon,
  },
  emits: ["update:modelValue", "focus", "blur", "change"],
  props: {
    modelValue: {
      required: true,
    },
    height: {
      type: Number,
      default: 32,
    },
    width: {
      type: Number,
      default: 150,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    step: {
      type: Number,
      default: 1,
    },
    precision: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
    },
  },
  setup(props, context) {
    // 保留几位小数
    let keepFigures: number;
    getKeepFigures();
    function getKeepFigures() {
      let sum = 0;
      let totalBit = 1 / props.precision;
      while (true) {
        if (totalBit == 1 || totalBit < 1) {
          keepFigures = sum;
          break;
        }
        totalBit /= 10;
        sum++;
      }
    }

    let input = ref();
    let inputData = ref();
    onMounted(() => {
      inputData.value = props.modelValue;
      if (props.modelValue !== undefined) {
        inputData.value = Number(inputData.value).toFixed(keepFigures);
      }
      if (
        props.min !== undefined &&
        props.modelValue !== undefined &&
        inputData.value < props.min
      ) {
        inputData.value = props.min;
        inputData.value = Number(inputData.value).toFixed(keepFigures);
        executeChange();
        changeModelValue();
      }
      if (
        props.max !== undefined &&
        props.modelValue !== undefined &&
        inputData.value > props.max
      ) {
        inputData.value = props.max;
        inputData.value = Number(inputData.value).toFixed(keepFigures);
        executeChange();
        changeModelValue();
      }
    });

    // 设置大小
    let heightData = ref();
    let widthData = ref();
    setSize();
    function setSize() {
      if (props.height >= 24) {
        heightData.value = props.height;
      } else {
        heightData.value = 24;
      }
      if (props.width >= 120) {
        widthData.value = props.width;
      } else {
        widthData.value = 120;
      }
    }
    // 触发事件
    function executeFocus() {
      context.emit("focus", input.value);
    }
    function executeBlur() {
      context.emit("blur", input.value);
    }
    function executeChange() {
      context.emit("change", Number(inputData.value));
    }
    function changeModelValue() {
      context.emit("update:modelValue", Number(inputData.value));
    }
    // 按下删除键
    function onKeydown(e: any) {
      if (e.keyCode == 8 && Number(inputData.value) != 0) {
        setTimeout(() => {
          executeChange();
          changeModelValue();
        }, 2);
      }
    }
    // 得到焦点
    let isFocus = ref(false);
    function onFocus() {
      isFocus.value = true;
      executeFocus();
    }
    // 失去焦点
    function onBlur() {
      isFocus.value = false;
      inputData.value = Number(inputData.value).toFixed(keepFigures);
      executeBlur();
    }
    // 经过按钮时
    let isLeftHover = ref(false);
    let isRightHover = ref(false);
    function onMouseenter(parameter: number) {
      if (parameter == 0) {
        isLeftHover.value = true;
      } else {
        isRightHover.value = true;
      }
    }
    function onMouseleave(parameter: number) {
      if (parameter == 0) {
        isLeftHover.value = false;
      } else {
        isRightHover.value = false;
      }
    }
    // 点击减号按钮、加号按钮
    function onMousedown(parameter: number) {
      if (props.disabled) {
        return;
      }
      let isTrue = true;
      if (parameter == 0) {
        if (inputData.value === undefined) {
          inputData.value = -(props.step * props.precision);
          inputData.value = Number(inputData.value).toFixed(keepFigures);
        } else {
          inputData.value = inputData.value - props.step * props.precision;
          inputData.value = Number(inputData.value).toFixed(keepFigures);
        }
        // 低于最小值
        if (
          props.min !== undefined &&
          inputData.value < props.min &&
          Number(inputData.value) + props.step * props.precision != props.min
        ) {
          inputData.value = props.min;
          inputData.value = Number(inputData.value).toFixed(keepFigures);
        } else if (
          props.min !== undefined &&
          Number(inputData.value) + props.step * props.precision == props.min
        ) {
          inputData.value = props.min;
          inputData.value = Number(inputData.value).toFixed(keepFigures);
          isTrue = false;
        }
        if (isTrue) {
          executeChange();
        }
        changeModelValue();
      } else {
        if (inputData.value === undefined) {
          inputData.value = props.step * props.precision;
          inputData.value = Number(inputData.value).toFixed(keepFigures);
        } else {
          inputData.value =
            Number(inputData.value) + props.step * props.precision;
          inputData.value = Number(inputData.value).toFixed(keepFigures);
        }
        // 高于最大值
        if (
          props.max !== undefined &&
          inputData.value > props.max &&
          Number(inputData.value) - props.step * props.precision != props.max
        ) {
          inputData.value = props.max;
          inputData.value = Number(inputData.value).toFixed(keepFigures);
        } else if (
          props.max !== undefined &&
          Number(inputData.value) - props.step * props.precision == props.max
        ) {
          inputData.value = props.max;
          inputData.value = Number(inputData.value).toFixed(keepFigures);
          isTrue = false;
        }
        if (isTrue) {
          executeChange();
        }
        changeModelValue();
      }
    }
    // 监听输入的变化
    watch(inputData, (newval, oldval) => {
      // 输入的时候inputData改变
      if (
        (oldval === undefined ||
          String(newval).length > String(oldval).length) &&
        isFocus.value == true
      ) {
        if (
          (String(newval)[String(newval).length - 1] >= "0" &&
            String(newval)[String(newval).length - 1] <= "9") ||
          String(newval)[String(newval).length - 1] == "."
        ) {
          if (props.min !== undefined && Number(newval) < props.min) {
            inputData.value = props.min;
            inputData.value = Number(inputData.value).toFixed(keepFigures);
          }
          if (props.max !== undefined && Number(newval) > props.max) {
            inputData.value = props.max;
            inputData.value = Number(inputData.value).toFixed(keepFigures);
          }
          setTimeout(() => {
            executeChange();
            changeModelValue();
          }, 2);
        } else {
          inputData.value = inputData.value.substr(
            0,
            inputData.value.length - 1
          );
        }
      }
    });

    return {
      heightData,
      widthData,
      onFocus,
      onBlur,
      isFocus,
      input,
      inputData,
      onKeydown,
      onMouseenter,
      onMouseleave,
      isLeftHover,
      isRightHover,
      onMousedown,
    };
  },
});
</script>

<style scoped>
.cd-inputnumber-frame {
  display: flex;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}

.cd-inputnumber-frame-focus {
  border: 1px solid #86c1fe;
}
.cd-inputnumber-frame-disabled {
  cursor: not-allowed;
}
.cd-inputnumber-minus {
  flex: 1;
  height: 100%;
  background-color: #f5f7fa;
  text-align: center;
  line-height: v-bind(heightData + "px");
  border-right: 1px solid #dcdfe6;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.cd-inputnumber-minus-hover {
  border-right: 1px solid #86c1fe;
}
.cd-inputnumber-input {
  flex: 3;
  width: 100%;
  text-align: center;
  font-size: v-bind(heightData/2.5 + "px");
  line-height: v-bind(heightData + "px");
  border: 0;
}
.cd-inputnumber-input-disabled {
  cursor: not-allowed;
  background-color: #f5f7fa;
}
.cd-inputnumber-add {
  flex: 1;
  height: 100%;
  text-align: center;
  background-color: #f5f7fa;
  line-height: v-bind(heightData + "px");
  border-left: 1px solid #dcdfe6;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.cd-inputnumber-add-hover {
  border-left: 1px solid #86c1fe;
}
</style>