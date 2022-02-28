<template>
  <div class="su">
    <cd-slider
      class="suu"
      v-model="data"
      :disabled="false"
      :step="2"
      :height="32"
      :width="240"
      showStops="true"
      :marks="{ 0: 32, 23: 90 }"
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
    let data = ref(2);

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
