<template>
  <span
    :class="{
      'cd-checkbox-frame': true,
      'cd-checkbox-frame-border': border == true,
      'cd-checkbox-frame-border-select':
        checkData && border == true && disabled == false,
    }"
  >
    <div class="cd-checkbox-flexframe">
      <input
        :class="{
          'cd-checkbox cd': true,
          'cd-checkbox-background-color': disabled,
        }"
        type="checkbox"
        v-model="checkData"
        :disabled="disabled"
        :name="name"
        :value="value"
      />
      <span
        :class="{ 'cd-checkbox-context': true }"
        @click="setCheckData"
        @selectstart="onSelectstart($event)"
      >
        {{ label }}<slot></slot>
      </span>
    </div>
  </span>
</template>

<script lang="ts">
// 只能单个使用，要多个配合使用时要使用el-checkbox-group组件
import { ref, watch } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "cd-checkbox",
  emits: ["update:modelValue", "onChange"],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 50,
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
    name: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  setup(props, context) {
    //   设置大小
    let sizeData = ref<number>();
    if (props.size <= 40) {
      sizeData.value = 40;
    } else {
      sizeData.value = props.size;
    }

    // 选中还是没有选中
    let checkData = ref<boolean>(false);
    checkData.value = props.modelValue;
    // 设置图标的颜色
    let selectIconColor = ref<string>();
    function setSelectIconColor(): void {
      if (props.disabled) {
        selectIconColor.value = "#cdd2d8";
      } else {
        selectIconColor.value = "white";
      }
    }
    // 设置图标的背景颜色
    let selectIconBackground = ref<string>();
    function setSelectIconBackground(): void {
      if (props.disabled) {
        selectIconBackground.value = "#edf2fc";
      } else {
        selectIconBackground.value = "#409eff";
      }
    }
    // 设置字体内容的颜色
    let contextColor = ref<string>("");
    function setContextColor(): void {
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
    function setCheckData(): void {
      if (props.disabled == false) {
        checkData.value = !checkData.value;
        setContextColor();
      }
    }
    function onChange(data: boolean): void {
      context.emit("onChange", data);
    }
    // 防止双击选中
    function onSelectstart(event: Event): void {
      event.preventDefault();
    }
    function setModelValue(data: boolean): void {
      context.emit("update:modelValue", data);
    }

    watch(
      () => {
        return props.disabled;
      },
      (): void => {
        setSelectIconColor();
        setSelectIconBackground();
        setContextColor();
      },
      { immediate: true }
    );
    //点击框的时候
    watch(
      checkData,
      (newval: boolean, oldval): void => {
        setModelValue(newval);
        setContextColor();
        onChange(checkData.value);
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
  font-size: v-bind(sizeData/3 + "px");
  line-height: v-bind(sizeData / 1.5+ "px");
  display: inline-block;
  cursor: v-bind("disabled==true?'not-allowed':'pointer'");
  padding-left: 8px;
  padding-right: 8px;
}
.cd-checkbox-frame-border {
  border: 1px solid #c0c4cc;
  border-radius: 2px;
}
.cd-checkbox-frame-border-select {
  border: 1px solid #409eff;
  border-radius: 2px;
}
.cd-checkbox-flexframe {
  display: flex;
  align-items: center;
}
.cd-checkbox {
  position: relative;
  -webkit-appearance: none;
  height: v-bind(sizeData/3 + "px");
  width: v-bind(sizeData/3 + "px");
  border: 1px solid #c0c4cc;
  border-radius: 2px;
  cursor: v-bind("disabled==true?'not-allowed':'pointer'");
}
.cd-checkbox-background-color {
  background-color: #edf2fc;
}
.cd-checkbox:checked::before {
  cursor: v-bind("disabled==true?'not-allowed':'pointer'");
  -webkit-appearance: none;
  position: absolute;
  top: -1px;
  left: -1px;
  content: "\e657";
  background-color: v-bind(selectIconBackground);
  border-radius: 2px;
  height: v-bind(sizeData/3 + "px");
  width: v-bind(sizeData/3 + "px");
  line-height: v-bind(sizeData/3 + "px");
  color: v-bind(selectIconColor);
}
.cd-checkbox-context {
  padding-left: 3px;
  vertical-align: top;
  color: v-bind(contextColor);
}
</style>