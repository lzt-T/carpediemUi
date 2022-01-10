<!-- 边框   默认为行内块元素 -->
<!-- 可以调节 高   宽   边框的款式-->
<template>
  <div :class="borderStyle">
    <div v-if="borderStyle == 'cd-border-two'"></div>
    <div v-if="borderStyle == 'cd-border-two'"></div>
    <div v-if="borderStyle == 'cd-border-two'"></div>
    <div v-if="borderStyle == 'cd-border-two'"></div>
    <span v-if="borderStyle == 'cd-border-three'"></span>
    <div v-if="borderStyle == 'cd-border-four'"><span></span></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "cd-border",
  props: {
    height: {
      type: Number,
      default: 200,
    },
    width: {
      type: Number,
      default: 400,
    },
    borderStyle: {
      type: String,
      default: "cd-border",
    },
  },
  setup(props) {
    //调整边距用的
    let heightData = props.height;
    if (props.width > props.height) {
      heightData = props.height;
    } else {
      heightData = props.width;
    }
    return {
      heightData,
    };
  },
};
</script>

<style scoped>
/* 第一种框 */
.cd-border {
  vertical-align: top;
  margin: 0px;
  padding: 0px;
  word-break: break-all;
  box-sizing: border-box;
  display: inline-block;
  width: v-bind(width + "px");
  height: v-bind(height + "px");
  border: 1px white solid;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: relative;
  background: white;
}
/* 第二种框 */
.cd-border-one {
  vertical-align: top;
  margin: 0px;
  padding: 0px;
  word-break: break-all;
  box-sizing: border-box;
  display: inline-block;
  width: v-bind(width + "px");
  height: v-bind(height + "px");
  border: 1px white solid;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: relative;
  background: white;
}
.cd-border-one::after {
  content: "";
  position: absolute;
  z-index: -2;
  top: 80%;
  bottom: 0;
  left: 5%;
  right: 5%;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.6);
  border-radius: 50%;
}

/* 第三种 */
.cd-border-two {
  vertical-align: top;
  margin: 0px;
  padding: 0px;
  word-break: break-all;
  box-sizing: border-box;
  padding: v-bind(heightData/17 + "px");
  margin: v-bind(heightData/6 + "px");
  display: inline-block;
  width: v-bind(width + "px");
  height: v-bind(height + "px");
  border: 1px white solid;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: relative;
  background: white;
}
.cd-border-two div:nth-child(1) {
  position: absolute;
  width: v-bind(heightData/4 + "px");
  height: v-bind(heightData/4 + "px");
  background-color: white;
  box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.3);
  transform: rotate(-45deg);
  top: v-bind(-heightData/7 + "px");
  left: v-bind(-heightData/7 + "px");
}
.cd-border-two div:nth-child(2) {
  position: absolute;
  width: v-bind(heightData/4 + "px");
  height: v-bind(heightData/4 + "px");
  background-color: white;
  box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.3);
  transform: rotate(45deg);
  top: v-bind(-heightData/7 + "px");
  right: v-bind(-heightData/7 + "px");
}
.cd-border-two div:nth-child(3) {
  position: absolute;
  width: v-bind(heightData/4 + "px");
  height: v-bind(heightData/4 + "px");
  background-color: white;
  box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.3);
  transform: rotate(135deg);
  bottom: v-bind(-heightData/7 + "px");
  right: v-bind(-heightData/7 + "px");
}
.cd-border-two div:nth-child(4) {
  position: absolute;
  width: v-bind(heightData/4 + "px");
  height: v-bind(heightData/4 + "px");
  background-color: white;
  box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.3);
  transform: rotate(225deg);
  bottom: v-bind(-heightData/7 + "px");
  left: v-bind(-heightData/7 + "px");
}
/* 第四种 */

.cd-border-three {
  vertical-align: top;
  margin: 0px;
  padding: 0px;
  word-break: break-all;
  box-sizing: border-box;
  display: inline-block;
  margin: 5px;
  width: v-bind(width + "px");
  height: v-bind(height + "px");
  border: 10px white solid;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: relative;
  background: white;
}

.cd-border-three::after,
.cd-border-three::before {
  content: "";
  position: absolute;
  z-index: -2;
  top: 80%;
  bottom: 3%;
  left: 1%;
  right: 1%;
  box-shadow: 0 20px 15px rgba(0, 0, 0, 0.6);
  transform: skew(0, 5deg);
}

.cd-border-three::after {
  transform: skew(0, -5deg);
}

.cd-border-three span {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent 15%),
    linear-gradient(to top left, rgba(0, 0, 0, 0.5), transparent 15%);
}

/* 第五种 */

.cd-border-four {
  vertical-align: top;
  margin: 0px;
  padding: 0px;
  word-break: break-all;
  box-sizing: border-box;
  display: inline-block;
  margin: 2px;
  width: v-bind(width + "px");
  height: v-bind(height + "px");
  border: 10px white solid;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: relative;
  background: white;
  border-radius: 0 0 120px 120px / 0 0 30px 30px;
}
.cd-border-four::after,
.cd-border-four::before {
  content: "";
  position: absolute;
  z-index: -2;
  top: 80%;
  bottom: 3%;
  left: 0.5%;
  right: 0.5%;
  box-shadow: 0 20px 15px rgba(0, 0, 0, 0.6);
  transform: skew(0, 5deg);
  border-radius: 40%;
}
.cd-border-four::after {
  transform: skew(0, -5deg);
}
.cd-border-four div {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0 0 120px 120px / 0 0 25px 25px;
  position: absolute;
  bottom: 0px;
}
.cd-border-four span {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent 15%),
    linear-gradient(to top left, rgba(0, 0, 0, 0.5), transparent 15%);
}
</style>