<template>
  <div class="cd-table-frame-div">
    <div :class="{ 'cd-table-frame': true, 'cd-table-border-frame': border }">
      <div
        :class="{
          'cd-table-title-row': true,
          'cd-table-title-fixedHeader': fixedHeader,
        }"
      >
        <div
          :class="{ 'cd-table-title-col': true, 'cd-table-border': border }"
          v-for="(data3, ind3) in listName"
          :key="ind3"
        >
          {{ data3 }}
        </div>
      </div>
      <div v-for="(data1, ind1) in data" :key="ind1" class="cd-table-row">
        <div
          v-for="(data2, ind2) in data1"
          :key="ind2"
          :class="{
            'cd-table-col': true,
            'cd-table-stripe': ind1 % 2 == 1 && stripe,
            'cd-table-border': border,
          }"
        >
          {{ data2 }}
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
    maxHeight: {
      type: Number,
    },
    // 对象数组
    data: {
      type: Array,
      required: true,
    },
    listName: {
      type: Array,
      required: true,
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
  },
  setup(props, context) {},
});
</script>

<style scoped>
.cd-table-frame-div {
  max-height: v-bind(maxHeight + "px");
  overflow: auto;
}
.cd-table-frame-div::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
/* 滑块 */
.cd-table-frame-div:hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
/* 滚动槽 */
.cd-table-frame-div::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 滚动条滑块 */
.cd-table-frame-div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
}

.cd-table-frame {
  position: relative;
  display: table;
  width: 100%;
}
.cd-table-border-frame {
  border-top: 1px solid #ededed;
  border-left: 1px solid #ededed;
}
.cd-table-title-fixedHeader {
  position: sticky;
  z-index: 1;
  top: 0;
}
.cd-table-title-row {
  display: table-row;
}
.cd-table-title-col {
  display: table-cell;
  font-size: 18px;
  line-height: 31px;
  padding: 5px 12px;
  border-bottom: 1px solid #ededed;
  background-color: white;
}
.cd-table-row {
  display: table-row;
}
.cd-table-col {
  position: relative;
  display: table-cell;
  padding: 5px 12px;
  font-size: 16px;
  line-height: 28px;
  border-bottom: 1px solid #ededed;
}

.cd-table-stripe {
  background-color: #fafafa;
}
.cd-table-border {
  border-right: 1px solid #ededed;
}
</style>
