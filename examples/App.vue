<template>
  <div class="su">
    <cd-radio
      name="as"
      :height="32"
      :width="110"
      v-model="data"
      :disabled="false"
      :border="false"
      label="1"
      @change="onChange"
      >Basdasd</cd-radio
    >
    <!-- asd -->
    <cd-radio
      name="as"
      :height="70"
      :width="300"
      v-model="data"
      :disabled="false"
      :border="true"
      label="2"
      @change="onChange"
      >asdasd</cd-radio
    >
  </div>

  <form method="post" action="http://127.0.0.1:3000/su">
    <cd-input-number name="asd" v-model="data"></cd-input-number>
    <input type="submit" />
  </form>
</template>

<script lang="ts">
import axios from "axios";
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    axios({
      method: "get",
      url: "/",
    }).then((response) => {
      console.log(response.data);
    });

    let data = ref();
    let selectData = ref(["12", "534"]);
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
    function onFocus(e: any) {
      console.log(e);
    }
    function onBlur(e: any) {
      console.log(e);
    }
    function onChange(e: any) {
      console.log(e);
    }
    return {
      data,
      onFocus,
      onBlur,
      onChange,
      selectData,
    };
  },
};
</script>

<style >
.su {
  height: 600px;
  font-size: 100px;
  line-height: 100px;
}
</style>
