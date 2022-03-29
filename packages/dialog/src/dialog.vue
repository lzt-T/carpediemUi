<template>
  <div class="cd-dialog-frame" v-show="modelValue" @mousewheel.prevent>
    <div class="cd-dialog-cover" @click="onClose"></div>
    <div :class="{ 'cd-dialog-div': true }">
      <div class="cd-dialog-title-frame">
        <div class="cd-dialog-title">{{ title }}</div>
        <cd-icon
          name="delete"
          :class="{
            'cd-dialog-delete': true,
            'cd-dialog-delete-hover': isHover,
          }"
          :size="14"
          :color="isHover ? '#2fa5ff' : ''"
          @mouseenter="onMouseenter"
          @mouseleave="onMouseleave"
          @click="onClose"
        ></cd-icon>
      </div>
      <div class="cd-dialog-text-div">
        <div v-if="isTextSlot" class="cd-dialog-text">{{ text }}</div>
        <div class="cd-dislog-text-slot" ref="textSlot">
          <slot name="text"></slot>
        </div>
      </div>
      <div class="cd-dialog-footer-div">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, inject, onMounted, ref, watch } from "vue";
export default defineComponent({
  name: "cd-dialog",
  emits: ["update:modelValue", "open", "close"],
  components: {
    cdIcon,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    width: {
      type: Number,
      default: 50,
    },
    top: {
      type: Number,
      default: 15,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    center: {
      type: Boolean,
      defalut: false,
    },
  },
  setup(props, context) {
    let isTextSlot = ref<boolean>(true);
    let textSlot = ref<object>();
    onMounted(() => {
      if ((textSlot.value as HTMLDivElement).clientHeight > 0) {
        isTextSlot.value = false;
      }
    });
    watch(
      () => {
        return props.modelValue;
      },
      (newval: boolean, oldval): void => {
        if (newval) {
          context.emit("open");
        } else {
          context.emit("close");
        }
      }
    );
    // 关闭键的hover
    let isHover = ref<boolean>(false);
    function onMouseenter(): void {
      isHover.value = true;
    }
    function onMouseleave(): void {
      isHover.value = false;
    }
    function onClose(): void {
      context.emit("update:modelValue", false);
    }
    return {
      textSlot,
      isTextSlot,
      onMouseenter,
      onMouseleave,
      isHover,
      onClose,
    };
  },
});
</script>

<style scoped>
.cd-dialog-frame {
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
.cd-dialog-cover {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
}
.cd-dialog-div {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: v-bind(width + "vw");
  top: v-bind(top + "vh");
  background-color: white;
  border-radius: 5px;
  padding: 20px;
}
.cd-dialog-title-frame {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 20px;
  line-height: 34px;
  height: 34px;
}
.cd-dialog-title {
  text-align: v-bind("center?'center':''");
  flex: 99999;
}
.cd-dialog-delete {
  flex: 1;
  line-height: 14px;
}
.cd-dialog-delete-hover {
  cursor: pointer;
}
.cd-dialog-text-div {
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
}
.cd-dialog-text {
  font-size: 15px;
  line-height: 24px;
  text-align: v-bind("center?'center':''");
}
.cd-dislog-text-slot {
  text-align: v-bind("center?'center':''");
}
.cd-dialog-footer-div {
  position: relative;
  text-align: v-bind("center?'center':''");
}
</style>