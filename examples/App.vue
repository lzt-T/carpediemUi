<template>
  <div class="su">
    <cd-radio
      name="as"
      :height="32"
      :width="110"
      v-model="data"
      :disabled="false"
      :border="false"
      label="1"
      @change="onChange"
      >Basdasd</cd-radio
    >
    <!-- asd -->
    <cd-radio
      name="a"
      :height="70"
      :width="300"
      v-model="data"
      :disabled="false"
      :border="true"
      label="2"
      @change="onChange"
      >asdasd</cd-radio
    >
  </div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let data = ref();
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
