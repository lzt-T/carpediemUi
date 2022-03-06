<template>
  <div class="cd-image-frame">
    <img
      :src="srcData"
      :alt="alt"
      ref="image"
      @error="onError"
      @click="onClick"
    />
    <div v-if="isError" class="cd-image-error-frame">
      <slot name="err"></slot>
    </div>
  </div>
  <teleport to="body" v-if="isBrowse">
    <div :class="{ 'cd-image-browse-frame': true }">
      <div :class="{ 'cd-image-browse-cover': true }"></div>
      <div class="cd-image-browse-img-frame">
        <img
          :src="previewSrcList[initialIndexData]"
          class="cd-image-browse-img"
        />
      </div>
      <div class="cd-image-browse-left-frame">
        <cd-icon
          name="leftArrowTow"
          color="white"
          :size="24"
          class="cd-image-browse-left"
        ></cd-icon>
      </div>
      <div class="cd-image-browse-right-frame">
        <cd-icon
          name="rightArrowTow"
          color="white"
          :size="24"
          class="cd-image-browse-right"
        ></cd-icon>
      </div>
      <div class="cd-image-browse-del-frame">
        <cd-icon
          name="delete"
          color="white"
          :size="24"
          class="cd-image-browse-del"
        ></cd-icon>
      </div>
      <!-- 组合键 -->
      <div>
        <cd-icon></cd-icon>
        <cd-icon></cd-icon>
        <cd-icon></cd-icon>
        <cd-icon></cd-icon>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, onMounted, ref, watch, watchEffect } from "vue";
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
    let srcData = ref<string>("");
    srcData.value =
      "https://acmphoto.oss-cn-beijing.aliyuncs.com/%E5%8A%A0%E8%BD%BD%E4%B8%AD4_3.png";
    if (props.lazy == false) {
      srcData.value = props.src;
    }
    let isParent = ref(false);
    let parent = ref();
    let image = ref();
    let isError = ref(false);
    function onError() {
      isError.value = true;
    }
    // 获取最近一个可以滚动的DOM，都没有最终为body
    function getParent(e: any) {
      let T = e.parentNode;
      while (true) {
        if (T == document.body) {
          break;
        }
        if (T.offsetHeight == T.scrollHeight) {
          T = getParent(T);
        } else {
          break;
        }
      }
      return T;
    }
    // 得到距离页面最上方的距离
    function getoffsetTop(e: HTMLElement) {
      let offset = e.offsetTop;
      if (e.offsetParent != null) {
        offset += getoffsetTop(e.offsetParent as HTMLElement);
      }
      return offset;
    }
    watch(isParent, (newval, oldval) => {
      if (newval) {
        onScroll(parent.value);
        if (document.body == parent.value) {
          window.addEventListener("scroll", onScroll);
        } else {
          parent.value.addEventListener("scroll", onScroll);
        }
      }
    });
    // 当滚动时
    function onScroll(e: any) {
      let distance = 0;
      let scrollDistance = 0;
      if (document.body == parent.value) {
        distance = document.documentElement.clientHeight;
      } else {
        distance = parent.value.clientHeight;
      }
      if (document.body == parent.value) {
        scrollDistance = document.documentElement.scrollTop;
      } else {
        scrollDistance = parent.value.scrollTop;
      }
      if (
        getoffsetTop(image.value) -
          getoffsetTop(parent.value) -
          scrollDistance <=
        distance
      ) {
        srcData.value = props.src;
      }
    }
    onMounted(() => {
      if (props.lazy) {
        parent.value = getParent(image.value);
        isParent.value = true;
      }
    });
    // 切换
    let browseImg = new Image();
    let browseImgUrl: string;
    let browseImgHeight = ref<number>();
    let browseImgWidth = ref<number>();
    let isBrowse = ref(false);
    let initialIndexData = ref();
    function onClick() {
      if (props.previewSrcList === undefined) {
        return;
      } else {
        isBrowse.value = true;
        initialIndexData.value = props.initialIndex;
        browseImgUrl = props.previewSrcList[initialIndexData.value] as string;
        browseImg.src = browseImgUrl;
        browseImgHeight.value = browseImg.height;
        browseImgWidth.value = browseImg.width;
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
}
.cd-image-error-frame {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  top: 0;
  left: 0;
}

.cd-image-browse-frame {
  position: absolute;
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
.cd-image-browse-img-frame {
  width: v-bind(browseImgWidth + "px");
  height: v-bind(browseImgWidth + "px");
}
.cd-image-browse-img {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: v-bind(browseImgWidth + "px");
  height: v-bind(browseImgWidth + "px");
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
</style>