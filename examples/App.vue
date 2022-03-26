<template>
  <div class="su">
    <cd-progress :percentage="100" :format="format"></cd-progress>
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
    let option1 = ref<boolean>(true);
    let option2 = ref<boolean>(false);
    const format = (percentage: number) =>
      percentage === 100 ? "Full" : `${percentage}%`;
    return {
      option1,
      option2,
      format,
    };
  },
};
</script>

<style >
.su {
  /* height: 200px; */
  padding: 40px;
  /* font-size: 200px; */
  /* line-height: 200px; */
}
.cd-website-image-lazy {
  height: 200px;
  overflow: auto;
}
</style>
