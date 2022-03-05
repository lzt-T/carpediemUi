<template>
  <div :class="{ 'cd-collapse-frame': true }">
    <div
      :class="{
        'cd-collapse-div': true,
        'cd-collapse-div-show': isAction && isMove,
        'cd-collapse-div-always-show': isAction,
        'cd-collapse-div-notshow': isAction == false,
      }"
    >
      <div
        :class="{
          'cd-collapse-title': true,
        }"
        @click="onClick"
        @selectstart.prevent
      >
        <span :class="{ 'cd-collapse-title-word': true }">{{ title }}</span>
        <cd-icon
          name="rightArrowTow"
          :size="heightData / 3"
          :class="{
            'cd-collapse-title-icon': true,
            'cd-collapse-title-icon-dowm': isAction && isMove,
            'cd-collapse-title-icon-always-dowm': isAction,
            'cd-collapse-title-icon-up': isAction == false && isMove,
          }"
        ></cd-icon>
      </div>
      <div ref="text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, onMounted, ref, watch } from "vue";
export default defineComponent({
  name: "cd-collapse",
  components: {
    cdIcon,
  },
  props: {
    title: {
      type: String,
    },
    height: {
      type: Number,
      default: 48,
    },
    state: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    //   设置大小
    let heightData = ref();
    setSize();
    function setSize() {
      if (props.height >= 24) {
        heightData.value = props.height;
      } else {
        heightData.value = 24;
      }
    }
    let text = ref();
    let isAction = ref();
    let divHeight = ref(0);
    onMounted(() => {
      if (props.state) {
        isAction.value = true;
        divHeight.value = text.value.clientHeight;
      } else {
        isAction.value = false;
      }
    });

    let isMove = ref(false);
    function onClick() {
      isMove.value = true;
      divHeight.value = text.value.clientHeight;
      isAction.value = !isAction.value;
    }
    return {
      heightData,
      text,
      onClick,
      isAction,
      divHeight,
      isMove,
    };
  },
});
</script>

<style scoped>
.cd-collapse-frame {
  width: 100%;
}
.cd-collapse-div {
  overflow: hidden;
  width: 100%;
  height: v-bind(heightData + "px");
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
}
.cd-collapse-div-always-show {
  overflow: hidden;
  height: v-bind(divHeight + heightData + "px");
}
.cd-collapse-div-show {
  overflow: hidden;
  height: v-bind(divHeight + heightData + "px");
  animation: show 0.2s linear;
}
@keyframes show {
  0% {
    height: v-bind(heightData + "px");
  }
  100% {
    height: v-bind(divHeight + heightData + "px");
  }
}
.cd-collapse-div-notshow {
  overflow: hidden;
  animation: notshow 0.2s linear;
  height: v-bind(heightData + "px");
}
@keyframes notshow {
  0% {
    height: v-bind(heightData + divHeight + "px");
  }
  100% {
    height: v-bind(heightData + "px");
  }
}
.cd-collapse-title {
  display: flex;
  align-items: center;
  height: v-bind(heightData + "px");
  line-height: v-bind(heightData + "px");
  font-size: v-bind(heightData/3 + "px");
  cursor: pointer;
}
.cd-collapse-title-word {
  flex: 99999;
  margin-left: 5px;
}
.cd-collapse-title-icon {
  flex: 1;
  line-height: v-bind(heightData/3 + "px");
  margin-left: 10px;
  margin-right: 10px;
}

.cd-collapse-title-icon-dowm {
  animation: down 0.2s linear;
  transform: rotate(90deg);
}
.cd-collapse-title-icon-always-dowm {
  transform: rotate(90deg);
}
@keyframes down {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}
.cd-collapse-title-icon-up {
  animation: up 0.2s linear;
  transform: rotate(0deg);
}
@keyframes up {
  0% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>