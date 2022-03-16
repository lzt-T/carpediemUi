<template>
  <div
    :class="{ 'cd-switch-frame': true, 'cd-switch-frame-disabled': disabled }"
    @click="setIsTrue"
    @selectstart.prevent
  >
    <cd-icon
      class="cd-switch-offIcon"
      :name="inactiIcon"
      v-if="inactiIcon"
      :size="heightData / 1.2"
      :color="isTrue == false ? '#75b3ff' : ''"
    ></cd-icon>
    <span
      :class="{
        'cd-switch-offWord': true,
        'cd-switch-offWord-select': isTrue == false,
      }"
      v-show="inactiText"
      >{{ inactiText }}</span
    >
    <span :class="{ 'cd-switch-div': true }">
      <div
        :class="{
          'cd-switch': true,
          'cd-switch-true': isTrue && isMove,
          'cd-switch-false': isTrue == false && isMove,
        }"
      ></div>
    </span>
    <span
      :class="{ 'cd-switch-onWord': true, 'cd-switch-onWord-select': isTrue }"
      v-show="activeText"
      >{{ activeText }}</span
    >
    <cd-icon
      class="cd-switch-onIcon"
      :name="inactiIcon"
      v-if="inactiIcon"
      :size="heightData / 1.2"
      :color="isTrue ? '#75b3ff' : ''"
    ></cd-icon>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, ref, watch, onMounted, watchEffect } from "vue";
export default defineComponent({
  components: {
    cdIcon,
  },
  name: "cd-switch",
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 32,
    },
    width: {
      type: Number,
      default: 40,
    },
    activeColor: {
      type: String,
      default: "#409EFF",
    },
    inactiveColor: {
      type: String,
      default: "#C0CCDA",
    },
    activeText: {
      type: String,
    },
    inactiText: {
      type: String,
    },
    activeIcon: {
      type: String,
    },
    inactiIcon: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    //   设置大小
    let heightData = ref<number>();
    let widthData = ref<number>();
    setSize();
    function setSize(): void {
      if (props.height >= 20) {
        heightData.value = props.height;
      } else {
        heightData.value = 20;
      }
      if (props.width >= 40) {
        widthData.value = props.width;
      } else {
        widthData.value = 40;
      }
    }
    let isTrue = ref<boolean>();
    watch(
      () => {
        return props.modelValue;
      },
      (newval: boolean, oldval) => {
        isTrue.value = newval;
      },
      { immediate: true }
    );
    function setIsTrue(): void {
      if (props.disabled) {
        return;
      }
      isMove.value = true;
      isTrue.value = !isTrue.value;
      setModelValue();
      executeChange();
    }
    function executeChange(): void {
      context.emit("change", isTrue.value);
    }
    function setModelValue(): void {
      context.emit("update:modelValue", isTrue.value);
    }
    let isMove = ref<boolean>(false);
    return {
      heightData,
      widthData,
      isMove,
      isTrue,
      setIsTrue,
    };
  },
});
</script>

<style scoped>
.cd-switch-frame {
  display: inline-block;
  height: v-bind(heightData * 1.2 + "px");
  line-height: v-bind(heightData * 1.2 + "px");
  font-size: v-bind(heightData/1.2 + "px");
  width: auto;
  cursor: pointer;
}
.cd-switch-frame-disabled {
  cursor: not-allowed;
}
.cd-switch-offIcon {
  margin-left: 5px;
}
.cd-switch-offWord {
  margin-left: 5px;
}
.cd-switch-offWord-select {
  color: #75b3ff;
}
.cd-switch-onIcon {
  margin-right: 5px;
}
.cd-switch-onWord {
  margin-right: 5px;
}
.cd-switch-onWord-select {
  color: #75b3ff;
}
.cd-switch-div {
  vertical-align: top;
  display: inline-block;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  margin-top: v-bind(heightData * 0.1 + "px");
  margin-left: 5px;
  margin-right: 5px;
  border-radius: v-bind(heightData/2 + "px");
  background-color: v-bind("isTrue?activeColor:inactiveColor");
}
.cd-switch {
  margin-top: v-bind(heightData * 0.05+ "px");
  margin-left: v-bind(
    "modelValue?widthData-heightData+'px':heightData * 0.1+'px'"
  );
  height: v-bind(heightData * 0.9 + "px");
  width: v-bind(heightData * 0.9 + "px");
  border-radius: 50%;
  background-color: white;
}
.cd-switch-true {
  margin-left: v-bind(widthData-heightData + "px");
  animation: true 0.1s linear;
}
@keyframes true {
  0% {
    margin-left: v-bind(heightData * 0.1 + "px");
  }
  100% {
    margin-left: v-bind(widthData-heightData + "px");
  }
}
.cd-switch-false {
  margin-left: v-bind(heightData * 0.1 + "px");
  animation: false 0.1s linear;
}
@keyframes false {
  0% {
    margin-left: v-bind(widthData-heightData + "px");
  }
  100% {
    margin-left: v-bind(heightData * 0.1 + "px");
  }
}
</style>