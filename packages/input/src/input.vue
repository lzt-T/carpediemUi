<template>
  <div
    v-if="type != 'textarea'"
    :class="{
      'cd-input-frame': true,
      'cd-cd-input-frame-focus': isFocus,
      'cd-input-frame-disabled': disabled,
    }"
  >
    <!-- 前图标 -->
    <cd-icon
      v-if="prefixIcon !== undefined"
      class="cd-input-frame-prefix-icon"
      :name="prefixIcon"
      color="#c8cbd2"
      :size="heightData / 2"
    ></cd-icon>
    <!-- 输入框 -->
    <div class="cd-input-div cd" @click.stop>
      <div class="cd-input-div-insert">
        <input
          ref="info"
          :class="{ 'cd-input': true, 'cd-input-disabled': disabled }"
          :type="type"
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :maxlength="maxLength"
          :minlength="minLength"
          @focus="onFocus"
          @blur="onBlur"
          :disabled="disabled"
          :name="name"
        />
      </div>
      <div
        v-show="showWordLinit == true && maxLength !== undefined"
        ref="wordLimit"
        class="cd-input-wordLimit"
        @selectstart.prevent
      >
        {{ inputLength }}/{{ maxLength }}
      </div>
      <cd-icon
        class="cd-input-clear"
        ref="clearIcon"
        v-show="clearable == true && isFocus == true"
        name="delete"
        color="#c8cbd2"
        :size="heightData / 2"
        @mousedown.prevent="clearInput"
      ></cd-icon>
    </div>
    <!-- 后图标 -->
    <cd-icon
      v-if="suffixIcon !== undefined"
      class="cd-input-frame-suffix-icon"
      @selectstart.prevent
      :name="suffixIcon"
      color="#c8cbd2"
      :size="heightData / 2"
    ></cd-icon>
    <!-- 下拉选择框 -->
    <div
      v-show="isInputDownShow && isInputDownExist"
      :class="{
        'cd-input-downbox-frame': true,
      }"
    >
      <div
        v-show="type == 'text'"
        :class="{
          'cd-input-downbox': true,
          'cd-input-downbox-popup': isFocus,
          'cd-input-downbox-pickup': isFocus == false,
        }"
      >
        <div
          v-for="data in selectInformation"
          :key="data"
          class="cd-input-everySelect"
          @mousedown="onSelelct(data)"
        >
          {{ data }}
        </div>
      </div>
    </div>
  </div>

  <div
    :class="{
      'cd-textarea-frame': true,
      'cd-textarea-frame-disabled': disabled,
    }"
    v-if="type == 'textarea'"
  >
    <textarea
      ref="textarea"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
      :maxlength="maxLength"
      :minlength="minLength"
      :class="{
        'cd-textarea': true,
        'cd-textarea-focus': isFocus,
        'cd-textarea-disabled': disabled,
      }"
      :disabled="disabled"
      :placeholder="placeholder"
      @focus="onTextareaFocus"
      @blur="onTextareaFocusBlur"
      :name="name"
    ></textarea>
    <div class="cd-textarea-Limitclear-frame">
      <span
        v-show="showWordLinit == true && maxLength !== undefined"
        class="cd-textarea-wordLimit"
        @selectstart.prevent
        >{{ inputLength }} / {{ maxLength }}</span
      >
      <cd-icon
        class="cd-textarea-clear"
        ref="textareaClearIcon"
        v-show="clearable == true && isFocus == true"
        name="delete"
        color="#c8cbd2"
        :size="16"
        @mousedown.prevent="clearInput"
      ></cd-icon>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "cd-input",
  components: {
    cdIcon,
  },
  emits: ["update:modelValue", "focus", "blur", "change", "input", "clear"],
  props: {
    modelValue: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "Please input",
    },
    height: {
      type: Number,
      default: 32,
    },
    width: {
      type: Number,
      default: 240,
    },
    rows: {
      type: Number,
    },
    name: {
      type: String,
    },
    prefixIcon: {
      type: String,
    },
    suffixIcon: {
      type: String,
    },
    maxLength: {
      type: Number,
    },
    minLength: {
      type: Number,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showWordLinit: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autosize: {
      type: Object,
    },
    resize: {
      type: String,
      default: "both",
    },
    fontSize: {
      type: Number,
      default: 17,
    },
    selectData: {
      type: Array,
    },
  },
  setup(props, context) {
    let info = ref<object>();
    let wordLimit = ref<object>();
    let clearIcon = ref<object>();
    let textarea = ref<object>();
    //textarea的字体大小
    let fontSizeData = ref<number>(0);
    if (props.fontSize >= 12) {
      fontSizeData.value = props.fontSize;
    } else {
      fontSizeData.value = 12;
    }
    //   宽度和长度
    let heightData = ref<number>(0);
    let widthData = ref<number>(0);
    setSzie();
    function setSzie(): void {
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
    // 执行自定义事件
    function executeBlur(): void {
      if (props.type != "textarea") {
        context.emit("blur", info.value);
      } else {
        context.emit("blur", textarea.value);
      }
    }
    function executeChange(data: string): void {
      context.emit("change", data);
    }
    function executeFocus(): void {
      if (props.type != "textarea") {
        context.emit("focus", info.value);
      } else {
        context.emit("focus", textarea.value);
      }
    }
    function executeInput(): void {
      if (props.type != "textarea") {
        context.emit("input", (info.value as HTMLInputElement).value);
      } else {
        context.emit("input", (textarea.value as HTMLTextAreaElement).value);
      }
    }
    function executeClear(): void {
      context.emit("clear");
    }
    // 按下清空按钮
    function clearInput(): void {
      executeClear();
      context.emit("update:modelValue", "");
      if (props.type != "textarea") {
        (info.value as HTMLInputElement).value = "";
      } else {
        (textarea.value as HTMLTextAreaElement).value = "";
      }
    }

    let isFocus = ref<boolean>(false);
    function pressEnter(e: { keyCode: number }): void {
      if (e.keyCode == 13) {
        executeChange((info.value as HTMLInputElement).value);
        (info.value as HTMLInputElement).blur();
      }
    }
    function onFocus(): void {
      executeFocus();
      document.addEventListener("keyup", pressEnter);
      isFocus.value = true;
      isInputDownShow.value = true;
    }
    function onTextareaFocus(): void {
      executeFocus();
      isFocus.value = true;
    }
    function onBlur(): void {
      executeBlur();
      setTimeout(() => {
        document.removeEventListener("keyup", pressEnter);
      }, 100);
      isFocus.value = false;
      setTimeout(() => {
        isInputDownShow.value = false;
      }, 180);
    }
    function onTextareaFocusBlur(): void {
      isFocus.value = false;
      executeBlur();
    }
    // input清空按钮的宽度
    let clearIconWidth = ref<number>(0);
    if (props.clearable) {
      clearIconWidth.value = heightData.value / 2;
    }
    // input内容的长度
    let inputLength = ref<number>(0);
    // textarea的autosize开启时
    let lastAutoHeightRows = ref<number>(0);
    let autoHeight = ref<number>();
    if (props.autosize !== undefined) {
      autoHeight.value = (fontSizeData.value + 2) * props.autosize.minRows + 6;
      lastAutoHeightRows.value = props.autosize.minRows;
    }

    watch(
      () => {
        return props.modelValue;
      },
      (newval, oldval): void => {
        if (props.type != "textarea") {
          if (props.selectData !== undefined && newval !== undefined) {
            selectInformation.value = [];
            props.selectData.forEach((val, ind: number) => {
              if ((val as string).includes(newval)) {
                selectInformation.value.push(val as string);
              }
            });
          }
          inputLength.value = (info.value as HTMLInputElement).value.length;
          executeInput();
        } else {
          inputLength.value = (
            textarea.value as HTMLTextAreaElement
          ).value.length;
          if (props.autosize !== undefined) {
            if (
              // 自己输入框自动变大
              Math.floor(
                (textarea.value as HTMLTextAreaElement).scrollHeight /
                  (fontSizeData.value + 2)
              ) > lastAutoHeightRows.value &&
              lastAutoHeightRows.value + 1 <= props.autosize.maxRows
            ) {
              autoHeight.value =
                (fontSizeData.value + 2) * (lastAutoHeightRows.value + 1) + 6;
              lastAutoHeightRows.value = lastAutoHeightRows.value + 1;
            }
            // 自己变小
            if (
              String(oldval)[String(oldval).length - 1] === "\n" &&
              lastAutoHeightRows.value - 1 >= props.autosize.minRows &&
              String(newval).length < String(oldval).length
            ) {
              autoHeight.value =
                (fontSizeData.value + 2) * (lastAutoHeightRows.value - 1) + 6;
              lastAutoHeightRows.value = lastAutoHeightRows.value - 1;
            }
          }
          executeInput();
        }
      }
    );
    let isInputDownShow = ref<boolean>();
    let selectInformation = ref<string[]>([]);
    let isInputDownExist = ref<boolean>(false);
    watch(
      () => {
        return props.selectData;
      },
      (newval, oldval) => {
        if (newval === undefined) {
          isInputDownExist.value = false;
        } else {
          if (newval.length > 0) {
            isInputDownExist.value = true;
            selectInformation.value = newval as string[];
          } else {
            isInputDownExist.value = false;
          }
        }
      },
      { immediate: true }
    );
    function onSelelct(data: string): void {
      setTimeout(() => {
        isInputDownShow.value = false;
      }, 180);
      if (props.maxLength !== undefined) {
        context.emit("update:modelValue", data.substr(0, props.maxLength));
        (info.value as HTMLInputElement).value = data.substr(
          0,
          props.maxLength
        );
      } else {
        context.emit("update:modelValue", data);
        (info.value as HTMLInputElement).value = data;
      }
      executeInput();
    }
    return {
      heightData,
      widthData,
      clearInput,
      onFocus,
      onBlur,
      isFocus,
      info,
      inputLength,
      wordLimit,
      clearIcon,
      clearIconWidth,
      textarea,
      onTextareaFocus,
      onTextareaFocusBlur,
      autoHeight,
      fontSizeData,
      onSelelct,
      isInputDownShow,
      isInputDownExist,
      selectInformation,
    };
  },
});
</script>

<style scoped>
.cd-input-frame {
  position: relative;
  display: flex;
  align-items: center;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  font-size: v-bind(heightData/2 + "px");
  line-height: v-bind(heightData + "px");
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.cd-input-frame-disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}
.cd-cd-input-frame-focus {
  border: 1px solid #a8d3ff;
}
.cd-input-frame-prefix-icon {
  flex: 2;
  margin-left: 5px;
}
.cd-input-div {
  flex: 99999;
  border: 0;
  display: flex;
  align-items: center;
}
.cd-input-div-insert {
  flex: 8;
}
.cd-input {
  width: 100%;
  height: v-bind(heightData + "px");
  outline: none;
  border: 0;
  background-color: transparent;
  padding-left: 5px;
}
.cd-input-disabled {
  cursor: not-allowed;
}
.cd-input-downbox-frame {
  position: absolute;
  z-index: 1;
  top: v-bind(heightData + 14+ "px");
  left: 15px;
  height: v-bind(heightData * 6+ "px");
  width: v-bind(widthData/1.2 + "px");
  background-color: white;
}
.cd-input-downbox-frame::before {
  content: "";
  position: absolute;
  z-index: 1;
  top: -6px;
  left: 15px;
  border: 5px solid white;
  transform: rotate(45deg);
  box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.2),
    -5px 0 5px -5pxrgba (0, 0, 0, 0.2);
  background-color: white;
}
.cd-input-downbox {
  position: absolute;
  height: v-bind(heightData * 6+ "px");
  width: v-bind(widthData/1.2 + "px");
  overflow: auto;
  background-color: white;
  left: 0;
  top: 0;
  font-size: v-bind(heightData/2 + "px");
  line-height: v-bind(heightData + "px");
  box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.cd-input-downbox::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
/* 滑块 */
.cd-input-downbox:hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
/* 滚动槽 */
.cd-input-downbox::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 滚动条滑块 */
.cd-input-downbox::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: transparent;
}

.cd-input-everySelect {
  padding: 0px 10px;
  margin-top: 5px;
  height: v-bind(heightData + "px");
  font-size: v-bind(heightData/2 + "px");
  line-height: v-bind(heightData + "px");
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cd-input-everySelect:hover {
  background-color: #f5f7fa;
}

.cd-input-downbox-popup {
  overflow: auto;
  animation: popup 0.2s linear;
}
@keyframes popup {
  0% {
    height: 0px;
  }
  100% {
    height: v-bind(heightData * 6+ "px");
  }
}
.cd-input-downbox-pickup {
  overflow: hidden;
  animation: pickup 0.2s linear;
}
@keyframes pickup {
  0% {
    height: v-bind(heightData * 6+ "px");
  }
  100% {
    height: 0px;
  }
}
.cd-input-wordLimit {
  flex: 2;
  white-space: nowrap;
  text-align: center;
  font-size: v-bind(heightData/2.5 + "px");
  color: #c8cbd2;
  margin: 0px 5px;
}
.cd-input-clear {
  flex: 1;
  margin: 0px 2px 0px 0px;
}
.cd-input-frame-suffix-icon {
  flex: 2;
  margin-right: 5px;
}

.cd-textarea-frame {
  position: relative;
  display: inline-block;
  font-size: v-bind(fontSizeData + "px");
  line-height: v-bind("fontSizeData+3 + 'px'");
  height: v-bind(autoHeight + "px");
}
.cd-textarea-frame-disabled {
  cursor: not-allowed;
}
.cd-textarea-frame .cd-textarea-focus {
  border: 1px solid #a8d3ff;
}
.cd-textarea {
  width: v-bind(widthData + "px");
  height: v-bind(autoHeight + "px");
  overflow: auto;
  padding: 2px 4px;
  outline: none;
  resize: v-bind("autosize===undefined?resize:none");
  font-size: v-bind(fontSizeData + "px");
  line-height: v-bind("fontSizeData+2 + 'px'");
  border-radius: 5px;
  border: 1px solid #dcdfe6;
}
.cd-textarea-disabled {
  cursor: not-allowed;
}
.cd-textarea-Limitclear-frame {
  position: absolute;
  bottom: 0px;
  right: 10px;
  display: flex;
  gap: 3px;
  align-items: center;
  font-size: 14px;
  line-height: 36px;
}
.cd-textarea-wordLimit {
  color: #c8cbd2;
  opacity: 0.7;
}
.cd-textarea-clear {
  opacity: 0.7;
}
.cd-textarea::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
/* 滚动槽 */
.cd-textarea::-webkit-scrollbar-track {
  border-radius: 2px;
}
/* 滚动条滑块 */
.cd-textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
}
</style>