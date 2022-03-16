<template>
  <div :class="{ 'cd-calendar-frame-day': true }">
    <span class="cd cd-calendar-icon"></span>
    <div
      :class="{
        'cd-calendar-popup': isShow,
        'cd-calendar-pickup': isShow == false,
      }"
    >
      <div :class="{ 'cd-calendar-tag': true }">
        <span class="last-year cd" @click="changeYear(-1)"></span>
        <span
          class="cd-calendar-tag-icon last-month cd"
          @click="changeMonth(-1)"
        ></span>
        <span class="cd-calendar-tag-word"
          >{{ yearData }} &nbsp; {{ monthArray[monthData - 1] }}
        </span>
        <span
          class="cd-calendar-tag-icon next-month cd"
          @click="changeMonth(1)"
        ></span>
        <span
          class="cd-calendar-tag-icon next-year cd"
          @click="changeYear(1)"
        ></span>
      </div>
      <div :class="{ 'cd-calendar-week': true }">
        <span
          class="cd-calendar-week-work"
          v-for="(data, ind) in weekArray"
          :key="ind"
          >{{ data }}</span
        >
      </div>
      <hr class="cd-calendar-week-hr" />
      <div :class="{ 'cd-calendar-day': true }">
        <span
          v-for="data in lastMonthDays"
          :key="data"
          class="cd-calendar-dayWord cd-calendar-lastmonth"
          @click="selectLastMonth(data)"
          @selectstart="onSelectstart($event)"
          >{{ data }}</span
        >
        <span
          v-for="data in currentMonthhDays"
          :key="data"
          :class="{
            'cd-calendar-dayWord': true,
            'cd-calendar-currentmonth':
              yearData != selectDate[0] ||
              monthData != selectDate[1] ||
              data != dayData,
            'cd-calendar-select':
              yearData == selectDate[0] &&
              monthData == selectDate[1] &&
              data == dayData,
          }"
          @click="selectCurrentDay(data)"
          @selectstart="onSelectstart($event)"
          >{{ data }}</span
        >
        <span
          v-for="data in nextMonthDays"
          :key="data"
          class="cd-calendar-dayWord cd-calendar-nextmonth"
          @click="selectNextMonth(data)"
          @selectstart="onSelectstart($event)"
          >{{ data }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent } from "vue";
export default defineComponent({
  emits: ["onSelectDate"],
  props: {
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    type: {
      type: String,
      default: "day",
    },
    year: {
      type: Number,
    },
    month: {
      type: Number,
    },
    day: {
      type: Number,
    },
    isChange: {
      type: Boolean,
    },
    isShow: {
      type: Boolean,
    },
    stage: {
      type: String,
    },
  },
  setup(props, context) {
    let weekArray = ref<string[]>([
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ]);
    let monthArray = ref<string[]>([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]);
    let selectDate = ref<number[]>([]);
    let yearData = ref<number>(0);
    let monthData = ref<number>(0);
    let dayData = ref<number>(0);

    // 获取当前日期
    function getCurrentDate(): void {
      let currentDate = new Date();
      yearData.value = currentDate.getFullYear();
      monthData.value = currentDate.getMonth() + 1;
      dayData.value = currentDate.getDate();
      selectDate.value = [yearData.value, monthData.value];
    }
    function changeYear(num: number): void {
      yearData.value += num;
      getCalendar();
    }
    function changeMonth(num: number): void {
      if (monthData.value + num > 12) {
        yearData.value += 1;
        monthData.value = 1;
      } else if (monthData.value + num < 1) {
        yearData.value -= 1;
        monthData.value = 12;
      } else {
        monthData.value += num;
      }
      getCalendar();
    }
    function changeData(num: number): void {
      dayData.value = num;
    }
    //获取日期的数据
    let lastMonthDays = ref<number[]>([]);
    let currentMonthhDays = ref<number[]>([]);
    let nextMonthDays = ref<number[]>([]);
    // 得到当前日历的界面数据
    function getCalendar(): void {
      lastMonthDays.value.length = 0;
      currentMonthhDays.value.length = 0;
      nextMonthDays.value.length = 0;
      let monthFristWeek: number;
      let nextmonth: number;
      let lastmonth: number;
      let currentmonth: number = +new Date(
        yearData.value + "-" + monthData.value + "-1"
      );
      if (monthData.value == 12) {
        nextmonth = +new Date(yearData.value + 1 + "-1-1");
      } else {
        nextmonth = +new Date(
          yearData.value + "-" + (monthData.value + 1) + "-1"
        );
      }
      if (monthData.value == 1) {
        lastmonth = +new Date(yearData.value - 1 + "-12-1");
      } else {
        lastmonth = +new Date(
          yearData.value + "-" + (monthData.value - 1) + "-1"
        );
      }
      monthFristWeek = new Date(
        yearData.value + "-" + monthData.value + "-1"
      ).getDay();

      for (
        let i: number = (currentmonth - lastmonth) / (1000 * 60 * 60 * 24),
          j = 0;
        i >= 0 && j < monthFristWeek;
        i--, j++
      ) {
        lastMonthDays.value.unshift(i);
      }

      for (
        let i = 1;
        i <= (nextmonth - currentmonth) / (1000 * 60 * 60 * 24);
        i++
      ) {
        currentMonthhDays.value.push(i);
      }

      for (
        let i = lastMonthDays.value.length + currentMonthhDays.value.length,
          j = 1;
        i < 42;
        i++, j++
      ) {
        nextMonthDays.value.push(j);
      }
    }
    watch(
      () => props.isChange,
      (newval: boolean, oldval): void => {
        if (newval == true && props.year != 0) {
          yearData.value = props.year as number;
          monthData.value = props.month as number;
          dayData.value = props.day as number;
          selectDate.value = [yearData.value, monthData.value];
          getCalendar();
        } else if (newval == false && props.year == 0) {
          getCurrentDate();
          getCalendar();
        }
      },
      { immediate: true }
    );
    // 改变输入框中的字
    function onSelectDate(): void {
      context.emit("onSelectDate", {
        year: yearData.value,
        month: monthData.value,
        day: dayData.value,
      });
    }
    // 点击上一个月的日期
    function selectLastMonth(data: number): void {
      if (monthData.value == 1) {
        yearData.value -= 1;
        monthData.value = 12;
        dayData.value = data;
        selectDate.value = [yearData.value, monthData.value];
      } else {
        monthData.value -= 1;
        dayData.value = data;
        selectDate.value = [yearData.value, monthData.value];
      }
      onSelectDate();
      getCalendar();
    }
    function selectCurrentDay(data: number): void {
      dayData.value = data;
      selectDate.value = [yearData.value, monthData.value];
      onSelectDate();
    }
    function selectNextMonth(data: number): void {
      if (monthData.value == 12) {
        yearData.value += 1;
        monthData.value = 1;
        dayData.value = data;
        selectDate.value = [yearData.value, monthData.value];
      } else {
        monthData.value += 1;
        dayData.value = data;
        selectDate.value = [yearData.value, monthData.value];
      }
      getCalendar();
      onSelectDate();
    }
    function onSelectstart(e: Event): void {
      e.preventDefault();
    }
    return {
      yearData,
      monthData,
      dayData,
      changeYear,
      changeMonth,
      changeData,
      weekArray,
      monthArray,
      lastMonthDays,
      currentMonthhDays,
      nextMonthDays,
      selectDate,
      selectLastMonth,
      selectCurrentDay,
      selectNextMonth,
      onSelectstart,
    };
  },
});
</script>

<style scoped>
.cd-calendar-frame-day {
  position: absolute;
  top: v-bind(height + 10 + "px");
  z-index: 1;
  background-color: white;
  width: 320px;
  border-radius: 5px;
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
}
.cd-calendar-icon {
  position: absolute;
  top: -19px;
  left: 20px;
}
.cd-calendar-popup {
  overflow: hidden;
  animation: popup 0.3s linear;
}
@keyframes popup {
  0% {
    height: 0px;
  }
  100% {
    height: 322px;
  }
}

.cd-calendar-pickup {
  overflow: hidden;
  animation: pickup 0.3s linear;
}
@keyframes pickup {
  0% {
    height: 322px;
  }
  100% {
    height: 0px;
  }
}
.cd-calendar-icon::before {
  content: "\e637";
  color: white;
}
.cd-calendar-tag {
  display: flex;
  padding: 10px;
}
.last-year {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.last-year::before {
  content: "\e683";
  color: #7e7f80;
}
.last-year:hover:before {
  color: #3c9cff;
}
.last-month {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.last-month::before {
  content: "\e640";
  color: #7e7f80;
}
.last-month:hover::before {
  color: #3c9cff;
}
.cd-calendar-tag-word {
  cursor: default;
  flex: 12;
  text-align: center;
}
.next-month {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.next-month::before {
  content: "\e649";
  color: #7e7f80;
}
.next-month:hover::before {
  color: #3c9cff;
}
.next-year {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.next-year::before {
  content: "\e682";
  color: #7e7f80;
}
.next-year:hover::before {
  color: #3c9cff;
}
.cd-calendar-week {
  display: flex;
  cursor: default;
}
.cd-calendar-week-work {
  flex: 1;
  text-align: center;
  color: #7e7f80;
  font-size: 12px;
}
.cd-calendar-week-hr {
  width: 95%;
  border-color: #c2c7ce;
}
.cd-calendar-day {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 10px;
  cursor: pointer;
}
.cd-calendar-dayWord {
  flex: 11%;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 3px;
  text-align: center;
  font-size: 12px;
}
.cd-calendar-select {
  background-color: #3c9cff;
  border-radius: 50%;
  color: white;
}
.cd-calendar-lastmonth {
  color: #c2c7ce;
}
.cd-calendar-currentmonth:hover {
  color: #3c9cff;
}
.cd-calendar-nextmonth {
  color: #c2c7ce;
}
</style>