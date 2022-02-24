<template>
  <div :class="{ 'cd-radio-frame': true }">
    <input
      type="radio"
      :name="name"
      :value="label"
      :checked="isChecked"
      @change="onChange"
    />
    <slot class="cd-radio-word"> </slot>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  name: "cd-radio",
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    name: {
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
    broder: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    //   设置大小
    let heightData = ref();
    let widthData = ref();
    setSize();
    function setSize() {
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
    let isChecked = ref(false);
    function checkSelect() {
      if (props.label == props.modelValue) {
        isChecked.value = true;
      } else {
        isChecked.value = false;
      }
    }
    // 当选择的情况发生变化时
    function onChange() {
      changeModelValue();
    }
    // 改变绑定的值
    function changeModelValue() {
      context.emit("update:modelValue", props.label);
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
    };
  },
});
</script>

<style scoped>
.cd-radio-frame {
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  line-height: v-bind(heightData + "px");
  font-size: v-bind(heightData + "px");
  background-color: aqua;
  color: red;
}
</style>