<template>
  <div :class="{ frame: true, 'cd-table-broder-frame': border }">
    <div :class="{ 'cd-table-frame': true }">
      <div
        v-for="(data2, ind2) in listName"
        :key="ind2"
        class="cd-table-list-frame"
      >
        <div
          :class="{
            'cd-tabble-list-title-fixedHeader': fixedHeader,
            'cd-tabble-list-title-frame': true,
            'cd-table-list-bottom': true,
            'cd-table-list-right': border,
          }"
        >
          <div>
            {{ data2 }}
          </div>
          <div
            class="cd-tabble-list-title-sort"
            v-if="sort !== undefined && sort[ind2]"
          >
            <cd-icon
              name="caretUp"
              :size="widthData / 2.2"
              :color="isUp[ind2] ? '#409eff' : '#b7b8bb'"
              class="cd-tabble-list-title-sort-up"
              @click="setSort(ind2, 0)"
            ></cd-icon>
            <cd-icon
              name="caretDown"
              :size="widthData / 2.2"
              :color="isDown[ind2] ? '#409eff' : '#b7b8bb'"
              class="cd-tabble-list-title-sort-down"
              @click="setSort(ind2, 1)"
            ></cd-icon>
          </div>
        </div>
        <div v-if="fixedHeader">?</div>
        <div
          v-for="(data1, ind1) in options"
          :key="ind1"
          :class="{
            'cd-table-list-bottom': true,
            'cd-tabble-list-data': true,
            'cd-table-list-right': border,
            'cd-table-list-stripe': stripe && ind1 % 2 == 1,
          }"
          ref="TextData"
        >
          {{ data1[fieldName[ind2]] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, onMounted, ref, watch, watchEffect } from "vue";
export default defineComponent({
  name: "cd-table",
  components: {
    cdIcon,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    fieldName: {
      type: Array,
      required: true,
    },
    listName: {
      type: Array,
      required: true,
    },
    sort: {
      type: Array,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    fixedHeader: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 5,
    },
    width: {
      type: Number,
      default: 32,
    },
  },
  setup(props, context) {
    // 设置大小
    let widthData = ref<number>();
    setSize();
    function setSize() {
      if (props.width >= 24) {
        widthData.value = props.width;
      } else {
        widthData.value = 24;
      }
    }
    //
    let options = ref();
    options.value = props.data;
    let isUp = ref<boolean[]>([]);
    let isDown = ref<boolean[]>([]);
    props.listName.forEach((val, ind) => {
      isUp.value[ind] = false;
      isDown.value[ind] = false;
    });
    function setSort(ind: number, data: number) {
      if (data == 0) {
        isUp.value[ind] = true;
        isDown.value[ind] = false;
      } else {
        isUp.value[ind] = false;
        isDown.value[ind] = true;
      }
      for (let i = 0; i < isUp.value.length; i++) {
        if (i != ind) {
          isUp.value[i] = false;
          isDown.value[i] = false;
        }
      }
      options.value = options.value.sort(function (a: any, b: any) {
        let a1 = a[String(props.fieldName[ind])];
        let b1 = b[String(props.fieldName[ind])];
        if (data == 0) {
          return a1 - b1;
        } else {
          return b1 - a1;
        }
      });
    }
    let TextData = ref();
    let fixedWidth = ref();
    onMounted(() => {
      fixedWidth.value = TextData.value.offsetWidth;
    });
    return {
      widthData,
      isUp,
      isDown,
      setSort,
      options,
      TextData,
      fixedWidth,
    };
  },
});
</script>

<style scoped>
.frame {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #ededed;
}
.cd-table-frame {
  display: flex;
  font-size: v-bind(widthData/2 + "px");
  line-height: v-bind(widthData + "px");
  overflow: auto;
  max-height: v-bind(widthData * rows + "px");
}
.cd-table-frame::-webkit-scrollbar {
  width: 6px;
}
/* 滑块 */
.cd-table-frame:hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
/* 滚动槽 */
.cd-table-frame::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 滚动条滑块 */
.cd-table-frame::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: transparent;
}

.cd-table-broder-frame {
  border-top: 1px solid #ededed;
  border-left: 1px solid #ededed;
}
.cd-table-list-frame {
  flex: 1;
}
.cd-tabble-list-title-frame {
  display: flex;
  padding-left: 10px;
  color: #9f9f9f;
}
.cd-tabble-list-title-fixedHeader {
  position: absolute;
  width: v-bind(fixedWidth + "px");
  background-color: white;
}
.cd-tabble-list-title-sort {
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  line-height: v-bind(widthData/2.2 + "px");
}
.cd-tabble-list-title-sort-up {
  padding-top: 4px;
}

.cd-tabble-list-data {
  padding-left: 10px;
  height: v-bind(widthData + "px");
}
.cd-table-list-bottom {
  border-bottom: 1px solid #ededed;
}
.cd-table-list-right {
  border-right: 1px solid #ededed;
}
.cd-table-list-stripe {
  background-color: #fafafa;
}
</style>
