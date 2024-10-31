
<script>
export default {
  name: 'record',
  data() {
    return {
      items: [],
      yh:[],
      user :'',
      nickname:'',
      times:'',

    };
  },
  created() {
    console.log("reco")
    this.init()
    console.log(this.user.no)
    console.log("record！！")
    this.fetchD(); // 在组件创建时调用fetchData方法获取数据
    console.log("record！")
  },
  
  methods:{
    init(){
      this.user = JSON.parse(sessionStorage.getItem('CurUser'))
    },
   
    fetchD(){
      fetch(this.$myurl + '/user/list')
  .then(response => response.json()) // 假设响应为 JSON 格式
  .then(data => {
    if (Array.isArray(data)) {
      // 对 data 数组进行遍历和转换操作
      const transformedData = data.map(data => ({
        nickname:data.no,
        times:data.num,
        sex:data.sex,
        image:data.image
      }));
      const targetItem = transformedData.find(item => item.nickname === this.user.no);

// 如果找到匹配项
if (targetItem) {
  this.user.rank = transformedData.indexOf(targetItem); // 位置
  this.user.times = targetItem.times; // times
}

      console.log(this.user);
      // 将转换后的数据赋值给 this.talks 或进行其他操作
      this.items = transformedData;
      console.log(data)
      console.log(";;;")
      console.log(this.items)
    } else {
      console.error('错误：获取的数据不是一个数组',console.log(data));
    }
  })
      .catch(error => {
        console.error(error);
      });
  }
}
};

</script>
<template>
  <div id="app">
    <div id="left">
     <div id="bang"> 排行榜</div>
      <div id="content">    
        <table >
        
  <thead >
    <tr id="phb">
      <th>排名</th>
      <th style="width: 70px;">头像</th>
      <th>昵称</th>
      <th>性别</th>
      <th>参与计算次数</th>
    </tr>
  </thead>
  <tbody >
  <tr v-for="(item, index) in items" :key="item.id" :class="{ 'highlight': item.nickname === user.no }" >
    <td>{{ index+1 }}</td>
    <td ><img   :src="`${item.image}`" style="width: 40px;height: 40px;border-radius: 100%;" alt=""></td>
    <td> {{ item.nickname }}</td>
    <td>{{ item.sex === 1 ? "男" : "女" }}</td>
    <td>{{ item.times }}</td>
  </tr>
</tbody>

</table>
      </div>
   

    </div>
    <!-- <div id="right">
      <div id="con">
        <div id="yh">
          <div id="tx"
          :style="{ backgroundImage: `url(${user.image})` }"
          ></div>
          <div id="ID"><h1>{{user.no}}</h1></div>
        </div>
          <div id="msg">
            <div>排名：{{ yh.sortedIndex }}</div>
            <div>参与计算天数：{{ yh.times }}</div>
            <div>总碳排放量：{{ yh.sums }}</div>
            <div>总碳排放量：{{ yh.gross }}</div>
          </div>
      </div>
    </div> -->
  </div>
</template>
<style scoped>
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;
  background-image: url(../assets/930.png);
  background-size: cover;
  overflow: hidden;
}
#bang{
  padding-top: 30px;
    height: 100px;
    width: 900px;
    font-size: 44px;
    font-weight: bold;
    line-height: 100px;
    letter-spacing: 29px;
}
#left{
  margin-top: 60px;
  position: relative;
  left: 15px;
  width: 80%;
  height: 100%;
  border-radius: 20px;
  background-image: url(../assets/982.png);
  background-position: center;
  background-size: cover;
  display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;

}
.first{
  background-image: url(../assets/111.png);
}
#right{
  width: 500px;
  height: 100%;
  /* background-color: blue; */

}
.highlight {
  background-color: yellow;
  border: 5px solid red;
}
#content{
    position: relative;
    /* left: 30px;
    top: -12px; */
    width: 78%;
    height: 600px;
    background-color: rgb(255, 255, 255,0.5);
    display: flex;
    flex-direction: column;
    overflow: auto;
    scrollbar-width: none;
    
}
#con{
  position: relative;
  top: 100px;
  left: 40px;
  width: 390px;
  height: 600px;
 /* background-color: red; */
 padding: 20px;
}
#tx{
  background-repeat: no-repeat;
  background-size: cover;
}
th{
  width: 273px;
}
#mk td{
  width: 200px;
}
.ph{
  width: 820px;
    height: 20px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
    background-color: aliceblue;
    align-items: flex-start;
}

#yh{
  display: flex;
  width: 340px;
  height: 100px;
  background-color: aquamarine;
}
#tx{
  width: 100px;
  height: 100px;
  background-color: aliceblue;
  border-radius: 50%;
  overflow: auto;
}
#ID{
  padding-left: 20px;
  margin-top: 25px;
}
#msg{
 
  margin-top: 20px;
  width: 340px;
  height: 400px;
  background-color: rgb(255, 255, 255,0.6);
}
#msg>div{
  width: 340px;
  height: 50px;
  font-size: 24px;
    font-weight: bold;
    text-align: left; 
  
}
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: center;
  padding: 8px;
  font-size: 25px;
  /* background-color: aqua; */
}

thead th {
  text-align: center;
  background-color: #f2f2f2;
  
}
</style>