<template>
  <div class="su">
    asds
    <cd-input-number
      v-model="data"
      :height="32"
      :width="150"
      :min="2.01"
      :max="5"
      :step="2"
      :precision="0.01"
      :disabled="false"
      placeholder="输入"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
    ></cd-input-number>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let data = ref(4.91);
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
  height: 100px;
  font-size: 100px;
  line-height: 100px;
}
</style>
