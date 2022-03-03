<template>
  <div v-if="type == 'list'">
    <div :class="{ 'cd-upload-div': true }">
      <form :method="method" :action="action" ref="form">
        <input
          action="http://127.0.0.1:3000/su"
          type="file"
          :class="{ 'cd-upload': true }"
          @change="UpFile($event)"
          :multiple="multiple"
          ref="file"
          name="upload"
        />
      </form>
      <div class="cd-upload-selectText">{{ selectText }}</div>
    </div>
    <div
      v-if="autoUpload == false"
      @click="onUpload"
      class="cd-upload-manual-upload"
    >
      {{ manualUploadText }}
    </div>
    <div :class="{ 'cd-upload-list-frame': true }" v-if="showFileList">
      <div
        v-for="(data, ind) in imgArray"
        :key="data"
        :class="{
          'cd-upload-list-every': true,
          'cd-upload-list-every-hover': ind == hoverInd,
          'cd-upload-list-every-show': true,
          'cd-upload-list-every-notShow': ind == deleInd,
        }"
        @mouseover="onMouseover(ind)"
        @mouseout="onMouseout"
      >
        <cdprogress
          v-show="fileState[ind] == 1"
          :progress="fileProgress[ind]"
        ></cdprogress>

        <cd-icon
          name="documentTow"
          :size="heightData / 2"
          :class="{ 'cd-upload-list-beforeIcon': true }"
          color="rgba(0, 0, 0, 0.4)"
        ></cd-icon>
        <div
          :class="{
            'cd-upload-list-word': true,
            'cd-upload-list-word-hover': ind == hoverInd,
          }"
        >
          {{ fileName[ind] }}
        </div>
        <cd-icon
          :name="hoverInd == ind ? 'delete' : fileState[ind] == 2 ? 'tick' : ''"
          :color="hoverInd == ind ? '#a0a1a3' : '#abce95'"
          :size="heightData / 2"
          :class="{ 'cd-upload-list-afterIcon': true }"
          @click="deleDocument(ind)"
        ></cd-icon>
      </div>
    </div>
  </div>
  <div v-if="type == 'picture'">
    <div>asdasd</div>
  </div>
</template>

<script lang="ts">
import cdprogress from "./progress.vue";
import cdIcon from "./../../icon/src/icon.vue";
import { defineComponent, ref, watch, onMounted, watchEffect } from "vue";
export default defineComponent({
  components: {
    cdIcon,
    cdprogress,
  },
  name: "cd-upload",
  emits: [],
  props: {
    type: {
      type: String,
      default: "list",
    },
    height: {
      type: Number,
      default: 32,
    },
    width: {
      type: Number,
      default: 240,
    },
    action: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: "POST",
    },
    accept: {
      type: String,
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    beforeUpload: {
      type: Function,
      default: () => {
        return true;
      },
    },
    onRemove: {
      type: Function,
    },
    onError: {
      type: Function,
    },
    onSuccess: {
      type: Function,
    },
    onPropgress: {
      type: Function,
    },
    selectText: {
      type: String,
      default: "Select File",
    },
    manualUploadText: {
      type: String,
      default: "upload to server",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Number,
    },
  },
  setup(props, context) {
    // 设置大小
    let heightData = ref();
    let widthData = ref();
    setSize();
    function setSize() {
      if (props.height >= 24) {
        heightData.value = props.height;
      } else {
        heightData.value = 24;
      }
      if (props.width >= 120) {
        widthData.value = props.width;
      } else {
        widthData.value = 120;
      }
    }
    // 文件触摸
    let hoverInd = ref();
    function onMouseover(ind: number) {
      hoverInd.value = ind;
    }
    function onMouseout() {
      hoverInd.value = undefined;
    }
    // 删除文件
    let deleInd = ref();
    function deleDocument(ind: number) {
      if (props.onRemove !== undefined) {
        props.onRemove(sumFile.value[ind], sumFile.value);
      }
      deleInd.value = ind;
      setTimeout(() => {
        imgArray.value = imgArray.value.filter((val: any, ind: number) => {
          return ind != deleInd.value;
        });
        sumFile.value = sumFile.value.filter((val: any, ind: number) => {
          return ind != deleInd.value;
        });
        fileName.value = fileName.value.filter((val: any, ind: number) => {
          return ind != deleInd.value;
        });
        fileState.value = fileState.value.filter((val: any, ind: number) => {
          return ind != deleInd.value;
        });
        fileProgress.value = fileProgress.value.filter(
          (val: any, ind: number) => {
            return ind != deleInd.value;
          }
        );
        deleInd.value == undefined;
      }, 190);
    }
    let form = ref();
    let file = ref();
    //每次上传file对象，有size和name属性
    let dataArray: any = ref([]);
    // 列表的全部file对象
    let sumFile: any = ref([]);
    // 列表图片资源
    let imgArray: any = ref([]);
    // 列表资源名字
    let fileName: any = ref([]);
    // 列表文件的状态
    let fileState: any = ref([]);
    // 列表文件进度
    let fileProgress: any = ref([]);
    // 手动上传
    function onUpload() {
      uploadServer(sumFile);
    }
    // 上传服务器
    function uploadServer(data: any) {
      let formDataArray: any = ref([]);
      for (let i = 0; i < data.value.length; i++) {
        let formData = new FormData();
        formData.append("upload", data.value[i]);
        formDataArray.value.push(formData);
      }
      for (let j = 0; j < data.value.length; j++) {
        if (fileState.value[j] == 2 && data == sumFile) {
          continue;
        }
        let xhr = new XMLHttpRequest();
        xhr.open(props.method, props.action);
        xhr.send(formDataArray.value[j]);
        xhr.onloadstart = () => {
          fileState.value[imgArray.value.length + j] = 1;
        };
        // 上传完成时
        xhr.onload = () => {
          if (props.onSuccess !== undefined) {
            props.onSuccess(data.value, sumFile.value);
          }
          fileState.value[
            fileProgress.value.length - data.value.length + j
          ] = 2;
        };
        // 上传发送错误时
        xhr.onerror = () => {
          if (props.onError !== undefined) {
            props.onError(data.value, sumFile.value);
          }
        };
        // 上传时触发
        xhr.upload.onprogress = (e: any) => {
          if (props.onPropgress !== undefined) {
            props.onPropgress(data.value, sumFile.value);
          }
          fileProgress.value[
            fileProgress.value.length - data.value.length + j
          ] = Math.round((e.loaded / e.total) * 100);
        };
      }
    }
    // 自动上传
    function UpFile(e: any) {
      dataArray.value = file.value.files;
      if (
        props.limit !== undefined &&
        sumFile.value.length + dataArray.value.length > props.limit
      ) {
        return;
      }
      if (props.beforeUpload(dataArray.value) == false) {
        return;
      }
      //获得浏览图
      for (let i = 0; i < dataArray.value.length; i++) {
        fileName.value.push(dataArray.value[i].name);
        sumFile.value.push(dataArray.value[i]);
        fileState.value.push(0);
        fileProgress.value.push(0);
        let reader = new FileReader();
        // 加载完成时
        reader.onload = () => {
          imgArray.value.push(reader.result);
        };
        // 加载中
        reader.onprogress = (e: any) => {};
        reader.readAsDataURL(dataArray.value[i]);
      }

      if (props.autoUpload == false) {
        return;
      }
      // 上传到服务器;
      uploadServer(dataArray);
    }

    return {
      UpFile,
      dataArray,
      file,
      imgArray,
      form,
      heightData,
      widthData,
      fileName,
      fileState,
      fileProgress,
      onMouseover,
      hoverInd,
      onMouseout,
      deleDocument,
      deleInd,
      sumFile,
      onUpload,
      uploadServer,
    };
  },
});
</script>

<style scoped>
.cd-upload-div {
  position: relative;
  display: inline-block;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  border-radius: 5px;
  vertical-align: middle;
}
.cd-upload-manual-upload {
  display: inline-block;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  line-height: v-bind(heightData + "px");
  font-size: v-bind(heightData/2 + "px");
  text-align: center;
  color: white;
  background-color: #409efe;
  vertical-align: middle;
  border-radius: 5px;
  margin-left: 5px;
}
.cd-upload {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");

  opacity: 0;
}
.cd-upload-selectText {
  position: absolute;
  top: 0;
  left: 1;
  z-index: 0;
  border-radius: 5px;
  height: v-bind(heightData + "px");
  width: v-bind(widthData + "px");
  line-height: v-bind(heightData + "px");
  font-size: v-bind(heightData/2 + "px");
  text-align: center;
  color: white;
  background-color: #409efe;
}
.cd-upload-list-frame {
}
.cd-upload-list-every {
  position: relative;
  display: flex;
  height: 35px;
  line-height: 35px;
  font-size: 15px;
}
.cd-upload-list-every-hover {
  background-color: #f6f7f9;
}
.cd-upload-list-every-show {
  animation: show 0.2s linear;
}
@keyframes show {
  0% {
    margin-top: -10px;
    opacity: 0;
  }
  100% {
    opacity: 1;
    margin-top: 0px;
  }
}
.cd-upload-list-every-notShow {
  animation: notshow 0.2s linear;
}
@keyframes notshow {
  0% {
    margin-top: 0px;
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    margin-top: -20px;
  }
}
.cd-upload-list-beforeIcon {
  flex: 1;
  margin-left: 5px;
}
.cd-upload-list-word {
  flex: 99999;
  margin-left: 5px;
  margin-right: 5px;
}
.cd-upload-list-word-hover {
  color: #92b7fa;
}
.cd-upload-list-afterIcon {
  flex: 1;
  margin-right: 5px;
}
</style>