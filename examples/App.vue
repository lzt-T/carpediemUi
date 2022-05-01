<template>
  <div class="su">
    <cd-image
      src="https://cdn.jsdelivr.net/gh/lzt-T/img@master/Cee/carpediem.png"
      :previewSrcList="[
        'https://cdn.jsdelivr.net/gh/lzt-T/img@master/Cee/carpediem.png',
      ]"
      fit="cover"
    ></cd-image>
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
  height: 200px;
  width: 200px;
}
image {
  height: 100%;
  width: 100%;
}
</style>
