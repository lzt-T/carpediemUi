<template>
  <div class="su">
    <cd-select
      v-model="selectDisabled1"
      :options="selectDisabledData1"
      filterable
    ></cd-select>
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
    let checkboxGroup = ref<number>(200);
    let selectDisabled1 = ref("Option1");
    let selectDisabledData1 = ref([{ label: "Option1" }, { label: "Option2" }]);
    return {
      selectDisabled1,
      checkboxGroup,
      selectDisabledData1,
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
