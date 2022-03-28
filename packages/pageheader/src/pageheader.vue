<template>
  <div class="cd-pageheader-frame" ref="pageHeaderFrame">
    <cd-icon
      :name="icon"
      :size="pageheaderHeight / 1.2"
      @click="onBack"
    ></cd-icon>
    <div @click="onBack">
      <span v-if="isTitleSlot == false">{{ title }}</span>
      <div v-if="isTitleSlot" ref="titleSlot" class="cd-page-title-slot">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="cd-pageheader-separate">|</div>
    <div>
      <span v-if="isContentSlot == false">{{ content }}</span>
      <div v-if="isContentSlot" ref="contentSlot">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "cd-pageheader",
  components: {
    cdIcon,
  },
  emits: ["back"],
  props: {
    icon: {
      type: String,
      default: "leftArrow",
    },
    title: {
      type: String,
      default: "Back",
    },
    content: {
      type: String,
    },
  },
  setup(props, context) {
    let pageHeaderFrame = ref<object>();
    let titleSlot = ref<object>();
    let contentSlot = ref<object>();
    let pageheaderHeight = ref<number>();
    let isTitleSlot = ref<boolean>(true);
    let isContentSlot = ref<boolean>(true);
    onMounted(() => {
      pageheaderHeight.value = (
        pageHeaderFrame.value as HTMLDivElement
      ).clientHeight;
      if ((titleSlot.value as HTMLDivElement).clientHeight == 0) {
        isTitleSlot.value = false;
      } else {
        isTitleSlot.value = true;
      }
      if ((contentSlot.value as HTMLDivElement).clientHeight == 0) {
        isContentSlot.value = false;
      } else {
        isContentSlot.value = true;
      }
    });
    function onBack(): void {
      context.emit("back");
    }
    return {
      pageHeaderFrame,
      pageheaderHeight,
      titleSlot,
      contentSlot,
      onBack,
      isTitleSlot,
      isContentSlot,
    };
  },
});
</script>

<style scoped>
.cd-pageheader-frame {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 100%;
  width: 100%;
  font-size: v-bind(pageheaderHeight/1.6 + "px");
  line-height: v-bind(pageheaderHeight + "px");
  background-color: white;
}
.cd-pageheader-separate {
  width: 30px;
  color: #d8d7d8;
  text-align: center;
}
.cd-page-title-slot {
  display: inline-block;
}
</style>