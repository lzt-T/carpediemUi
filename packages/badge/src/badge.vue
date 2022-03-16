<template>
  <div :class="{ 'cd-badge-frame': true }">
    <slot></slot>
    <div
      v-show="hidden == false && isDot != true"
      :class="{ 'cd-badge': true }"
    >
      {{ valueData }}
    </div>
    <div v-show="isDot" :class="{ 'cd-badge-dot': true }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "cd-badge",
  props: {
    value: {
      type: Number || String,
    },
    max: {
      type: Number,
      default: 99,
    },
    isDot: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: "#f06a61",
    },
  },
  setup(props, context) {
    let valueData = ref<number | string>();
    watch(
      (): number | string | undefined => {
        return props.value;
      },
      (newval: number | string | undefined, oldval) => {
        if (typeof newval == "number") {
          if (newval <= props.max) {
            valueData.value = newval;
          } else {
            valueData.value = props.max + "+";
          }
        } else {
          valueData.value = newval;
        }
      },
      { immediate: true }
    );
    return {
      valueData,
    };
  },
});
</script>

<style scoped>
.cd-badge-frame {
  position: relative;
  display: inline-block;
  background-color: aqua;
}
.cd-badge {
  position: absolute;
  display: inline-block;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  height: 18px;
  padding-left: 6px;
  padding-right: 6px;
  border-radius: 9px;
  font-size: 12px;
  color: white;
  line-height: 18px;
  background-color: v-bind(backgroundColor);
}
.cd-badge-dot {
  position: absolute;
  display: inline-block;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background-color: v-bind(backgroundColor);
}
</style>