<template>
  <div class="su">
    <!-- <cd-select
      v-model="data"
      :options="selectData"
      :disabled="false"
      :clearable="false"
      placeholder="输入"
      :multiple="false"
      :filterable="false"
      :height="32"
      :width="240"
      name="asd"
      @change="onChange"
      @clear="onClear"
      @blur="onBlur"
      @focus="onFocus"
    ></cd-select> -->
    <cd-cascader :option="option" @change="onChange"></cd-cascader>
    asd asdsa
    <div>sadsad</div>
    <div @click.stop="">sadsad</div>
    <div @click.stop="">sadsad</div>
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
    let data = ref();
    let selectData = ref([
      {
        label: "1",
        value: "1",
      },
      {
        label: "2",
        value: "2",
      },
      {
        label: "2",
        value: "2",
        disabled: true,
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
    return {
      data,
      onFocus,
      onBlur,
      onChange,
      selectData,
      option,
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
