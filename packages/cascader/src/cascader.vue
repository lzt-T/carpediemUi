<!--为行内块元素--->
<template>
  <div
    @mousedown.prevent.stop="setIsFocus"
    :class="{
      'cd-cascader-frame': true,
      'cd-cascader-frame-hover': isFocus == false,
      'cd-cascader-frame-focus': isFocus,
    }"
  >
    <div class="cd-cascader-div">
      <input
        type="text"
        class="cd-cascader"
        :placeholder="placeholder"
        ref="info"
        :name="name"
      />
    </div>

    <cd-icon
      name="downArrowTow"
      color="#dde0e7"
      :class="{
        'cd-cascader-icon': true,
        'cd-cascader-icon-down': isFocus == true,
        'cd-cascader-icon-up': isFocus == false,
      }"
      :size="heightData / 2"
    ></cd-icon>

    <div
      :class="{
        'cd-cascader-downbox-frame': true,
      }"
      v-show="isShow"
    >
      <select-box
        :selectData="option"
        @getCascaderData="getCascaderData"
        :height="heightData"
        :width="widthData"
        :isFocus="isFocus"
      ></select-box>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import selectBox from "./selectBox.vue";
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "cd-cascader",
  components: {
    cdIcon,
    selectBox,
  },
  emits: ["update:modelValue", "change"],
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    height: {
      type: Number,
      default: 32,
    },
    width: {
      type: Number,
      default: 240,
    },
    option: {
      type: Array,
      required: true,
    },
    showAllLevels: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
    },
  },
  setup(props, context) {
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
    let info = ref();
    let isFocus = ref(false);
    let isShow = ref(false);
    //设置isFocus的值
    function setIsFocus() {
      if (isFocus.value) {
        isFocus.value = false;
        setTimeout(() => {
          isShow.value = false;
        }, 180);
      } else {
        isFocus.value = true;
        isShow.value = true;
      }
    }
    window.addEventListener("mousedown", () => {
      if (isFocus.value == true) {
        isFocus.value = false;
        setTimeout(() => {
          isShow.value = false;
        }, 180);
      }
    });
    // 获得多级选项的数据
    function getCascaderData(data: any) {
      if (props.showAllLevels == true) {
        info.value.value = data;
        setInputValue(data);
      } else {
        info.value.value = data.split("/")[data.split("/").length - 1];
        setInputValue(data.split("/")[data.split("/").length - 1]);
      }
    }
    function setInputValue(data: any) {
      context.emit("change", data);
      context.emit("update:modelValue", data);
    }
    return {
      isFocus,
      setIsFocus,
      getCascaderData,
      info,
      heightData,
      widthData,
      isShow,
    };
  },
});
</script>

<style scoped>
.cd-cascader-frame {
  position: relative;
  display: flex;
  align-items: center;
  width: v-bind(widthData + "px");
  height: v-bind(heightData + "px");
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.cd-cascader-frame-hover:hover {
  border: 1px solid #d3d6dc;
}
.cd-cascader-frame-focus {
  border: 1px solid #8ac3ff;
}
.cd-cascader-div {
  position: relative;
  flex: 99999;
  height: v-bind(heightData + "px");
  border: 0px;
}
.cd-cascader {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 0px;
  padding-left: 5px;
  font-size: v-bind(heightData/2 + "px");
  color: #606266;
  background-color: transparent;
}
.cd-cascader-icon {
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
  line-height: v-bind(heightData/2 + "px");
}
/* 上拉和下拉的动画 */
.cd-cascader-icon-down {
  transform: rotate(180deg);
  animation: down 0.3s ease-out;
}
.cd-cascader-icon-up {
  transform: rotate(0deg);
  animation: up 0.3s ease-out;
}
.cd-cascader-downbox-frame {
  position: absolute;
  z-index: 1;
  top: v-bind(heightData + 10 + "px");
  left: 10px;
}
.cd-cascader-downbox-frame::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 15px;
  border: 5px solid white;
  transform: rotate(45deg);
  box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.2),
    -5px 0 5px -5pxrgba (0, 0, 0, 0.2);
  background-color: white;
}
@keyframes down {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
@keyframes up {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>