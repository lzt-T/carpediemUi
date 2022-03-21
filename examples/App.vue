<template>
  <div class="su">
    <cd-checkbox :size="60" border>asdsad</cd-checkbox>
    <cd-checkbox :size="50" border>asdsad</cd-checkbox>
    <cd-checkbox :size="40" border>asdsad</cd-checkbox>
  </div>

  <form method="post" action="http://127.0.0.1:3000/su">
    <input type="submit" />
  </form>
</template>

<script lang="ts">
import axios from "axios";
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    //   测试的数据
    let checkboxGroup = ref<string[]>(["Option1"]);
    return {
      checkboxGroup,
    };
  },
};
</script>

<style >
.su {
  font-size: 100px;
  line-height: 100px;
}
.cd-website-scroll-everyspan {
  display: inline-block;
  width: 200px;
  height: 20px;
  background-color: blueviolet;
}
.flex {
  width: 100vw;
  height: 200px;
  display: flex;
  overflow: auto;
  /* white-space: nowrap; */
  background-color: aqua;
}
.left {
  flex: 4;
  background-color: bisque;
  width: 0px;
}
.right {
  flex: 1;
}
.suuuuuu {
  width: 400px;
}
</style>
