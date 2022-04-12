<template>
  <div class="su">
    <cd-image
      src="https://cdn.jsdelivr.net/gh/lztnb/img@master/5.jpg"
      lazy
      fit="cover"
    >
    </cd-image>
    <br />
    <cd-image
      src="https://cdn.jsdelivr.net/gh/lztnb/img@master/6.jpg"
      lazy
      fit="cover"
    >
    </cd-image>
    <br />
    <cd-image
      src="https://cdn.jsdelivr.net/gh/lztnb/img@master/7.jpg"
      lazy
      fit="cover"
    >
    </cd-image>
  </div>
  <div v-for="data in 50" :key="data">sad</div>

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
    let isDrawer = ref<boolean>(false);
    const changeIsDrawer = (data: boolean) => {
      isDrawer.value = data;
    };
    const format = (percentage: number) =>
      percentage === 100 ? "Full" : `${percentage}%`;
    return {
      changeIsDrawer,
      format,
      isDrawer,
    };
  },
};
</script>

<style >
.su {
  padding: 40px;
  height: 200px;
  overflow: auto;
}
.cd-website-image-lazy {
  height: 200px;
  overflow: auto;
}
</style>
