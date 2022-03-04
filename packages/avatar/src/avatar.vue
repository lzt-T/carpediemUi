<template>
  <div :class="{ 'cd-avatar-img-frame': true }">
    <cd-icon
      v-if="icon"
      :name="icon"
      :size="size / 2"
      color="white"
      :class="{ 'cd-avatar-img-icon': true }"
    ></cd-icon>
    <img
      :src="src"
      :alt="alt"
      :class="{ 'cd-avatar-img': true }"
      @error="onError"
      ref="img"
    />
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "cd-avatar",
  emits: ["error"],
  props: {
    icon: {
      type: String,
    },
    size: {
      type: Number,
      default: 50,
    },
    shape: {
      type: String,
      default: "circle",
    },
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
    fit: {
      type: String,
      default: "cover",
    },
  },
  components: {
    cdIcon,
  },
  setup(props, context) {
    let img = ref();
    //   设置大小
    let szieData = ref();
    setSize();
    function setSize() {
      if (props.size >= 24) {
        szieData.value = props.size;
      } else {
        szieData.value = 24;
      }
    }
    function onError() {
      context.emit("error", img.value);
    }
    return {
      szieData,
      onError,
      img,
    };
  },
});
</script>

<style scoped>
.cd-avatar-img-frame {
  position: relative;
  height: v-bind(szieData + "px");
  width: v-bind(szieData + "px");
  border-radius: v-bind("shape=='circle'?szieData/2+'px':5+'px'");
  background-color: #c1c4cd;
}
.cd-avatar-img-icon {
  position: absolute;
  height: v-bind(szieData + "px");
  width: v-bind(szieData + "px");
  line-height: v-bind(szieData/2 + "px");
  background-color: #c1c4cd;
  border-radius: v-bind("shape=='circle'?szieData/2+'px':5+'px'");
}
.cd-avatar-img-icon::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cd-avatar-img {
  position: absolute;
  border-radius: v-bind("shape=='circle'?szieData/2+'px':5+'px'");
  height: 100%;
  width: 100%;
  object-fit: v-bind(fit);
  text-align: center;
  font-size: 16px;
  line-height: 16px;
}
</style>