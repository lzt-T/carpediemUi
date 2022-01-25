<template>
  <span class="cd-checkbox-group">
    <cd-checkbox
      v-for="(data, ind) in option"
      :key="data"
      v-model="isTrue[ind]"
      :label="option[ind]"
      :size="sizeData"
      :border="border"
      :disabled="disabledData[ind]"
    ></cd-checkbox>
  </span>
</template>

<script lang="ts">
// 只能单个使用，要多个配合使用时要使用el-checkbox-group组件
import { ref, watch } from "vue";
import { defineComponent } from "vue";
import CdCheckbox from "./../../checkbox/src/checkbox.vue";
export default defineComponent({
  name: "cd-checkbox-group",
  components: { CdCheckbox },
  emits: ["update:modelValue", "onChange"],
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
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  setup(props, context) {
    // 初始化min和max的变化
    let minData = ref();
    let maxData = ref();
    if (props.min === undefined) {
      minData.value = 0;
    } else {
      minData.value = props.min;
    }
    if (props.max === undefined) {
      maxData.value = props.option.length;
    } else {
      maxData.value = props.max;
    }
    let disabledDataCopy: any = ref([]);
    // 设置disabled
    let disabledData: any = ref([]);
    if (props.disabled === undefined) {
      props.option.forEach((val, ind) => {
        disabledData.value.push(false);
        disabledDataCopy.value.push(false);
      });
    } else {
      props.disabled.forEach((val, ind) => {
        disabledData.value.push(val);
        disabledDataCopy.value.push(val);
      });
      for (let i = props.disabled.length; i < props.option.length; i++) {
        disabledData.value.push(false);
        disabledDataCopy.value.push(false);
      }
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
    function setDiaabled() {
      if (
        checkData.value.length > minData.value &&
        checkData.value.length < maxData.value
      ) {
        disabledDataCopy.value.forEach((val: any, ind: number) => {
          disabledData.value[ind] = val;
        });
      } else if (
        checkData.value.length == maxData.value &&
        minData.value != maxData.value
      ) {
        for (let i = 0; i < props.option.length; i++) {
          disabledData.value[i] = true;
        }
        checkData.value.forEach((val: any, ind: number) => {
          disabledData.value[props.option?.indexOf(val)] = false;
        });
        disabledDataCopy.value.forEach((val: any, ind: number) => {
          if (val == true) {
            disabledData.value[ind] = true;
          }
        });
      } else if (
        checkData.value.length == minData.value &&
        minData.value != maxData.value
      ) {
        props.option.forEach((val, ind) => {
          disabledData.value[ind] = false;
        });
        checkData.value.forEach((val: any, ind: number) => {
          disabledData.value[props.option?.indexOf(val)] = true;
        });
        disabledDataCopy.value.forEach((val: any, ind: number) => {
          if (val == true) {
            disabledData.value[ind] = true;
          }
        });
      } else if (minData.value == maxData.value) {
        props.option.forEach((val, ind) => {
          disabledData.value[ind] = true;
        });
      }
    }
    watch(
      isTrue.value,
      (newval, oldval) => {
        setCheckData();
        setModelValue(checkData.value);
        setDiaabled();
        context.emit("onChange", checkData.value);
      },
      { immediate: true }
    );
    function setModelValue(data: any) {
      context.emit("update:modelValue", [...data]);
    }
    return {
      setModelValue,
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