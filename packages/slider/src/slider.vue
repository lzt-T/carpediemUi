<template>
  <div
    @mousedown="setScore($event)"
    :class="{ 'cd-slider-frame': true, 'cd-slider-frame-disabled': disabled }"
    ref="sliderBox"
    @selectstart.prevent
  >
    <div :class="{ 'cd-slider-left': true }"></div>
    <div :class="{ 'cd-slider-block-frame': true }" ref="sliderBlock">
      <div v-show="isHover" :class="{ 'cd-slider-block-score': isHover }">
        {{ score }}
      </div>
      <div
        :class="{
          'cd-slider-block': true,
          'cd-slider-block-hover': isHover && disabled != true,
          'cd-slider-block-grap': isMove,
        }"
        @mouseover="onMouseover"
        @mouseout="onMouseout"
        @mousedown="onMousedown($event)"
        @dragstart.prevent=""
      ></div>
    </div>
    <div :class="{ 'cd-slider-right': true }"></div>
    <div
      v-show="
        (showStops && marks === undefined) || (marks && Object(marks)[ind])
      "
      v-for="(data, ind) in maxData / stepData - 1"
      :key="ind"
      class="node"
      :ref="everyNode"
    ></div>
    <div v-show="marks !== undefined" class="cd-slider-mark-frame">
      <div
        v-for="(data, ind) in Object.keys(Object(marks)).length"
        :key="ind"
        :ref="everySign"
        class="cd-slider-mark"
      >
        {{ marks[Object.keys(marks)[ind]] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, ref, watch, onMounted, watchEffect } from "vue";
export default defineComponent({
  components: {
    cdIcon,
  },
  name: "cd-slider",
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Number,
      dafalt: 0,
    },
    height: {
      type: Number,
      default: 32,
    },
    width: {
      type: Number,
      default: 240,
    },
    disabled: {
      type: Boolean,
      defult: false,
    },
    step: {
      type: Number,
    },
    max: {
      type: Number,
      default: 100,
    },
    showStops: {
      type: Boolean,
      default: false,
    },
    marks: {
      type: Object,
    },
  },
  setup(props, context) {
    let sliderBox = ref<object>();
    let sliderBlock = ref<object>();
    let stepData = ref<number>();
    let stepWidth = ref<number>(1);
    let maxData = ref<number>(0);
    let nodes = ref<object[]>([]);
    const everyNode = (el: object) => {
      nodes.value.push(el);
    };
    let sign = ref<object[]>([]);
    const everySign = (el: object) => {
      sign.value.push(el);
    };
    // 执行事件
    function executeChange(): void {
      context.emit("change", score.value);
    }
    function setmodelValue(): void {
      context.emit("update:modelValue", score.value);
    }
    //   设置大小
    let heightData = ref<number>(0);
    let widthData = ref<number>(0);
    setSize();
    function setSize() {
      if (props.width >= 160) {
        widthData.value = props.width;
      } else {
        widthData.value = 160;
      }
      if (props.height >= 24) {
        heightData.value = props.height;
      } else {
        heightData.value = 24;
      }
    }

    // 距离页面最左边的距离
    let pageLeftDistance = ref<number>(0);
    // 设置最大显示数值
    setMaxData();
    function setMaxData() {
      if (props.max >= 1) {
        maxData.value = props.max;
      } else {
        maxData.value = 1;
      }
    }

    // 设置步长
    setStep();
    function setStep(): void {
      if (props.step !== undefined) {
        if (props.step >= 1 && props.step <= maxData.value) {
          stepData.value = maxData.value / props.step;
          stepWidth.value = widthData.value / props.step;
        } else {
          if (props.step < 1) {
            stepData.value = maxData.value;
            stepWidth.value = widthData.value;
          }
          if (props.step > maxData.value) {
            stepData.value = 1;
            stepWidth.value = widthData.value / maxData.value;
          }
        }
      } else {
        stepData.value = 1;
        stepWidth.value = widthData.value / maxData.value;
      }
    }
    // 设置结点位置
    function setNodesLocation(): void {
      nodes.value.forEach((val: object, ind: number) => {
        (val as HTMLElement).style.left = (ind + 1) * stepWidth.value + "px";
      });
    }
    // 设置标记的位置
    function setMarkLocation(): void {
      sign.value.forEach((val: object, ind: number) => {
        if (
          Object(props.marks)[Object.keys(props.marks as object)[ind]] !==
          undefined
        ) {
          (val as HTMLElement).style.left =
            Number(Object.keys(props.marks as object)[ind]) * stepWidth.value +
            3 +
            "px";
        }
      });
    }
    onMounted(() => {
      setNodesLocation();
      setMarkLocation();
      pageLeftDistance.value = getLeft(sliderBox.value as HTMLElement);
    });

    // 是否触摸
    let isHover = ref<boolean>(false);
    let isExceed = ref<boolean>(false);
    function onMouseover(): void {
      isHover.value = true;
    }
    function onMouseout(): void {
      if (isMove.value == false) {
        isHover.value = false;
      }
    }
    let score = ref<number>(0);
    let startX = ref<number>(0);
    let startY = ref<number>(0);
    let isMove = ref<boolean>(false);
    // 每次移动的距离
    let movingDistance = ref<number>(0);
    // 滑块停的位置距离刻度为0的距离
    let initialPointDistance = ref<number>(0);
    // 求到页面最左边的距离
    function getLeft(e: HTMLElement): number {
      let offset: number = e.offsetLeft;
      if (e.offsetParent != null)
        offset += getLeft(e.offsetParent as HTMLElement);
      return offset;
    }
    // 鼠标在滑块上按下
    function onMousedown(e: any): void {
      if (props.disabled) {
        return;
      }
      (e as Event).stopPropagation();
      isExceed.value = false;
      isMove.value = true;
      startY.value = e.pageY;
      startX.value = e.pageX;
      movingDistance.value = 0;
      initialPointDistance.value = e.pageX - pageLeftDistance.value;
      if (initialPointDistance.value <= 0) {
        initialPointDistance.value = 0;
      }
      if (initialPointDistance.value >= widthData.value) {
        initialPointDistance.value = widthData.value;
      }
    }
    // 鼠标移动
    document.addEventListener("mousemove", (e): void => {
      if (isMove.value) {
        movingDistance.value = e.pageX - startX.value;
        if (Math.abs(e.pageY - startY.value) >= heightData.value * 0.35) {
          isExceed.value = true;
        }
        if (
          initialPointDistance.value + e.pageX - startX.value >= 0 &&
          initialPointDistance.value + e.pageX - startX.value <= widthData.value
        ) {
          movingDistance.value = e.pageX - startX.value;
        } else {
          if (initialPointDistance.value + e.pageX - startX.value < 0) {
            movingDistance.value = -initialPointDistance.value;
            isExceed.value = true;
          } else if (
            initialPointDistance.value + e.pageX - startX.value >
            widthData.value
          ) {
            movingDistance.value = widthData.value - initialPointDistance.value;
            isExceed.value = true;
          }
        }
      }
    });
    // 鼠标松开
    document.addEventListener("mouseup", (): void => {
      if (props.disabled) {
        return;
      }
      if (isMove.value) {
        isMove.value = false;
      }
      if (isExceed.value) {
        isHover.value = false;
      }
      executeChange();
      setmodelValue();
    });
    function setScore(e: { pageX: number }): void {
      if (props.disabled) {
        return;
      }
      isHover.value = true;
      initialPointDistance.value = e.pageX - pageLeftDistance.value;
      movingDistance.value = 0;
    }
    watchEffect((): void => {
      score.value =
        Math.round(
          (((initialPointDistance.value + movingDistance.value) /
            widthData.value) *
            maxData.value) /
            (stepData.value as number)
        ) * (stepData.value as number);
    });
    watch(
      () => {
        return props.modelValue;
      },
      (newval: number | undefined, oldval) => {
        if (Number(newval) > 0 && Number(newval) < maxData.value) {
          score.value = newval as number;
        } else {
          if (Number(newval) <= 0) {
            score.value = 0;
          }
          if (Number(newval) >= maxData.value) {
            score.value = maxData.value;
          }
        }
        initialPointDistance.value =
          (score.value / maxData.value) * widthData.value;
        movingDistance.value = 0;
      },
      { immediate: true }
    );
    return {
      heightData,
      widthData,
      onMouseover,
      isHover,
      onMouseout,
      score,
      onMousedown,
      sliderBox,
      sliderBlock,
      movingDistance,
      initialPointDistance,
      setScore,
      maxData,
      stepData,
      stepWidth,
      everyNode,
      everySign,
      isMove,
    };
  },
});
</script>

<style scoped>
.cd-slider-frame {
  display: flex;
  align-items: center;
  position: relative;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
}
.cd-slider-frame-disabled {
  cursor: not-allowed;
}
.cd-slider-left {
  flex: v-bind(score);
  height: v-bind(heightData/5 + "px");
  width: v-bind(widthData + "px");
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #3f9eff;
}
.cd-slider-block-frame {
  position: absolute;
  left: 0;
  height: v-bind(heightData + "px");
  width: v-bind(heightData * 0.6 + "px");
  margin-left: v-bind(
    "Math.round((movingDistance + initialPointDistance)/stepWidth) *stepWidth-heightData * 0.3+'px'"
  );
}
.cd-slider-block-score {
  position: absolute;
  top: -36px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  height: 30px;
  width: 40px;
  background-color: black;
  color: white;
  border-radius: 10px;
}
.cd-slider-block-score::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 40%;
  border: 5px solid black;
  transform: rotate(45deg);
  border-left-color: transparent;
  border-top-color: transparent;
}
.cd-slider-block {
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  height: v-bind(heightData * 0.6 + "px");
  width: v-bind(heightData * 0.6 + "px");
  border-radius: 50%;
  background-color: white;
  border: 1px solid #8ac3ff;
}
.cd-slider-block-hover {
  height: v-bind(heightData * 0.7 + "px");
  width: v-bind(heightData * 0.7 + "px");
  cursor: grab;
}
.cd-slider-block-grap {
  cursor: grabbing;
}
.cd-slider-right {
  flex: v-bind(maxData-score);
  height: v-bind(heightData/5 + "px");
  width: v-bind(widthData + "px");
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #e3e6ed;
}
.node {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: v-bind(heightData/5 + "px");
  width: v-bind(heightData/5 + "px");
  border-radius: 50%;
  background-color: white;
}
.cd-slider-mark-frame {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: v-bind(heightData/5 + "px");
  width: v-bind(widthData + "px");
}
.cd-slider-mark {
  position: absolute;
  z-index: 0;
  top: v-bind(heightData/4 + 5 + "px");
  transform: translateX(-50%);
  height: v-bind(heightData/5 + "px");
  line-height: v-bind(heightData/3 + "px");
  font-size: 13px;
  color: #909399;
  cursor: default;
  white-space: nowrap;
}
</style>