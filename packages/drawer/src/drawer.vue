<template>
  <div class="cd-drawer-frame" v-show="isShow">
    <div class="cd-drawer-cover" @click="onClose"></div>
    <div
      :class="{
        'cd-drawer-div': true,
        'cd-drawer-div-top': isAnimation && direction == 'top',
        'cd-drawer-div-topVanish': isAnimation == false && direction == 'top',
      }"
    >
      <div class="cd-drawer-title-frame">
        <div class="cd-drawer-title">{{ title }}</div>
        <cd-icon
          name="delete"
          :size="16"
          :class="{
            'cd-drawerd-delete': true,
            'cd-drawerd-delete-hover': isHover,
          }"
          :color="isHover ? '#2fa5ff' : ''"
          @mouseenter="onMouseenter"
          @mouseleave="onMouseleave"
          @click="onClose"
        ></cd-icon>
      </div>
      <div class="cd-drawer-text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, inject, onMounted, ref, watch } from "vue";
export default defineComponent({
  name: "cd-drawer",
  emits: ["update:modelValue", "open", "close"],
  components: {
    cdIcon,
  },
  props: {
    modelValue: {
      type: Boolean,
      requied: true,
    },
    direction: {
      type: String,
      default: "right",
    },
    size: {
      type: Number,
      default: 50,
    },
    title: {
      type: String,
    },
  },
  setup(props, context) {
    let heightData = ref<number>();
    let widthData = ref<number>();
    let topData = ref<number>();
    let bottomData = ref<number>();
    let leftData = ref<number>();
    let rightData = ref<number>();
    setSize();
    function setSize() {
      if (props.direction == "top") {
        widthData.value = 100;
        heightData.value = props.size;
        topData.value = 0;
        leftData.value = 0;
      } else if (props.direction == "bottom") {
        widthData.value = 100;
        heightData.value = props.size;
        bottomData.value = 0;
        leftData.value = 0;
      } else if (props.direction == "left") {
        widthData.value = props.size;
        heightData.value = 100;
        leftData.value = 0;
        topData.value = 0;
      } else if (props.direction == "right") {
        widthData.value = props.size;
        heightData.value = 100;
        rightData.value = 0;
        topData.value = 0;
      }
    }
    let isHover = ref<boolean>(false);
    function onMouseenter() {
      isHover.value = true;
    }
    function onMouseleave() {
      isHover.value = false;
    }
    let isShow = ref<boolean>();
    let isAnimation = ref<boolean>();
    watch(
      () => {
        return props.modelValue;
      },
      (newval: boolean, oldval: boolean | undefined) => {
        if (newval) {
          isAnimation.value = true;
          isShow.value = newval;
        } else {
          isAnimation.value = false;
          setTimeout(() => {
            isShow.value = false;
          }, 180);
        }
      },
      {
        immediate: true,
      }
    );
    function onClose() {
      context.emit("update:modelValue", false);
    }
    return {
      heightData,
      widthData,
      topData,
      bottomData,
      leftData,
      rightData,
      isHover,
      onMouseenter,
      onMouseleave,
      onClose,
      isShow,
      isAnimation,
    };
  },
});
</script>

<style scoped>
.cd-drawer-frame {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  font-size: 16px;
  line-height: 24px;
}
.cd-drawer-cover {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  opacity: 0.5;
}
.cd-drawer-div {
  position: absolute;
  top: v-bind(topData + "px");
  bottom: v-bind(bottomData + "px");
  left: v-bind(leftData + "px");
  right: v-bind(rightData + "px");
  height: v-bind(heightData + "vh");
  width: v-bind(widthData + "vw");
  padding: 20px;
  background-color: white;
}
.cd-drawer-title-frame {
  display: flex;
}
.cd-drawer-title {
  flex: 99999;
  font-size: 20px;
}
.cd-drawerd-delete {
  flex: 1;
  margin-right: 10px;
}
.cd-drawerd-delete-hover {
  cursor: pointer;
}
.cd-drawer-text {
  margin-top: 20px;
  overflow: auto;
  height: 100%;
  padding-bottom: 20px;
}
.cd-drawer-text::-webkit-scrollbar {
  width: 6px;
}
/* 滑块 */
.cd-drawer-text:hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
/* 滚动槽 */
.cd-drawer-text::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 滚动条滑块 */
.cd-drawer-text::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: transparent;
}
.cd-drawer-div-top {
  animation: top 0.2s linear;
}
.cd-drawer-div-topVanish {
  animation: topVanish 0.2s linear;
}
@keyframes top {
  0% {
    top: v-bind(-heightData + "vh");
  }
  100% {
    top: 0;
  }
}
@keyframes topVanish {
  0% {
    top: 0;
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: v-bind(-heightData + "vh");
  }
}
</style>