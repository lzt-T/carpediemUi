<template>
  <div class="cd-breadcrumb-frame">
    <div v-for="(data, ind) in options" :key="ind" class="cd-breadcrumb">
      <div
        :class="{
          'cd-breadcrumb-text': true,
          'cd-breadcrumb-text-to': data.to !== undefined,
        }"
        @click="onClick(data.to)"
      >
        {{ data.value }}
      </div>
      <div v-if="ind !== options.length - 1" class="cd-breadcrumb-separator">
        <div v-if="separatorIcon === undefined" class="">{{ separator }}</div>
        <div
          v-if="separatorIcon !== undefined"
          class="cd-breadcrumb-icon-frame"
        >
          <cd-icon
            :name="separatorIcon"
            :size="heightData"
            color="#d8d7d8"
          ></cd-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "cd-breadcrumb",
  components: {
    cdIcon,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      default: 24,
    },
    separator: {
      type: String,
      default: "/",
    },
    separatorIcon: {
      type: String,
    },
    replace: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let heightData = ref<number>();
    setSize();
    function setSize(): void {
      if (props.height >= 12) {
        heightData.value = props.height;
      } else {
        heightData.value = 12;
      }
    }
    function onClick(to: string): void {
      if (props.replace) {
        location.replace(to);
      } else {
        location.assign(to);
      }
    }
    return {
      heightData,
      onClick,
    };
  },
});
</script>

<style scoped>
.cd-breadcrumb-frame {
  display: flex;
  align-items: center;
  font-size: v-bind(heightData + "px");
  height: v-bind(heightData + 6+"px");
  line-height: v-bind(heightData + 6+"px");
}
.cd-breadcrumb {
  display: flex;
  align-items: center;
}
.cd-breadcrumb-text-to {
  cursor: pointer;
}
.cd-breadcrumb-text-to:hover {
  color: #73a7f0;
}
.cd-breadcrumb-separator {
  margin-right: 9px;
  margin-left: 9px;
  color: #d8d7d8;
}
.cd-breadcrumb-icon-frame {
  height: v-bind(heightData + 6+"px");
  line-height: v-bind(heightData + 6+"px");
}
</style>