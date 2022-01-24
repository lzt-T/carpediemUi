<template>
  <span
    :class="{
      'cd-checkbox-frame': true,
      'cd-checkbox-frame-border': border == true,
      'cd-checkbox-frame-border-select':
        checkData && border == true && disabled == false,
    }"
  >
    <input
      :class="{
        'cd-checkbox cd': true,
        'cd-checkbox-background-color': disabled,
      }"
      type="checkbox"
      v-model="checkData"
      :disabled="disabled"
    />
    <span
      :class="{ 'cd-checkbox-context': true }"
      @click="setCheckData"
      @selectstart="onSelectstart($event)"
    >
      {{ label }}<slot></slot>
    </span>
  </span>
</template>

<script lang="ts">
// 只能单个使用，要多个配合使用时要使用el-checkbox-group组件
import { computed, ref, watch } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "cd-checkbox",
  emits: ["update:modelValue", "onChange"],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 30,
    },
    label: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    //   设置大小
    let sizeData = ref();
    if (props.size <= 30) {
      sizeData.value = 30;
    } else {
      sizeData.value = props.size;
    }
    // 选中还是没有选中
    let checkData = ref();
    checkData.value = props.modelValue;
    // 设置图标的颜色
    let selectIconColor = ref();
    setSelectIconColor();
    function setSelectIconColor() {
      if (props.disabled) {
        selectIconColor.value = "#cdd2d8";
      } else {
        selectIconColor.value = "white";
      }
    }
    // 设置图标的背景颜色
    let selectIconBackground = ref();
    setSelectIconBackground();
    function setSelectIconBackground() {
      if (props.disabled) {
        selectIconBackground.value = "#edf2fc";
      } else {
        selectIconBackground.value = "#409eff";
      }
    }
    // 设置字体内容的颜色
    let contextColor = ref("");
    setContextColor();
    function setContextColor() {
      if (checkData.value == true) {
        contextColor.value = "#409eff";
      } else {
        contextColor.value = "black";
      }
      if (props.disabled) {
        contextColor.value = "#C0C4CC";
      }
    }
    // 设置选中还是不选中(点击字的时候)
    function setCheckData() {
      if (props.disabled == false) {
        checkData.value = !checkData.value;
        setContextColor();
      }
    }
    function onChange(data: any) {
      context.emit("onChange", data);
    }
    // 防止双击选中
    function onSelectstart(event: any) {
      event.preventDefault();
    }
    function setModelValue(data: any) {
      context.emit("update:modelValue", data);
    }

    //点击框的时候
    watch(
      checkData,
      (newval, oldval) => {
        setModelValue(newval);
        setContextColor();
        onChange({ value: checkData.value, index: props.index });
      },
      { immediate: true }
    );
    return {
      checkData,
      setCheckData,
      onSelectstart,
      contextColor,
      sizeData,
      selectIconBackground,
      selectIconColor,
    };
  },
});
</script>

<style scoped>
.cd-checkbox-frame {
  box-sizing: border-box;
  display: inline-block;
  padding: v-bind(sizeData/10 + "px");
  cursor: pointer;
}
.cd-checkbox-frame-border {
  border: 1px solid #c0c4cc;
  border-radius: 2px;
}
.cd-checkbox-frame-border-select {
  border: 1px solid #409eff;
  border-radius: 2px;
}
.cd-checkbox {
  -webkit-appearance: none;
  box-sizing: border-box;
  height: v-bind(sizeData/2.7 + "px");
  width: v-bind(sizeData/2.7 + "px");
  border: 1px solid #c0c4cc;
  border-radius: 2px;
  vertical-align: middle;
  padding: 0;
}
.cd-checkbox-background-color {
  background-color: #edf2fc;
}
.cd-checkbox:checked::before {
  -webkit-appearance: none;
  box-sizing: border-box;
  position: absolute;
  content: "\e657";
  background-color: v-bind(selectIconBackground);
  border-radius: 2px;
  height: v-bind(sizeData/2.7 + "px");
  width: v-bind(sizeData/2.7 + "px");
  line-height: v-bind(sizeData/2.7 + "px");
  text-align: center;
  font-size: v-bind(sizeData/2.7 + "px");
  color: v-bind(selectIconColor);
}
.cd-checkbox-context {
  padding-left: 2px;
  font-size: v-bind(sizeData/2.5 + "px");
  line-height: v-bind(sizeData/2.5 + "px");
  color: v-bind(contextColor);
}
</style>