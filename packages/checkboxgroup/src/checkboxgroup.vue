<template>
  <span class="cd-checkbox-group" v-setval>
    <cd-checkbox
      v-for="(data, ind) in option"
      :key="data"
      v-model="isTrue[ind]"
      :index="ind"
      :label="option[ind]"
      :size="sizeData"
      :border="border"
      @onChange="onChange"
      :disabled="disabledData[ind]"
    ></cd-checkbox>
  </span>
</template>

<script lang="ts">
// 只能单个使用，要多个配合使用时要使用el-checkbox-group组件
import { computed, ref, watch } from "vue";
import { defineComponent } from "vue";
import setval from "./setval";
import CdCheckbox from "./../../checkbox/src/checkbox.vue";
export default defineComponent({
  name: "cd-checkbox-group",
  components: { CdCheckbox },
  emits: ["update:modelValue", "onChange"],
  directives: { setval },
  props: {
    modelValue: {
      type: Array,
    },
    option: {
      type: Array,
      default: [],
    },
    size: {
      type: Number,
      default: 30,
    },
    border: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Array,
    },
  },
  setup(props, context) {
    // 设置disabled
    let disabledData: any = ref([]);
    console.log(props.disabled);
    if (props.disabled === undefined) {
      props.option.forEach((val, ind) => {
        disabledData.value.push(false);
      });
    } else {
      props.disabled.forEach((val, ind) => {
        disabledData.value.push(val);
      });
    }
    // 设置大小
    let sizeData = ref();
    if (props.size <= 30) {
      sizeData.value = 30;
    } else {
      sizeData.value = props.size;
    }
    // 初始化
    let isTrue: any = ref([]);
    props.option.forEach((value, ind) => {
      if (props.modelValue?.indexOf(value) != -1) {
        isTrue.value.push(true);
      } else {
        isTrue.value.push(false);
      }
    });
    // 选择的数据
    let checkData: any = ref([]);
    function setCheckData() {
      checkData.value.length = 0;
      isTrue.value.forEach((val: boolean, ind: number) => {
        if (val == true) {
          checkData.value.push(props.option[ind]);
        }
      });
    }
    watch(
      isTrue.value,
      (newval, oldval) => {
        setCheckData();
        setModelValue(checkData.value);
        context.emit("onChange", checkData.value);
      },
      { immediate: true }
    );
    function setModelValue(data: any) {
      context.emit("update:modelValue", [...data]);
    }
    function onChange(data: any) {
      isTrue.value[data.index] = data.value;
    }
    return {
      setModelValue,
      onChange,
      isTrue,
      sizeData,
      disabledData,
    };
  },
});
</script>

<style scoped>
.cd-checkbox-group {
  display: inline-block;
}
</style>