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
      @click.stop=""
      @focus="onFocus"
      @blur="onBlur"
    />
    <calendar
      :height="heightData"
      :width="widthData"
      :type="type"
      :year="Number(yearData)"
      :month="Number(monthData)"
      :day="Number(dayData)"
      :isChange="isChange"
      :isShow="isShow"
      v-show="isShowCopy"
      @click.stop=""
      @onSelectDate="onSelectDate"
    ></calendar>
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
      isShow.value = true;
      isShowCopy.value = true;
      window.addEventListener("keydown", pressBlank);
    }
    function onBlur() {
      isFocus.value = false;
      window.removeEventListener("keydown", pressBlank);
      if (dateData.value == "" || dateData.value == undefined) {
        isDateTrue.value = true;
      }
    }
    function setModelValue() {
      context.emit("update:modelValue", dateData.value);
    }
    let isShow = ref(false);
    let isShowCopy = ref(false);
    let isChange = ref(false);
    let dateData = ref();
    let isDateTrue = ref();
    let yearData = ref(undefined);
    let monthData = ref(undefined);
    let dayData = ref(undefined);
    // 手动输入日期，并判断正确，再设置日期
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
          isChange.value = true;
          setTimeout(() => {
            isChange.value = false;
          }, 1);
          isShow.value = false;
          setTimeout(() => {
            isShowCopy.value = false;
          }, 280);
          setModelValue();
          info.value.blur();
        } else {
          if (dateData.value == undefined || dateData.value == "") {
            isShow.value = false;
            setTimeout(() => {
              isShowCopy.value = false;
            }, 280);
            info.value.blur();
          } else {
            isDateTrue.value = false;
          }
        }
      }
    }
    window.addEventListener("click", (e) => {
      e.stopPropagation();
      isShow.value = false;
      setTimeout(() => {
        isShowCopy.value = false;
      }, 280);
    });
    function onSelectDate(data: any) {
      dateData.value = data.year + "-" + data.month + "-" + data.day;
      yearData.value = data.year;
      monthData.value = data.month;
      dayData.value = data.day;
      setModelValue();
      isShow.value = false;
      setTimeout(() => {
        isShowCopy.value = false;
      }, 280);
    }
    return {
      heightData,
      widthData,
      isFocus,
      onFocus,
      onBlur,
      dateData,
      info,
      isDateTrue,
      yearData,
      monthData,
      dayData,
      isChange,
      isShow,
      isShowCopy,
      onSelectDate,
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
.cd-datepicker-input-focusborder-err:hover {
  border: 0.1px solid red;
}
.cd-datepicker-icon::before {
  margin: 5px;
  content: "\e67c";
  color: rgba(0, 0, 0, 0.4);
  font-size: v-bind(heightData/1.7 + "px");
}
</style>