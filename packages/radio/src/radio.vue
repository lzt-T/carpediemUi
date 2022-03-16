<template>
  <div
    :class="{
      'cd-radio-frame': true,
      'cd-radio-frame-border': border,
      'cd-radio-frame-select': isChecked && border && disabled == false,
      'cd-radio-frame-disable': disabled,
    }"
  >
    <input
      :class="{
        'cd-radio': true,
        'cd-radio-select': isChecked && disabled == false,
        'cd-radio-hover': isHoverRadio && disabled == false,
        'cd-radio-disabled': disabled,
      }"
      type="radio"
      :name="name"
      :value="label"
      :checked="isChecked"
      @change="onChange"
      @mouseover="onMouseover"
      @mouseout="onMouseout"
      :disabled="disabled"
    />
    <div
      :class="{
        'cd-radio-word': true,
        'cd-radio-word-select': isChecked && disabled == false,
        'cd-radio-word-disabled': disabled,
      }"
      @click="changeSelect"
    >
      <slot> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  name: "cd-radio",
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {},
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 32,
    },
    width: {
      type: Number,
      default: 110,
    },
    disabled: {
      type: Boolean,
      defalut: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    //   设置大小
    let heightData = ref<number>(0);
    let widthData = ref<number>(0);
    setSize();
    function setSize(): void {
      if (props.height >= 24) {
        heightData.value = props.height;
      } else {
        heightData.value = 24;
      }
      if (props.width >= 90) {
        widthData.value = props.width;
      } else {
        widthData.value = 90;
      }
    }
    // 是否选择
    let isChecked = ref<boolean>(false);
    function checkSelect(): void {
      if (props.label == props.modelValue) {
        isChecked.value = true;
      } else {
        isChecked.value = false;
      }
    }
    // 当选择的情况发生变化时
    function onChange(): void {
      context.emit("change", props.label);
      changeModelValue();
    }
    // 改变绑定的值
    function changeModelValue(): void {
      context.emit("update:modelValue", props.label);
    }
    // 设置单选框的大小
    let zoomData = ref<number>();
    setZoom();
    function setZoom(): void {
      zoomData.value = Math.floor((heightData.value / 2.1 / 14) * 100);
    }
    // 当点击单选框的字时
    function changeSelect(): void {
      if (props.disabled) {
        return;
      }
      onChange();
    }
    // 鼠标是否经单选框
    let isHoverRadio = ref<boolean>(false);
    function onMouseover(): void {
      isHoverRadio.value = true;
    }
    function onMouseout(): void {
      isHoverRadio.value = false;
    }
    watch(
      () => {
        return props.modelValue;
      },
      (newval, oldval) => {
        checkSelect();
      },
      { immediate: true }
    );

    return {
      heightData,
      widthData,
      isChecked,
      onChange,
      zoomData,
      changeSelect,
      onMouseover,
      onMouseout,
      isHoverRadio,
    };
  },
});
</script>

<style scoped>
.cd-radio-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  font-size: v-bind(heightData/2 + "px");
  border-radius: 3px;
  cursor: pointer;
}
.cd-radio-frame-select {
  border: 1px solid #a4d1ff !important;
}
.cd-radio-frame-border {
  border: 1px solid #f2f3f6;
}
.cd-radio-frame-disable {
  cursor: not-allowed;
}
.cd-radio {
  zoom: v-bind(zoomData + "%");
}
.cd-radio-hover {
  position: relative;
  cursor: pointer;
}
.cd-radio-hover::before {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  height: 98%;
  width: 98%;
  border-radius: 50%;
  border: 1px solid #208eff;
}
.cd-radio-select {
  position: relative;
}
.cd-radio-select::before {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #208eff;
  border: 0.1px solid #208eff;
}
.cd-radio-select::after {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: "";
  height: 30%;
  width: 30%;
  border-radius: 50%;
  background-color: white;
  border: 2px solid white;
}
.cd-radio-disabled {
  cursor: not-allowed;
}
.cd-radio-word {
  padding-left: 8px;
  height: v-bind(heightData + "px");
  line-height: v-bind(heightData + "px");
}
.cd-radio-word-select {
  color: #74acff;
}
.cd-radio-word-disabled {
  color: #d6d6da;
}
</style>