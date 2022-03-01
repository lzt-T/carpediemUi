<template>
  <div class="su">
    asdsa
    <cd-slider v-model="data"></cd-slider>
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
    let data = ref(32);
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
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
    };
  },
};
</script>

<style >
.su {
  height: 600px;
  font-size: 100px;
  line-height: 100px;
}
.suu {
  position: absolute;
  top: 100px;
  left: 100px;
}
</style>
