<template>
  <div class="su">
    <cd-rate
      v-model="data"
      :max="10"
      :height="50"
      :disabled="false"
      :lowThreshold="2"
      :highThreshold="4"
      :colors="['#F7BA2A', 'red', 'yellow']"
      voidColor="#C6D1DE"
      :showScore="true"
      textColor="#1F2D3D"
      @change="onChange"
      iconName="fit"
    ></cd-rate>
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
    let data = ref(0.1);
    let selectData = ref(["12", "534"]);
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
    return {
      data,
      onFocus,
      onBlur,
      onChange,
      selectData,
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
</style>
