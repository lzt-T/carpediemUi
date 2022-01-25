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
      :border="true"
      @onChange="su"
    >
    </cd-checkbox>

    <cd-checkbox-group
      v-model="bb"
      :option="bb1"
      @onChange="su"
      :size="40"
      :border="true"
      :min="1"
      :max="2"
    >
    </cd-checkbox-group>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let aa = ref(false);
    watch(aa, (newval, oldval) => {
      console.log("新的值", newval);
    });
    function su(data: any) {
      console.log(data);
    }

    let bb = ref(["b"]);
    let bb1 = ref(["a", "b", "c"]);
    watch(bb, (newval, oldval) => {
      console.log(newval);
    });
    return {
      aa,
      su,
      bb,
      bb1,
    };
  },
};
</script>

<style >
</style>
