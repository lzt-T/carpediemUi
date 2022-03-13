<template>
  <div
    :class="{ 'cd-alter-frame': true, 'cd-alter-frame-notshow': isAnimation }"
    v-if="isShow"
  >
    <cd-icon
      v-if="showIcon"
      :name="iconName"
      :color="iconColor"
      :size="14"
      class="cd-alter-icon"
    ></cd-icon>
    <div>
      <div>{{ title }}</div>
      <div class="cd-alter-text">{{ description }}</div>
    </div>

    <cd-icon
      v-if="closable"
      name="delete"
      :color="iconColor"
      :size="14"
      class="cd-alter-icon cd-alter-delete-icon"
      @click="onClose"
    ></cd-icon>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, inject, onMounted, ref, watch } from "vue";
export default defineComponent({
  name: "cd-alter",
  components: {
    cdIcon,
  },
  emits: ["close"],
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "info",
    },
    description: {
      type: String,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    center: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      defalut: false,
    },
  },
  setup(props, context) {
    let backgroundColor = ref<string>();
    let colorData = ref<string>();
    let iconName = ref<string>();
    let iconColor = ref<string>();
    setBackgroundColor();
    function setBackgroundColor() {
      if (props.type == "success") {
        backgroundColor.value = "#eef9eb";
        colorData.value = "#67C23A";
        iconName.value = "success";
        iconColor.value = "#5abc35";
      } else if (props.type == "info") {
        backgroundColor.value = "#f4f4f4";
        colorData.value = "#909399";
        iconName.value = "info";
        iconColor.value = "#91969a";
      } else if (props.type == "warning") {
        backgroundColor.value = "#fdf6ec";
        colorData.value = "#E6A23C";
        iconName.value = "warning";
        iconColor.value = "#eca33a";
      } else if (props.type == "error") {
        backgroundColor.value = "#ffeff0";
        colorData.value = "#F56C6C";
        iconName.value = "error";
        iconColor.value = "#ff646a";
      }
    }
    let isShow = ref<boolean>(true);
    let isAnimation = ref<boolean>(false);
    function onClose() {
      isAnimation.value = true;
      context.emit("close");
      setTimeout(() => {
        isShow.value = false;
      }, 180);
    }
    return {
      backgroundColor,
      colorData,
      iconName,
      iconColor,
      onClose,
      isShow,
      isAnimation,
    };
  },
});
</script>

<style scoped>
.cd-alter-frame {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: v-bind("center?'center':''");
  gap: 8px;
  background-color: v-bind(backgroundColor);
  color: v-bind(colorData);
  width: 100%;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 23px;
}
.cd-alter-icon {
  line-height: 14px;
}
.cd-alter-delete-icon {
  position: absolute;
  right: 16px;
  cursor: pointer;
}
.cd-alter-text {
  font-size: 12px;
}
.cd-alter-frame-notshow {
  animation: del 0.2s linear;
}
@keyframes del {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>