<template>
  <div class="su">
    <cd-cascader
      v-model="aa1"
      :option="su1"
      @onChange="su"
      :size="180"
    ></cd-cascader>

    <cd-checkbox
      v-model="aa"
      label="aaaaaaa"
      :size="2"
      :disabled="false"
      :border="true"
      @onChange="su"
    >
    </cd-checkbox>

    <cd-checkbox-group
      v-model="bb"
      :option="bb1"
      @onChange="su"
      :size="100"
      :border="true"
      :min="1"
      :max="2"
      :marginLeft="30"
    >
    </cd-checkbox-group>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let aa1 = ref();
    watch(aa1, (newval, oldval) => {
      console.log(newval);
    });
    let su1 = ref([
      {
        value: "qwe",
        children: [
          {
            value: "312",
          },
          {
            value: "asd",
          },
        ],
      },
      {
        value: 1,
      },
    ]);

    let aa = ref(false);
    watch(aa, (newval, oldval) => {
      console.log("新的值", newval);
    });
    function su(data: any) {
      console.log(data);
    }

    let bb = ref([]);
    let bb1 = ref(["a", "b", "c"]);
    watch(bb, (newval, oldval) => {
      console.log(newval);
    });
    return {
      aa,
      su,
      bb,
      bb1,
      su1,
      aa1,
    };
  },
};
</script>

<style >
.su {
  padding: 0;
  height: 300px;
  font-size: 300x;
  line-height: 300px;
}
</style>
