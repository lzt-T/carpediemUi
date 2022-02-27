<template>
  <div class="su">
    <div @click.stop="">sadsad</div>
    <div @click.stop="">sadsad</div>
    <form method="post" action="http://127.0.0.1:3000/su">
      <cd-select
        v-model="data"
        :options="selectData"
        :disabled="false"
        :clearable="true"
        placeholder="输入"
        :filterable="true"
        :height="32"
        :width="100"
        name="asd"
        @change="onChange"
        @clear="onClear"
        @blur="onBlur"
        @focus="onFocus"
      ></cd-select>
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
    let option = ref([
      {
        value: "112qweeeeesaddddddddddeaaaaa",
      },
      {
        value: "34",
        children: [
          {
            value: "112",
          },
          {
            value: "112",
          },
        ],
      },
      {
        value: "112qweeeeesaddddddddddeaaaaa",
      },
      {
        value: "112qweeeeesaddddddddddeaaaaa",
      },
      {
        value: "112qweeeeesaddddddddddeaaaaa",
      },
      {
        value: "112qweeeeesaddddddddddeaaaaa",
      },
      {
        value: "112qweeeeesaddddddddddeaaaaa",
      },
      {
        value: "112qweeeeesaddddddddddeaaaaa",
      },
    ]);
    let data = ref("2");
    let selectData = ref([
      {
        label: "1123333333333333333333333333",
      },
      {
        label: "2",
      },
      {
        label: "3",

        disabled: true,
      },
      {
        label: "4",
      },
      {
        label: "5",
      },
      {
        label: "6",
      },
    ]);
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
    function onClear() {
      console.log("asdas");
    }
    return {
      data,
      onFocus,
      onBlur,
      onChange,
      selectData,
      option,
      onClear,
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
