<template>
  <span class="cd-datepicker-frame">
    <span class="cd cd-datepicker-icon"></span>
    <input
      v-model.trim="dateData"
      ref="info"
      type="text"
      :class="{
        cd: true,
        'cd-datepicker-input': true,
        'cd-datepicker-input-border': isFocus == false,
        'cd-datepicker-input-focusborder': isFocus,
        'cd-datepicker-input-focusborder-err': isDateTrue == false,
      }"
      placeholder="请选择"
      @focus="onFocus"
      @blur="onBlur"
    />
    <calendar :height="heightData" :width="widthData" :type="type"></calendar>
  </span>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import calendar from "./calendar.vue";
export default defineComponent({
  name: "cd-date-picker",
  components: {
    calendar,
  },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    height: {
      type: Number,
      default: 32,
    },
    width: {
      type: Number,
      default: 220,
    },
    type: {
      type: String,
      default: "day",
    },
  },
  setup(props, context) {
    let info = ref();
    // 组件的大小
    let heightData = ref();
    let widthData = ref();
    if (props.height <= 25) {
      heightData.value = 25;
    } else {
      heightData.value = props.height;
    }
    if (props.width <= 150) {
      widthData.value = 150;
    } else {
      widthData.value = props.width;
    }
    // 是不是处于输入
    let isFocus = ref(false);

    function onFocus() {
      isFocus.value = true;
      window.addEventListener("keydown", pressBlank);
    }
    function onBlur() {
      isFocus.value = false;
      window.removeEventListener("keydown", pressBlank);
    }
    function setModelValue() {
      context.emit("update:modelValue", dateData.value);
    }
    let dateData = ref();
    let isDateTrue = ref();
    let yearData = ref();
    let monthData = ref();
    let dayData = ref();
    // 判断日期的正确
    function pressBlank(e: any) {
      if (e.keyCode == 13) {
        let pattern =
          /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
        if (pattern.test(dateData.value)) {
          let dateDataArray = dateData.value.split("-");
          yearData.value = dateDataArray[0];
          monthData.value = dateDataArray[1];
          dayData.value = dateDataArray[2];
          isDateTrue.value = true;
          setModelValue();
          info.value.blur();
        } else {
          isDateTrue.value = false;
        }
      }
    }

    watch(dateData, (newval: any, oldval: any) => {});

    return {
      heightData,
      widthData,
      isFocus,
      onFocus,
      onBlur,
      dateData,
      info,
      isDateTrue,
    };
  },
});
</script>

<style scoped>
.cd-datepicker-frame {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid #e7e9ee;
  border-radius: 2px;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  line-height: v-bind(heightData + "px");
}
.cd-datepicker-input {
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2px;
  padding-left: v-bind(heightData/1.5 + 5 + "px");
  font-size: v-bind(heightData/2 + "px");
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  outline: none;
  color: #6f6970;
}
.cd-datepicker-input-border:hover {
  border: 0.1px solid #c0c4cc;
}
.cd-datepicker-input-border {
  border: 0.1px solid #e7e9ee;
}
.cd-datepicker-input-focusborder {
  border: 0.1px solid #a8d3ff;
}
.cd-datepicker-input-focusborder-err {
  border: 0.1px solid #ff4949;
}
.cd-datepicker-icon::before {
  margin: 5px;
  content: "\e67c";
  color: rgba(0, 0, 0, 0.4);
  font-size: v-bind(heightData/1.7 + "px");
}
</style>