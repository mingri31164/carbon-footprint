<script>
import Aside from "./Aside";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import {isCamelCase} from "eslint-plugin-vue/lib/utils/casing";
import axios from "axios";

export default {
  name: "index",
  data(){
    return{
      showImage: false, // 控制图片显示与隐藏的状态

      inputText: '',
      ifshow:'noshow',//加上这个


      isVisible: true, // 初始状态为显示

      user: JSON.parse(sessionStorage.getItem('CurUser')),
      isMoving: true,
      message: '',
      messageTimer: null, // 用于存储定时器的引用

      messages: [
        '点击我有惊喜！',
        '猜猜我是谁？',
        '欢迎来到碳足迹计算器',
            '衣食住行，还有额..',
        'What can I say?',
        // 添加更多消息...
      ],
      iscollapse:false,
      aside_width:"150px",

      //桌面宠物
      deg: 0,
      imgx: 0,
      imgy: 0,
      imgl: 890,
      imgt: 600,
      y: 0,
      index: 0,
    }
  },

  mounted() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    // resetui();

      this.generateRandomMessage();
      // window.addEventListener('mousemove', this.handleMouseMove);
      this.interval = setInterval(this.updateImagePosition.bind(this), 1000);

  },
  beforeDestroy() {
    clearTimeout(this.messageTimer); // 清除定时器
    clearInterval(this.interval);
    // window.removeEventListener('mousemove', this.handleMouseMove);
    // clearInterval(this.interval);
  },
  methods:{
    //桌面宠物显示与否？
    dohide(){
      // 当点击图片时，切换图片的显示与隐藏状态
      this.showImage =!this.showImage;
    },

    Open(){
      this.ifshow = 'show'
    },
    Off(){
      this.ifshow = 'noshow'
    },


    getMsg(text) {
      fetch('http://localhost:8536/user/chat?msg='+text)
          .then((response) => response.json())
          .then((res) => {
            console.log(res.data);
            if (res.code === 200) {
              // 接收消息
              const msg = res.data;
              console.log(msg)
              const talkList = document.getElementById('talk_list');
              const li = document.createElement('li');
              li.className = 'left_word';
              li.innerHTML = `<img src="https://web-firsttlias.oss-cn-hangzhou.aliyuncs.com/5b493585-2b97-47a2-bc7d-0c6f9c77f97e.gif"
style="width: 50px; height: 50px"/><span>` + msg + '</span>';
              talkList.appendChild(li);

              // 重置滚动条
              // this.resetUI();
              // this.getVoice(msg)
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    sendMessage() {
      const text = this.inputText.trim();
      if (text.length <= 0) {
        this.inputText = '';
        return;
      }

      // 追加内容到页面
      const talkList = document.getElementById('talk_list');
      const li = document.createElement('li');
      li.className = 'right_word';
      li.innerHTML = `<img src="${this.user.image}" style="width: 50px;
  height: 50px;
  border-radius: 100%;"/><span>` + text + '</span>';
      console.log(this.user)
      talkList.appendChild(li);

      this.inputText = '';

      // 重置滚动条
      // this.resetUI();
      console.log("真不愧是")
      console.log(text)
      this.getMsg(text);
    },



    stopMoving() {
      // alert("stop")
      clearInterval(this.interval);// 停止定时器
      this.imgt = 600;
      this.imgl = 890;
      // alert(this.isMoving)
    },

    startMoving() {
      // alert("start")
      clearInterval(this.interval); // 确保清除旧的定时器
      this.interval = setInterval(this.updateImagePosition.bind(this), 1000);
      // alert(this.isMoving)
    },
    generateRandomMessage() {
      // // 生成一条新的随机消息
      const randomIndex = Math.floor(Math.random() * this.messages.length);
      this.message = this.messages[randomIndex];
    },

    docollapse(){
      console.log(111)
      this.iscollapse = !this.iscollapse
      if (!this.iscollapse){ //展开
         this.aside_width = "10vw"
      }
      else {
        this.aside_width = "0px"
      }
    },
    // handleMouseMove(event) {
    //   const img = this.$el.querySelector('.img');
    //   this.imgx = event.x - img.offsetLeft - img.clientWidth / 2;
    //   this.imgy = event.y - img.offsetTop - img.clientHeight / 2;
    //   this.deg = 360 * Math.atan(this.imgy / this.imgx) / (2 * Math.PI);
    //   this.index = 0;
    //   if (img.offsetLeft < event.clientX) {
    //     this.y = -180;
    //   } else {
    //     this.y = 0;
    //   }
    // },
    // updateImagePosition() {
    //   if (this.index < 50) {
    //     this.imgl += this.imgx / 50;
    //     this.imgt += this.imgy / 50;
    //   }
    //   this.index++;
    // },
    updateImagePosition() {

      // 生成随机值用于新位置
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;

      // 更新图像的位置
      this.imgl = randomX;
      this.imgt = randomY;

      // 可选地，您还可以基于新位置更新旋转
      // 这只是一个示例，您可以根据需要调整逻辑
      // this.deg = Math.random() * 360;
      // this.y = Math.random() * 360 - 180; // 随机围绕Y轴旋转

      // 生成一条新的随机消息
      this.generateRandomMessage();
    },
  },
  components:{Header, Aside},
}
</script>

<template>
  <el-container style="height: 100vh;width: 100vw;">
    <div class="message" :style="{ left: `${imgl-150}px`, top: `${imgt-20}px` }" v-show="this.showImage">{{ message }}</div>
    <img class="img" :style="{ transform: `rotateZ(${deg}deg) rotateY(${y}deg)`,
    left: `${imgl}px`, top: `${imgt}px` }" src="../assets/桌面宠物.gif" @click = "Open"
         @mouseenter="stopMoving" @mouseleave="startMoving"  v-show="this.showImage"/>
    <div class="wrap" :class="ifshow">
      <!-- 头部 Header 区域 -->
      <div class="header" draggable="true">
        <h3>小思同学</h3>
        <img src="../assets/桌面宠物.gif" alt="icon" @click="Off"/>
      </div>
      <!-- 中间 聊天内容区域 -->
      <div class="main" >
        <ul class="talk_list" style="top: 0px;" id="talk_list">
          <li class="left_word">
            <img src="../assets/桌面宠物.gif" /> <span>你好！{{user.name}}同学</span>
          </li>
        </ul>
        <div class="drag_bar" style="display: none;">
          <div
              class="drager ui-draggable ui-draggable-handle"
              style="display: none; height: 412.628px;"></div>
        </div>
      </div>
      <!-- 底部 消息编辑区域 -->
      <div class="footer">
        <img :src="user.image" alt="icon" />
        <input type="text" placeholder="说点什么吧..." class="input_txt" v-model="inputText" @keyup.enter="sendMessage" />
        <input type="button" value="发 送" class="input_sub" @click="sendMessage" />
      </div>
    </div>

    <el-aside :width="aside_width" style="height: 100vh;" >
    <Aside :iscollapse = "iscollapse" @dohide="dohide"></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header @docollapse = "docollapse"></Header>
      </el-header>

      <el-main style="padding: 0;">
<!--      <Main></Main>-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
*{
  padding: 0;
  margin: 0;
  text-decoration: none;
  cursor: url(../碳足迹计算器素材/鼠标.png),default;
}
#ipt{
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}
#btnSend{
  float: left;
  margin-left: 15px;
  margin-top: 10px;
}
.wrap{
  z-index: 100;
  position: absolute;
  right: 10px;
  top: 200px;
}
.show{
  display: block;
}
.noshow{
  display: none;
}
.wrap .header img{
  width: 50px;
  height: 50px;
}
.wrap .main{
  height: 530px; /* 根据你的需要调整这个高度 */
  overflow-y: auto; /* 添加垂直滚动条 */
}
.wrap .main .talk_list{
  transition: scroll 0.3s ease; /* 这个样式会让滚动条的出现和消失有一个过渡效果 */
}
.wrap .main .left_word img{
  width: 50px;
  height: 50px;
}
.wrap .footer img{
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-size: 100% 100%;
  float: left;
}
.input_txt{
  margin-left: 10px;
  margin-top: 10px;
}
.input_sub{
  margin-left: 10px;
  margin-top: 10px;
}
.img{
  width: 60px;
  height: 60px;
  z-index: 100;
  position: absolute;
  transition: transform 0s ease-out; /* 只为 transform 设置过渡 */
  transition: left 20s ease-out, top 20s ease-out;


}
 .el-main{
   width: 100%;
   height: 100%;
   //overflow: hidden;
 }

.el-aside {
  color: #333;
  background-image: url("../assets/侧边.png");
}
.el-header{
  text-align: right; font-size: 12px;
  background-image: url("../assets/c_tu1.gif");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #333;
  line-height: 80px;
  height: 80px!important;
}
.message {
  align-items: center;
  line-height: 50px;
  width: 210px;
  height: 50px;
  background: url("../assets/气泡框.png");
  background-size: 100% 100%;
  transition: transform 0s ease-out; /* 只为 transform 设置过渡 */
  transition: left 20s ease-out, top 20s ease-out;
  position: absolute;
  color: red;
  font-size: 14px;
  z-index: 1; /* 确保消息显示在其他元素之上 */
  pointer-events: none; /* 添加这一行 */

}

@import url("../聊天机器人/css/main.css");
@import url("../聊天机器人/css/reset.css");
</style>