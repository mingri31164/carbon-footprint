<template>
  <div class="person" style="width: 100%; height: 100%;overflow: hidden">
    <div id="dowebok">
      <!-- <h3>第一屏</h3> -->
      <div class="section sec1" id="section1">
        <!-- 背景圆点 -->
        <div class="sec1_circle1"></div>
        <div class="sec1_circle2"></div>
        <div class="sec1_circle3"></div>
        <main>
          <div class="main_left">
            <div class="myPhoto current">
              <a href="#">
                <img :src="user.image" alt="" />
                <el-tag style="float: left;margin-left: -50px"
                    :type="user.sex === 1 ? 'primary' : 'danger'"
                    disable-transitions><i :class="user.sex===1?'el-icon-male':'el-icon-female'"></i>{{user.sex===1?"男":"女"}}</el-tag>
                <h3 style="float: left;margin-top: -23px;margin-left: 30px;font-size: 18px">{{user.name}}</h3>
                <p>唯有落叶🍂知湫意</p>
              </a>
            </div>
            <div>
              <a href="#">
                <p></p>
                <span @click="goindex()">首页</span>
              </a>
            </div>
            <div>
              <a href="#">
                <!--                <p></p>-->
                <span><img src="../个人主页/img/人.png" style="width: 40px; height: 40px"></span>
                <span>年龄：20岁</span>
              </a>
            </div>
            <div>
              <a href="#">
                <!--                <p></p>-->
                <span><img src="../个人主页/img/电话.png" style="width: 35px; height: 35px"></span>
                <span>电话：</span>
                <span>15155151855</span>
              </a>
            </div>
            <div>
              <a href="#">
                <!--                <p></p>-->
                <span><img src="../个人主页/img/学校.png" style="width: 30px; height: 30px;margin-right: 10px"></span>
                <span>学校：桂林电子科技大学</span>
              </a>
            </div>
            <div @click="gotalk">
              <a href="#">
<!--                <p></p>-->
                <span><img src="../个人主页/img/计算器.png" style="width: 40px; height: 40px"></span>
                <span>计算记录：{{user.num}}</span>
              </a>
            </div>

            <div>
              <a href="#">
                <p></p>
                <span>编辑</span>
              </a>
            </div>
          </div>
          <div class="main_right" style="position: relative">
            <div class="content hidden"  style="display: block">
              <img :src="user.image" alt=""  class="touxiang">
              <p>无论对谁太过热情，就增加了不被珍惜的概率</p>
              <p>弱能避开猛烈的狂喜，自然不会有悲痛袭来。——《人间失格》</p>
              <p>爱意随风起，自然知湫意。</p>
            </div>

            <div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>

</template>

<script>
import DateUtils from "./DateUtils";

export default {
  name: "Home2",
  components: {DateUtils},
  data() {

    return {
      curuser: JSON.parse(sessionStorage.getItem('CurUser')),

      user:{}
    }
  },
  computed:{

  },
  methods:{

    gotalk(){
      this.$router.push('/talk');
    },
    goindex(){
      this.$router.push('/Home');
    },
    init(){
      this.user = JSON.parse(sessionStorage.getItem('CurUser'))
    }
  },
  created(){
    this.init()
  }
}
</script>

<style scoped>
#section1{
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../assets/原神背景.jpg");
}
@import url("../个人主页/css/style-1.css");
@import url("../个人主页/css/fullpage.min.css");
@import url("../个人主页/css/base.css");
@import url("//at.alicdn.com/t/font_2935587_97eo1d0furr.css");
#avatar{
  border-radius: 50%;
  width: 120px;
  height: 120px;
  background-size: 100% 100%;
}
form{
  left: 160px;
  top: 60px;
  height: 100%;
  width: 60%;
  position: absolute;
}
.form-group {
  height: 10%;
  margin-bottom: 20px;
}

label {
  float: left;
  font-weight: bold;
}

input, select {
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>