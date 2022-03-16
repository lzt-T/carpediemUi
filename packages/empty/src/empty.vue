<template>
  <div class="cd-empty-frame">
    <!-- 图片 -->
    <div class="cd-empty-img-frame">
      <div v-show="isImgDom == false" class="cd-empty-img">
        <img :src="img" />
      </div>
      <div v-show="isImgDom" class="cd-empty-img-slot" ref="imgDom">
        <slot name="image"></slot>
      </div>
    </div>
    <!-- 描述 -->
    <div class="cd-empty-description-frame">
      <div v-show="isDescriptionDom == false" class="cd-empty-description">
        {{ description }}
      </div>
      <div
        v-show="isDescriptionDom"
        class="cd-empty-description-slot"
        ref="descriptionDom"
      >
        <slot name="description"></slot>
      </div>
    </div>
    <!-- 底部内容 -->
    <div class="cd-empty-default-frame">
      <div v-show="isDefaultDom" class="cd-empty-default-slot" ref="defaultDom">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, onMounted, ref, watch } from "vue";
export default defineComponent({
  name: "cd-empty",
  components: {
    cdIcon,
  },
  props: {
    img: {
      type: String,
      default:
        "https://acmphoto.oss-cn-beijing.aliyuncs.com/CW_%E6%97%A0%E7%89%A9%E5%93%81.png",
    },
    imageSize: {
      type: Number,
      default: 200,
    },
    description: {
      type: String,
      default: "No Data",
    },
  },
  setup() {
    // 描述
    let isDescriptionDom = ref<boolean>(true);
    let descriptionDom = ref<object>();
    let descriptionHeight = ref<number>();
    let isImgDom = ref<boolean>(true);
    let imgDom = ref<object>();
    let imgHeight = ref<number>();
    let isDefaultDom = ref<boolean>(true);
    let defaultDom = ref<object>();
    let defaultHeight = ref<number>();
    onMounted(() => {
      descriptionHeight.value = (
        descriptionDom.value as HTMLDivElement
      ).clientHeight;
      if (descriptionHeight.value > 0) {
        isDescriptionDom.value = true;
      } else {
        isDescriptionDom.value = false;
      }
      imgHeight.value = (imgDom.value as HTMLDivElement).clientHeight;
      if (imgHeight.value > 0) {
        isImgDom.value = true;
      } else {
        isImgDom.value = false;
      }
      defaultHeight.value = (defaultDom.value as HTMLDivElement).clientHeight;
      if (defaultHeight.value > 0) {
        isDefaultDom.value = true;
      } else {
        isDefaultDom.value = false;
      }
    });
    return {
      descriptionHeight,
      descriptionDom,
      isDescriptionDom,
      isImgDom,
      imgDom,
      imgHeight,
      isDefaultDom,
      defaultDom,
      defaultHeight,
    };
  },
});
</script>

<style scoped>
.cd-empty-frame {
  position: relative;
  width: 100%;
  background-color: aqua;
  padding-top: 40px;
  padding-bottom: 40px;
}
.cd-empty-img-frame {
  position: relative;
}
.cd-empty-img {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: v-bind(imageSize + "px");
  width: v-bind(imageSize + "px");
}
img {
  height: v-bind(imageSize + "px");
  width: v-bind(imageSize + "px");
}
.cd-empty-img-slot {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
}

.cd-empty-description-frame {
  width: 100%;
}
.cd-empty-description {
  width: 100%;
  height: 45px;
  font-size: 16px;
  line-height: 45px;
  text-align: center;
  color: #909399;
}
.cd-empty-description-slot {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
}
.cd-empty-default-frame {
  position: relative;
}
.cd-empty-default-slot {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>