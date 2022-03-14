<template>
  <div class="cd-tooltip-frame">
    <div :class="{ 'cd-tooltip': true }" ref="tooltip">
      <div :class="{ 'cd-tooltip-icon': true }"></div>
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
    let tooltip = ref();
    let heightData = ref<number>();
    let widthData = ref<number>();
    interface Direction {
      top: number | undefined;
      bottom: number | undefined;
      left: number | undefined;
      right: number | undefined;
    }

    let iconDirection = reactive<Direction>({
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
    });
    let tooltipDirection = reactive<Direction>({
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
    });

    function setDirection() {
      if (props.direction == "top") {
      } else if (props.direction == "bottom") {
      } else if (props.direction == "left") {
      } else if (props.direction == "right") {
      }
    }
    onMounted(() => {
      heightData.value = tooltip.value.clientHeight;
      widthData.value = tooltip.value.clientWidth;
    });
    return {
      tooltip,
      heightData,
      widthData,
    };
  },
});
</script>

<style scoped>
.cd-tooltip-frame {
  position: relative;
}
.cd-tooltip {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  line-height: 15px;
  background-color: v-bind(backgroundColor);
  color: v-bind(color);
}
.cd-tooltip-icon {
}
</style>