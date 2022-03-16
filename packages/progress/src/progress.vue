<template>
  <div class="cd-propgress-frame" v-if="type == 'line'">
    <div class="cd-progress-div">
      <div
        :class="{
          'cd-progress-div-accomplish': true,
          'cd-progress-div-accomplish-silde': isAnimation && animation,
        }"
      >
        <div class="cd-progress-div-textInside" v-if="textInside && showText">
          {{ textData }}
        </div>
      </div>
    </div>
    <div class="cd-progress-text" v-if="textInside == false && showText">
      {{ textData }}
    </div>
  </div>
  <div v-if="type == 'circle'" class="cd-propgress-circle-frame">
    <div :class="{ 'cd-propgress-circle-div': true }">
      <div class="cd-propgress-circle-left-div">
        <div :class="{ 'cd-propgress-circle-left': true }"></div>
      </div>
      <div class="cd-propgress-circle-right-div">
        <div :class="{ 'cd-propgress-circle-right': true }"></div>
      </div>
    </div>
    <div class="cd-propgress-circle-text" v-if="showText">{{ textData }}</div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, onMounted, ref, watch, watchEffect } from "vue";
export default defineComponent({
  name: "cd-progress",
  components: {
    cdIcon,
  },
  props: {
    type: {
      type: String,
      default: "line",
    },
    percentage: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 6,
    },
    textInside: {
      type: Boolean,
      default: false,
    },
    showText: {
      type: Boolean,
      default: true,
    },
    format: {
      type: Function,
    },
    color: {
      type: String,
      default: "#409eff",
    },
    animation: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    // 设置大小
    let heightData = ref<number>();
    let widthData = ref<number>();
    setSize();
    function setSize(): void {
      if (props.width >= 120) {
        widthData.value = props.width;
      } else {
        widthData.value = 120;
      }
      if (props.height >= 6) {
        heightData.value = props.height;
      } else {
        heightData.value = 6;
      }
    }
    // 进度的变化
    let percentageData = ref<number>();
    let textData = ref<string>();
    let isAnimation = ref<boolean>(true);
    let leftRotate = ref<number>();
    let rightRotate = ref<number>();
    watch(
      () => {
        return props.percentage;
      },
      (newval: number, oldval) => {
        if (newval >= 0 && newval <= 50) {
          rightRotate.value = (newval / 50) * 180;
          leftRotate.value = 0;
        } else if (newval > 50 && newval <= 100) {
          rightRotate.value = 180;
          leftRotate.value = ((newval - 50) / 50) * 180;
        }

        if (newval > 0 && newval < 100) {
          percentageData.value = newval;
        } else if (newval <= 0) {
          percentageData.value = 0;
        } else if (newval >= 100) {
          percentageData.value = 100;
          isAnimation.value = false;
        }
        setText();
      },
      { immediate: true }
    );
    // 文字内容
    function setText(): void {
      if (props.format === undefined) {
        textData.value = percentageData.value + "%";
      } else {
        textData.value = String(props.format());
      }
    }
    return {
      heightData,
      widthData,
      percentageData,
      textData,
      isAnimation,
      leftRotate,
      rightRotate,
    };
  },
});
</script>

<style scoped>
.cd-propgress-frame {
  display: flex;
  gap: 10px;
  font-size: v-bind(heightData/2 + "px");
  line-height: v-bind(heightData + "px");
}
.cd-progress-div {
  position: relative;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  border-radius: v-bind(heightData/2 + "px");
  background-color: #ebeef5;
  overflow: hidden;
}
.cd-progress-div-accomplish {
  position: relative;
  height: v-bind(heightData + "px");
  width: v-bind(percentageData/100 * widthData + "px");
  border-radius: v-bind(heightData/2 + "px");
  background-color: v-bind(color);
}
.cd-progress-div-accomplish-silde {
  animation: slide 1.5s linear infinite;
}
@keyframes slide {
  0% {
    position: absolute;
    left: v-bind(-percentageData/100 * widthData + "px");
    height: v-bind(heightData + "px");
    width: v-bind(percentageData/100 * widthData + "px");
  }
  100% {
    position: absolute;
    height: v-bind(heightData + "px");
    width: v-bind(percentageData/100 * widthData + "px");
    left: v-bind(widthData + "px");
  }
}
.cd-progress-div-textInside {
  position: absolute;
  right: 3px;
  color: white;
}
.cd-progress-text {
  text-align: center;
}
/* 环形 */
.cd-propgress-circle-frame {
  position: relative;
  height: v-bind(widthData + "px");
  width: v-bind(widthData + "px");
  font-size: v-bind(widthData/7.8 + "px");
  line-height: v-bind(widthData/7.8 + "px");
  border-radius: v-bind(widthData/2 + "px");
  border-color: #ebeef5;
  border-width: v-bind(heightData + "px");
  border-style: solid;
  background-color: white;
}
.cd-propgress-circle-div {
  position: absolute;
  top: v-bind(-heightData + "px");
  left: v-bind(-heightData + "px");
  display: flex;
}
.cd-propgress-circle-left-div {
  overflow: hidden;
  height: v-bind(widthData + "px");
  width: v-bind(widthData/2 + "px");
}
.cd-propgress-circle-left {
  height: v-bind(widthData + "px");
  width: v-bind(widthData + "px");
  border-radius: v-bind(widthData/2 + "px");
  border-width: v-bind(heightData + "px");
  border-color: v-bind(color);
  border-top-color: transparent;
  border-right-color: transparent;
  border-style: solid;
  transform: v-bind("'rotate('+(-135+leftRotate)+'deg'+')'");
}
.cd-propgress-circle-right-div {
  position: relative;
  overflow: hidden;
  height: v-bind(widthData + "px");
  width: v-bind(widthData/2 + "px");
}
.cd-propgress-circle-right {
  position: absolute;
  right: 0;
  height: v-bind(widthData + "px");
  width: v-bind(widthData + "px");
  border-radius: v-bind(widthData/2 + "px");
  border-width: v-bind(heightData + "px");
  border-color: v-bind(color);
  border-top-color: transparent;
  border-left-color: transparent;
  border-style: solid;
  transform: v-bind("'rotate('+(-225+rightRotate)+'deg'+')'");
}
.cd-propgress-circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
