<template>
  <div class="su">
    <cd-row :gap="20" flexWrap="wrap">
      <cd-badge value="new">
        <cd-button :width="120">Carpediem</cd-button>
      </cd-badge>
      <cd-badge value="hot">
        <cd-button :width="120">Carpediem</cd-button>
      </cd-badge>
    </cd-row>
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
}
.cd-website-image-lazy {
  height: 200px;
  overflow: auto;
}
</style>
