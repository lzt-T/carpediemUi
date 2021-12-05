<template>
  <div class="cd-row">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "cd-row",
});
</script>

<style scoped>
.cd-row {
  display: flex;
  background-color: aquamarine;
}
</style>