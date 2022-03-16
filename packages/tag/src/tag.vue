<template>
  <div class="cd-tag-frmme" @click="onClick" v-if="isShow">
    <div class="cd-tag-slot">
      <slot></slot>
    </div>
    <div
      :class="{ 'cd-tag-del-frame': true, 'cd-tag-del-frame-hover': isHover }"
      @click.stop="onClose"
    >
      <cd-icon
        name="delete"
        :size="heightData / 2.3"
        :color="isHover ? 'white' : color"
        :class="{ 'cd-tag-del': true }"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
      ></cd-icon>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, onMounted, ref, watch, watchEffect } from "vue";
export default defineComponent({
  name: "cd-tag",
  components: {
    cdIcon,
  },
  emits: ["close", "click"],
  props: {
    height: {
      type: Number,
      default: 24,
    },
    width: {
      type: Number,
      default: 60,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "white",
    },
    backgroundColor: {
      type: String,
      default: "white",
    },
  },
  setup(props, context) {
    //   设置大小
    let heightData = ref<number>();
    let widthData = ref<number>();
    setSize();
    function setSize(): void {
      if (props.height >= 20) {
        heightData.value = props.height;
      } else {
        heightData.value = 20;
      }
      if (props.width >= 50) {
        widthData.value = props.width;
      } else {
        widthData.value = 50;
      }
    }
    //
    let isShow = ref<boolean>(true);
    let isHover = ref<boolean>();
    function onMouseenter(): void {
      isHover.value = true;
    }
    function onMouseleave(): void {
      isHover.value = false;
    }
    function onClose(): void {
      isShow.value = false;
      context.emit("close");
    }
    function onClick(): void {
      context.emit("click");
    }
    return {
      heightData,
      widthData,
      onMouseenter,
      onMouseleave,
      isHover,
      onClose,
      onClick,
      isShow,
    };
  },
});
</script>

<style scoped>
.cd-tag-frmme {
  display: flex;
  justify-content: center;
  align-items: center;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  font-size: v-bind(heightData/2 + "px");
  line-height: v-bind(heightData + "px");
  border: 1px solid #ededed;
  border-radius: 5px;
  color: v-bind(color);
  background-color: v-bind(backgroundColor);
  background-color: v-bind(backgroundColor);
}
.cd-tag-slot {
  flex: 99;
  text-align: center;
  margin-right: 3px;
  margin-left: 5px;
}
.cd-tag-del-frame {
  flex: 1;
  margin-right: 5px;
  position: relative;
  height: v-bind(heightData/2 + "px");
  width: v-bind(heightData/2 + "px");
  line-height: v-bind(heightData/2.3 + "px");
  border-radius: 50%;
}
.cd-tag-del-frame-hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
