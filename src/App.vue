<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data(){
    return{
      user:JSON.parse(sessionStorage.getItem('CurUser'))
    }
  },
  watch:{
    '$store.state.menu':{
      handler(val,old){
        console.log(val,old)
        if (!old && this.user && this.user.no){
          this.$store.commit("setRouter",val)
        }
      },
      immediate:true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: auto;
  color: #2c3e50;
}
</style>
