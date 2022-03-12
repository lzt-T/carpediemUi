<template>
  <div
    :label="label"
    :icon="icon"
    ref="tabpane"
    v-show="parentCurrentInd == currentInd"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, inject, onMounted, ref, watch } from "vue";
export default defineComponent({
  name: "cd-tab-pane",
  components: {
    cdIcon,
  },
  props: {
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  setup(props, context) {
    let tabpane = ref();
    let parentCurrentInd: any = ref();
    let currentInd = ref<number>();
    function initCurrentInd() {
      let node = tabpane.value;
      let ind = 0;
      while (true) {
        if (node.previousElementSibling == null) {
          break;
        }
        node = node.previousElementSibling;
        ind++;
      }
      return ind;
    }
    parentCurrentInd = inject("currentTabPane");
    onMounted(() => {
      currentInd.value = initCurrentInd();
    });

    return {
      tabpane,
      parentCurrentInd,
      currentInd,
    };
  },
});
</script>

<style scoped>
</style>