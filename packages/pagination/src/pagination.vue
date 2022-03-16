<template>
  <div class="cd-pagination-frame">
    <cd-select
      :options="selectList"
      v-model="selectData"
      :width="120"
      v-if="pageSizes !== undefined"
    ></cd-select>
    <div class="cd-pagination-page-frame">
      <cd-icon
        :size="heightData / 2"
        name="leftArrowTow"
        :color="isLeftArrowHover ? '#409efe' : ''"
        :class="{ 'cd-pagination-everyflexbox': true }"
        @click="selectPage(currentPage - 1)"
        @mouseover="onMouseover(2)"
        @mouseout="onMouseout(2)"
      ></cd-icon>
      <div v-if="isPageCount" class="cd-pagination-pagecount-frame">
        <div
          :class="{
            'cd-pagination-everyflexbox': true,
            'cd-pagination-everyflexbox-select': currentPage == 1,
          }"
          @click="selectPage(1)"
        >
          1
        </div>
        <cd-icon
          v-show="isLeftShow"
          :name="isLeftHover ? 'backward' : 'ellipsis'"
          :size="heightData / 2"
          :class="{ 'cd-pagination-everyflexbox': true }"
          :color="isLeftHover ? '#409efe' : ''"
          @mouseover="onMouseover(0)"
          @mouseout="onMouseout(0)"
          @click="selectPage(currentPage - (pagerCountData - 2))"
        ></cd-icon>
        <div
          :class="{
            'cd-pagination-everyflexbox': true,
            'cd-pagination-everyflexbox-select':
              currentPage == currentPageList[ind],
          }"
          v-for="(data, ind) in pagerCountData - 2"
          :key="ind"
          @click="selectPage(currentPageList[ind])"
        >
          {{ currentPageList[ind] }}
        </div>
        <cd-icon
          :class="{ 'cd-pagination-everyflexbox': true }"
          v-show="isRightShow"
          :name="isRightHover ? 'speed' : 'ellipsis'"
          :color="isRightHover ? '#409efe' : ''"
          @mouseover="onMouseover(1)"
          @mouseout="onMouseout(1)"
          @click="selectPage(currentPage + (pagerCountData - 2))"
          :size="heightData / 2"
        ></cd-icon>
        <div
          :class="{
            'cd-pagination-everyflexbox': true,
            'cd-pagination-everyflexbox-select': currentPage == pageAmount,
          }"
          @click="selectPage(pageAmount)"
        >
          {{ pageAmount }}
        </div>
      </div>
      <div v-if="isPageCount == false" class="cd-pagination-notpagecount-frame">
        <div
          v-for="(data, ind) in pageAmount"
          :key="ind"
          @click="selectPage(ind + 1)"
          :class="{
            'cd-pagination-everyflexbox': true,
            'cd-pagination-everyflexbox-select': currentPage == ind + 1,
          }"
        >
          {{ ind + 1 }}
        </div>
      </div>
      <cd-icon
        :class="{ 'cd-pagination-everyflexbox': true }"
        :size="heightData / 2"
        name="rightArrowTow"
        :color="isRightArrowHover ? '#409efe' : ''"
        @click="selectPage(currentPage + 1)"
        @mouseover="onMouseover(3)"
        @mouseout="onMouseout(3)"
      ></cd-icon>
    </div>
    <div class="cd-pagination-goto-frame" v-if="goTo">
      <div>Go to</div>
      <input
        type="text"
        :class="{
          'cd-pagination-input': true,
          'cd-pagination-input-focus': isFocus,
        }"
        @focus="onFocus"
        @blur="onBlur"
        ref="input"
        oninput="value=value.replace(/[^\d]/g,'')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import cdSelect from "./../../select/src/select.vue";
import { defineComponent, onMounted, ref, watch, watchEffect } from "vue";
export default defineComponent({
  name: "cd-pagination",
  components: {
    cdIcon,
    cdSelect,
  },
  emits: ["sizeChange", "currentChange"],
  props: {
    height: {
      type: Number,
      default: 32,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      required: true,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    pageSizes: {
      type: Array,
    },
    goTo: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let heightData = ref<number>();
    //   设置大小
    setSize();
    function setSize(): void {
      if (props.height >= 24) {
        heightData.value = props.height;
      } else {
        heightData.value = 24;
      }
    }
    let pageAmount = ref<number>(0);
    let pagerCountData = ref<number>(0);
    let isPageCount = ref<boolean>(false);
    pageAmount.value = Math.ceil(props.total / props.pageSize);
    if (props.pagerCount >= 5) {
      pagerCountData.value = props.pagerCount;
      if (props.pagerCount % 2 == 0) {
        pagerCountData.value = pagerCountData.value + 1;
      }
    } else {
      pagerCountData.value = 5;
    }
    if (pageAmount.value > pagerCountData.value) {
      isPageCount.value = true;
    }
    let isLeftShow = ref<boolean>(false);
    let isRightShow = ref<boolean>(false);
    // 改变快进快退键的样式
    let isLeftHover = ref<boolean>(false);
    let isRightHover = ref<boolean>(false);
    let isLeftArrowHover = ref<boolean>(false);
    let isRightArrowHover = ref<boolean>(false);
    function onMouseover(data: number): void {
      if (data == 0) {
        isLeftHover.value = true;
      } else if (data == 1) {
        isRightHover.value = true;
      } else if (data == 2) {
        isLeftArrowHover.value = true;
      } else if (data == 3) {
        isRightArrowHover.value = true;
      }
    }
    function onMouseout(data: number): void {
      if (data == 0) {
        isLeftHover.value = false;
      } else if (data == 1) {
        isRightHover.value = false;
      } else if (data == 2) {
        isLeftArrowHover.value = false;
      } else if (data == 3) {
        isRightArrowHover.value = false;
      }
    }
    let currentPage = ref<number>(1);
    let currentPageList = ref<number[]>([]);
    // 切换页码
    function selectPage(ind: number): void {
      if (ind >= 1 && ind <= pageAmount.value) {
        currentPage.value = ind;
      } else if (ind <= 0) {
        currentPage.value = 1;
      } else if (ind > pageAmount.value) {
        currentPage.value = pageAmount.value;
      }
    }
    let input = ref<object>();
    onMounted(() => {
      if (props.goTo) {
        (input.value as HTMLInputElement).value = String(currentPage.value);
      }
    });
    watch(
      currentPage,
      (newval: number, oldval) => {
        context.emit("currentChange", newval);
        if (props.goTo == true && input.value !== undefined) {
          (input.value as HTMLInputElement).value = String(newval);
        }
        if (isPageCount.value == false) {
          return;
        }
        if (newval > Math.ceil(pagerCountData.value / 2)) {
          isLeftShow.value = true;
        } else {
          isLeftShow.value = false;
          for (let i = 0, j = 2; i < pagerCountData.value - 2; i++, j++) {
            currentPageList.value[i] = j;
          }
        }
        if (
          newval > Math.ceil(pagerCountData.value / 2) &&
          newval <= pageAmount.value - Math.ceil(pagerCountData.value / 2)
        ) {
          for (
            let i = 0,
              j =
                currentPage.value - Math.floor((pagerCountData.value - 2) / 2);
            i < pagerCountData.value - 2;
            i++, j++
          ) {
            currentPageList.value[i] = j;
          }
        }
        if (newval <= pageAmount.value - Math.ceil(pagerCountData.value / 2)) {
          isRightShow.value = true;
        } else {
          isRightShow.value = false;
          for (
            let i = pagerCountData.value - 2 - 1, j = pageAmount.value - 1;
            i >= 0;
            i--, j--
          ) {
            currentPageList.value[i] = j;
          }
        }
      },
      { immediate: true }
    );

    // 初始化下拉框
    let selectData = ref<string>("");
    let selectList = ref<selectObject[]>([]);
    interface selectObject {
      value: string;
      label: string;
    }
    initSelect();
    function initSelect(): void {
      if (props.pageSizes === undefined || props.pageSizes.length == 0) {
        return;
      }
      props.pageSizes.forEach((val, ind) => {
        selectList.value.push({ value: val + "/page", label: val + "/page" });
      });
      selectData.value = String(props.pageSize + "/page");
      let isfind: boolean = false;
      for (let i in selectList.value) {
        if (selectList.value[i].value == selectData.value) {
          isfind = true;
          break;
        }
      }
      if (isfind == false) {
        selectData.value = selectList.value[0].value;
      }
    }
    watch(
      selectData,
      (newval: string, oldval) => {
        if (newval != "") {
          let data: string[] = newval.split("/");
          pageAmount.value = Math.ceil(props.total / Number(data[0]));
          if (pageAmount.value > pagerCountData.value) {
            isPageCount.value = true;
          } else {
            isPageCount.value = false;
          }
          if (currentPage.value > pageAmount.value) {
            currentPage.value = pageAmount.value;
          }
          context.emit("sizeChange", Number(data[0]));
        }
      },
      { immediate: true }
    );
    // 操作goto框
    let isFocus = ref<boolean>(false);
    function pressEnter(e: { keyCode: number }) {
      if (e.keyCode == 13) {
        (input.value as HTMLInputElement).blur();
      }
    }
    function onFocus(): void {
      isFocus.value = true;
      window.addEventListener("keydown", pressEnter);
    }
    function onBlur(): void {
      isFocus.value = false;
      window.removeEventListener("keydown", pressEnter);
      if (
        Number((input.value as HTMLInputElement).value) >= 1 &&
        Number((input.value as HTMLInputElement).value) <= pageAmount.value
      ) {
        currentPage.value = Number((input.value as HTMLInputElement).value);
      } else if (Number((input.value as HTMLInputElement).value) == 0) {
        currentPage.value = 1;
        (input.value as HTMLInputElement).value = 1 + "";
      } else if (
        Number((input.value as HTMLInputElement).value) > pageAmount.value
      ) {
        currentPage.value = pageAmount.value;
      }
    }
    return {
      heightData,
      selectData,
      selectList,
      pageAmount,
      pagerCountData,
      currentPage,
      currentPageList,
      isLeftShow,
      isRightShow,
      selectPage,
      isPageCount,
      isLeftHover,
      isRightHover,
      onMouseover,
      onMouseout,
      isLeftArrowHover,
      isRightArrowHover,
      onFocus,
      isFocus,
      onBlur,
      input,
    };
  },
});
</script>

<style scoped>
.cd-pagination-frame {
  position: relative;
  z-index: 0;
  display: flex;
  gap: 10px;
  font-size: v-bind(heightData/2.2 + "px");
  line-height: v-bind(heightData + "px");
  background-color: white;
}
.cd-pagination-page-frame {
  display: flex;
  background-color: white;
}
.cd-pagination-pagecount-frame {
  display: flex;
}
.cd-pagination-notpagecount-frame {
  display: flex;
}
.cd-pagination-everyflexbox {
  width: 35px;
  height: v-bind(heightData + "px");
  line-height: v-bind(heightData + "px");
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
.cd-pagination-everyflexbox:hover {
  color: #409efe;
}
.cd-pagination-everyflexbox-select {
  color: #409efe;
}
.cd-pagination-goto-frame {
  display: flex;
  gap: 5px;
}
.cd-pagination-input {
  width: 56px;
  text-align: center;
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.cd-pagination-input-focus {
  border: 1px solid #a8d3ff;
}
</style>
