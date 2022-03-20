<template>
  <cd-cascader v-model="selectingData" :option="optionData"></cd-cascader>

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
    let selectingData = ref("");
    let optionData = ref([
      {
        value: "guide",

        children: [
          {
            value: "disciplines",
            children: [
              {
                value: "consistency",
              },
              {
                value: "feedback",
              },
              {
                value: "efficiency",
              },
              {
                value: "controllability",
              },
            ],
          },
          {
            value: "navigation",
            children: [
              {
                value: "side nav",
              },
              {
                value: "top nav",
              },
            ],
          },
        ],
      },
      {
        value: "component",
        children: [
          {
            value: "basic",

            children: [
              {
                value: "layout",
              },
              {
                value: "color",
              },
              {
                value: "typography",
              },
              {
                value: "icon",
              },
              {
                value: "button",
              },
            ],
          },
          {
            value: "form",
            children: [
              {
                value: "radio",
              },
              {
                value: "checkbox",
              },
              {
                value: "input",
              },
              {
                value: "input-number",
              },
              {
                value: "select",
              },
              {
                value: "cascader",
              },
              {
                value: "switch",
              },
              {
                value: "slider",
              },
              {
                value: "time-picker",
              },
              {
                value: "date-picker",
              },
              {
                value: "datetime-picker",
              },
              {
                value: "upload",
              },
              {
                value: "rate",
              },
              {
                value: "form",
              },
            ],
          },
          {
            value: "data",
            children: [
              {
                value: "table",
              },
              {
                value: "tag",
              },
              {
                value: "progress",
              },
              {
                value: "tree",
              },
              {
                value: "pagination",
              },
              {
                value: "badge",
              },
            ],
          },
          {
            value: "notice",
            children: [
              {
                value: "alert",
              },
              {
                value: "loading",
              },
              {
                value: "message",
              },
              {
                value: "message-box",
              },
              {
                value: "notification",
              },
            ],
          },
          {
            value: "navigation",
            children: [
              {
                value: "menu",
              },
              {
                value: "tabs",
              },
              {
                value: "breadcrumb",
              },
              {
                value: "dropdown",
              },
              {
                value: "steps",
              },
            ],
          },
          {
            value: "others",
            children: [
              {
                value: "dialog",
              },
              {
                value: "tooltip",
              },
              {
                value: "popover",
              },
              {
                value: "card",
              },
              {
                value: "carousel",
              },
              {
                value: "collapse",
              },
            ],
          },
        ],
      },
      {
        value: "resource",
        children: [
          {
            value: "axure",
          },
          {
            value: "sketch",
          },
          {
            value: "docs",
          },
        ],
      },
    ]);
    return {
      selectingData,
      optionData,
    };
  },
};
</script>

<style >
.cd-website-scroll-everyspan {
  display: inline-block;
  width: 200px;
  height: 20px;
  background-color: blueviolet;
}
.flex {
  width: 100vw;
  height: 200px;
  display: flex;
  overflow: auto;
  /* white-space: nowrap; */
  background-color: aqua;
}
.left {
  flex: 4;
  background-color: bisque;
  width: 0px;
}
.right {
  flex: 1;
}
.suuuuuu {
  width: 400px;
}
</style>
