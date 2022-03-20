<template>
  <div
    :class="{ 'cd-scrollbar': true, 'cd-scrollbar-native': !native }"
    @scroll="scroll"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
// 高度可以自己设定，没有设定就随父亲，宽度随父亲
//使用原生的滚动条没有办法控制always属性
// 当元素宽度大于滚动条宽度时，会显示横向滚动条。
//当元素高度超过最大高度，才会显示滚动条。
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "cd-scrollbar",
  emits: ["scroll"],
  props: {
    //滚动的高度，要带单位
    height: {
      type: String,
      default: "100%",
    },
    // 是否使用原生的滚动条
    native: {
      type: Boolean,
      default: false,
    },
    //滚动条是否一直显示
    always: {
      type: Boolean,
      default: false,
    },
    //设定最大的高度 要带单位
    maxHeight: {
      type: String,
    },
    crosswise: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    //滚动时触发的事件
    function scroll(): void {
      context.emit("scroll");
    }
    return {
      scroll,
    };
  },
});
</script>

<style scoped>
.cd-scrollbar {
  white-space: v-bind("crosswise?'nowrap':''");
  overflow-x: auto;
  height: v-bind(height);
  max-height: v-bind(maxHeight);
}
.cd-scrollbar-native::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
/* 滑块 */
.cd-scrollbar-native:hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
/* 滚动槽 */
.cd-scrollbar-native::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 滚动条滑块 */
.cd-scrollbar-native::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: v-bind("always==false?'transparent':'rgba(0, 0, 0, 0.2)'");
}
</style>