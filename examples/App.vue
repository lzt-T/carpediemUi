<template>
  <div class="su">
    <cd-input
      type="text"
      prefixIcon="fit"
      :showWordLinit="true"
      :maxLength="200"
      :clearable="true"
      :width="300"
      :height="32"
      :rows="5"
      :autosize="{ minRows: 3, maxRows: 5 }"
      :selectData="['asdasd', 'oisauio']"
      suffixIcon="fit"
      v-model="checkboxGroup"
    ></cd-input>
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
    let checkboxGroup = ref<string>("");
    return {
      checkboxGroup,
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
