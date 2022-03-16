<template>
  <div
    class="cd-tooltip-frame"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <div
      :class="{
        'cd-tooltip': true,
        'cd-tooltip-top': direction == 'top' && isHover,
        'cd-tooltip-bottom': direction == 'bottom' && isHover,
        'cd-tooltip-left': direction == 'left' && isHover,
        'cd-tooltip-right': direction == 'right' && isHover,
      }"
      ref="tooltip"
    >
      <div
        :class="{
          'cd-tooltip-icon': true,
          'cd-tooltip-icon-top': direction == 'top' && isHover,
          'cd-tooltip-icon-bottom': direction == 'bottom' && isHover,
          'cd-tooltip-icon-left': direction == 'left' && isHover,
          'cd-tooltip-icon-right': direction == 'right' && isHover,
        }"
      ></div>
      <div>{{ content }}</div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref, watch } from "vue";
export default defineComponent({
  name: "cd-tooltip",
  props: {
    content: {
      type: String,
    },
    backgroundColor: {
      type: String,
      default: "#2f2f31",
    },
    color: {
      type: String,
      default: "white",
    },
    direction: {
      type: String,
      default: "top",
    },
  },
  setup(props, context) {
    let tooltip = ref<object>();
    let heightData = ref<number>();
    let widthData = ref<number>();
    let isHover = ref<boolean>();
    onMounted(() => {
      heightData.value = (tooltip.value as HTMLDivElement).clientHeight;
      widthData.value = (tooltip.value as HTMLDivElement).clientWidth;
    });
    function onMouseenter(): void {
      isHover.value = true;
    }
    function onMouseleave(): void {
      isHover.value = false;
    }
    return {
      tooltip,
      heightData,
      widthData,
      onMouseenter,
      onMouseleave,
      isHover,
    };
  },
});
</script>

<style scoped>
.cd-tooltip-frame {
  position: relative;
}
.cd-tooltip {
  white-space: nowrap;
  opacity: 0;
  position: absolute;
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  line-height: 21px;
  background-color: v-bind(backgroundColor);
  color: v-bind(color);
}
.cd-tooltip-top {
  opacity: 1;
  top: v-bind(-heightData-8 + "px");
  left: 50%;
  transform: translateX(-50%);
}
.cd-tooltip-bottom {
  opacity: 1;
  bottom: v-bind(-heightData-8 + "px");
  left: 50%;
  transform: translateX(-50%);
}
.cd-tooltip-left {
  opacity: 1;
  top: 50%;
  transform: translateY(-50%);
  left: v-bind(-widthData-8 + "px");
}
.cd-tooltip-right {
  opacity: 1;
  top: 50%;
  transform: translateY(-50%);
  right: v-bind(-widthData-8 + "px");
}
.cd-tooltip-icon {
  position: absolute;
  z-index: 2;
  height: 0;
  width: 0;
  border-width: 4px;
  border-style: solid;
  border-color: v-bind(backgroundColor);
}
.cd-tooltip-icon-top {
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  bottom: -3px;
}
.cd-tooltip-icon-bottom {
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  top: -3px;
}
.cd-tooltip-icon-left {
  right: -3px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}
.cd-tooltip-icon-right {
  left: -3px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}
</style>