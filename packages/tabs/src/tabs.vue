<template>
  <div>
    <div class="cd-tabs-frame">
      <div
        v-for="(data, ind) in labelArray"
        :key="ind"
        :class="{
          'cd-tabs': true,
          'cd-tabs-select': currentTabPane == ind && border == false,
          'cd-tabs-hover': hoverData == ind,
          'cd-tabs-first': ind == 0 && border == false,
          'cd-tabs-border': border,
          'cd-tabs-border-select': border && currentTabPane == ind,
        }"
        @click="onClick(ind)"
        @mouseenter="onMouseenter(ind)"
        @mouseleave="onMouseleave"
      >
        <cd-icon
          :name="iconArray[ind]"
          :size="18"
          v-if="iconArray[ind] !== ''"
          :color="
            ind == currentTabPane || hoverData == ind ? '#409eff' : '#909399'
          "
        ></cd-icon>
        <span> {{ data }}</span>
      </div>
      <div class="cd-tabs-hr"></div>
    </div>
    <div ref="tabpaneList" :currentTabPane="currentTabPane">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, onMounted, ref, inject, provide } from "vue";
export default defineComponent({
  name: "cd-tabs",
  emits: ["update:modelValue"],
  components: {
    cdIcon,
  },
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let tabpaneList = ref<object>();
    let currentTabPane = ref<number>(0);
    let labelArray = ref<string[]>([]);
    let iconArray = ref<string[]>([]);
    provide("currentTabPane", currentTabPane);
    onMounted(() => {
      currentTabPane.value = props.modelValue;
      for (
        let i = 0;
        i < (tabpaneList.value as HTMLDivElement).children.length;
        i++
      ) {
        labelArray.value[i] = (tabpaneList.value as HTMLDivElement).children[
          i
        ].getAttribute("label") as string;
        if (
          (tabpaneList.value as HTMLDivElement).children[i].getAttribute(
            "icon"
          ) == undefined
        ) {
          iconArray.value[i] = "";
        } else {
          iconArray.value[i] = (tabpaneList.value as HTMLDivElement).children[
            i
          ].getAttribute("icon") as string;
        }
      }
    });
    function onClick(ind: number): void {
      currentTabPane.value = ind;
      context.emit("update:modelValue", ind);
    }
    let hoverData = ref<number>();
    function onMouseenter(ind: number): void {
      hoverData.value = ind;
    }
    function onMouseleave(): void {
      hoverData.value = undefined;
    }
    return {
      tabpaneList,
      currentTabPane,
      labelArray,
      onClick,
      iconArray,
      onMouseenter,
      onMouseleave,
      hoverData,
    };
  },
});
</script>

<style scoped>
.cd-tabs-frame {
  position: relative;
  display: flex;
  height: 40px;
  width: 100%;
  font-size: 19px;
  line-height: 40px;
  color: #909399;
}
.cd-tabs {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  gap: 4px;
  cursor: pointer;
}
.cd-tabs-border {
  border: 1px solid #e4e7ed;
}
.cd-tabs-border-select {
  position: relative;
  z-index: 1;
  color: #409eff;
  border-bottom: 2px solid white;
}
.cd-tabs-first {
  padding-left: 0px;
}
.cd-tabs-select {
  position: relative;
  z-index: 1;
  color: #409eff;
  border-bottom: 3px solid #409eff;
}
.cd-tabs-hover {
  position: relative;
  z-index: 1;
  color: #409eff;
}
.cd-tabs-hr {
  position: absolute;
  bottom: 0.5px;
  width: 100%;
  height: 2px;
  background-color: #e4e7ed;
}
</style>