<template>
  <div class="su">
    <cd-slider
      class="suu"
      v-model="data"
      :disabled="true"
      :height="32"
      :width="400"
      :step="8"
      :showStops="true"
      :max="100"
      @change="onChange"
    ></cd-slider>
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
    let data = ref(60);
    // setInterval(() => {
    //   data.value += 2;
    //   console.log(data.value);
    // }, 400);
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
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
