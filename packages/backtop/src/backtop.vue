<template>
  <div class="cd-backtop-frame" v-show="isShow" @click="onClick">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "cd-backtop",
  emits: ["click"],
  props: {
    visibilityHeight: {
      type: Number,
      default: 200,
    },
    right: {
      type: Number,
      default: 40,
    },
    bottom: {
      type: Number,
      default: 40,
    },
  },
  setup(props, context) {
    let isShow = ref<boolean>(false);
    window.addEventListener("scroll", (): void => {
      if (document.documentElement.scrollTop >= props.visibilityHeight) {
        isShow.value = true;
      } else {
        isShow.value = false;
      }
    });
    function onClick(): void {
      context.emit("click");
      scrollToTop();
    }
    const scrollToTop = (): void => {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, top - top / 8);
      }
    };

    return {
      isShow,
      onClick,
    };
  },
});
</script>

<style scoped>
.cd-backtop-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: v-bind(right + "px");
  bottom: v-bind(bottom + "px");
}
</style>