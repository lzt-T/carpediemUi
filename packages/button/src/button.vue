<template>
  <button class="cd-button">
    <div :class="lAnimation" v-if="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div v-if="lAnimation == 'loading'"></div>
      <div v-if="lAnimation == 'loading'"></div>
      <div v-if="lAnimation == 'loading'"></div>
    </div>
    {{ val }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "cd-button",
  props: {
    //文字
    val: {
      type: String,
      default: "按钮",
    },
    //大小高
    size: {
      type: Number,
      default: 38,
    },
    //大小长
    width: {
      type: Number,
      default: 38 * 2.2,
    },
    //背景颜色
    backgroundCcolor: {
      type: String,
      default: "white",
    },
    //字体颜色
    color: {
      type: String,
      default: "black",
    },
    //是不是椭圆
    round: {
      type: Boolean,
      default: false,
    },
    //是不是圆形
    circle: {
      type: Boolean,
      default: false,
    },
    //是不是处于加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    //加载的动画的类型
    lAnimation: {
      type: String,
      default: "loading",
    },
    //是否处于禁用状态
    disabled: {
      type: Boolean,
      default: false,
    },
    //是不是文字状态
    text: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let backgroundCcolorData = props.backgroundCcolor;
    let colorData = props.color;
    let borderWidthData = 0.1;
    let roundData = 0;
    let widthData = props.width;
    let disabledData = "default";
    if (props.size != 38 && props.width == 38 * 2.2) {
      widthData = props.size * 2.2;
    }
    //设置背景和字体颜色
    if (backgroundCcolorData == "white" || backgroundCcolorData == "#FFFFFF") {
      colorData = "#000000";
      borderWidthData = 0.1;
    } else {
      colorData = "#FFFFFF";
      borderWidthData = 0;
    }
    //椭圆
    if (props.round == true) {
      roundData = props.size / 2;
    }
    //圆形
    if (props.circle == true) {
      widthData = props.size;
      roundData = props.size / 2;
    }
    //是不是以文字的形式出现
    if (props.text == true) {
      backgroundCcolorData == "#FFFFFF";
      borderWidthData = 0;
      roundData = 0;
    }
    //是否处于禁用状态
    if (props.disabled == true) {
      disabledData = "not-allowed";
    }
    return {
      roundData,
      colorData,
      backgroundCcolorData,
      borderWidthData,
      widthData,
      disabledData,
    };
  },
});
</script>

<style scoped>
.cd-button {
  word-break: break-all;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  padding-left: 10px;
  padding-right: 10px;
  width: v-bind(widthData + "px");
  height: v-bind(size + "px");
  line-height: v-bind(size + "px");
  text-align: center;
  font-size: v-bind(size/2.5 + "px");
  background-color: v-bind(backgroundCcolor);
  color: v-bind(colorData);
  border: 0.1px solid #dcdfe6;
  border-width: v-bind(borderWidthData + "px");
  border-radius: v-bind(roundData + "px");
  cursor: v-bind(disabledData);
  opacity: v-bind("loading==false?1: 0.75");
}
.cd-button:hover {
  opacity: 0.75;
}
/* 第一种加载方式 */
.loading,
.loading > div {
  position: relative;
  box-sizing: border-box;
}

.loading {
  vertical-align: middle;
  display: inline-block;
  margin-right: 1.5px;
  font-size: 0;
  color: #000;
}

.loading.la-dark {
  color: #333;
}

.loading > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading {
  width: v-bind(size/3 + "px");
  height: v-bind(size/3 + "px");
}

.loading > div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: v-bind(size/12 + "px");
  height: v-bind(size/12 + "px");
  margin-top: -4px;
  margin-left: -4px;
  border-radius: 100%;
  animation: ball-spin-clockwise 1s infinite ease-in-out;
}

.loading > div:nth-child(1) {
  top: 5%;
  left: 50%;
  animation-delay: -0.875s;
}

.loading > div:nth-child(2) {
  top: 18.1801948466%;
  left: 81.8198051534%;
  animation-delay: -0.75s;
}

.loading > div:nth-child(3) {
  top: 50%;
  left: 95%;
  animation-delay: -0.625s;
}

.loading > div:nth-child(4) {
  top: 81.8198051534%;
  left: 81.8198051534%;
  animation-delay: -0.5s;
}

.loading > div:nth-child(5) {
  top: 94.9999999966%;
  left: 50.0000000005%;
  animation-delay: -0.375s;
}

.loading > div:nth-child(6) {
  top: 81.8198046966%;
  left: 18.1801949248%;
  animation-delay: -0.25s;
}

.loading > div:nth-child(7) {
  top: 49.9999750815%;
  left: 5.0000051215%;
  animation-delay: -0.125s;
}

.loading > div:nth-child(8) {
  top: 18.179464974%;
  left: 18.1803700518%;
  animation-delay: 0s;
}

.loading.la-sm {
  width: 16px;
  height: 16px;
}

.loading.la-sm > div {
  width: 4px;
  height: 4px;
  margin-top: -2px;
  margin-left: -2px;
}

.loading.la-2x {
  width: 64px;
  height: 64px;
}

.loading.la-2x > div {
  width: 16px;
  height: 16px;
  margin-top: -8px;
  margin-left: -8px;
}

.loading.la-3x {
  width: 96px;
  height: 96px;
}

.loading.la-3x > div {
  width: 24px;
  height: 24px;
  margin-top: -12px;
  margin-left: -12px;
}

@keyframes ball-spin-clockwise {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  20% {
    opacity: 1;
  }

  80% {
    opacity: 0;
    transform: scale(0);
  }
}
/* 第二种加载方式 */
.loading-one {
  /* vertical-align: top; */
  vertical-align: middle;
  display: inline-block;
  margin-right: 1.5px;
  width: v-bind(size/3 + "px");
  height: v-bind(size/3 + "px");
  margin-right: 2px;
  border: 1.5px solid #000;
  border-top-color: transparent;
  border-radius: 100%;
  animation: circle infinite 0.75s linear;
}
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* 第三中加载方式 */
.loading-two,
.loading-two > div {
  position: relative;
  box-sizing: border-box;
}

.loading-two {
  vertical-align: middle;
  display: inline-block;
  margin-right: v-bind(size/5 + "px");
  font-size: 0;
  color: #000;
}

.loading-two.la-dark {
  color: #333;
}

.loading-two > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading-two {
  width: v-bind(size/4 + "px");
  height: v-bind(size/4 + "px");
}

.loading-two > div {
  position: absolute;
  top: 0;
  left: -100%;
  display: block;
  width: v-bind(size/4 + "px");
  width: 100%;
  height: v-bind(size/4 + "px");
  height: 100%;
  border-radius: 100%;
  opacity: 0.5;
  animation: ball-circus-position 2.5s infinite cubic-bezier(0.25, 0, 0.75, 1),
    ball-circus-size 2.5s infinite cubic-bezier(0.25, 0, 0.75, 1);
}

.loading-two > div:nth-child(1) {
  animation-delay: 0s, -0.5s;
}

.loading-two > div:nth-child(2) {
  animation-delay: -0.5s, -1s;
}

.loading-two > div:nth-child(3) {
  animation-delay: -1s, -1.5s;
}

.loading-two > div:nth-child(4) {
  animation-delay: -1.5s, -2s;
}

.loading-two > div:nth-child(5) {
  animation-delay: -2s, -2.5s;
}

@keyframes ball-circus-position {
  50% {
    left: 100%;
  }
}

@keyframes ball-circus-size {
  50% {
    transform: scale(0.3, 0.3);
  }
}
</style>
