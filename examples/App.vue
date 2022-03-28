<template>
  <div class="su">
    <cd-row :gap="20" flexWrap="wrap">
      <cd-tag closable>Tag</cd-tag>
      <cd-tag color="#409EFF" backgroundColor="#edf5fd" closable>Tag1</cd-tag>
      <cd-tag color="#67C23A" backgroundColor="#edf8ea" closable>Tag2</cd-tag>
      <cd-tag color="#909399" backgroundColor="#f8f4f1" closable>Tag3</cd-tag>
      <cd-tag color="#E6A23C" backgroundColor="#fef5e8" closable>Tag4</cd-tag>
      <cd-tag color="#F56C6C" backgroundColor="#ffeff0" closable>Tag5</cd-tag>
    </cd-row>
  </div>

  <form method="post" action="http://127.0.0.1:3000/su">
    <input type="submit" />
  </form>
</template>

<script lang="ts">
import axios from "axios";
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    //   测试的数据
    const tableData = [
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ];
    const format = (percentage: number) =>
      percentage === 100 ? "Full" : `${percentage}%`;
    return {
      tableData,
      format,
    };
  },
};
</script>

<style >
.su {
  /* height: 200px; */
  padding: 40px;
  /* font-size: 200px; */
  /* line-height: 200px; */
}
.cd-website-image-lazy {
  height: 200px;
  overflow: auto;
}
</style>
