<template>
  <div class="su">
    <cd-image
      alt="asdas"
      fit="contain"
      :hideOnClickModal="false"
      :lazy="true"
      src="https://cdn.jsdelivr.net/gh/lztnb/img@master/1.jpg"
      :previewSrcList="[
        'https://cdn.jsdelivr.net/gh/lztnb/img@master/1.jpg',
        'https://cdn.jsdelivr.net/gh/lztnb/img@master/1.jpg',
      ]"
      :initialIndex="1"
    ></cd-image>
    <div>asdsad</div>
    <cd-image
      alt="asdas"
      fit="none"
      :hideOnClickModal="false"
      :lazy="true"
      src="https://cdn.jsdelivr.net/gh/lztnb/img@master/2.jpg"
      :previewSrcList="[
        'https://cdn.jsdelivr.net/gh/lztnb/img@master/1.jpg',
        'https://cdn.jsdelivr.net/gh/lztnb/img@master/1.jpg',
      ]"
      :initialIndex="1"
    >
    </cd-image>
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
  overflow: auto;
  height: 400px;
  width: 400px;
  font-size: 100px;
  line-height: 100px;
  /* background-color: bisque; */
}
</style>
