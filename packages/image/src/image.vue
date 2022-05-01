<template>
  <div class="cd-image-frame">
    <img
      v-show="isError == false"
      :src="srcData"
      :alt="alt"
      ref="image"
      @error="onError"
      @click="onClick"
    />
    <div v-if="isError" class="cd-image-error-frame">
      <div v-if="isErrSlot == false" class="cd-image-error">
        <div>FAILED</div>
      </div>
      <div class="cd-image-error-slot" ref="errslot">
        <slot name="err"></slot>
      </div>
    </div>

    <div
      :class="{
        'cd-image-browse-frame': true,
      }"
      v-if="isBrowse && previewSrcList.length > 0"
      @wheel.prevent="rollerRolling($event)"
    >
      <div
        :class="{ 'cd-image-browse-cover': true }"
        @click="hideOnClickModal ? closeBrowse() : ''"
      ></div>
      <img
        :src="previewSrcList[initialIndexData]"
        :class="{
          'cd-image-browse-img': true,
          'cd-image-lessen-animation': lessenAnimation,
          'cd-image-magnify-animation': magnifyAnimation,
          'cd-image-rightRotate-animation': isRightRotate,
          'cd-image-leftRotate-animation': isLeftRotate,
        }"
        @mousedown="onMousedown($event)"
        @mouseup="onMouseup($event)"
        @mousemove="onMousemove($event)"
        @dragstart.prevent=""
      />

      <div class="cd-image-browse-left-frame">
        <cd-icon
          name="leftArrowTwo"
          color="white"
          :size="24"
          class="cd-image-browse-left"
          @click="clickLeft"
        ></cd-icon>
      </div>
      <div class="cd-image-browse-right-frame">
        <cd-icon
          name="rightArrowTwo"
          color="white"
          :size="24"
          class="cd-image-browse-right"
          @click="clickRight"
        ></cd-icon>
      </div>
      <div class="cd-image-browse-del-frame">
        <cd-icon
          name="delete"
          color="white"
          :size="24"
          class="cd-image-browse-del"
          @click="closeBrowse"
        ></cd-icon>
      </div>
      <!-- 组合键 -->
      <div class="cd-image-combination-button-frame">
        <cd-icon
          name="lessen"
          class="cd-image-combination-button-lessen"
          :size="30"
          color="white"
          @click="onLessen"
        ></cd-icon>
        <cd-icon
          name="magnify"
          class="cd-image-combination-button-magnify"
          :size="30"
          color="white"
          @click="onMagnify"
        ></cd-icon>
        <cd-icon
          name="leftRotate"
          class="cd-image-combination-button-leftRotate"
          :size="30"
          color="white"
          @click="onLeftRotate"
        ></cd-icon>
        <cd-icon
          name="rightRotate"
          class="cd-image-combination-button-rightRotate"
          :size="30"
          color="white"
          @click="onRightRotate"
        ></cd-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  watchEffect,
  nextTick,
} from "vue";
export default defineComponent({
  name: "cd-image",
  components: {
    cdIcon,
  },
  props: {
    lazy: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      required: true,
    },
    previewSrcList: {
      type: Array,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    fit: {
      type: String,
      default: "fill",
    },
    alt: {
      type: String,
    },
    hideOnClickModal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let errslot = ref<object>();
    let isErrSlot = ref<boolean>(false);
    let srcData = ref<string>("");
    srcData.value =
      "https://acmphoto.oss-cn-beijing.aliyuncs.com/%E5%8A%A0%E8%BD%BD%E4%B8%AD4_3.png";
    if (props.lazy == false) {
      srcData.value = props.src;
    }
    let parent = ref();
    let image = ref();
    let isError = ref<boolean>(false);
    function onError() {
      isError.value = true;
      nextTick(() => {
        if ((errslot.value as HTMLDivElement).clientHeight > 0) {
          isErrSlot.value = true;
        } else {
          isErrSlot.value = false;
        }
      });
    }
    // 获取最近一个可以滚动的DOM，都没有最终为body
    function getParent<T extends HTMLElement>(e: T): T {
      let parentDom = e.parentNode;
      while (true) {
        if (parentDom == document.body) {
          break;
        }
        if ((parentDom as T).clientHeight == (parentDom as T).scrollHeight) {
          parentDom = getParent(parentDom as T);
        } else {
          break;
        }
      }
      return parentDom as T;
    }
    function getoffsetTop<T extends HTMLElement>(e: T): number {
      let offset = e.offsetTop;
      // 一直递归到最外层
      if (e.offsetParent != null) {
        offset += getoffsetTop(e.offsetParent as T);
      }
      return offset;
    }

    // 节流
    let time: any;
    function onScroll() {
      if (time == null) {
        time = setTimeout(() => {
          onShow();
          time = null;
        }, 500);
      }
    }
    // 当滚动时
    function onShow(): void {
      let cHeight: number = 0;
      let sTop: number = 0;
      if (document.body == parent.value) {
        cHeight = document.documentElement.clientHeight;
        sTop = document.documentElement.scrollTop;
        window.addEventListener("scroll", onScroll);
      } else {
        cHeight = parent.value.clientHeight;
        sTop = parent.value.scrollTop;
        parent.value.addEventListener("scroll", onScroll);
      }
      if (
        getoffsetTop(image.value) - getoffsetTop(parent.value) - sTop <=
        cHeight
      ) {
        srcData.value = props.src;
      }
    }
    onMounted(() => {
      if (props.lazy) {
        parent.value = getParent(image.value);
      }
    });
    // 切换
    let browseImg = new Image();
    let browseImgUrl: string;
    let browseImgHeight = ref<number>();
    let browseImgWidth = ref<number>();
    let isBrowse = ref<boolean>(false);
    let initialIndexData = ref<number>(0);
    let multiple = ref<number>(1);
    let lessenAnimation = ref<Boolean>(false);
    let magnifyAnimation = ref<Boolean>(false);
    // 设置图片信息
    function setBrowseImg(): void {
      let PictureColumn: number = 1;
      if (
        props.previewSrcList === undefined ||
        props.previewSrcList.length == 0
      ) {
        return;
      }
      browseImgUrl = props.previewSrcList[initialIndexData.value] as string;
      browseImg.src = browseImgUrl;
      PictureColumn = browseImg.height / browseImg.width;
      browseImgWidth.value = document.documentElement.scrollWidth * 0.7;
      browseImgHeight.value = browseImgWidth.value * PictureColumn;
    }
    // 打开图片弹窗
    function onClick(): void {
      if (
        props.previewSrcList === undefined ||
        props.previewSrcList.length == 0
      ) {
        return;
      } else {
        multiple.value = 1;
        imgRotate.value = 0;
        isBrowse.value = true;
        dragInitialize();
        if (
          props.initialIndex >= 0 &&
          props.initialIndex < props.previewSrcList.length
        ) {
          initialIndexData.value = props.initialIndex;
        } else {
          initialIndexData.value = 0;
        }
        setBrowseImg();
      }
    }
    // 上一张
    function clickLeft(): void {
      multiple.value = 1;
      imgRotate.value = 0;
      dragInitialize();
      if (props.previewSrcList === undefined) {
        return;
      }
      initialIndexData.value = initialIndexData.value - 1;
      if (initialIndexData.value < 0) {
        initialIndexData.value = props.previewSrcList?.length - 1;
      }
      setBrowseImg();
    }
    // 下一张
    function clickRight(): void {
      multiple.value = 1;
      imgRotate.value = 0;
      dragInitialize();
      if (props.previewSrcList === undefined) {
        return;
      }
      initialIndexData.value = initialIndexData.value + 1;
      if (initialIndexData.value >= props.previewSrcList.length) {
        initialIndexData.value = 0;
      }
      setBrowseImg();
    }
    // 关闭图片弹窗
    function closeBrowse(): void {
      isBrowse.value = false;
    }
    // 缩小
    function onLessen(): void {
      if (multiple.value < 0.2 || lessenAnimation.value) {
        return;
      }
      lessenAnimation.value = true;
      setTimeout(() => {
        lessenAnimation.value = false;
      }, 100);
      multiple.value = multiple.value * 0.8;
    }
    // 放大
    function onMagnify(): void {
      if (multiple.value > 6 || magnifyAnimation.value) {
        return;
      }
      magnifyAnimation.value = true;
      setTimeout(() => {
        magnifyAnimation.value = false;
      }, 100);
      multiple.value = multiple.value * 1.2;
    }
    let isRightRotate = ref<boolean>();
    let isLeftRotate = ref<boolean>();
    // 向左旋转
    function onLeftRotate(): void {
      if (isLeftRotate.value) {
        return;
      }
      isLeftRotate.value = true;
      setTimeout(() => {
        isLeftRotate.value = false;
      }, 200);
      imgRotate.value = imgRotate.value - 90;
      if (imgRotate.value < 0) {
        imgRotate.value = 270;
      }
    }
    // 向右旋转90度
    function onRightRotate(): void {
      if (isRightRotate.value) {
        return;
      }
      isRightRotate.value = true;
      setTimeout(() => {
        isRightRotate.value = false;
      }, 200);
      imgRotate.value = imgRotate.value + 90;
      if (imgRotate.value == 360) {
        imgRotate.value = 0;
      }
    }
    // 拖动
    let isDrag = ref<Boolean>(false);
    let startX = ref<number>(0);
    let startY = ref<number>(0);
    let moveXLoading = ref<number>(0);
    let moveYLoading = ref<number>(0);
    let lastX = ref<number>(0);
    let lastY = ref<number>(0);
    let moveX = ref<number>(0);
    let moveY = ref<number>(0);
    let imgRotate = ref<number>(0);
    function dragInitialize(): void {
      startX.value = 0;
      startY.value = 0;
      moveXLoading.value = 0;
      moveYLoading.value = 0;
      lastX.value = 0;
      lastY.value = 0;
      moveX.value = 0;
      moveY.value = 0;
    }
    function onMousedown(e: { clientX: number; clientY: number }): void {
      isDrag.value = true;
      startX.value = e.clientX;
      startY.value = e.clientY;
    }
    function onMousemove(e: { clientX: number; clientY: number }): void {
      if (isDrag.value == false) {
        return;
      }
      moveXLoading.value = e.clientX - startX.value;
      moveYLoading.value = e.clientY - startY.value;
      moveX.value = lastX.value + moveXLoading.value;
      moveY.value = lastY.value + moveYLoading.value;
    }
    function onMouseup(e: { clientX: number; clientY: number }): void {
      isDrag.value = false;
      lastX.value = lastX.value + e.clientX - startX.value;
      lastY.value = lastY.value + e.clientY - startY.value;
    }
    function rollerRolling(e: { deltaY: number }): void {
      if (e.deltaY > 0) {
        if (multiple.value < 0.2) {
          return;
        }
        multiple.value = multiple.value * 0.95;
      } else {
        if (multiple.value > 6) {
          return;
        }
        multiple.value = multiple.value / 0.95;
      }
    }
    return {
      image,
      srcData,
      onError,
      isError,
      onClick,
      isBrowse,
      initialIndexData,
      browseImgHeight,
      browseImgWidth,
      clickLeft,
      clickRight,
      closeBrowse,
      onLessen,
      onMagnify,
      multiple,
      lessenAnimation,
      magnifyAnimation,
      onMousedown,
      onMousemove,
      onMouseup,
      moveX,
      moveY,
      onRightRotate,
      onLeftRotate,
      imgRotate,
      isRightRotate,
      isLeftRotate,
      rollerRolling,
      errslot,
      isErrSlot,
    };
  },
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.cd-image-frame {
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 17px;
  line-height: 20px;
}

img {
  height: 100%;
  width: 100%;
  object-fit: v-bind(fit);
  display: block;
}
.cd-image-error-frame {
  height: 100%;
  width: 100%;
}
.cd-image-error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 200px;
  color: #a8abb2;
  background-color: #f5f7fa;
}

.cd-image-browse-frame {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100vh;
  width: 100vw;
}
.cd-image-browse-cover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  opacity: 0.5;
}
.cd-image-browse-img {
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: v-bind(
    "'translate('+(-browseImgWidth* multiple/2+moveX)+'px'+','+(-browseImgHeight * multiple/2+moveY)+'px'+')'+' rotate('+imgRotate+'deg'+')'"
  );
  width: v-bind(browseImgWidth * multiple + "px");
  height: v-bind(browseImgHeight * multiple + "px");
}

.cd-image-lessen-animation {
  animation: lessen 0.1s linear;
}
@keyframes lessen {
  0% {
    width: v-bind(browseImgWidth * multiple/0.8 + "px");
    height: v-bind(browseImgHeight * multiple/0.8 + "px");
    transform: v-bind(
      "'translate('+(-browseImgWidth* multiple/0.8/2+moveX)+'px'+','+(-browseImgHeight * multiple/0.8/2+moveY)+'px'+')'+' rotate('+imgRotate+'deg'+')'"
    );
  }
  100% {
    width: v-bind(browseImgWidth * multiple + "px");
    height: v-bind(browseImgHeight * multiple + "px");
    transform: v-bind(
      "'translate('+(-browseImgWidth* multiple/2+moveX)+'px'+','+(-browseImgHeight * multiple/2+moveY)+'px'+')'+' rotate('+imgRotate+'deg'+')'"
    );
  }
}
.cd-image-magnify-animation {
  animation: magnify 0.1s linear;
}
@keyframes magnify {
  0% {
    width: v-bind(browseImgWidth * multiple/1.2 + "px");
    height: v-bind(browseImgHeight * multiple/1.2 + "px");
    transform: v-bind(
      "'translate('+(-browseImgWidth* multiple/1.2/2+moveX)+'px'+','+(-browseImgHeight * multiple/1.2/2+moveY)+'px'+')'+' rotate('+imgRotate+'deg'+')'"
    );
  }
  100% {
    width: v-bind(browseImgWidth * multiple + "px");
    height: v-bind(browseImgHeight * multiple + "px");
    transform: v-bind(
      "'translate('+(-browseImgWidth* multiple/2+moveX)+'px'+','+(-browseImgHeight * multiple/2+moveY)+'px'+')'+' rotate('+imgRotate+'deg'+')'"
    );
  }
}
.cd-image-rightRotate-animation {
  animation: rightrotate 0.2s linear;
}
@keyframes rightrotate {
  0% {
    transform: v-bind(
      "'translate('+(-browseImgWidth* multiple/2+moveX)+'px'+','+(-browseImgHeight * multiple/2+moveY)+'px'+')'+' rotate('+(imgRotate-90)+'deg'+')'"
    );
  }
  100% {
    transform: v-bind(
      "'translate('+(-browseImgWidth* multiple/2+moveX)+'px'+','+(-browseImgHeight * multiple/2+moveY)+'px'+')'+' rotate('+imgRotate+'deg'+')'"
    );
  }
}
.cd-image-leftRotate-animation {
  animation: leftrotate 0.2s linear;
}
@keyframes leftrotate {
  0% {
    transform: v-bind(
      "'translate('+(-browseImgWidth* multiple/2+moveX)+'px'+','+(-browseImgHeight * multiple/2+moveY)+'px'+')'+' rotate('+(imgRotate+90)+'deg'+')'"
    );
  }
  100% {
    transform: v-bind(
      "'translate('+(-browseImgWidth* multiple/2+moveX)+'px'+','+(-browseImgHeight * multiple/2+moveY)+'px'+')'+' rotate('+imgRotate+'deg'+')'"
    );
  }
}
.cd-image-browse-left-frame {
  position: absolute;
  top: 50%;
  left: 35px;
  transform: translateY(-50%);
  z-index: 2;
  height: 44px;
  width: 44px;
  border-radius: 22px;
  background-color: #606266;
  opacity: 0.8;
}
.cd-image-browse-left,
.cd-image-browse-right,
.cd-image-browse-del {
  line-height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cd-image-browse-right-frame {
  position: absolute;
  top: 50%;
  right: 35px;
  transform: translateY(-50%);
  z-index: 2;
  height: 44px;
  width: 44px;
  border-radius: 22px;
  background-color: #606266;
  opacity: 0.8;
}
.cd-image-browse-del-frame {
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 2;
  height: 44px;
  width: 44px;
  border-radius: 22px;
  background-color: #606266;
  opacity: 0.8;
}
.cd-image-combination-button-frame {
  position: absolute;
  z-index: 2;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  height: 44px;
  border-radius: 22px;
  background-color: #606266;
  opacity: 0.8;
}
.cd-image-combination-button-lessen {
  flex: 1;
  margin-left: 22px;
  margin-right: 15px;
  line-height: 30px;
}
.cd-image-combination-button-magnify {
  flex: 1;
  margin-right: 15px;
  line-height: 30px;
}
.cd-image-combination-button-leftRotate {
  flex: 1;
  margin-right: 15px;
  line-height: 30px;
}
.cd-image-combination-button-rightRotate {
  flex: 1;
  margin-right: 22px;
  line-height: 30px;
}
</style>
