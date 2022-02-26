<template>
  <div class="cd-rate-frame">
    <div
      class="cd-rate-icon-frame"
      @mouseover="setIsHover(1)"
      @mouseout="setIsHover(0)"
    >
      <div
        v-for="(data, ind) in max"
        :key="data"
        :class="{
          'cd-rate-icon': true,
          cd: true,
          'cd-rate-icon-hover': ind + 1 <= hoverDate && isHover,
          'cd-rate-icon-confirm': isHover == false && ind + 1 <= confirmData,
        }"
        @mouseover="onMouseover(ind)"
        @click="getConfirmData(ind)"
        :ref="setRate"
      ></div>
    </div>
    <div v-if="showScore && isHover" :class="{ 'cd-rate-score': true }">
      {{ hoverScore }}
    </div>
    <div
      v-if="showScore && isHover == false"
      :class="{ 'cd-rate-score': true }"
    >
      {{ confirmScore }}
    </div>
  </div>
</template>

<script lang="ts">
import { emit } from "process";
import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  name: "cd-rate",
  emits: ["change", "update:modelValue"],
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
    height: {
      type: Number,
      default: 32,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    lowThreshold: {
      type: Number,
      default: 2,
    },
    highThreshold: {
      type: Number,
      default: 4,
    },
    colors: {
      type: Array,
      default: ["#F7BA2A", "#F7BA2A", "#F7BA2A"],
    },
    voidColor: {
      type: String,
      default: "#C6D1DE",
    },
    showScore: {
      type: Boolean,
      default: false,
    },
    textColor: {
      type: String,
      default: "#1F2D3D",
    },
  },
  setup(props, context) {
    let rate: any = ref([]);
    const setRate = (el: any) => {
      rate.value.push(el);
    };
    let hoverScore = ref();
    let confirmScore = ref();
    // 初始化确定的分数
    initializeConfirmScore();
    function initializeConfirmScore() {
      confirmScore.value = Math.floor(props.modelValue);
      if (confirmScore.value <= 0) {
        confirmScore.value = 0;
      }
      if (confirmScore.value >= props.max) {
        confirmScore.value = props.max;
      }
    }

    // 鼠标经过的icon的时候
    let hoverDate = ref();
    let hoverColor = ref();
    function onMouseover(ind: number) {
      if (props.disabled) {
        return;
      }
      hoverDate.value = ind + 1;
      hoverScore.value = hoverDate.value;
      if (hoverDate.value <= props.lowThreshold) {
        hoverColor.value = props.colors[0];
      } else if (
        hoverDate.value > props.lowThreshold &&
        hoverDate.value < props.highThreshold
      ) {
        hoverColor.value = props.colors[1];
      } else if (hoverDate.value >= props.highThreshold) {
        hoverColor.value = props.colors[2];
      }
    }
    // 设置大小
    let heightDate = ref();
    setSize();
    function setSize() {
      if (props.height >= 24) {
        heightDate.value = props.height;
      } else {
        heightDate.value = 24;
      }
    }
    // 是否触发hover
    let isHover = ref(false);
    let confirmData = ref(0);
    confirmData.value = props.modelValue;
    function setIsHover(parameter: number) {
      if (parameter == 1 && props.disabled == false) {
        isHover.value = true;
      } else if (parameter == 0) {
        if (confirmData.value <= props.lowThreshold) {
          hoverColor.value = props.colors[0];
        } else if (
          confirmData.value > props.lowThreshold &&
          confirmData.value < props.highThreshold
        ) {
          hoverColor.value = props.colors[1];
        } else if (confirmData.value >= props.highThreshold) {
          hoverColor.value = props.colors[2];
        }
        isHover.value = false;
      }
    }
    // 设置确定的得分
    function getConfirmData(ind: number) {
      if (props.disabled) {
        return;
      }
      if (isHover.value) {
        confirmData.value = ind + 1;
        confirmScore.value = ind + 1;
        context.emit("change", confirmScore.value);
      } else {
        return;
      }
    }

    onMounted(() => {
      setIsHover(0);
    });

    return {
      hoverDate,
      onMouseover,
      hoverColor,
      heightDate,
      setIsHover,
      confirmData,
      isHover,
      getConfirmData,
      hoverScore,
      confirmScore,

      rate,
      setRate,
    };
  },
});
</script>

<style scoped>
.cd-rate-frame {
  display: flex;
  position: relative;
  width: v-bind("heightDate/1.3*max+'px'");
  height: v-bind(heightDate + "px");
  align-items: center;
}
.cd-rate-icon-frame {
  display: flex;
  flex: 10;
  height: v-bind(heightDate/1.8 + "px");
}
.cd-rate-score {
  flex: 1;
  color: v-bind(textColor);
  font-size: v-bind(heightDate/3 + "px");
  height: v-bind(heightDate/1.8 + "px");
  line-height: v-bind(heightDate/1.8 + "px");
}
.cd-rate-icon {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  flex: 1;
  height: v-bind(heightDate/1.8 + "px");
}
.cd-rate-icon::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: "\e62c1";
  font-size: v-bind(heightDate/1.8 + "px");
  height: v-bind(heightDate/1.8 + "px");
  line-height: v-bind(heightDate/1.8 + "px");
  color: v-bind(voidColor);
}
.cd-rate-icon-hover::before,
.cd-rate-icon-confirm::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: "\e62c1";
  font-size: v-bind(heightDate/1.8 + "px");
  height: v-bind(heightDate/1.8 + "px");
  line-height: v-bind(heightDate/1.8 + "px");
  color: v-bind(hoverColor);
}
</style>