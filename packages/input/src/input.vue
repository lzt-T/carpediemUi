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

  <textarea
    v-if="type == 'textarea'"
    :rows="rows"
    :maxlength="maxLength"
    :minlength="minLength"
    class="cd-textarea"
    :disabled="disabled"
    :placeholder="placeholder"
  ></textarea>
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
      default: 1,
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
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let info = ref();
    let wordLimit = ref();
    let clearIcon = ref();
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
    // 清空按钮
    function executeBlur() {
      context.emit("blur", info.value);
    }
    function executeChange(data: any) {
      context.emit("change", data);
    }
    function executeFocus() {
      context.emit("focus", info.value);
    }
    function executeInput() {
      context.emit("input", info.value.value);
    }
    function pressEnter(e: any) {
      if (e.keyCode == 13) {
        executeChange(info.value.value);
        info.value.blur();
      }
    }
    function clearInput() {
      context.emit("update:modelValue", "");
      info.value.value = "";
    }

    let isFocus = ref(false);
    function onFocus() {
      executeFocus();
      document.addEventListener("keyup", pressEnter);
      isFocus.value = true;
    }
    function onBlur() {
      executeBlur();
      setTimeout(() => {
        document.removeEventListener("keyup", pressEnter);
      }, 100);
      isFocus.value = false;
    }
    let clearIconWidth = ref(0);
    if (props.clearable) {
      clearIconWidth.value = heightData.value / 2;
      console.log(clearIconWidth.value);
    }
    let inputLength = ref(0);
    let limitWordWidth = ref(0);
    watch(
      () => {
        return props.modelValue;
      },
      (newval, oldval) => {
        limitWordWidth.value = wordLimit.value.clientWidth;
        inputLength.value = info.value.value.length;
        executeInput();
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
.cd-textarea {
  height: 200px;
  width: 200px;
  overflow: auto;
  padding: 2px;
  outline: none;
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