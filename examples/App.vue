<template>
  <cd-button val="asd"> </cd-button>
  <!-- <cd-border> </cd-border>
  <cd-border> </cd-border> -->
  <cd-icon name="icon-ce" />
  <hr />
  <hr />
  <hr />
  <div class="su">
    <cd-row :gap="50" textAlign="center">
      <cd-col :span="4"> qweqwe</cd-col>
      <cd-col :span="8">qweqwe</cd-col>
      <cd-col :span="8">qweqwe</cd-col>
    </cd-row>
  </div>
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
  width: 400px;
}
</style>
