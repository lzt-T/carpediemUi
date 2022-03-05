<template>
  <div :class="{ 'cd-collapse-frame': true }">
    <div
      v-for="(data, ind) in options"
      :key="ind"
      :class="{
        'cd-collapse-div': true,
        'cd-collapse-div-broder': isAction[ind] == 1,
        'cd-collapse-div-broder-other':
          isAction[ind] == 1 && ind == options.length - 1,
        'cd-collapse-div-show': isAction[ind] == 1,
        'cd-collapse-div-alwayshow': isAction[ind] == 1,
        'cd-collapse-div-notshow': isAction[ind] == 0,
      }"
    >
      <div
        :class="{
          'cd-collapse-title': true,
          'cd-collapse-div-broder': isAction[ind] == 0,
          'cd-collapse-div-broder-other':
            isAction[ind] == 0 && ind == options.length - 1,
        }"
        @click="onClick(ind)"
        @selectstart.prevent
      >
        <span :class="{ 'cd-collapse-title-word': true }">{{
          data.title
        }}</span>
        <cd-icon
          name="rightArrowTow"
          :size="heightData / 3"
          :class="{
            'cd-collapse-title-icon': true,
            'cd-collapse-title-icon-dowm': isAction[ind] == 1,
            'cd-collapse-title-icon-up': isAction[ind] == 0 && isMove,
          }"
        ></cd-icon>
      </div>
      <div :class="{ 'cd-collapse-text': true }" :ref="text">
        {{ data.text }}
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
    options: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      default: 48,
    },
    accordion: {
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

    let textDiv: any = ref([]);
    const text = (el: any) => {
      textDiv.value.push(el);
    };
    let isAction: any = ref([]);
    let divHeight = ref(0);

    initializeIsAction();
    let isMove = ref(false);
    function initializeIsAction() {
      props.options?.forEach(() => {
        isAction.value.push(0);
      });
    }
    function onClick(ind: number) {
      isMove.value = true;
      if (props.accordion) {
        isAction.value.forEach((val: any, arrayInd: number) => {
          if (arrayInd == ind) {
            isAction.value[arrayInd] = !isAction.value[arrayInd];
          } else {
            isAction.value[arrayInd] = 0;
          }
        });
      } else {
        isAction.value[ind] = !isAction.value[ind];
      }
      divHeight.value = textDiv.value[ind].clientHeight;
    }
    onMounted(() => {
      console.log(textDiv.value[0].clientHeight);
    });
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
}
.cd-collapse-div-broder {
  border-top: 1px solid #ededed;
}
.cd-collapse-div-broder-other {
  border-bottom: 1px solid #ededed;
}
.cd-collapse-div-alwayshow {
  overflow: auto;
  height: auto;
}
.cd-collapse-div-show {
  overflow: hidden;
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
.cd-collapse-text {
  padding-left: 5px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: v-bind(heightData/2 + "px");
  font-size: v-bind(heightData/3.2 + "px");
}
</style>