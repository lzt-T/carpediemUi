<template>
  <span class="cd-checkbox-group">
    <cd-checkbox
      :class="{
        'cd-checkboxgroup-checkbox': true,
        'cd-checkboxgroup-checkbox-first': ind == 0,
      }"
      v-for="(data, ind) in option"
      :key="data"
      v-model="isTrue[ind]"
      :label="option[ind]"
      :size="sizeData"
      :border="border"
      :disabled="disabledData[ind]"
      :name="name"
      :value="value[ind]"
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
    // 字符串数组
    modelValue: {
      type: Array,
      required: true,
    },
    // 字符串数组
    option: {
      type: Array,
      required: true,
    },
    size: {
      type: Number,
      default: 50,
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
    marginLeft: {
      type: Number,
      default: 15,
    },
    name: {
      type: String,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    // 初始化min和max的变化
    let minData = ref<number>(0);
    let maxData = ref<number>(0);
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
    let disabledDataCopy = ref<boolean[]>([]);
    // 设置disabled
    let disabledData = ref<boolean[]>([]);
    if (props.disabled === undefined) {
      props.option.forEach((val, ind) => {
        disabledData.value.push(false);
        disabledDataCopy.value.push(false);
      });
    } else {
      for (let i: number = 0; i < props.disabled.length; i++) {
        disabledData.value.push(props.disabled[i] as boolean);
        disabledDataCopy.value.push(props.disabled[i] as boolean);
      }
      for (let i = props.disabled.length; i < props.option.length; i++) {
        disabledData.value.push(false);
        disabledDataCopy.value.push(false);
      }
    }

    // 设置大小
    let sizeData = ref<number>();
    if (props.size <= 40) {
      sizeData.value = 40;
    } else {
      sizeData.value = props.size;
    }
    // 初始化
    let isTrue = ref<boolean[]>([]);
    props.option.forEach((value, ind): void => {
      if (props.modelValue?.indexOf(value) != -1) {
        isTrue.value.push(true);
      } else {
        isTrue.value.push(false);
      }
    });
    // 选择的数据
    let checkData = ref<string[]>([]);
    function setCheckData(): void {
      checkData.value.length = 0;
      isTrue.value.forEach((val: boolean, ind: number) => {
        if (val == true) {
          checkData.value.push(props.option[ind] as string);
        }
      });
    }
    function setDiaabled(): void {
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
      (newval, oldval): void => {
        setCheckData();
        setModelValue(checkData.value);
        setDiaabled();
        context.emit("onChange", checkData.value);
      },
      { immediate: true }
    );
    function setModelValue(data: string[]): void {
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
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  height: v-bind(sizeData / 2+ "px");
  line-height: v-bind(sizeData / 2+ "px");
}
.cd-checkboxgroup-checkbox {
  margin-left: v-bind(marginLeft + "px");
}
.cd-checkboxgroup-checkbox-first {
  margin-left: 0px;
}
</style>