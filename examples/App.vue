<template>
  <div class="su">
    ad
    <cd-table
      :data="data"
      :fieldName="['date', 'name', 'address']"
      :listName="['Date', 'Name', 'Address']"
      :sort="[true, true, false]"
      :stripe="false"
      :border="true"
      :fixedHeader="true"
      :rows="6"
      :width="12"
    ></cd-table>
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
    let data = ref([
      {
        date: "1",
        name: "1",
        address: "as",
      },
      {
        date: "2",
        name: "2",
        address: "as",
      },
      {
        date: "2",
        name: "4",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
      {
        date: "3",
        name: "3",
        address: "as",
      },
    ]);
    watch(data, (newval, oldval) => {
      console.log(newval);
    });
    function onSizeChange(data: any) {
      console.log(data);
      return true;
    }
    function onCurrentChange(e: any) {
      console.log(e);
    }
    function onpPrevClick(e: any) {
      console.log(e);
    }
    function onNextClick(e: any) {
      console.log(e);
    }
    function onClear() {
      return data.value + "/%";
    }

    return {
      data,
      onSizeChange,
      onCurrentChange,
      onpPrevClick,
      onClear,
      onNextClick,
    };
  },
};
</script>

<style >
.su {
  margin-left: 20px;
  width: 900px;
  font-size: 100px;
  line-height: 100px;
}
</style>
