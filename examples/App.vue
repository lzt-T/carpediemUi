<template>
  <cd-button val="asd" :disabled="true"> </cd-button>
  <cd-button val="asd" :disabled="false" :loading="true"> </cd-button>
  <cd-border> </cd-border>
  <cd-border> </cd-border>

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
  <hr />
  <cd-icon name="mute" />
  <cd-link color="red" :disabled="true" :underline="true"> sda</cd-link>
  <cd-link color="red" :disabled="false" :underline="false"> sda</cd-link>
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
