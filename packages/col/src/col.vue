<template>
  <div class="cd-col">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "cd-col",
  props: {
    //元素站一行的几格默认为24格
    span: {
      type: Number,
      default: 24,
    },
    //左侧的距离几格
    offset: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    let widthData = ref<number>();
    let marginLeftData = ref<number>();
    widthData.value = (props.span / 24) * 100;
    marginLeftData.value = (props.offset / 24) * 100;
    return {
      widthData,
      marginLeftData,
    };
  },
});
</script>

<style scoped>
.cd-col {
  box-sizing: border-box;
  margin-left: v-bind(marginLeftData + "%");
  width: v-bind(widthData + "%");
}
</style>