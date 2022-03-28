<template>
  <div class="su">
    <cd-alert title="success alert" type="success"></cd-alert>
    <cd-alert title="info alert" type="info"></cd-alert>
    <cd-alert title="warning alert" type="warning"></cd-alert>
    <cd-alert title="error alert" type="error"></cd-alert>
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
    let options = ref([
      {
        value: "homepage",
        to: "/",
      },
      {
        value: "button",
        to: "/button",
      },
      {
        value: "asd",
      },
    ]);
    const format = (percentage: number) =>
      percentage === 100 ? "Full" : `${percentage}%`;
    return {
      options,
      format,
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
