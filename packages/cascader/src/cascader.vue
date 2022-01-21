<!--为行内块元素--->
<template>
  <div v-focus="{ isFocus }" @click.stop="setIsFocus" class="cd-cascader-frame">
    <input
      class="cd-cascader"
      :value="modelValue"
      :placeholder="placeholder"
      ref="info"
      disabled
    />
    <cd-icon
      name="downArrowTow"
      color="#dde0e7"
      :class="{
        'cd-cascader-icon': true,
        'cd-cascader-icon-down': isFocus == true,
        'cd-cascader-icon-up': isFocus == false,
      }"
      :size="sizeData / 15"
    ></cd-icon>
    <select-box
      :selectData="option"
      v-show="isFocus == true"
      @getCascaderData="getCascaderData"
      :size="sizeData"
    ></select-box>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import selectBox from "./selectBox.vue";
import focus from "./focus";
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "cd-cascader",
  components: {
    cdIcon,
    selectBox,
  },
  emits: ["update:modelValue"],
  directives: {
    focus,
  },
  props: {
    modelValue: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    size: {
      type: Number,
      default: 200,
    },
    option: {
      type: Array,
      required: true,
    },
    showAllLevels: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    let sizeData = ref();
    if (props.size <= 150) {
      sizeData.value = 150;
    } else {
      sizeData.value = props.size;
    }
    let info = ref();
    let isFocus = ref();
    //设置isFocus的值
    function setIsFocus() {
      if (typeof isFocus.value == "undefined") {
        isFocus.value = true;
      } else if (isFocus.value == true) {
        isFocus.value = false;
      } else {
        isFocus.value = true;
      }
    }
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
    window.addEventListener("click", () => {
      if (isFocus.value == true) {
        isFocus.value = false;
      }
    });
    function setInputValue(data: any) {
      context.emit("update:modelValue", data);
    }
    return {
      isFocus,
      setIsFocus,
      getCascaderData,
      info,
      sizeData,
    };
  },
});
</script>

<style scoped>
.cd-cascader-frame {
  /* 锁定字的大小避免修改font-xize带来的影响 */
  position: relative;
  font-size: v-bind(17+"px");
  display: inline-block;
  width: v-bind(size + "px");
  height: v-bind(size/6.8 + "px");
  border-radius: 5px;
  min-width: 150px;
  min-height: 22px;
  margin: 0;
  padding: 0;
}
.cd-cascader {
  position: absolute;
  top: 0;
  left: 0;
  width: v-bind(size + "px");
  height: v-bind(size/6.8 + "px");
  min-width: 150px;
  min-height: 22px;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: v-bind(sizeData/12 + "px");
  border: 1.5px solid #dde0e7;
  box-sizing: border-box;
  font-size: v-bind(sizeData/15 + "px");
  outline: none;
  background-color: white;
  color: #606266;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cd-cascader-icon {
  position: absolute;
  top: v-bind(size/13.6-size/30 + "px");
  right: 4%;
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