<template>
  <cd-button :disabled="true"
    ><cd-icon name="fit" :size="10"></cd-icon> asdasdsa</cd-button
  >
  <cd-button val="asd" :disabled="false" :loading="true"> </cd-button>
  <cd-border> </cd-border>
  <cd-border> </cd-border>

  <hr />
  <hr />
  <hr />
  <div>
    <cd-row :gap="50" textAlign="center">
      <cd-col :span="4"> qweqwe</cd-col>
      <cd-col :span="8">qweqwe</cd-col>
      <cd-col :span="8">qweqwe</cd-col>
    </cd-row>
  </div>
  <hr />
  <cd-icon name="mute" />
  <cd-icon name="fit"></cd-icon>
  <cd-link color="red" :disabled="true" :underline="true"> sda</cd-link>
  <cd-link color="red" :disabled="false" :underline="false"> sda</cd-link>
  <div class="su">
    <cd-scrollbar @scroll="su">
      <!-- <span v-for="(data, ind) in 20" :key="ind">{{ data }}</span> -->
      <div v-for="(data, ind) in 20" :key="ind">{{ data }}</div>
    </cd-scrollbar>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
export default {
  name: "App",
  setup() {
    function su() {
      console.log("asdasd");
    }
    return {
      su,
    };
  },
};
</script>

<style >
.su {
  width: 50px;
  height: 280px;
}
</style>
