<template>
  <div class="su">
    asdsad
    <cd-avatar
      :size="50"
      shape="circle"
      src="https://cdn.jsdelivr.net/gh/lzb/img@master/5.jpg"
      alt="asdsa"
      fit="cover"
      @error="onChange"
    ></cd-avatar>
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
    let data = ref(false);
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
  height: 900px;
  width: 600px;
  font-size: 100px;
  line-height: 100px;
  /* background-color: bisque; */
}
</style>
