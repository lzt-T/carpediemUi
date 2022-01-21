<template>
  <cd-button :disabled="false"
    >阿
    <cd-icon name="fit" :size="19"></cd-icon>
  </cd-button>

  <div class="su">
    <cd-cascader
      v-model="aa"
      :option="data"
      :size="200"
      :showAllLevels="true"
    ></cd-cascader>
    <span>sad</span>
  </div>

  <span>asdasdasd</span>
  <div>sadasdasd</div>
  <div>sadasdasd</div>
  <div>sadasdasd</div>
  <div>sadasdasd</div>
  <div>sadasdasd</div>
  <div>sadasdasd</div>

  <div class="su">
    asdas
    <cd-icon name="rightArrowTow" class="su1" :size="20"></cd-icon>
  </div>

  <div>
    <span><div>asdasddasdasdsadasasdasasd</div></span>
    <span>asda</span>
    <span>asdsa</span>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let aa = ref();
    let data = [
      {
        value: "爱上给大家看赶时间的",
        children: [
          {
            value: "按数据的",
          },
          {
            value: "aa2",
            children: [
              {
                value: "aaa3",
              },
              {
                value: "aaa4",
                children: [
                  {
                    value: "aaa5",
                  },
                  {
                    value: "aaa6",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
      {
        value: "bb",
      },
    ];
    watch(
      aa,
      (newval, oldval) => {
        console.log(newval, oldval);
      },
      { immediate: true }
    );

    return {
      aa,
      data,
    };
  },
};
</script>

<style >
.su {
  position: relative;
  font-size: 100px;
}
</style>
