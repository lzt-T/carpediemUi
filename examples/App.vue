<template>
  <div class="su">
    asd\
    <button @click="onSizeChange">Button</button>
    <div class="suu">
      <cd-image
        src="https://cdn.jsdelivr.net/gh/lztnb/img@master/5.jpg"
        :previewSrcList="['https://cdn.jsdelivr.net/gh/lztnb/img@master/5.jpg']"
      ></cd-image>
    </div>
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
    let data = ref(false);
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
    function onSizeChange(aa: any) {
      data.value = true;
      console.log("asd");
    }
    function onCurrentChange(e: any) {
      console.log("pppp");
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
  margin-left: 20px;
  width: 900px;
  height: 2000px;
  font-size: 100px;
  line-height: 100px;
}
.suu {
  margin-top: 50px;
  height: 600px;
  width: 100px;
}
.ppp {
  /* margin: 20px; */
  background-color: aquamarine;
  padding: 20px;
}
</style>
