<template>
  <div class="cd-col">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "cd-col",
  props: {
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    let widthData;
    let marginLeftData;
    widthData = (props.span / 24) * 100;
    marginLeftData = (props.offset / 24) * 100;
    return {
      widthData,
      marginLeftData,
    };
  },
});
</script>

<style scoped>
.cd-col {
  margin-left: v-bind(marginLeftData + "%");
  width: v-bind(widthData + "%");
}
</style>