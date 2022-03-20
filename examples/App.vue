<template>
  <!-- <div class="su"></div> -->
  <div class="pppppp">
    <cd-scrollbar height="200px" crosswise>
      <div
        v-for="(data, ind) in 10"
        :key="ind"
        class="cd-website-scroll-everyspan"
      >
        {{ ind }}
      </div>
    </cd-scrollbar>
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
.pppppp {
  width: 400px;
}
.cd-website-scroll-everyspan {
  display: inline-block;
  width: 200px;
  height: 50px;
  margin: 10px;
  text-align: center;
  color: #409eff;
  background-color: #ecf5ff;
}
</style>
