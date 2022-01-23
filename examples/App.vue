<template>
  <cd-button :disabled="false"
    >阿
    <cd-icon name="fit" :size="19"></cd-icon>
  </cd-button>

  <div class="su">
    <cd-checkbox
      v-model="aa"
      label="ppasdasdasdasdsa"
      :size="40"
      :disabled="false"
      :border="false"
      :checked="false"
    >
    </cd-checkbox>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let aa = ref(true);
    watch(aa, (newval, oldval) => {
      console.log("新的值", newval);
    });

    return {
      aa,
    };
  },
};
</script>

<style >
</style>
