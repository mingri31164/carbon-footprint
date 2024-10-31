<script>
export default {
  name: 'xuan',
  data() {
    return {
      
    }
  },
}
</script>

<template>
  <div class="pix">
    <div class="ym">
      <div class="sp">
        <div id="ping">
          <video id="sp" src="../assets/carbon1.mp4" autoplay="auto" controls></video>
        </div>
        
      </div>
    </div>
    <div class="ym" id="xuan1"></div>
    <div class="ym" id="xuan2"></div>
    <div class="ym" id="xuan3"></div>
    <div class="ym" id="xuan4"></div>
    <div class="ym" id="xuan5"></div>
    <div class="ym" id="xuan6"></div>
  </div>
</template>

<style scoped>
.pix{
   width: 100%;
   height: 100%;
}
.ym{
  width: 100%;
  height: 980px;
}
.sp{
  height: 100%;
    width: 100%;
    
    background-image: url(../assets/980.png);
    background-repeat: no-repeat;
    background-size: cover;
}
#xuan1{
  background-image: url(../assets/xuan1.png);
  background-repeat: no-repeat;
    background-size: cover;
}
#xuan2{
  background-image: url(../assets/xuan2.png);
  background-repeat: no-repeat;
    background-size: cover;
}
#xuan3{
  background-image: url(../assets/xuan3.png);
  background-repeat: no-repeat;
    background-size: cover;
}
#xuan4{
  background-image: url(../assets/xuan4.png);
  background-repeat: no-repeat;
    background-size: cover;
}
#xuan5{
  background-image: url(../assets/xuan5.png);
  background-repeat: no-repeat;
    background-size: cover;
}
#xuan6{
  background-image: url(../assets/xuan6.png);
  background-repeat: no-repeat;
    background-size: cover;
}
#ping{
  position: relative;
  top: 10%;
  height: 80%;
  
}
#sp{
  position: relative;
  top: 10%;
  height: 80%;
  border-radius: 30px;
  border: 50px solid antiquewhite;
  
}
</style>