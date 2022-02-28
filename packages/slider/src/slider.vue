<template>
  <div
    :class="{ 'cd-slider-frame': true }"
    ref="sliderBox"
    @selectstart.prevent
  >
    <div :class="{ 'cd-slider-left': true }"></div>
    <div :class="{ 'cd-slider-block-frame': true }" ref="sliderBlock">
      <div v-show="isHover" :class="{ 'cd-slider-block-score': isHover }">
        {{ score }}
      </div>
      <div
        :class="{ 'cd-slider-block': true, 'cd-slider-block-hover': isHover }"
        @mouseover="onMouseover"
        @mouseout="onMouseout"
        @mousedown="onMousedown($event)"
        @dragstart.prevent=""
      ></div>
    </div>
    <div :class="{ 'cd-slider-right': true }"></div>
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
  emits: ["update:modelValue"],
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
  },
  setup(props, context) {
    let sliderBox = ref();
    let sliderBlock = ref();
    // 距离页面最左边的距离
    let pageDistance = ref();
    onMounted(() => {
      pageDistance.value = getLeft(sliderBox.value);
    });
    //   设置大小
    let heightData = ref();
    let widthData = ref();
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
    // 是否触摸
    let isHover = ref(false);
    let isExceed = ref(false);
    function onMouseover() {
      isHover.value = true;
    }
    function onMouseout() {
      if (isMove.value == false) {
        isHover.value = false;
      }
    }
    let score: any = ref(0);
    let startX = ref();
    let startY = ref();
    let isMove = ref(false);
    // 每次移动的距离
    let displacementDistance = ref(0);
    // 滑块停的位置距离刻度为0的距离
    let restingPosition = ref(0);
    // 获取元素在page中的位置
    function getLeft(e: any) {
      let offset = e.offsetLeft;
      if (e.offsetParent != null) offset += getLeft(e.offsetParent);
      return offset;
    }
    function onMousedown(e: any) {
      isExceed.value = false;
      isMove.value = true;
      startY.value = e.pageY;
      startX.value = e.pageX;
      displacementDistance.value = 0;
      restingPosition.value = e.pageX - pageDistance.value;
    }
    document.addEventListener("mousemove", (e) => {
      if (isMove.value) {
        displacementDistance.value = e.pageX - startX.value;
        if (Math.abs(e.pageY - startY.value) >= heightData.value * 0.35) {
          isExceed.value = true;
        }
        if (
          restingPosition.value + e.pageX - startX.value >= 0 &&
          restingPosition.value + e.pageX - startX.value <= widthData.value
        ) {
          displacementDistance.value = e.pageX - startX.value;
        } else {
          if (restingPosition.value + e.pageX - startX.value < 0) {
            displacementDistance.value = -restingPosition.value;
            isExceed.value = true;
          } else if (
            restingPosition.value + e.pageX - startX.value >
            widthData.value
          ) {
            displacementDistance.value =
              widthData.value - restingPosition.value;
            isExceed.value = true;
          }
        }
      }
    });
    document.addEventListener("mouseup", (e) => {
      if (isMove.value) {
        isMove.value = false;
      }
      if (isExceed.value) {
        isHover.value = false;
      }
    });
    watchEffect(() => {
      score.value = Math.floor(
        ((restingPosition.value + displacementDistance.value) /
          widthData.value) *
          100
      );
    });
    watch(
      () => {
        return props.modelValue;
      },
      (newval, oldval) => {
        score.value = newval;
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
      displacementDistance,
      restingPosition,
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
  height: v-bind(heightData + "px");
  width: v-bind(heightData * 0.6 + "px");
  margin-left: v-bind(
    displacementDistance + restingPosition-heightData * 0.3 + "px"
  );
}
.cd-slider-block-score {
  position: absolute;
  top: -36px;
  left: -50%;
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
}
.cd-slider-right {
  flex: v-bind(100-score);
  height: v-bind(heightData/5 + "px");
  width: v-bind(widthData + "px");
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #e3e6ed;
}
</style>