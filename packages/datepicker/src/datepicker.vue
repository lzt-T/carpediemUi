<template>
  <div
    :class="{
      'cd-datepicker-frame': true,
      'cd-datepicker-frame-border': isFocus == false,
      'cd-datepicker-frame-focusborder': isFocus,
      'cd-datepicker-frame-focusborder-err':
        isDateTrue == false || isStartDate == false || isEndtDate == false,
    }"
  >
    <span class="cd cd-datepicker-icon"></span>
    <input
      v-if="type == 'day'"
      v-model.trim="dateData"
      ref="info"
      type="text"
      :class="{
        cd: true,
        'cd-datepicker-input': true,
      }"
      placeholder="请选择"
      @click.stop=""
      @focus="onFocus('middle')"
      @blur="onBlur"
    />
    <div
      v-if="type == 'daterange'"
      :class="{ 'cd-datepicker-daterange-frame': true }"
    >
      <input
        v-model.trim="startDate"
        ref="startinfo"
        type="text"
        :class="{
          cd: true,
          'cd-datepicker-start': true,
        }"
        placeholder="Start date"
        @click.stop=""
        @focus="onFocus('start')"
        @blur="onBlur"
      />
      <div class="cd-datepicker-start-to">to</div>
      <input
        v-model.trim="endDate"
        ref="endinfo"
        type="text"
        :class="{
          cd: true,
          'cd-datepicker-end': true,
        }"
        placeholder="End date"
        @click.stop=""
        @focus="onFocus('end')"
        @blur="onBlur"
      />
    </div>
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
      :stage="stage"
    ></calendar>
  </div>
</template>

<script lang="ts">
// 确定日期要按回车键或者使用日历选择
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
    let stage = ref("middle");
    let info = ref();
    let startinfo = ref();
    let endinfo = ref();
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
    let yearData = ref("");
    let monthData = ref("");
    let dayData = ref("");
    let isFocus = ref(false);
    //输入时
    function onFocus(stageData: any) {
      stage.value = stageData;
      if (stage.value == "middle" && isDateTrue.value == true) {
        yearData.value = dateData.value.split("-")[0];
        monthData.value = dateData.value.split("-")[1];
        dayData.value = dateData.value.split("-")[2];
      } else if (stage.value == "start" && isStartDate.value == true) {
        yearData.value = startDate.value.split("-")[0];
        monthData.value = startDate.value.split("-")[1];
        dayData.value = startDate.value.split("-")[2];
      } else if (stage.value == "end" && isEndtDate.value == true) {
        yearData.value = endDate.value.split("-")[0];
        monthData.value = endDate.value.split("-")[1];
        dayData.value = endDate.value.split("-")[2];
      }
      isChange.value = true;
      setTimeout(() => {
        isChange.value = false;
      }, 1);
      isFocus.value = true;
      isShow.value = true;
      isShowCopy.value = true;
      window.addEventListener("keydown", pressBlank);
    }
    //输入结束时
    function onBlur() {
      isFocus.value = false;
      window.removeEventListener("keydown", pressBlank);
      if (dateData.value == "" && stage.value == "middle") {
        isDateTrue.value = true;
      }
      if (startDate.value == "" && stage.value == "start") {
        isStartDate.value = true;
      }
      if (endDate.value == "" && stage.value == "end") {
        isEndtDate.value = true;
      }
    }
    function setModelValue() {
      if (stage.value == "middle") {
        context.emit("update:modelValue", dateData.value);
      } else {
        context.emit(
          "update:modelValue",
          startDate.value + " " + endDate.value
        );
      }
    }
    let isShow = ref(false);
    let isShowCopy = ref(false);
    let isChange = ref(false);
    let dateData = ref("");
    let startDate = ref("");
    let endDate = ref("");
    let isDateTrue = ref();
    let isStartDate = ref();
    let isEndtDate = ref();
    // 手动输入日期，并判断正确，再设置日期
    function checkDate(dateData: any) {
      let isSure = false;
      let bissextilDay = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let nobissextilDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let dateDataArray = dateData.split("-");
      if (
        dateDataArray[0] % 400 == 0 ||
        (dateDataArray[0] % 4 == 0 && dateDataArray[0] % 100 != 0)
      ) {
        if (dateDataArray[1] >= 1 && dateDataArray[1] <= 12) {
          if (
            dateDataArray[2] >= 1 &&
            dateDataArray[2] <= bissextilDay[dateDataArray[1] - 1]
          ) {
            isSure = true;
          }
        }
      } else {
        if (dateDataArray[1] >= 1 && dateDataArray[1] <= 12) {
          if (
            dateDataArray[2] >= 1 &&
            dateDataArray[2] <= nobissextilDay[dateDataArray[1] - 1]
          ) {
            isSure = true;
          }
        }
      }
      return [isSure, dateDataArray];
    }
    function pressBlank(e: any) {
      if (e.keyCode == 13) {
        checkDateSecond();
      }
    }
    // 日期正确和错误的做法
    function checkDateSecond() {
      if (true) {
        let checkData = [];
        if (stage.value == "middle") {
          checkData = checkDate(dateData.value);
        } else if (stage.value == "start") {
          checkData = checkDate(startDate.value);
        } else if (stage.value == "end") {
          checkData = checkDate(endDate.value);
        }
        if (checkData[0]) {
          yearData.value = checkData[1][0];
          monthData.value = checkData[1][1];
          dayData.value = checkData[1][2];
          if (stage.value == "middle") {
            isDateTrue.value = true;
          } else if (stage.value == "start") {
            isStartDate.value = true;
          } else if (stage.value == "end") {
            isEndtDate.value = true;
          }
          isChange.value = true;
          setTimeout(() => {
            isChange.value = false;
          }, 1);
          isShow.value = false;
          setTimeout(() => {
            isShowCopy.value = false;
          }, 280);

          if (startDate.value != "" && endDate.value != "") {
            let startTimeMs = +new Date(startDate.value);
            let endTimeMs = +new Date(endDate.value);
            if (startTimeMs > endTimeMs) {
              [startDate.value, endDate.value] = [
                endDate.value,
                startDate.value,
              ];
            }
          }
          if (stage.value == "middle") {
            setModelValue();
          } else {
            if (isStartDate.value == true && isEndtDate.value == true) {
              setModelValue();
            }
          }

          if (stage.value == "middle") {
            info.value.blur();
          } else if (stage.value == "start") {
            startinfo.value.blur();
          } else if (stage.value == "end") {
            endinfo.value.blur();
          }
        } else {
          if (
            (dateData.value == "" && stage.value == "middle") ||
            (startDate.value == "" && stage.value == "start") ||
            (endDate.value == "" && stage.value == "end")
          ) {
            isShow.value = false;
            setTimeout(() => {
              isShowCopy.value = false;
            }, 280);
            if (stage.value == "middle") {
              info.value.blur();
            } else if (stage.value == "start") {
              startinfo.value.blur();
            } else if (stage.value == "end") {
              endinfo.value.blur();
            }
          } else {
            if (stage.value == "middle") {
              isDateTrue.value = false;
            } else if (stage.value == "start") {
              isStartDate.value = false;
            } else if (stage.value == "end") {
              isEndtDate.value = false;
            }
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
    // 使用日历选择日期
    function onSelectDate(data: any) {
      if (stage.value == "middle") {
        dateData.value = data.year + "-" + data.month + "-" + data.day;
      } else if (stage.value == "start") {
        startDate.value = data.year + "-" + data.month + "-" + data.day;
      } else if (stage.value == "end") {
        endDate.value = data.year + "-" + data.month + "-" + data.day;
      }

      if (startDate.value != "" && endDate.value != "") {
        let startTimeMs = +new Date(startDate.value);
        let endTimeMs = +new Date(endDate.value);
        if (startTimeMs > endTimeMs) {
          [startDate.value, endDate.value] = [endDate.value, startDate.value];
        }
      }
      yearData.value = data.year;
      monthData.value = data.month;
      dayData.value = data.day;

      if (stage.value == "middle") {
        isDateTrue.value = true;
      } else if (stage.value == "start") {
        isStartDate.value = true;
      } else if (stage.value == "end") {
        isEndtDate.value = true;
      }
      if (stage.value == "middle") {
        setModelValue();
      } else {
        if (isStartDate.value == true && isEndtDate.value == true) {
          setModelValue();
        }
      }
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
      startDate,
      endDate,
      stage,
      startinfo,
      endinfo,
      isStartDate,
      isEndtDate,
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
  width: v-bind("type=='day'?widthData+'px':widthData*1.5+'px'");
  line-height: v-bind(heightData + "px");
}
.cd-datepicker-frame-border {
  border: 0.1px solid #e7e9ee;
}
.cd-datepicker-frame-border:hover {
  border: 0.1px solid #c0c4cc;
}
.cd-datepicker-frame-focusborder {
  border: 0.1px solid #a8d3ff;
}
.cd-datepicker-frame-focusborder-err {
  border: 0.1px solid #ff4949;
}
.cd-datepicker-frame-focusborder-err:hover {
  border: 0.1px solid red;
}
.cd-datepicker-input {
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2px;
  border: 0px;
  padding-left: v-bind(heightData/1.5 + 5 + "px");
  font-size: v-bind(heightData/2 + "px");
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  outline: none;
  color: #6f6970;
}
.cd-datepicker-daterange-frame {
  position: absolute;
  top: 0px;
  display: flex;
  width: 200px;
  margin-left: 25px;
  height: v-bind(heightData + "px");
}
.cd-datepicker-start {
  box-sizing: border-box;
  border: 0px;
  height: v-bind(heightData + "px");
  font-size: v-bind(heightData/2 + "px");
  width: v-bind("(widthData*1.5-41)*0.5 +'px'");
  text-align: center;
  outline: none;
  color: #6f6970;
}
.cd-datepicker-start-to {
  display: inline-block;
  box-sizing: border-box;
}
.cd-datepicker-end {
  box-sizing: border-box;
  border: 0px;
  height: v-bind(heightData + "px");
  width: v-bind("(widthData*1.5-41)*0.5 +'px'");
  text-align: center;
  outline: none;
  color: #6f6970;
}
.cd-datepicker-icon::before {
  margin: 5px;
  content: "\e67c";
  color: rgba(0, 0, 0, 0.4);
  font-size: v-bind(heightData/1.7 + "px");
}
</style>