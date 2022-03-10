<template>
  <div class="su">
    djgas
    <cd-progress
      type="circle"
      :percentage="data"
      :width="200"
      :height="6"
      :textInside="false"
      :showText="true"
      :format="onClear"
      :animation="false"
    ></cd-progress>
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
    let data = ref(20);
    setInterval(() => {
      if (data.value == 100) {
        return;
      }
      data.value = data.value + 2;
    }, 500);
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
    function onSizeChange(data: any) {
      console.log(data);
      return true;
    }
    function onCurrentChange(e: any) {
      console.log(e);
    }
    function onpPrevClick(e: any) {
      console.log(e);
    }
    function onNextClick(e: any) {
      console.log(e);
    }
    function onClear() {
      return data.value + "/%";
    }

    return {
      data,
      onSizeChange,
      onCurrentChange,
      onpPrevClick,
      onClear,
      onNextClick,
    };
  },
};
</script>

<style >
.su {
  width: 900px;
  font-size: 100px;
  line-height: 100px;
}
</style>
