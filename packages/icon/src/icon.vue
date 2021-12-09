<template>
  <i :class="type"></i>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "cd-icon",
  props: {
    color: {
      type: String,
      default: "black",
    },
    size: {
      type: Number,
      default: 50,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let type = `cd ${props.name}`;
    return {
      type,
    };
  },
});
</script>

<style scoped>
@font-face {
  font-family: "cd"; /* Project id 2988922 */
  src: url("//at.alicdn.com/t/font_2988922_bjsliiqkzuh.woff2?t=1638770412198")
      format("woff2"),
    url("//at.alicdn.com/t/font_2988922_bjsliiqkzuh.woff?t=1638770412198")
      format("woff"),
    url("//at.alicdn.com/t/font_2988922_bjsliiqkzuh.ttf?t=1638770412198")
      format("truetype");
}

.cd {
  font-family: "cd" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-ce:before {
  content: "\e74a";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-c:before {
  content: "\e6a1";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-ci:before {
  content: "\e605";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
</style>