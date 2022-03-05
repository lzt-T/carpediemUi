<template>
  <div class="su">
    <div>sadasd</div>
    <cd-collapse :options="data" :height="48" :accordion="false"></cd-collapse>
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
    let data = ref([
      {
        title: "asdasd",
        text: "asdasd341273576123567按格式就到港的费ashdkas126783789126831274512嘎哈圣诞节哈市的方式jahfgjdasjh",
      },
      {
        title: "asdasd",
        text: "asdasd",
      },
    ]);
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
    function su(data: any) {
      console.log(data);

      return true;
    }
    function onFocus(e: any) {
      console.log(e);
    }
    function onBlur(e: any) {
      console.log(e);
    }
    function onChange(e: any) {
      console.log(e);
    }
    function onClear() {
      console.log("asdas");
    }

    return {
      data,
      onFocus,
      onBlur,
      onChange,
      onClear,
      su,
    };
  },
};
</script>

<style >
.su {
  height: 600px;
  width: 600px;
  font-size: 100px;
  line-height: 100px;
  /* background-color: bisque; */
}
</style>
