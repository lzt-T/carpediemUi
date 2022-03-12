<template>
  <div class="su">
    asd\
    <div class="suu">
      <cd-tabs v-model="data" :border="false">
        <cd-tab-pane label="aaaa" icon="fit">sad</cd-tab-pane>
        <cd-tab-pane label="bbbb">sadsad</cd-tab-pane>
      </cd-tabs>
    </div>
  </div>
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
    let data = ref(0);
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
    function onSizeChange(data: any) {
      console.log("sadsad");
    }
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
  width: 900px;
  height: 2000px;
  font-size: 100px;
  line-height: 100px;
}
.suu {
  height: 600px;
  width: 500px;
}
</style>
