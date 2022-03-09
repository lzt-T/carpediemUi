<template>
  <div class="su">
    asgjhd
    <cd-pagination
      :height="32"
      :pageSize="10"
      :total="100"
      :pagerCount="5"
      :pageSizes="[10, 20, 30, 40, 100]"
      :goTo="true"
      @sizeChange="onSizeChange"
      @currentChange="onCurrentChange"
    ></cd-pagination>
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
    function onSizeChange(data: any) {
      console.log(data);

      return true;
    }
    function onCurrentChange(e: any) {
      console.log(e);
    }
    function onpPrevClick(e: any) {
      console.log(e);
    }
    function onNextClick(e: any) {
      console.log(e);
    }
    function onClear() {
      console.log("asdas");
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
  width: 900px;
  font-size: 100px;
  line-height: 100px;
}
</style>
