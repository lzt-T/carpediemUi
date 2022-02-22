<template>
  <div class="su">
    asdsa
    <!-- <cd-icon name="fit"></cd-icon> -->
    <!-- <cd-date-picker /> -->
    <cd-input
      v-model="data"
      type="textarea"
      :maxLength="99999"
      :minLength="2"
      :showWordLinit="true"
      placeholder="输入"
      :clearable="true"
      :disabled="false"
      :width="240"
      prefixIcon="fit"
      suffixIcon="fit"
      :autosize="{ minRows: 2, maxRows: 5 }"
      resize="both"
      :fontSize="17"
      name="asd"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      @input="onInput"
      @clear="onClear"
    />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let data = ref();
    // watch(data, (newval, oldval) => {
    //   console.log(newval);
    // });
    function onFocus(e: any) {
      console.log(1, e);
    }
    function onBlur(e: any) {
      console.log(2, e);
    }
    function onChange(e: any) {
      console.log(3, e);
    }
    function onInput(e: any) {
      console.log(4, e);
    }
    function onClear() {}
    return {
      data,
      onFocus,
      onBlur,
      onChange,
      onInput,
      onClear,
    };
  },
};
</script>

<style >
.su {
  height: 100px;
  font-size: 100px;
  line-height: 100px;
}
</style>
