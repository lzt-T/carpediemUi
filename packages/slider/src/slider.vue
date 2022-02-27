<template>
  <div :class="{ 'cd-slider-frame': true }" ref="sliderBox">
    <div :class="{ 'cd-slider-left': true }"></div>
    <div :class="{ 'cd-slider-block-frame': true }" ref="sliderBlock">
      <div v-show="isHover" :class="{ 'cd-slider-block-score': isHover }">
        {{ score }}
      </div>
      <div
        :class="{ 'cd-slider-block': true }"
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
import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  components: {
    cdIcon,
  },
  name: "cd-slider",
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    height: {
      type: Number,
      default: 32,
    },
    width: {
      type: Number,
      default: 240,
    },
  },
  setup(props, context) {
    let sliderBox = ref();
    let sliderBlock = ref();
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
    function onMouseover() {
      isHover.value = true;
    }
    function onMouseout() {
      isHover.value = false;
    }
    let score = ref(0);
    let startX = ref();
    let isMove = ref();
    let locationX = ref(0);
    let restingPosition = ref(0);

    function getLeft(e: any) {
      var offset = e.offsetLeft;
      if (e.offsetParent != null) offset += getLeft(e.offsetParent);
      return offset;
    }
    function onMousedown(e: any) {
      isMove.value = true;
      startX.value = e.pageX;
      locationX.value = 0;
      restingPosition.value = e.pageX - pageDistance.value;
    }
    document.addEventListener("mousemove", (e) => {
      if (isMove.value) {
        console.log(e.pageX);

        locationX.value = e.pageX - startX.value;
        if (
          restingPosition.value + e.pageX - startX.value >= 0 &&
          restingPosition.value + e.pageX - startX.value <= widthData.value
        ) {
          locationX.value = e.pageX - startX.value;
        } else {
          if (restingPosition.value + e.pageX - startX.value < 0) {
            locationX.value = -restingPosition.value;
          } else if (
            restingPosition.value + e.pageX - startX.value >
            widthData.value
          ) {
            locationX.value = widthData.value - restingPosition.value;
          }
        }
      }
    });
    document.addEventListener("mouseup", (e) => {
      if (isMove.value) {
        isMove.value = false;
      }
    });

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
      locationX,
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
  flex: 5;
  height: v-bind(heightData/5 + "px");
  width: v-bind(widthData + "px");
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: aqua;
}
.cd-slider-block-frame {
  position: absolute;
  height: v-bind(heightData + "px");
  width: v-bind(heightData * 0.6 + "px");
  margin-left: v-bind(locationX + restingPosition + "px");
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
.cd-slider-block:hover {
  height: v-bind(heightData * 0.7 + "px");
  width: v-bind(heightData * 0.7 + "px");
}
.cd-slider-right {
  flex: 5;
  height: v-bind(heightData/5 + "px");
  width: v-bind(widthData + "px");
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: red;
}
</style>