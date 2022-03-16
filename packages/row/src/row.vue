<template>
  <div class="cd-row">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "cd-row",
  //占父亲的几份（当父亲有宽度时），没有宽度时就是屏幕大小
  props: {
    //主轴的方向
    flexDirection: {
      type: String,
      default: "row",
    },
    //一行元素之间的距离单位为PX
    gap: {
      type: Number,
      default: 0,
    },
    //主轴上的排列方式
    justify: {
      type: String,
      default: "flex-start",
    },
    //侧轴上的排列方式
    align: {
      type: String,
      default: "flex-start",
    },
    //文字默认居中排列
    textAlign: {
      type: String,
      default: "center",
    },
  },
  setup(props) {
    //主轴上的排列方式
    let justifyData = ref<string>();
    if (props.justify == "start") {
      justifyData.value = "flex-start";
    } else if (props.justify == "end") {
      justifyData.value = "flex-end";
    } else {
      justifyData.value = props.justify;
    }
    //侧轴上的排列方式
    let alignData = ref<string>();
    if (props.align == "start") {
      alignData.value = "flex-start";
    } else if (props.align == "end") {
      alignData.value = "flex-end";
    } else {
      alignData.value = props.align;
    }
    return {
      justifyData,
      alignData,
    };
  },
});
</script>

<style scoped>
.cd-row {
  display: flex;
  flex-direction: v-bind(flexDirection);
  justify-content: v-bind(justifyData);
  align-items: v-bind(alignData);
  gap: v-bind(gap + "px");
  word-break: break-all;
  box-sizing: border-box;
  text-align: v-bind(textAlign);
}
</style>