<template>
  <div
    :class="{
      'cd-cascader-selectBox': true,
      'cd-cascader-selectBox-down': isFocus,
      'cd-cascader-selectBox-up': isFocus == false,
    }"
  >
    <span
      v-if="firstData.length"
      @click.self.stop
      class="cd-selectBox-span-one"
    >
      <div
        v-for="(data, ind) in firstData"
        :key="ind"
        @mousedown="setFirstSubscript(ind, $event, selectData[ind].children)"
        :class="{
          'cd-select-everyOption': true,
          'cd-select-check': firstSubscript == ind,
        }"
      >
        {{ data }}
        <cd-icon
          :color="firstSubscript == ind ? '#3c9cff' : '#dde0e7'"
          class="cd-select-everyIcon"
          :size="height / 2"
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
        @mousedown="
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
          :size="height / 2"
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
        @mousedown="
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
          :size="height / 2"
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
        @mousedown="setFourthlySubscript(ind, $event, undefined)"
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

<script lang="ts">
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
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    isFocus: {
      type: Boolean,
    },
  },
  setup(props, context) {
    // 是否返回数据
    let isReturn = ref(false);
    let returnData = ref<string>("");
    //第一层
    let firstSubscript = ref<number>();
    let firstData = ref<string[]>([]);
    function setFirstSubscript(
      ind: number,
      event: Event,
      isUndefined: boolean | undefined
    ): void {
      firstSubscript.value = ind;
      if (isUndefined !== undefined) {
        event.stopPropagation();
      } else {
        returnData.value = firstData.value[ind];
        isReturn.value = true;
      }
    }
    // 第二层
    let secondSubscript = ref<number>();
    let secondData = ref<string[]>([]);
    function setSecondSubscript(
      ind: number,
      event: Event,
      isUndefined: boolean | undefined
    ): void {
      secondSubscript.value = ind;
      if (isUndefined !== undefined) {
        event.stopPropagation();
      } else {
        if (firstSubscript.value !== undefined) {
          returnData.value = `${firstData.value[firstSubscript.value]}/${
            secondData.value[ind]
          }`;
          isReturn.value = true;
        }
      }
    }
    // 第三层
    let thirdlySubscript = ref<number>();
    let thirdlyData = ref<string[]>([]);
    function setThirdlySubscript(
      ind: number,
      event: Event,
      isUndefined: boolean | undefined
    ): void {
      thirdlySubscript.value = ind;
      if (isUndefined !== undefined) {
        event.stopPropagation();
      } else {
        if (
          firstSubscript.value !== undefined &&
          secondSubscript.value !== undefined
        ) {
          returnData.value = `${firstData.value[firstSubscript.value]}/${
            secondData.value[secondSubscript.value]
          }/${thirdlyData.value[ind]}`;
          isReturn.value = true;
        }
      }
    }
    // 第四层
    let fourthlySubscript = ref<number>();
    let fourthlyData = ref<string[]>([]);
    function setFourthlySubscript(
      ind: number,
      event: Event,
      isUndefined: boolean | undefined
    ): void {
      fourthlySubscript.value = ind;
      if (isUndefined !== undefined) {
        event.stopPropagation();
      } else {
        if (
          firstSubscript.value !== undefined &&
          secondSubscript.value !== undefined &&
          thirdlySubscript.value !== undefined
        ) {
          returnData.value = `${firstData.value[firstSubscript.value]}/${
            secondData.value[secondSubscript.value]
          }/${thirdlyData.value[thirdlySubscript.value]}/${
            fourthlyData.value[ind]
          }`;
          isReturn.value = true;
        }
      }
    }
    //初始化第一层数据
    interface IVal {
      value: string;
      children: Array<IVal>;
    }
    for (let i: number = 0; i < props.selectData.length; i++) {
      firstData.value.push((props.selectData as Array<IVal>)[i].value);
    }
    // 监听第一层标记的变化
    watch(
      firstSubscript,
      (newval: number | undefined, oldval: number | undefined): void => {
        if (newval !== undefined) {
          if (
            (props.selectData as Array<IVal>)[newval].children === undefined
          ) {
            secondData.value = [];
          } else {
            for (
              let i: number = 0;
              i < (props.selectData as Array<IVal>)[newval].children.length;
              i++
            ) {
              secondData.value.push(
                (props.selectData as Array<IVal>)[newval].children[i].value
              );
            }
          }
          secondSubscript.value = undefined;
          thirdlySubscript.value = undefined;
        }
      }
    );
    // 监听第二层标记的变化
    watch(
      secondSubscript,
      (newval: number | undefined, oldval: number | undefined): void => {
        if (newval === undefined) {
          thirdlyData.value = [];
        } else {
          if (firstSubscript.value !== undefined) {
            if (
              (props.selectData as Array<IVal>)[firstSubscript.value].children[
                newval
              ].children === undefined
            ) {
              thirdlyData.value = [];
            } else {
              for (
                let i: number = 0;
                i <
                (props.selectData as Array<IVal>)[firstSubscript.value]
                  .children[newval].children.length;
                i++
              ) {
                thirdlyData.value.push(
                  (props.selectData as Array<IVal>)[firstSubscript.value]
                    .children[newval].children[i].value
                );
              }
            }
          }
        }
        thirdlySubscript.value = undefined;
      }
    );
    // 监听第三层标记的变化
    watch(
      thirdlySubscript,
      (newval: number | undefined, oldval: number | undefined): void => {
        if (newval === undefined || secondSubscript.value === undefined) {
          fourthlyData.value = [];
        } else {
          if (firstSubscript.value !== undefined) {
            if (
              (props.selectData as Array<IVal>)[firstSubscript.value].children[
                secondSubscript.value
              ].children[newval].children === undefined
            ) {
              fourthlyData.value = [];
            } else {
              for (
                let i: number = 0;
                i <
                (props.selectData as Array<IVal>)[firstSubscript.value]
                  .children[secondSubscript.value].children[newval].children
                  .length;
                i++
              ) {
                fourthlyData.value.push(
                  (props.selectData as Array<IVal>)[firstSubscript.value]
                    .children[secondSubscript.value].children[newval].children[
                    i
                  ].value
                );
              }
            }
          }
        }
      }
    );
    // 返回多级选项的数据
    watch(isReturn, (newval: boolean, oldval: boolean): void => {
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
  border-radius: 5px;
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  cursor: default;
  background-color: white;
}
.cd-cascader-selectBox-down {
  overflow: hidden;
  animation: down 0.2s linear;
}
.cd-cascader-selectBox-up {
  overflow: hidden;
  animation: up 0.2s linear;
}
@keyframes down {
  0% {
    height: 0px;
  }
  100% {
    height: v-bind(height * 6 + "px");
  }
}
@keyframes up {
  0% {
    height: v-bind(height * 6 + "px");
  }
  100% {
    height: 0px;
  }
}
.cd-selectBox-span-one {
  overflow: auto;
  height: v-bind(height * 6 + "px");
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
  height: v-bind(height + "px");
  line-height: v-bind(height + "px");
  background-color: white;
  font-size: v-bind(height/2 + "px");
  color: #626468;
  padding-left: 10px;
  padding-right: 20px;
  width: v-bind(width * 0.78+"px");
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
  right: 5px;
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