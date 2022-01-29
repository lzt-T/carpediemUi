<template>
  <div class="su">
    <cd-date-picker v-model="data" :height="32" :width="240"></cd-date-picker>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let data = ref();
    function change(data: any) {
      console.log(data);
    }
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
    return {
      change,
      data,
    };
  },
};
</script>

<style >
/* .su {
  height: 300px;
  font-size: 300x;
  line-height: 300px;
} */
</style>
