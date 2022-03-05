<template>
  <div class="su">
    <div>sadasd</div>
    <cd-carousel
      :height="213"
      :initialIndex="0"
      trigger="hover"
      :autoplay="true"
      :interval="3000"
      arrow="hover"
      :loop="true"
      @change="onChange"
      :src="[
        'https://cdn.jsdelivr.net/gh/lztnb/img@master/5.jpg',
        'https://cdn.jsdelivr.net/gh/lztnb/img@master/6.jpg',
      ]"
    ></cd-carousel>
    <form method="post" action="http://127.0.0.1:3000/su">
      <input type="submit" />
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let data = ref(90);
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
    function su(data: any) {
      console.log(data);

      return true;
    }
    // setInterval(() => {
    //   data.value = !data.value;
    // }, 1000);
    function onFocus(e: any) {
      console.log(e);
    }
    function onBlur(e: any) {
      console.log(e);
    }
    function onChange(e: any) {
      console.log(e);
    }
    function onClear() {
      console.log("asdas");
    }

    return {
      data,
      onFocus,
      onBlur,
      onChange,
      onClear,
      su,
    };
  },
};
</script>

<style >
.su {
  height: 600px;
  width: 600px;
  font-size: 100px;
  line-height: 100px;
  /* background-color: bisque; */
}
</style>
