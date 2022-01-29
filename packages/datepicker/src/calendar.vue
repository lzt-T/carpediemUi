<template>
  <div :class="{ 'cd-calendar-frame-day': type == 'day' }">
    <div v-if="type == 'day'">
      <span class="cd cd-calendar-icon"></span>
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
          >{{ data }}</span
        >
        <span
          v-for="data in currentMonthhDays"
          :key="data"
          :class="{
            'cd-calendar-dayWord': true,
            'cd-calendar-currentmonth': true,
            'cd-calendar-select':
              yearData == selectDate[0] &&
              monthData == selectDate[1] &&
              data == dayData,
          }"
          >{{ data }}</span
        >
        <span
          v-for="data in nextMonthDays"
          :key="data"
          class="cd-calendar-dayWord cd-calendar-nextmonth"
          >{{ data }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
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
  },
  setup(props, context) {
    let weekArray = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    let monthArray = ref([
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
    let selectDate = ref([]);
    let yearData = ref();
    let monthData = ref();
    let dayData = ref();
    getCurrentDate();
    function getCurrentDate() {
      let currentDate = new Date();
      yearData.value = currentDate.getFullYear();
      monthData.value = currentDate.getMonth() + 1;
      dayData.value = currentDate.getDate();
      selectDate.value.push(yearData.value, monthData.value);
    }
    console.log(selectDate.value);
    function changeYear(num) {
      yearData.value += num;
      getCalendar();
      dayData.value = undefined;
    }
    function changeMonth(num) {
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
      dayData.value = undefined;
    }
    function changeData(num) {
      dayData.value = num;
    }
    //获取日期的数据
    let lastMonthDays = ref([]);
    let currentMonthhDays = ref([]);
    let nextMonthDays = ref([]);
    getCalendar();
    function getCalendar() {
      lastMonthDays.value.length = 0;
      currentMonthhDays.value.length = 0;
      nextMonthDays.value.length = 0;
      let monthFristWeek;
      let nextmonth;
      let lastmonth;
      let currentmonth = +new Date(
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
        let i = (currentmonth - lastmonth) / (1000 * 60 * 60 * 24), j = 0;
        i >= 0, j < monthFristWeek;
        i--, j++
      ) {
        lastMonthDays.value.unshift(i);
      }
      // console.log(lastMonthDays.value);
      for (
        let i = 1;
        i <= (nextmonth - currentmonth) / (1000 * 60 * 60 * 24);
        i++
      ) {
        currentMonthhDays.value.push(i);
      }
      // console.log(currentMonthhDays.value);
      for (
        let i = lastMonthDays.value.length + currentMonthhDays.value.length,
          j = 1;
        i < 42;
        i++, j++
      ) {
        nextMonthDays.value.push(j);
      }
      // console.log(nextMonthDays.value);
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
    };
  },
};
</script>

<style scoped>
.cd-calendar-frame-day {
  position: absolute;
  top: v-bind(height + 10 + "px");
  z-index: 1;
  /* height: 200px; */
  width: 320px;
  border-radius: 5px;
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
}
.cd-calendar-icon {
  position: absolute;
  top: -19px;
  left: 20px;
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