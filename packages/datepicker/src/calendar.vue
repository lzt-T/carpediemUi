<template>
  <div :class="{ 'cd-calendar-frame': true }">
    <span class="cd cd-calendar-icon"></span>
    <div :class="{ 'cd-calendar-tag': true }">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div :class="{ 'cd-calendar-week': true }"></div>
    <div :class="{ 'cd-calendar-day': true }"></div>
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
  },
  setup(props, context) {
    let yearData = ref();
    let monthData = ref();
    let dayData = ref();
  },
};
</script>

<style scoped>
.cd-calendar-frame {
  position: absolute;
  top: v-bind(height + 10 + "px");
  z-index: 1;
  height: 200px;
  width: v-bind(width * 1.5+"px");
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
</style>