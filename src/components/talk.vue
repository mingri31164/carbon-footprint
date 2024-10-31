<script>
export default {
  name: "talk",
  data() {
    
    return {
      talks:[],
    //   tableData: [],
      foodres:0,
      liferes:0,
      walkres:0,
      clothres:0,
      useres:0,
      data:0,
    
    }
 
  },
  created() {
    this.init()
    console.log(this.user.no)
    this.fetchData(); // 在组件创建时调用fetchData方法获取数据
    this.fetchD()
  },

  methods: {
    goback(){
      this.$router.replace("/Home2");
    },
    init(){
      this.user = JSON.parse(sessionStorage.getItem('CurUser'))
    },
    fetchData() {
        fetch(this.$myurl + '/storage/findbyno?no=' + this.user.no)
  .then(response => response.json()) // 假设响应为 JSON 格式
  .then(data => {
    console.log(1111)
    console.log(data)
    console.log(222)
    if (Array.isArray(data.data)) {
      // 对 data 数组进行遍历和转换操作
      const transformedData = data.data.map(item => ({
        foodres: item.food,
        liferes: item.live,
        walkres: item.move,
        useres: item.uses,
        clothres:item.cloth,
        data: item.createTime,
      }));

      // 将转换后的数据赋值给 this.talks 或进行其他操作
      this.talks = transformedData;
      console.log(data)
      console.log(";;;")
      console.log(this.talks)
    } else {
      console.error('错误：获取的数据不是一个数组',console.log(data.data));
    }
  })
  .catch(error => {
    console.error('错误:', error);
  });
    },
    
  }
}
</script>

<template>
  <div class="tablemain">
    <main class="table">
      <section class="header">
        <!--返回-->
        <button class="gocount" @click = "goback()"><-- 返回</button>
        <h1>{{this.user.no}}的计算记录</h1>
        <!-- <div class="input-group">
          <input type="search" placeholder="Search Data...">
          <img src="../assets/table/search.png">
        </div> -->
      </section>
      <section class="shell">
        <table>
                <thead>
                    <tr>
                        <th> 衣 </th>
                        <th> 食</th>
                        <th> 住</th>
                        <th> 行</th>
                        <th> 用</th>
                        <th> 上传时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(talk,index) in talks" :key="talk.id">
                        <td> {{ talk.clothres }} kg </td>
                        <td> {{ talk.foodres }} kg</td>
                        <td> {{ talk.liferes }} kg</td>
                        <td> {{ talk.walkres }} kg</td>
                        <td> {{ talk.useres }} kg</td>
                        <td>{{ talk.data }} </td>
                    </tr>
                 
                    
                </tbody>
            </table>
      </section>
    </main>
  </div>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@import url("../css/button.css");
.gocount{
  position: absolute;
  top: 10px;
  left: 37px;
  height: 6vh;
}

.tablemain{
  width: 100%;
  height: 100%;
  background: url(../assets/930.png) center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

main.table {
  width: 77vw;
  height: 80vh;
  background-color: #fff5;
  box-shadow: 0 8px 16px #0005;
  border-radius: 16px;
  overflow: hidden;
}

.header {
  position: relative;
  text-align: center;
  width: 100%;
  height: 10%;
  background-color: #fff4;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .input-group {
  width: 35%;
  height: 50%;
  background-color: #fff5;
  padding: 0 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .2s;
}

.header .input-group:hover {
  width: 45%;
  background-color: #fff8;
  box-shadow: 0 5px 40px #0002;
}

.header .input-group img {
  width: 20px;
  height: 20px;
}

.header .input-group input {
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
}

.header h1{
  position: absolute;
  left: 29.9vw;
  font-size: 40px;
  color: blue;
  font-weight: 700;
}

.shell {
  width: 95%;
  max-height: calc(90% - 25px);
  background-color: #fffb;
  margin: 8px auto;
  border-radius: 10px;
  overflow: auto;
  overflow: overlay;
}

.shell::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

table {
  width: 100%;
}

td img {
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border-radius: 50%;
  vertical-align: middle;
}

table,
th,
td {
  border-collapse: collapse;
  padding: 20px;
  text-align: left;
}

thead th {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #d5d1defe;
  cursor: pointer;
}

/* 偶数行背景色 */
tbody tr:nth-child(even) {
  background-color: #0000000b;
}

tbody tr:hover {
  background-color: #fff6 !important;
}

.button {
  padding: 5px 0;
  border-radius: 40px;
  text-align: center;
}

tr:nth-child(4n) .button {
  background-color: #86e49d;
  color: #006b21;
}

tr:nth-child(4n-1) .button {
  background-color: #ebc474;
}

tr:nth-child(4n+1) .button {
  background-color: #d893a3;
  color: #b30021;
}

tr:nth-child(4n+2) .button {
  background-color: #6fcaea;
}

</style>