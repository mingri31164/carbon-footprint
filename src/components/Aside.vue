<template>
  <el-menu
      class="ui-menu"
      style="height: 100%;"
      default-active="/Home"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
  >

    <el-menu-item :style="{ 'background-image': 'url(' + currentBackground + ')' }" id="logo" @click="hide">
    </el-menu-item>

    <el-menu-item index="/Home">
<!--      <i class="el-icon-s-home"></i>-->
      <span slot="title">首页</span>
    </el-menu-item>

    <el-menu-item :index="'/'+item.menuclick" v-for="(item,i) in menu" :key="i" style="margin-top: 0px;">
      <i :class="item.menuicon"></i> 
      <span slot="title">{{item.menuname}}</span>
    </el-menu-item>


  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data(){
    return {
      backgroundImage1: require('../assets/睡觉.gif'),
      backgroundImage2: require('../assets/桌面宠物.gif'),

      currentBackground: require('../assets/睡觉.gif'), // 初始背景图片

      //isCollapse:false

      /* menu:[
           {
               menuClick:'Admin',
               menuName:'管路员管理',
               menuIcon:'el-icon-s-custom'
           },{
               menuClick:'User',
               menuName:'用户管理',
               menuIcon:'el-icon-user-solid'
           }
       ]*/
    }
  },
  methods:{
    hide(){
      this.currentBackground = this.currentBackground === this.backgroundImage1? this.backgroundImage2 : this.backgroundImage1;
      this.$emit('dohide')
    }
  },
  computed:{
    "menu":{
      get(){
        return this.$store.state.menu
      }
    }
  },
  props:{
    isCollapse:Boolean
  }
}
</script>

<style scoped>
#logo{
  height: 90px;
  background-size: 60% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.ui-menu{
  background-image: url("../assets/侧边.png");
}
.el-menu-item{
  height: 10vh;
  background-image: url("../碳足迹计算器素材/木板.png");
  background-size: 115% 100%;
  line-height: 105px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin-left: -15px;
}
.el-menu-item span{
  margin-left: 20px;
}
.el-menu-item:hover{
  color: #00b3ff;
  background-color: green;
}
</style>