<template>
  <div class="su">
    asd
    <cd-tag
      :height="32"
      :width="60"
      :closable="false"
      color="black"
      backgroundColor="white"
      @click="onSizeChange"
      @close="onCurrentChange"
      >as</cd-tag
    >
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
    let data = ref([
      {
        date: "1",
        name: "1",
        address: "as",
        aa: "asda",
      },
      {
        date: "2",
        name: "2",
        address: "as",
      },
      {
        date: "2",
        name: "4",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
    ]);
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
  font-size: 100px;
  line-height: 100px;
}
</style>
