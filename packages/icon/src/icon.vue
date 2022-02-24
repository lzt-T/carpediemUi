<template>
  <i :class="type"></i>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "cd-icon",
  props: {
    color: {
      type: String,
      default: "black",
    },
    size: {
      type: Number,
      default: 40,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let type = "cd icon-" + props.name;
    return {
      type,
    };
  },
});
</script>

<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  word-break: break-all;
  outline: none;
}
/* 修改图标的样式 .su ::before { color: red !important;}    */
@font-face {
  font-family: "cd"; /* Project id 2988922 */
  src: url("//at.alicdn.com/t/font_2988922_dvont1bf2js.woff2?t=1645670777704")
      format("woff2"),
    url("//at.alicdn.com/t/font_2988922_dvont1bf2js.woff?t=1645670777704")
      format("woff"),
    url("//at.alicdn.com/t/font_2988922_dvont1bf2js.ttf?t=1645670777704")
      format("truetype");
}
.cd {
  font-family: "cd" !important;
  font-style: normal;
  font-size: v-bind(0 + "px");
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: transparent;
  height: v-bind(size + "px");
  width: v-bind(size + "px");
}
/* 适应箭头 */
.icon-fit:before {
  content: "\e63d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 第一种上下左右箭头 */
.icon-downArrow:before {
  content: "\e63e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-rightArrow:before {
  content: "\e63f";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-upArrow:before {
  content: "\e64a";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-leftArrow:before {
  content: "\e63c";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 第二种上下左右箭头 */
.icon-leftArrowTow:before {
  content: "\e640";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-downArrowTow:before {
  content: "\e645";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-rightArrowTow:before {
  content: "\e649";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-upArrowTow:before {
  content: "\e636";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 第三种箭头 */
.icon-caretDown:before {
  content: "\e642";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-caretleft:before {
  content: "\e644";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-caretRight:before {
  content: "\e648";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
.icon-caretUp:before {
  content: "\e637";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 上传 */
.icon-upLoad:before {
  content: "\e641";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 左右双向箭头 */
.icon-leftRightArrow:before {
  content: "\e643";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 上下双向箭头 */
.icon-upDownArrow:before {
  content: "\e63a";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 下载 */
.icon-download:before {
  content: "\e646";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 全屏箭头 */
.icon-fullScreen:before {
  content: "\e647";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 刷新 */
.icon-refresh:before {
  content: "\e64c";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 编辑 */
.icon-edit:before {
  content: "\e64d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}

/* 编辑 */
.icon-redact:before {
  content: "\e65c1";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* wifi */
.icon-wifi:before {
  content: "\e64e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* wifi */
.icon-wifiTow:before {
  content: "\e661";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 电池 */
.icon-battery:before {
  content: "\e64f";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 解锁 */
.icon-unlock:before {
  content: "\e651";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 返回 */
.icon-back:before {
  content: "\e652";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 静音 */
.icon-mute:before {
  content: "\e653";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 铃声 */
.icon-bell:before {
  content: "\e654";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 蓝牙 */
.icon-bluetooth:before {
  content: "\e655";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 删除 */
.icon-delete:before {
  content: "\e656";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 打勾 */
.icon-tick:before {
  content: "\e657";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 垃圾桶 */
.icon-trash:before {
  content: "\e658";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 搜索 */
.icon-search:before {
  content: "\e659";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 搜索 */
.icon-searchTow:before {
  content: "\e696";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 菜单 更多 */
.icon-menu:before {
  content: "\e65a";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 电话 */
.icon-phone:before {
  content: "\e65b";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 音乐 */
.icon-music:before {
  content: "\e65c";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 设置 */
.icon-setting:before {
  content: "\e65d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 信息 */
.icon-message:before {
  content: "\e65e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 消息 */
.icon-messageTow:before {
  content: "\e65f";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 添加 */
.icon-add:before {
  content: "\e660";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 信息 */
.icon-messageThree:before {
  content: "\e662";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 锁定 */
.icon-lock:before {
  content: "\e663";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 更多 */
.icon-more:before {
  content: "\e664";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 消息 */
.icon-messageFour:before {
  content: "\e665";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 云下载 */
.icon-cloudDownload:before {
  content: "\e666";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 音量 */
.icon-volume:before {
  content: "\e667";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 闹钟 */
.icon-clock:before {
  content: "\e668";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 照相机 */
.icon-camera:before {
  content: "\e669";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 放映机 */
.icon-projector:before {
  content: "\e66a";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 麦克风 */
.icon-microphone:before {
  content: "\e66b";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/*  云上传 */
.icon-cloudUpload:before {
  content: "\e66c";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 图片 */
.icon-picture:before {
  content: "\e66d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 路由器 */
.icon-Router:before {
  content: "\e66e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 电脑 */
.icon-computer:before {
  content: "\e66f";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 笔记本电脑 */
.icon-laptop:before {
  content: "\e670";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 消息 */
.icon-messageFive:before {
  content: "\e671";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 自行车 */
.icon-bicycle:before {
  content: "\e672";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 消息6 */
.icon-messageSix:before {
  content: "\e673";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 服务器 */
.icon-server:before {
  content: "\e674";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 文件 */
.icon-file:before {
  content: "\e675";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 主页 */
.icon-homepage:before {
  content: "\e676";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 消息 */
.icon-messageSeven:before {
  content: "\e677";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 保存 */
.icon-save:before {
  content: "\e678";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 发送 */
.icon-send:before {
  content: "\e679";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 购物车 */
.icon-shopping:before {
  content: "\e67a";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 耳机 */
.icon-headset:before {
  content: "\e67b";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 用户 */
.icon-users:before {
  content: "\e67d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 配置 */
.icon-configured:before {
  content: "\e67e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 编辑 */
.icon-editTow:before {
  content: "\e67f";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 设置 */
.icon-settingTow:before {
  content: "\e680";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 管理员 */
.icon-Administrator:before {
  content: "\e681";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 快进 */
.icon-speed:before {
  content: "\e682";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 快退 */
.icon-backward:before {
  content: "\e683";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 暂停 */
.icon-pause:before {
  content: "\e684";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 下一首 */
.icon-next:before {
  content: "\e685";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 上一首 */
.icon-previous:before {
  content: "\e686";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 耳机 */
.icon-headsetTow:before {
  content: "\e687";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 耳机 */
.icon-headsetThree:before {
  content: "\e688";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 点击 */
.icon-click:before {
  content: "\e689";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 点赞 */
.icon-like:before {
  content: "\e68a";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 用户 */
.icon-usersTow:before {
  content: "\e68c";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 移动 */
.icon-move:before {
  content: "\e68d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 团队 */
.icon-team:before {
  content: "\e68e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 电子邮件 */
.icon-mail:before {
  content: "\e68f";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 可看 */
.icon-visible:before {
  content: "\e690";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 用户 */
.icon-usersThree:before {
  content: "\e691";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 不可看的 */
.icon-conceal:before {
  content: "\e692";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 购物车 */
.icon-shoppingTow:before {
  content: "\e693";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 路牌 */
.icon-guideboard:before {
  content: "\e694";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 路牌 */
.icon-guideboardTow:before {
  content: "\e695";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 图片 */
.icon-pictureTow:before {
  content: "\e697";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 文件搜索 */
.icon-fileSearch:before {
  content: "\e698";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 文档 */
.icon-document:before {
  content: "\e699";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 包裹 */
.icon-parcel:before {
  content: "\e69a";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 块形图表 */
.icon-blockDiagram:before {
  content: "\e69d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 块形图表 */
.icon-blockDiagramTow:before {
  content: "\e69e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 发送 */
.icon-sendTow:before {
  content: "\e60c";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 标签 */
.icon-label:before {
  content: "\e60d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 控制 */
.icon-control:before {
  content: "\e60e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 文件夹 */
.icon-folder:before {
  content: "\e60f";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 笔记本 */
.icon-notebook:before {
  content: "\e612";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 电脑窗口 */
.icon-window:before {
  content: "\e613";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 垃圾桶 */
.icon-trashTow:before {
  content: "\e619";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 音量 */
.icon-volumeTow:before {
  content: "\e61c";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 放映机 */
.icon-projectorTow:before {
  content: "\e63e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 秒表 */
.icon-chronometer:before {
  content: "\e61d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 男性 */
.icon-man:before {
  content: "\e61e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 女性 */
.icon-woman:before {
  content: "\e61f";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 音量控制 */
.icon-volumeControl:before {
  content: "\e622";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* u盘 */
.icon-usb:before {
  content: "\e629";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 保存 */
.icon-saveTow:before {
  content: "\e62b";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 播放 */
.icon-play:before {
  content: "\e62c";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 文档 */
.icon-documentTow:before {
  content: "\e62d";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 网络 */
.icon-network:before {
  content: "\e62e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 数据 */
.icon-data:before {
  content: "\e62f";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 配置 */
.icon-configurationTow:before {
  content: "\e630";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 鼠标 */
.icon-mouse:before {
  content: "\e631";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 信息 */
.icon-messageEight:before {
  content: "\e632";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 云计算 */
.icon-cloudComputing:before {
  content: "\e633";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 显示屏 */
.icon-screen:before {
  content: "\e635";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 定位 */
.icon-location:before {
  content: "\e64e1";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 爱心 */
.icon-love:before {
  content: "\e6291";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 五角星 */
.icon-star:before {
  content: "\e62c1";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 定位 */
.icon-locationTow:before {
  content: "\e6411";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 地图 */
.icon-map:before {
  content: "\e63e";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 日历 */
.icon-calendar:before {
  content: "\e67c";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
/* 减号 */
.icon-minus::before {
  content: "\e729";
  color: v-bind(color);
  font-size: v-bind(size + "px");
}
</style>