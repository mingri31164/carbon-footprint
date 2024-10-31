<script>
export default {
  name: "Header",
  data(){
    return{
      user: JSON.parse(sessionStorage.getItem('CurUser'))
    }
  },
  methods:{
    touser(){
      console.log("touser......")
      this.$router.push("/Home2")
    },
    logout(){
      console.log('logout')

      this.$confirm('您确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',  //确认按钮的文字显示
        type: 'warning',
        center: true, //文字居中显示

      })
          .then(() => {
            this.$message({
              type:'success',
              message:'退出登录成功'
            })

            sessionStorage.clear()
            this.$router.replace("/")
            window.close()
            window.open('/', '_blank');

          })
          .catch(() => {
            // this.$message({
            //   type:'info',
            //   message:'已取消退出登录'
            // })
          })
    },
    collapse(){
      this.$emit('docollapse')
    }
  }
}
</script>

<template>
<div  style="display: flex;line-height: 80px;">
  <div>
    <i class="el-icon-s-fold" style="font-size: 20px;margin-left: 20px" @click = "collapse"></i>
  </div>
  <div class="title">
<!--    <span>碳足迹计算器</span>-->
  </div>
  <el-dropdown trigger="click">
    <i class="el-icon-arrow-down" style="margin-right: 15px"
       :style="{ backgroundImage: `url(${user.image})` }"></i>
    <el-dropdown-menu slot="dropdown" style="margin-right: 20px;margin-top: 5px">
      <el-dropdown-item @click.native = "touser">个人中心</el-dropdown-item>
      <el-dropdown-item @click.native = "logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
    <span style="margin-right: 40px;font-size: 20px;color: white">{{user.name}}</span>
  </el-dropdown>

</div>
</template>

<style scoped>
.title{
  flex: 1;text-align: center;font-size: 34px;font-weight: bold;
}
.el-icon-arrow-down{
  width: 3vw;
  height: 5vh;
  margin-top: 15px;
  float: left;
  border-radius: 50px;
  background-size: 100% 100%;
}
.el-dropdown{
  float: left;
}
</style>