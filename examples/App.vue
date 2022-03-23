<template>
  <div class="su">
    <cd-input
      v-model="inputSearch"
      :selectData="searchData"
      prefixIcon="searchTow"
    >
    </cd-input>
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
    let inputSearch = ref<string>("");
    let searchData = ref<string[]>([
      "Vue",
      "React",
      "Js",
      "Axios",
      "WebSocket",
      "asdas",
      "asdasds",
    ]);
    return {
      inputSearch,
      searchData,
    };
  },
};
</script>

<style >
.su {
  padding: 40px;
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
