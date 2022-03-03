<template>
  <div class="cd-progress-frame">
    <div class="cd-progress"></div>
    <div class="cd-progress-word">{{ progress }}%</div>
  </div>
</template>

<script>
import { watch, ref } from "vue";
export default {
  props: {
    progress: {},
  },
  setup(props) {
    watch(
      () => {
        return props.progress;
      },
      (newval, oldval) => {
        console.log(newval);
      }
    );
  },
};
</script>

<style scoped>
.cd-progress-frame {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 3px;
  border-radius: 2px;
}
.cd-progress {
  margin-left: 5px;
  margin-right: 5px;
  width: v-bind(0.9 * progress + "%");
  height: 3px;
  border-radius: 2px;
  background-color: #409efe;
}
.cd-progress-word {
  position: absolute;
  right: 5px;
  top: 0;
  z-index: 1;
  text-align: center;
  font-size: 12px;
  line-height: 0px;
  margin-right: 5px;
}
</style>