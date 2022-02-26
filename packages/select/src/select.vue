<template>
  <div
    :class="{
      'cd-select-frame': true,
      'cd-select-frame-hover': isFocus == false,
      'cd-select-frame-focus': isFocus,
    }"
    @mousedown.prevent.stop="onMousedown"
  >
    <input
      :class="{ 'cd-select': true }"
      type="text"
      :name="name"
      :placeholder="placeholder"
    />
    <cd-icon
      :class="{ 'cd-select-Arrow': true, 'cd-select-Arrow-down': isFocus }"
      name="downArrowTow"
      :size="heightData / 2"
    ></cd-icon>

    <div :class="{ 'cd-select-downbox-frame': true }">
      <div :class="{ 'cd-select-downbox': true }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  components: {
    cdIcon,
  },
  name: "cd-select",
  emits: ["update:modelValue", "change", "clear", "blur", "focus"],
  props: {
    modelValue: {},
    name: {
      type: String,
    },
    height: {
      type: Number,
      default: 32,
    },
    width: {
      type: Number,
      default: 240,
    },
    placeholder: {
      type: String,
    },
  },
  setup(props, context) {
    function executeChange() {
      context.emit("change");
    }
    function executeClear() {
      context.emit("clear");
    }
    function executeBlur() {
      context.emit("blur");
    }
    function executeFocus() {
      context.emit("focus");
    }
    // 设置大小
    let heightData = ref();
    let widthData = ref();
    setSize();
    function setSize() {
      if (props.height >= 24) {
        heightData.value = props.height;
      } else {
        heightData.value = 24;
      }
      if (props.width >= 200) {
        widthData.value = props.width;
      } else {
        widthData.value = 200;
      }
    }
    window.addEventListener("mousedown", () => {
      if (isFocus.value == true) {
        isFocus.value = false;
      }
    });
    let isFocus = ref(false);
    function onMousedown() {
      if (isFocus.value) {
        isFocus.value = false;
      } else {
        isFocus.value = true;
      }
    }
    watch(isFocus, (newval, oldval) => {
      console.log(newval);
    });
    return {
      heightData,
      widthData,
      onMousedown,
      isFocus,
    };
  },
});
</script>

<style scoped>
.cd-select-frame {
  position: relative;
  display: flex;
  align-items: center;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.cd-select-frame-hover:hover {
  border: 1px solid #d3d6dc;
}
.cd-select-frame-focus {
  border: 1px solid #8ac3ff;
}
.cd-select {
  flex: 99999;
  z-index: 1;
  border: 0;
  padding-left: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: v-bind(heightData/2 + "px");
}
.cd-select-Arrow {
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
  line-height: v-bind(heightData/2 + "px");
}
.cd-select-Arrow-down {
  animation: down 2s linear;
}
@keyframes down {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
.cd-select-downbox-frame {
  position: absolute;
  z-index: 1;
  top: v-bind(heightData + 10 + "px");
  left: 10px;
}
.cd-select-downbox-frame::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 10px;
  border: 5px solid white;
  transform: rotate(45deg);
  box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.2),
    -5px 0 5px -5pxrgba (0, 0, 0, 0.2);
  background-color: white;
}
.cd-select-downbox {
  overflow: auto;
  height: 200px;
  width: 200px;
  background-color: white;
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
}
</style>