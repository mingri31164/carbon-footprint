<template>
  <div style="text-align: center;"
  class="container" >
<!--    左上角时钟-->
    <div class="contain">
      <div class="clock">
        <div class="circle">
          <ul class="scale">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul class="number">
            <li>12</li>
            <li>3</li>
            <li>6</li>
            <li>9</li>
          </ul>
        </div>

        <div class="hour"></div>
        <div class="min"></div>
        <div class="sec"></div>
      </div>
    </div>



<!--    <video autoplay muted loop id="background-video">-->
<!--      <source src="../assets/原神.mp4" type="video/mp4">-->
<!--    </video>-->
    <div class="welcom">
      <h1 style="font-size: 20px;">{{'欢迎你！'+user.name}}同学</h1>
      <DateUtils></DateUtils>
    </div>
    <!--    开始按键-->
    <button class="start" @click = "start">开始计算</button>
  </div>
</template>

<script>
import DateUtils from "./DateUtils";

export default {
  name: "Home",
  components: {DateUtils},
  data() {

    return {
      user:{}
    }
  },
  computed:{

  },
  methods:{
    start(){
      this.$router.replace('/count');
    },
    init(){
      this.user = JSON.parse(sessionStorage.getItem('CurUser'))
    }
  },
  created(){
    this.init()
  },

//时钟
  mounted() {
    const hour = this.$el.querySelector('.hour');
    const min = this.$el.querySelector('.min');
    const sec = this.$el.querySelector('.sec');

    setInterval(() => {
      const time = new Date();
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();

      hour.style.transform = `rotate(${h * 30 + (m / 60) * 30 + (s / 60 / 60) * 30}deg)`;
      min.style.transform = `rotate(${m * 6 + (s / 60) * 6}deg)`;
      sec.style.transform = `rotate(${s * 6}deg)`;
    }, 1000);
  }
}
</script>

<style scoped>
@import url("../css/button.css");
@import url("../css/Home.css");

.el-descriptions{
  width:90%;
  margin: 0 auto;
  text-align: center;
}
.container{
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-image: url("../assets/主页.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.welcom{
  width: 200px;
  align-items: center;
  text-align: center;
  margin-top: 250px;
  margin-left: 94px;
}
</style>