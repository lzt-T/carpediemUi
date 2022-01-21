<template>
  <div class="cd-cascader-selectBox">
    <cd-icon
      name="caretUp"
      color="white"
      :size="19"
      class="cd-selectBox-up"
    ></cd-icon>
    <span
      v-if="firstData.length"
      @click.self.stop
      class="cd-selectBox-span-one"
    >
      <div
        v-for="(data, ind) in firstData"
        :key="ind"
        @click="setFirstSubscript(ind, $event, selectData[ind].children)"
        :class="{
          'cd-select-everyOption': true,
          'cd-select-check': firstSubscript == ind,
        }"
      >
        {{ data }}
        <cd-icon
          :color="firstSubscript == ind ? '#3c9cff' : '#dde0e7'"
          class="cd-select-everyIcon"
          :size="size / 11"
          v-if="selectData[ind].children !== undefined"
          name="rightArrowTow"
        ></cd-icon>
      </div>
    </span>
    <span
      v-if="secondData.length"
      @click.self.stop
      class="cd-selectBox-span-tow"
    >
      <div
        v-for="(data, ind) in secondData"
        :key="ind"
        @click="
          setSecondSubscript(
            ind,
            $event,
            selectData[firstSubscript].children[ind].children
          )
        "
        :class="{
          'cd-select-everyOption': true,
          'cd-select-check': secondSubscript == ind,
        }"
      >
        {{ data }}
        <cd-icon
          :color="secondSubscript == ind ? '#3c9cff' : '#dde0e7'"
          name="rightArrowTow"
          class="cd-select-everyIcon"
          :size="size / 11"
          v-if="selectData[firstSubscript].children[ind].children !== undefined"
        ></cd-icon>
      </div>
    </span>
    <span
      v-if="thirdlyData.length"
      @click.self.stop
      class="cd-selectBox-span-three"
    >
      <div
        v-for="(data, ind) in thirdlyData"
        :key="ind"
        @click="
          setThirdlySubscript(
            ind,
            $event,
            selectData[firstSubscript].children[secondSubscript].children[ind]
              .children
          )
        "
        :class="{
          'cd-select-everyOption': true,
          'cd-select-check': thirdlySubscript == ind,
        }"
      >
        {{ data }}
        <cd-icon
          name="rightArrowTow"
          :color="thirdlySubscript == ind ? '#3c9cff' : '#dde0e7'"
          class="cd-select-everyIcon"
          :size="size / 11"
          v-if="
            selectData[firstSubscript].children[secondSubscript].children[ind]
              .children !== undefined
          "
        ></cd-icon>
      </div>
    </span>
    <span
      v-if="fourthlyData.length"
      @click.self.stop
      class="cd-selectBox-span-four"
    >
      <div
        v-for="(data, ind) in fourthlyData"
        :key="ind"
        @click="setFourthlySubscript(ind, $event, undefined)"
        :class="{
          'cd-select-everyOption': true,
          'cd-select-check': fourthlySubscript == ind,
        }"
      >
        {{ data }}
      </div>
    </span>
  </div>
</template>

<script>
import cdIcon from "./../../icon/src/icon.vue";
import { watch, ref } from "vue";
export default {
  components: {
    cdIcon,
  },
  emits: ["getCascaderData"],
  props: {
    selectData: {
      type: Array,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    // 是否返回数据
    let isReturn = ref(false);
    let returnData = ref("");
    //第一层
    let firstSubscript = ref();
    let firstData = ref([]);
    function setFirstSubscript(ind, event, isUndefined) {
      firstSubscript.value = ind;
      if (isUndefined !== undefined) {
        event.stopPropagation();
      } else {
        returnData.value = firstData.value[ind];
        isReturn.value = true;
      }
    }
    // 第二层
    let secondSubscript = ref();
    let secondData = ref([]);
    function setSecondSubscript(ind, event, isUndefined) {
      secondSubscript.value = ind;
      if (isUndefined !== undefined) {
        event.stopPropagation();
      } else {
        returnData.value = `${firstData.value[firstSubscript.value]}/${
          secondData.value[ind]
        }`;
        isReturn.value = true;
      }
    }
    // 第三层
    let thirdlySubscript = ref();
    let thirdlyData = ref([]);
    function setThirdlySubscript(ind, event, isUndefined) {
      thirdlySubscript.value = ind;
      if (isUndefined !== undefined) {
        event.stopPropagation();
      } else {
        returnData.value = `${firstData.value[firstSubscript.value]}/${
          secondData.value[secondSubscript.value]
        }/${thirdlyData.value[ind]}
        `;
        isReturn.value = true;
      }
    }
    // 第四层
    let fourthlySubscript = ref();
    let fourthlyData = ref([]);
    function setFourthlySubscript(ind, event, isUndefined) {
      fourthlySubscript.value = ind;
      if (isUndefined !== undefined) {
        event.stopPropagation();
      } else {
        returnData.value = `${firstData.value[firstSubscript.value]}/${
          secondData.value[secondSubscript.value]
        }/${thirdlyData.value[thirdlySubscript.value]}/${
          fourthlyData.value[ind]
        }
        `;
        isReturn.value = true;
      }
    }
    //初始化第一层数据
    props.selectData.forEach((val, ind) => {
      firstData.value.push(val.value);
    });
    // 监听第一层标记的变化
    watch(firstSubscript, (newval, oldval) => {
      if (props.selectData[newval].children === undefined) {
        secondData.value = [];
      } else {
        props.selectData[newval].children.forEach((val, ind) => {
          secondData.value.push(val.value);
        });
      }
      secondSubscript.value = undefined;
      thirdlySubscript.value = undefined;
    });
    // 监听第二层标记的变化
    watch(secondSubscript, (newval, oldval) => {
      if (newval === undefined) {
        thirdlyData.value = [];
      } else {
        if (
          props.selectData[firstSubscript.value].children[newval].children ===
          undefined
        ) {
          thirdlyData.value = [];
        } else {
          props.selectData[firstSubscript.value].children[
            newval
          ].children.forEach((val, ind) => {
            thirdlyData.value.push(val.value);
          });
        }
      }
      thirdlySubscript.value = undefined;
    });
    // 监听第三层标记的变化
    watch(thirdlySubscript, (newval, oldval) => {
      if (newval === undefined || secondSubscript.value === undefined) {
        fourthlyData.value = [];
      } else {
        if (
          props.selectData[firstSubscript.value].children[secondSubscript.value]
            .children[newval].children === undefined
        ) {
          fourthlyData.value = [];
        } else {
          props.selectData[firstSubscript.value].children[
            secondSubscript.value
          ].children[newval].children.forEach((val, ind) => {
            fourthlyData.value.push(val.value);
          });
        }
      }
    });
    // 返回多级选项的数据
    watch(isReturn, (newval, oldval) => {
      if (newval == true) {
        context.emit("getCascaderData", returnData.value);
        isReturn.value = false;
      }
    });
    return {
      firstSubscript,
      firstData,
      setFirstSubscript,
      secondSubscript,
      secondData,
      setSecondSubscript,
      thirdlySubscript,
      thirdlyData,
      setThirdlySubscript,
      fourthlySubscript,
      fourthlyData,
      setFourthlySubscript,
    };
  },
};
</script>

<style scoped>
.cd-cascader-selectBox {
  position: absolute;
  z-index: 1;
  top: v-bind(size/6.8 + 15 + "px");
  color: #626468;
  background-color: white;
  border-radius: 5px;
  background-color: aqua;
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  cursor: default;
}
.cd-selectBox-up {
  position: absolute;
  top: -14px;
  left: 5px;
}
.cd-selectBox-span-one {
  border-right: 0.1px solid #dde0e7;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: v-bind("firstSubscript===undefined?'5px':'0px'");
  border-bottom-right-radius: v-bind("firstSubscript===undefined?'5px':'0px'");
}
.cd-selectBox-span-tow {
  border-right: 0.1px solid #dde0e7;
  border-top-right-radius: v-bind(
    "firstSubscript!==undefined&&secondSubscript===undefined?'5px':'0px'"
  );
  border-bottom-right-radius: v-bind(
    "firstSubscript!==undefined&&secondSubscript===undefined?'5px':'0px'"
  );
}
.cd-selectBox-span-three {
  border-right: 0.1px solid #dde0e7;
  border-top-right-radius: v-bind(
    "secondSubscript!==undefined&&thirdlySubscript==undefined?'5px':'0px'"
  );
  border-bottom-right-radius: v-bind(
    "secondSubscript!==undefined&&thirdlySubscript==undefined?'5px':'0px'"
  );
}
.cd-selectBox-span-four {
  border-right: 0.1px solid #dde0e7;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.cd-select-everyOption {
  position: relative;
  height: v-bind(size/7.1 + "px");
  line-height: v-bind(size/7.1 + "px");
  background-color: white;
  font-size: v-bind(size/15 + "px");
  padding-left: 14px;
  padding-right: v-bind(size/11 + 12+"px");
  margin-top: 2px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cd-select-everyOption:hover {
  background-color: #f5f7fa;
}
.cd-select-check {
  color: #3c9cff;
}
.cd-select-everyIcon {
  position: absolute;
  right: 10px;
}

span {
  overflow: auto;
  height: v-bind(size * 0.84+"px");
  width: v-bind(size * 0.75+"px");
  background-color: white;
}
span::-webkit-scrollbar {
  width: 6px;
}
/* 滑块 */
span:hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
/* 滚动槽 */
span::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 滚动条滑块 */
span::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: transparent;
}
</style>