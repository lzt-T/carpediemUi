<template>
  <cd-button> </cd-button>
  <cd-border> </cd-border>
  <cd-icon name="icon-ce" :size="60">asdsa</cd-icon>
  <hr />
  <hr />
  <hr />
  <cd-row>
    <div class="su">sadsa</div>
    <div class="su">sadsa</div>
  </cd-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    return {};
  },
});
</script>

<style >
.su {
  flex: 8;
}
</style>
