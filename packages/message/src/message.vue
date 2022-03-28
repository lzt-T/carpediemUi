<template>
  <div
    :class="{
      'cd-message-frame': true,
      'cd-message-frame-show': modelValue,
      'cd-message-frame-notshow': modelValue == false,
    }"
    v-show="isShow"
  >
    <cd-alert
      v-model="modelValue"
      :title="message"
      :showIcon="true"
      :type="type"
      :closable="false"
      :center="center"
    ></cd-alert>
    <cd-icon
      v-if="closabled"
      name="delete"
      :size="14"
      class="cd-alter-icon"
      @click="onClose"
    ></cd-icon>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import cdAlert from "../../alert/src/alert.vue";
import { defineComponent, inject, onMounted, ref, watch } from "vue";
export default defineComponent({
  name: "cd-message",
  emits: ["update:modelValue", "close"],
  components: {
    cdIcon,
    cdAlert,
  },
  props: {
    modelValue: {
      type: Boolean,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "info",
    },
    offset: {
      type: Number,
      default: 20,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    closabled: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let isShow = ref<boolean>();
    let time = ref<number>();
    let timekeeping: any = null;
    if (props.duration >= 500) {
      time.value = props.duration;
    } else {
      time.value = 500;
    }
    watch(
      () => {
        return props.modelValue;
      },
      (newval, oldval): void => {
        if (newval) {
          isShow.value = true;
          timekeeping = setTimeout(() => {
            context.emit("update:modelValue", false);
          }, time.value);
          console.log(typeof timekeeping);
        } else {
          window.clearTimeout(timekeeping);
          timekeeping = null;
          context.emit("close");
          setTimeout(() => {
            isShow.value = false;
          }, 80);
        }
      },
      { immediate: true }
    );
    function onClose(): void {
      context.emit("update:modelValue", false);
      window.clearTimeout(timekeeping);
    }
    return {
      isShow,
      onClose,
    };
  },
});
</script>

<style scoped>
.cd-message-frame {
  position: fixed;
  top: v-bind(offset + "px");
  left: 50%;
  transform: translateX(-50%);
  width: 380px;
}
.cd-message-frame-show {
  animation: show 0.1s linear;
}
.cd-message-frame-notshow {
  animation: notshow 0.1s linear;
}
@keyframes show {
  0% {
    opacity: 0;
    top: 0;
  }
  100% {
    opacity: 1;
    top: v-bind(offset + "px");
  }
}
@keyframes notshow {
  0% {
    opacity: 1;
    top: v-bind(offset + "px");
  }
  100% {
    opacity: 0;
    top: 0;
  }
}
.cd-alter-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  right: 10px;
  line-height: 14px;
}
</style>