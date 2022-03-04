<template>
  <div
    :class="{ 'cd-carousel-frame': true }"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
  >
    <div :class="{ 'cd-carousel-div-frame': true }">
      <div
        v-for="(data, ind) in presentImg"
        :key="ind"
        :class="{
          'cd-carousel-div': true,
          'cd-carousel-div-left': isLeftMove,
          'cd-carousel-div-right': isRightMove,
        }"
      >
        <img :src="data" />
      </div>
    </div>
    <div :class="{ 'cd-carousel-trigger-frame': true }">
      <div
        v-for="(data, ind) in src.length"
        :key="data"
        :class="{
          'cd-carousel-trigger': true,
          'cd-carousel-trigger-hover': triggerHoverInd == ind,
        }"
        @mouseover="triggerMouseover(ind)"
        @mouseout="triggerMouseout"
      ></div>
    </div>
    <div
      v-show="isArrowShow"
      :class="{ 'cd-carousel-left': true }"
      @click="lastPage"
      @selectstart.prevent
    >
      &lt;
    </div>
    <div
      v-show="isArrowShow"
      :class="{ 'cd-carousel-right': true }"
      @click="nextPage"
      @selectstart.prevent
    >
      &gt;
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "cd-carousel",
  props: {
    src: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      default: 150,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    trigger: {
      type: String,
      default: "hover",
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 3000,
    },
    arrow: {
      type: String,
      default: "hover",
    },
    loop: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    let presentInd = ref();
    let presentImg: any = ref([]);
    let triggerHoverInd = ref();
    // 初始化img数组
    initializeImg();

    function initializeImg() {
      if (props.initialIndex >= 0 && props.initialIndex < props.src.length) {
        presentInd.value = props.initialIndex;
      } else {
        if (props.initialIndex < 0) {
          presentInd.value = 0;
        }
        if (props.initialIndex >= props.src.length) {
          presentInd.value = props.src.length - 1;
        }
      }
      triggerHoverInd.value = presentInd.value;
      console.log(triggerHoverInd.value);

      presentImg.value[0] =
        props.src[
          presentInd.value - 1 < 0
            ? props.src.length - 1
            : (presentInd.value - 1) % props.src.length
        ];
      presentImg.value[1] = props.src[presentInd.value % props.src.length];
      presentImg.value[2] =
        props.src[(presentInd.value + 1) % props.src.length];
    }
    // 监听下标的变化
    watch(presentInd, (newval, oldval) => {
      setTimeout(() => {
        triggerHoverInd.value = newval % props.src.length;
        isLeftMove.value = false;
        isRightMove.value = false;
        presentImg.value[0] =
          props.src[
            newval - 1 < 0
              ? props.src.length - 1
              : (newval - 1) % props.src.length
          ];
        presentImg.value[1] = props.src[newval % props.src.length];
        presentImg.value[2] = props.src[(newval + 1) % props.src.length];
      }, 680);
    });
    // 循环滚动
    let isLeftMove = ref(false);
    let cycleTimer = setInterval(recoveryTime, props.interval);
    function recoveryTime() {
      isLeftMove.value = true;
      // 停止自动播放
      if (props.autoplay == false) {
        window.clearInterval(cycleTimer);
        isLeftMove.value = false;
        return;
      }
      // 停止循环
      if (presentInd.value + 1 == props.src.length && props.loop == false) {
        window.clearInterval(cycleTimer);
        isLeftMove.value = false;
        return;
      }
      presentInd.value = presentInd.value + 1;
      if (presentInd.value == props.src.length) {
        presentInd.value = 0;
      }
    }
    // 初始化箭头的显示
    let isArrowShow = ref();
    initializeArrow();
    function initializeArrow() {
      if (props.arrow == "never") {
        isArrowShow.value = false;
      } else if (props.arrow == "always") {
        isArrowShow.value = true;
      }
    }
    // 停止滚动和继续滚动
    function onMouseover() {
      window.clearInterval(cycleTimer);
      if (props.arrow == "hover") {
        isArrowShow.value = true;
      }
    }
    function onMouseout() {
      cycleTimer = setInterval(recoveryTime, props.interval);
      if (props.arrow == "hover") {
        isArrowShow.value = false;
      }
    }
    // 上一张
    let isRightMove = ref(false);
    function lastPage() {
      if (isRightMove.value == true) {
        return;
      }
      isRightMove.value = true;
      presentInd.value = presentInd.value - 1;
      if (presentInd.value == -1) {
        presentInd.value = props.src.length - 1;
      }
    }
    // 下一张
    function nextPage() {
      if (isLeftMove.value == true) {
        return;
      }
      isLeftMove.value = true;
      presentInd.value = presentInd.value + 1;
      if (presentInd.value == props.src.length) {
        presentInd.value = 0;
      }
    }
    //

    function triggerMouseover(ind: number) {
      if (props.trigger == "hover") {
      }
      triggerHoverInd.value = ind;
    }
    function triggerMouseout() {
      if (props.trigger == "hover") {
        triggerHoverInd.value = undefined;
      }
    }
    return {
      presentImg,
      isLeftMove,
      onMouseover,
      onMouseout,
      isArrowShow,
      lastPage,
      isRightMove,
      nextPage,
      triggerMouseover,
      triggerMouseout,
      triggerHoverInd,
    };
  },
});
</script>

<style scoped>
.cd-carousel-frame {
  position: relative;
  width: 100%;
  height: v-bind(height + "px");
}
.cd-carousel-div-frame {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  height: v-bind(height + "px");
}
.cd-carousel-div {
  display: inline-block;
  transform: translateX(-100%);
  width: 100%;
  height: v-bind(height + "px");
  background-color: aqua;
}
.cd-carousel-div-left {
  animation: left 0.7s linear;
}
@keyframes left {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(-200%);
  }
}
.cd-carousel-div-right {
  animation: right 0.7s linear;
}
@keyframes right {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}
img {
  width: 100%;
  height: 100%;
}
.cd-carousel-trigger-frame {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  height: 26px;
  gap: 8px;
}
.cd-carousel-trigger {
  border-radius: 1px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  height: 0px;
  width: 38px;
}
.cd-carousel-trigger-hover {
  border: 2px solid white;
}
.cd-carousel-left {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  text-align: center;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  line-height: 36px;
  font-size: 20px;
  color: white;
  background-color: #1f2d3d1c;
  cursor: pointer;
}
.cd-carousel-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  text-align: center;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  line-height: 36px;
  font-size: 20px;
  color: white;
  background-color: #1f2d3d1c;
  cursor: pointer;
}
</style>