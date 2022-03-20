<template>
  <div class="su"></div>
  <form method="post" action="http://127.0.0.1:3000/su">
    <input type="submit" />
  </form>
</template>

<script lang="ts">
import axios from "axios";
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    interface attributesfrom {
      property: string;
      explain: string;
      type: string;
      optional: string;
      default: string;
    }
    let attributesFormData = ref<attributesfrom[]>([
      {
        property: "size",
        explain:
          "尺uashjfgagsfhjasfghjkgahjsfkasgjkfhasgdhasjdkjashdgashkajskhdgjasgkasjdgkj寸",
        type: "number",
        optional: "--",
        default: "38",
      },
    ]);
    let data = ref(true);
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
    function onSizeChange(aa: any) {}
    function onCurrentChange(e: any) {
      console.log("pppp");
    }
    function onpPrevClick(e: any) {
      console.log(e);
    }
    function onNextClick(e: any) {
      console.log(e);
    }
    function onClear() {
      return data.value + "/%";
    }

    return {
      attributesFormData,
      data,
      onSizeChange,
      onCurrentChange,
      onpPrevClick,
      onClear,
      onNextClick,
    };
  },
};
</script>

<style >
.su {
  margin-left: 20px;
  /* width: 500px; */
  height: 2000px;
  font-size: 150px;
  line-height: 200px;
}
.suu {
  margin-top: 50px;
  height: 600px;
  width: 100px;
}
.ppp {
  /* margin: 20px; */
  background-color: aquamarine;
  /* padding: 20px; */
}
</style>
