<!--<template>-->
<!--  <div class="loginBody">-->
<!--    <div class="loginDiv">-->
<!--      <div class="login-content">-->
<!--        <h1 class="login-title">用户登录</h1>-->
<!--        <el-form :model="loginForm" label-width="100px"-->
<!--                 :rules="rules" ref="loginForm">-->
<!--          <el-form-item label="账号" prop="no">-->
<!--            <el-input style="width: 200px;margin-left: -80px" type="text" v-model="loginForm.no"-->
<!--                      autocomplete="off" size="small"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="密码" prop="password">-->
<!--            <el-input style="width: 200px;margin-left: -80px" type="password" v-model="loginForm.password"-->
<!--                      show-password autocomplete="off" size="small" @keyup.enter.native="confirm"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item style="margin-left: -80px">-->
<!--            <el-button type="primary" @click="confirm" :disabled="confirm_disabled">确 定</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->


<!--<script>-->
<!--export default {-->
<!--  name: "Login",-->
<!--  data(){-->
<!--    return{-->
<!--      confirm_disabled:false,-->
<!--      loginForm:{-->
<!--        no:'',-->
<!--        password:''-->
<!--      },-->
<!--      rules:{-->
<!--        no: [-->
<!--          { required: true, message: '请输入账号', trigger: 'blur' }-->
<!--        ],-->
<!--        password: [-->
<!--          { required: true, message: '请输密码', trigger: 'blur' }-->
<!--        ],-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods:{-->
<!--    confirm(){-->
<!--      this.confirm_disabled=true;-->
<!--      this.$refs.loginForm.validate((valid) => {-->
<!--        if (valid) { //valid成功为true，失败为false-->
<!--          //去后台验证用户名密码-->
<!--          this.$axios.post(this.$myurl+'/user/login',this.loginForm).then(res=>res.data).then(res=>{-->
<!--            console.log(res)-->
<!--            if(res.code==200){-->
<!--              //存储-->
<!--              sessionStorage.setItem("CurUser",JSON.stringify(res.data.user))-->
<!--              console.log(res.data.menu)-->
<!--              this.$store.commit("setMenu",res.data.menu)-->
<!--              //跳转到主页-->
<!--              this.$router.replace('/Home');-->
<!--            }else{-->
<!--              this.confirm_disabled=false;-->
<!--              alert('校验失败，用户名或密码错误！');-->
<!--              return false;-->
<!--            }-->
<!--          });-->
<!--        } else {-->
<!--          this.confirm_disabled=false;-->
<!--          console.log('校验失败');-->
<!--          return false;-->
<!--        }-->
<!--      });-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.loginBody {-->
<!--  position: absolute;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  background-color: #B3C0D1;-->
<!--}-->
<!--.loginDiv {-->
<!--  position: absolute;-->
<!--  top: 50%;-->
<!--  left: 50%;-->
<!--  margin-top: -200px;-->
<!--  margin-left: -250px;-->
<!--  width: 450px;-->
<!--  height: 330px;-->
<!--  background: #fff;-->
<!--  border-radius: 5%;-->

<!--}-->
<!--.login-title {-->
<!--  margin: 20px 0;-->
<!--  text-align: center;-->
<!--}-->
<!--.login-content {-->
<!--  width: 400px;-->
<!--  height: 250px;-->
<!--  position: absolute;-->
<!--  top: 25px;-->
<!--  left: 25px;-->
<!--}-->
<!--</style>-->






<!--方案二-->


<script>
import wuwu from '/src/assets/wuwu.jpg'
import waoku from '/src/assets/waoku.jpg'

import $ from 'jquery';
export default {
  name: "Login",
  data(){
     this.imageUrl = waoku;
    let checkregister =(rule,value,callback)=>{
      this.$axios.get(this.$myurl+"/user/findByNo?no="+this.registerForm.no).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code!=200){
          callback()
        }else{
          callback(new Error('账号已经存在'));
        }
      })
    };
    return{
      imageUrl:waoku,
      confirm_disabled:false,
      register_disabled:false,
      loginForm:{
        no:'',
        password:''
      },
      registerForm:{
        name:'',
        no:'',
        password:'',
        image:'',
        roleId:1,
        sex:1,
        num:0,
      },
      rules1:{
        no: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输密码', trigger: 'blur' }
        ],
      },
      rules2: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        no: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {validator:checkregister,trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      }
    }
  },

  methods:{
    mySwitch() {
      mySwitch(this.imageUrl);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.registerForm.image = file.raw; // 将上传的文件赋值给registerForm的image属性
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt10M = file.size / 1024 / 1024 < 10;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return isLt10M;//isJPG &&
    },
    confirm(){
      this.confirm_disabled=true;
      this.$refs.loginForm.validate((valid) => {
        if (valid) { //valid成功为true，失败为false
          //去后台验证账号是否存在
          this.$axios.post(this.$myurl + '/user/login',this.loginForm)
              .then(res=>res.data).then(res=>{
            console.log(res)
            if(res.code==200){
              //存储
              sessionStorage.setItem("CurUser",JSON.stringify(res.data.user))
              console.log(res.data.menu)
              this.$store.commit("setMenu",res.data.menu)
              //跳转到主页
              // this.$router.replace('/Home');
              //跳转后刷新页面
              this.$router.push('/Home').then(() => {
                window.location.reload();
              });
              // window.close();
              // window.open('/Home', '_blank');
            }else{
              this.confirm_disabled=false;
              alert('校验失败，用户名或密码错误！');
              return false;
            }
          });
        } else {
          this.confirm_disabled=false;
          console.log('校验失败');
          return false;
        }
      });
    },
    register(){
      console.log(this.registerForm.image)
      this.register_disabled = true;
      this.$refs.registerForm.validate((valid) => {
        if (valid) { //valid成功为true，失败为false
          let formData = new FormData();
          formData.append('name', this.registerForm.name);
          formData.append('no', this.registerForm.no);
          formData.append('password', this.registerForm.password);
          formData.append('image', this.registerForm.image);
          formData.append('roleId',this.registerForm.roleId)

          this.$axios.post(this.$myurl + '/user/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
              .then((res) => res.data)
              .then((res) => {
                console.log(res);
                if (res.code == 200) {
                  alert('注册成功');
                  console.log(res.data);
                  this.mySwitch();
                  // 清空表单字段
                  this.registerForm.name = '';
                  this.registerForm.no = '';
                  this.registerForm.password = '';
                  this.registerForm.image = waoku;
                }
                else{
                  this.confirm_disabled=false;
                  alert('注册失败');
                  return false;
                }
              });
        }
        else {
          this.register_disabled = false;
          alert('注册失败');
          return false;
        }
      });
    }
  }
}

// 滑动的状态
let flag=true

const mySwitch=(imageUrl)=>{
  if(flag){
    // 获取到滑动盒子的dom元素并修改它移动的位置
    $(".pre-box").css("transform","translateX(100%)")
    // 获取到滑动盒子的dom元素并修改它的背景颜色
    $(".pre-box").css("background-color","#c9e0ed")
    //修改图片的路径
      $("img").attr("src",wuwu)
    // 清空输入框的值
    $("input[type='text']").val("");
    $("input[type='password']").val("");


  }
  else {
    $(".pre-box").css("transform","translateX(0%)")
    $(".pre-box").css("background-color","#edd4dc")
      $("img").attr("src",waoku)
    // 清空输入框的值
    $("input[type='text']").val("");
    $("input[type='password']").val("");

  }
  flag=!flag
};
window.mySwitch = mySwitch
// const bubleCreate=()=>{
//   // 获取body元素
//   const body = document.body
//   // 创建泡泡元素
//   const buble = document.createElement('span')
//   // 设置泡泡半径
//   let r = Math.random()*5 + 25 //半径大小为25~30
//   // 设置泡泡的宽高
//   buble.style.width=r+'px'
//   buble.style.height=r+'px'
//   // 设置泡泡的随机起点
//   buble.style.left=Math.random()*innerWidth+'px'
//   // 为body添加buble元素
//   body.append(buble)
//   // 4s清除一次泡泡
//   setTimeout(()=>{
//     buble.remove()
//   },4000)
// }
// // 每200ms生成一个泡泡
// setInterval(() => {
//   bubleCreate()
// }, 200);
</script>

<template>
<div>
  <!-- 最外层的大盒子 -->
  <!--    视频背景-->
  <video autoplay muted loop id="background-video">
    <source src="../assets/原神.mp4" type="video/mp4">
  </video>

  <div class="box">

    <!-- 滑动盒子 -->
    <div class="pre-box">
      <h1>WELCOME</h1>
      <p>JOIN US!</p>
<!--      <div class="img-box">-->
<!--        <img src="../assets/waoku.jpg" alt="">-->
<!--      </div>-->
      <el-upload
          class="img-box"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image">
        <img v-if="imageUrl" :src="imageUrl" ref="img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <!-- 注册盒子 -->
    <div class="register-form" style="background-color: rgba(255, 255, 255, 0.3);
">
      <!-- 标题盒子 -->
      <div class="title-box" style="margin-top: -20px">
        <h1>注册</h1>
      </div>
      <!-- 输入框盒子 -->
      <el-form :model="registerForm" label-width="100px"
               :rules="rules2" ref="registerForm" style="margin-bottom: 20px">
        <el-form-item label="昵称" prop="name">
          <input type="text" placeholder="用户名" v-model="registerForm.name">
        </el-form-item>
        <el-form-item label="账号" prop="no">
          <input type="password" placeholder="账号" v-model="registerForm.no">
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <input type="password" placeholder="密码" v-model="registerForm.password">
        </el-form-item>
      </el-form>
      <!-- 按钮盒子 -->
      <div class="btn-box">
        <!-- 绑定点击事件 -->
        <button @click="register" :disabled="register_disabled">注册</button>
        <p onclick="mySwitch()">已有账号?去登录</p>
      </div>
    </div>
    <!-- 登录盒子 -->
    <div class="login-form" style="background-color: rgba(255, 255, 255, 0.3);
">
      <!-- 标题盒子 -->
      <div class="title-box">
        <h1>登录</h1>
      </div>
<!--       输入框盒子-->
<!--      <div class="input-box">-->
<!--        <input type="text" placeholder="用户名" v-model="loginForm.no">-->
<!--        <input type="password" placeholder="密码" v-model="loginForm.password">-->
<!--      </div>-->
      <el-form :model="loginForm" label-width="100px"
               :rules="rules1" ref="loginForm">
        <el-form-item label="账号" prop="no">
          <input type="text" placeholder="用户名" v-model="loginForm.no" style="margin-bottom: 20px">
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <input type="password" placeholder="密码" v-model="loginForm.password" style="margin-bottom: 20px">
        </el-form-item>
      </el-form>
      <!-- 按钮盒子 -->
      <div class="btn-box">
        <button @click="confirm" :disabled="confirm_disabled">登录</button>
        <!-- 绑定点击事件 -->
        <p onclick="mySwitch()">没有账号?去注册</p>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
@import url("../css/login.css");
@import url("../css/well.css");
#background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
