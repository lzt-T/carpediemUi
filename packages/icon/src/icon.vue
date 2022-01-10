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
  src: url("//at.alicdn.com/t/font_2988922_6cyp0cmihen.woff2?t=1641788324916")
      format("woff2"),
    url("//at.alicdn.com/t/font_2988922_6cyp0cmihen.woff?t=1641788324916")
      format("woff"),
    url("//at.alicdn.com/t/font_2988922_6cyp0cmihen.ttf?t=1641788324916")
      format("truetype");
}

.cd {
  font-family: "cd" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-ce:before {
  content: "\e63d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
</style>