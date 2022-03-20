<template>
  <div
    :class="{
      'cd-select-frame': true,
      'cd-select-frame-hover': isFocus == false,
      'cd-select-frame-focus': isFocus,
      'cd-select-frame-disabled': disabled,
    }"
    @mousedown.prevent.stop="onMousedown($event)"
  >
    <div class="cd-slect-div">
      <input
        :class="{ 'cd-select': true, 'cd-select-frame-disabled': disabled }"
        type="text"
        :name="name"
        :placeholder="placeholderData"
        ref="select"
        :disabled="disabled"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>

    <cd-icon
      :class="{
        'cd-select-Arrow': true,
        'cd-select-Arrow-down': isFocus,
        'cd-select-Arrow-up': isFocus == false,
      }"
      :name="isClearShow ? 'delete' : 'downArrowTow'"
      :size="heightData / 2"
      @mousedown.prevent="clearSelectData($event)"
      @mouseover="setClear(1)"
      @mouseout="setClear(0)"
    ></cd-icon>
    <div v-show="isShow" :class="{ 'cd-select-downbox-frame': true }">
      <div :class="{ 'cd-select-downbox': true }">
        <div
          :class="{
            'cd-select-everybox': true,
            'cd-select-everybox-hover':
              data.disabled === undefined || data.disabled == false,
            'cd-select-everybox-checked': modelValue == data.label,
            'cd-select-everybox-disabled': data.disabled,
          }"
          v-for="(data, ind) in options"
          :key="ind"
          @mousedown="onSelect(data.label, data.disabled, $event)"
          v-show="String(data.label).indexOf(filterableSelectData) != -1"
        >
          {{ data.label }}
        </div>
      </div>
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
    modelValue: {
      type: String,
    },
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
      default: "Select",
    },
    options: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let select = ref<object>();
    let placeholderData = ref<string>();
    let lastSelectData = ref<string>();
    placeholderData.value = props.placeholder;
    onMounted(() => {
      (select.value as HTMLInputElement).value = props.modelValue as string;
      lastSelectData.value = props.modelValue;
    });
    function executeChange(): void {
      context.emit("change", (select.value as HTMLInputElement).value);
    }
    function executeClear(): void {
      context.emit("clear");
    }
    function executeBlur(): void {
      context.emit("blur", select.value);
    }
    function executeFocus(): void {
      context.emit("focus", select.value);
    }
    function setmodelValue(): void {
      context.emit(
        "update:modelValue",
        (select.value as HTMLInputElement).value
      );
    }
    // 设置大小
    let heightData = ref<number>();
    let widthData = ref<number>();
    setSize();
    function setSize(): void {
      if (props.height >= 24) {
        heightData.value = props.height;
      } else {
        heightData.value = 24;
      }
      if (props.width >= 120) {
        widthData.value = props.width;
      } else {
        widthData.value = 120;
      }
    }
    // 是不是处于focus状态
    let isFocus = ref<boolean>();
    let isShow = ref<boolean>(false);
    window.addEventListener("mousedown", (): void => {
      if (isFocus.value == true) {
        isFocus.value = false;
        setTimeout(() => {
          isShow.value = false;
        }, 180);
      }
    });
    function onMousedown(): void {
      if (props.disabled) {
        return;
      }
      if (isFocus.value) {
        isFocus.value = false;
        setTimeout(() => {
          isShow.value = false;
        }, 180);
        if (props.filterable) {
          (select.value as HTMLInputElement).blur();
        }
      } else {
        isFocus.value = true;
        isShow.value = true;
        if (props.filterable) {
          (select.value as HTMLInputElement).focus();
        }
      }
    }
    // 搜索功能
    let filterableSelectData = ref<string>("");
    function onInput(): void {
      filterableSelectData.value = (select.value as HTMLInputElement).value;
    }
    function onFocus(): void {
      (select.value as HTMLInputElement).value = "";
    }
    function onBlur(): void {
      setTimeout(() => {
        filterableSelectData.value = "";
      }, 180);
      (select.value as HTMLInputElement).value = lastSelectData.value as string;
    }
    // 选择选项

    function onSelect(data: string, disabled: boolean, e: Event) {
      if (props.filterable) {
        placeholderData.value = data;
      }
      if (disabled == true) {
        e.stopPropagation();
        return;
      } else {
        (select.value as HTMLInputElement).value = data;
        lastSelectData.value = data;
        executeChange();
        setmodelValue();
      }
    }
    // 显示不显示清除按钮
    let isClearShow = ref<boolean>(false);
    function setClear(parameter: number): void {
      if (props.clearable == false) {
        return;
      } else {
        if (parameter == 1 && (select.value as HTMLInputElement).value != "") {
          isClearShow.value = true;
        } else if (parameter == 0) {
          isClearShow.value = false;
        }
      }
    }
    // 触发清除事件
    function clearSelectData(e: Event): void {
      if (isClearShow.value) {
        e.stopPropagation();
      }
      if (props.clearable == false) {
        return;
      } else {
        (select.value as HTMLInputElement).value = "";
        lastSelectData.value = "";
        isClearShow.value = false;
        executeClear();
      }
    }
    watch(isFocus, (newval, oldval): void => {
      if (newval) {
        executeFocus();
      } else {
        executeBlur();
      }
    });

    return {
      heightData,
      widthData,
      onMousedown,
      isFocus,
      isShow,
      onSelect,
      select,
      onFocus,
      onBlur,
      placeholderData,
      filterableSelectData,
      onInput,
      setClear,
      isClearShow,
      clearSelectData,
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
  background: white;
}
.cd-select-frame-hover:hover {
  border: 1px solid #d3d6dc;
}
.cd-select-frame-focus {
  border: 1px solid #8ac3ff;
}
.cd-select-frame-disabled {
  background-color: #f5f7fa;
  color: #edf7fa;
  cursor: not-allowed;
}
.cd-slect-div {
  position: relative;
  flex: 99999;
  height: v-bind(heightData + "px");
}
.cd-select {
  position: absolute;
  border: 0;
  width: 100%;
  height: 100%;
  padding-left: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: v-bind(heightData/2 + "px");
  background-color: transparent;
}
.cd-select-Arrow {
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
  line-height: v-bind(heightData/2 + "px");
}
.cd-select-Arrow-down {
  animation: down 0.2s linear;
  transform: rotate(180deg);
}
@keyframes down {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
.cd-select-Arrow-up {
  animation: up 0.2s linear;
  transform: rotate(0deg);
}
@keyframes up {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.cd-select-downbox-frame {
  position: absolute;
  z-index: 1;
  top: v-bind(heightData + 10 + "px");
  border-radius: 5px;
}
.cd-select-downbox-frame::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 10px;
  border: 5px solid white;
  border-right-color: transparent;
  border-bottom-color: transparent;
  transform: rotate(45deg);
  box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.2),
    -5px 0 5px -5pxrgba (0, 0, 0, 0.2);
}
.cd-select-downbox {
  overflow: auto;
  height: v-bind(heightData * 6 + "px");
  width: v-bind(widthData + "px");
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
}

/* 滑块 */
.cd-select-downbox:hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
/* 滚动槽 */
.cd-select-downbox::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 滚动条滑块 */
.cd-select-downbox::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: transparent;
}
.cd-select-downbox::-webkit-scrollbar {
  width: 0px;
}
.cd-select-downbox:hover::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.cd-select-everybox {
  margin-top: 2px;
  margin-bottom: 2px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: v-bind(heightData/2 + "px");
  line-height: v-bind(heightData + "px");
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cd-select-everybox-hover:hover {
  background-color: #f5f7fa;
}
.cd-select-everybox-checked {
  color: #63b0ff;
  background-color: #f5f7fa;
}
.cd-select-everybox-disabled {
  color: #c6c9d1;
  cursor: not-allowed;
}
</style>