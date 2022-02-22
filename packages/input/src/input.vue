<template>
  <div
    v-if="type != 'textarea'"
    :class="{
      'cd-input-frame': true,
      'cd-cd-input-frame-focus': isFocus,
      'cd-input-frame-disabled': disabled,
    }"
  >
    <cd-icon
      v-if="prefixIcon !== undefined"
      class="cd-input-frame-prefix-icon"
      name="fit"
      color="#c8cbd2"
      :size="heightData / 2"
    ></cd-icon>
    <div class="cd-input-div cd" @click.stop>
      <input
        ref="info"
        :class="{ 'cd-input': true }"
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
      <span
        v-show="showWordLinit == true && maxLength !== undefined"
        ref="wordLimit"
        class="cd-input-wordLimit"
        @selectstart.prevent
        >{{ inputLength }} / {{ maxLength }}</span
      >
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

    <cd-icon
      v-if="suffixIcon !== undefined"
      class="cd-input-frame-suffix-icon"
      @selectstart.prevent
      name="fit"
      color="#c8cbd2"
      :size="heightData / 2"
    ></cd-icon>
  </div>

  <div :class="{ 'cd-textarea-frame': true }" v-if="type == 'textarea'">
    <textarea
      ref="textarea"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
      :maxlength="maxLength"
      :minlength="minLength"
      :class="{ 'cd-textarea': true, 'cd-textarea-focus': isFocus }"
      :disabled="disabled"
      :placeholder="placeholder"
      @focus="onTextareaFocus"
      @blur="onTextareaFocusBlur"
    ></textarea>
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
    modelValue: {},
    type: {
      type: String,
      defaule: "text",
    },
    placeholder: {
      type: String,
      defaulr: "Please input",
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
  },
  setup(props, context) {
    let info = ref();
    let wordLimit = ref();
    let clearIcon = ref();
    let textarea = ref();
    //textarea的字体大小
    let fontSizeData = ref();
    if (props.fontSize >= 12) {
      fontSizeData.value = props.fontSize;
    } else {
      fontSizeData.value = 12;
    }
    //   宽度和长度
    let heightData = ref();
    let widthData = ref();
    setSzie();
    function setSzie() {
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
    function executeBlur() {
      if (props.type != "textarea") {
        context.emit("blur", info.value);
      } else {
        context.emit("blur", textarea.value);
      }
    }
    function executeChange(data: any) {
      context.emit("change", data);
    }
    function executeFocus() {
      if (props.type != "textarea") {
        context.emit("focus", info.value);
      } else {
        context.emit("focus", textarea.value);
      }
    }
    function executeInput() {
      if (props.type != "textarea") {
        context.emit("input", info.value.value);
      } else {
        context.emit("input", textarea.value.value);
      }
    }

    // 按下清空按钮
    function clearInput() {
      context.emit("update:modelValue", "");
      info.value.value = "";
    }

    let isFocus = ref(false);
    function pressEnter(e: any) {
      if (e.keyCode == 13) {
        executeChange(info.value.value);
        info.value.blur();
      }
    }
    function onFocus() {
      executeFocus();
      document.addEventListener("keyup", pressEnter);
      isFocus.value = true;
    }
    function onTextareaFocus() {
      executeFocus();
      isFocus.value = true;
    }
    function onBlur() {
      executeBlur();
      setTimeout(() => {
        document.removeEventListener("keyup", pressEnter);
      }, 100);
      isFocus.value = false;
    }
    function onTextareaFocusBlur() {
      isFocus.value = false;
      executeBlur();
    }
    // input清空按钮的宽度
    let clearIconWidth = ref(0);
    if (props.clearable) {
      clearIconWidth.value = heightData.value / 2;
    }
    // input内容的长度
    let inputLength = ref(0);
    // 显示字数显示的长度
    let limitWordWidth = ref(0);
    // textarea的autosize开启时
    let lastAutoHeightRows = ref(0);
    let autoHeight = ref();
    if (props.autosize !== undefined) {
      autoHeight.value = (fontSizeData.value + 2) * props.autosize.minRows + 6;
      lastAutoHeightRows.value = props.autosize.minRows;
    }
    watch(
      () => {
        return props.modelValue;
      },
      (newval, oldval) => {
        if (props.type != "textarea") {
          limitWordWidth.value = wordLimit.value.clientWidth;
          inputLength.value = info.value.value.length;
          executeInput();
        } else {
          if (props.autosize !== undefined) {
            if (
              // 自己变大
              Math.floor(
                textarea.value.scrollHeight / (fontSizeData.value + 2)
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
              lastAutoHeightRows.value - 1 >= props.autosize.minRows
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
      limitWordWidth,
      clearIconWidth,
      textarea,
      onTextareaFocus,
      onTextareaFocusBlur,
      autoHeight,
      fontSizeData,
    };
  },
});
</script>

<style scoped>
.cd-input-frame {
  display: flex;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.cd-input-frame-disabled {
  background-color: #f5f7fa;
}
.cd-cd-input-frame-focus {
  border: 1px solid #a8d3ff;
}
.cd-input-frame-prefix-icon {
  text-align: center;
  line-height: v-bind(heightData + "px");
  flex: 2;
  margin-left: 5px;
}
.cd-input-div {
  position: relative;
  flex: 99999;
  border: 0;
}

.cd-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: v-bind(heightData + "px");
  font-size: v-bind(heightData/2 + "px");
  outline: none;
  border: 0;
  background-color: transparent;
  padding-left: 5px;
  padding-right: v-bind("limitWordWidth+clearIconWidth+5+'px'");
}
.cd-input-wordLimit {
  position: absolute;
  right: v-bind("isFocus?clearIconWidth+2 + 'px':2+'px'");
  color: #c8cbd2;
  font-size: v-bind(heightData/2.5 + "px");
  line-height: v-bind(heightData + "px");
}
.cd-input-clear {
  position: absolute;
  right: 2px;
  text-align: center;
  line-height: v-bind(heightData + "px");
}
.cd-input-frame-suffix-icon {
  text-align: center;
  line-height: v-bind(heightData + "px");
  flex: 2;
  margin-right: 5px;
}

.cd-textarea-frame {
  display: inline-block;
  width: 200px;
}
.cd-textarea-frame .cd-textarea-focus {
  border: 1px solid #a8d3ff;
}
.cd-textarea {
  width: v-bind(widthData + "px");
  height: v-bind(autoHeight + "px");
  overflow: auto;
  padding: 2px;
  padding-left: 4px;
  padding-right: 4px;
  outline: none;
  resize: v-bind("autosize===undefined?resize:none");
  font-size: v-bind(fontSizeData + "px");
  line-height: v-bind("fontSizeData+2 + 'px'");
  border-radius: 5px;
  border: 1px solid #dcdfe6;
}
.cd-textarea::-webkit-scrollbar {
  width: 5px;
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