<template>
  <a class="cd-link" :href="hrefData" v-if="disabled == false">
    <slot></slot>
  </a>
  <span class="cd-disabled-link" v-if="disabled == true">
    <slot></slot>
  </span>
</template>

<script lang="ts">
// 使用icon是只要把字体大小和图标大小调味一样的就行
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "cd-link",
  components: {
    cdIcon,
  },
  props: {
    //字体颜色和触摸时的颜色
    color: {
      type: String,
      default: "black",
    },
    //链接地址
    href: {
      type: String,
      default: "#",
    },
    //触摸时是否有下划线
    underline: {
      type: Boolean,
      default: true,
    },
    //是不是处于禁用状态
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let hrefData = props.href;
    let underlineData = "";
    underlineData = props.underline == true ? "underline" : "none";
    return {
      underlineData,
      hrefData,
    };
  },
});
</script>

<style scoped>
.cd-link {
  text-decoration: none;
  color: v-bind(color);
}
.cd-link:hover {
  text-decoration: v-bind(underlineData);
  color: v-bind(color);
  opacity: 0.75;
}

.cd-disabled-link {
  text-decoration: none;
  color: v-bind(color);
  opacity: 0.75;
}
.cd-disabled-link:hover {
  text-decoration: none;
  color: v-bind(color);
  opacity: 0.75;
  cursor: not-allowed;
}
</style>