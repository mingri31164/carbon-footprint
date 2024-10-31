<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      date: '', // 用于存储格式化后的日期
      form:{
        no:0,
        cloth: 0,
        food:0,
        live:0,
        move:0,
        uses:0,
        sum:0,
        createTime:'',
      },
      tableData: [],
      foodres:0,
      liferes:0,
      walkres:0,
      clothres:0,
      useres:0,
    }
  },
  created() {
    // 获取当前时间并格式化为年月日
    this.date = this.formatDate(this.currentDate);
    this.form.createTime = this.date

    this.init()
    // 解析路由参数
    this.tableData = this.$store.state.tableData;
    const data = this.$route.params.data;
    if (data) {
      this.$store.commit('setTableData', JSON.parse(decodeURIComponent(data)));

      const parsedData = JSON.parse(decodeURIComponent(data));

      // 初始化一个对象来映射 id 到相应的变量
      const idToVariableMap = {
        food: 'foodres',
        cloth: 'clothres',
        live: 'liferes',
        use: 'useres',
        walk: 'walkres'
      };

      // 遍历解析后的数据
      parsedData.forEach(item => {
        // 根据 id 获取对应的变量名
        let varName = idToVariableMap[item.id];
        if (varName === 'clothres') {
          // 更新对应的变量
          this.clothres += item.out;
          // 将计算得到的值存入Vuex store
          this.$store.commit('updateClothres', this.clothres);
        }
        if (varName === 'foodres') {
          // 更新对应的变量
          this.foodres += item.out;
          // 将计算得到的值存入Vuex store
          this.$store.commit('updateFoodres', this.foodres);
        }
        if (varName === 'liferes'){
          this.liferes += item.out;
          // 将计算得到的值存入Vuex store
          this.$store.commit('updateLiferes', this.liferes);
        }
        if (varName === 'walkres'){
          this.walkres += item.out;
          // 将计算得到的值存入Vuex store
          this.$store.commit('updateWalkres', this.walkres);
        }
        if (varName === 'useres') {
          // 更新对应的变量
          this.useres += item.out;
          // 将计算得到的值存入Vuex store
          this.$store.commit('updateUseres', this.useres);
        }
      });

    }
  },
  methods: {
    formatDate(date) {
      // 创建一个新的Date对象，设置为当前时间
      const now = new Date(date);
      // 获取年、月、日
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth()返回0-11，所以加1
      const day = String(now.getDate()).padStart(2, '0');
      // 返回格式化后的日期字符串
      return `${year}-${month}-${day}`;
    },


    doSave(){
      this.form.sum = this.form.cloth+this.form.food+this.form.live+this.form.move+this.form.uses
      alert(this.form.sum)
      this.$axios.get(this.$myurl+'/storage/findByNo',{
        params: {
          no: this.form.no,
          date: this.date
          // 其他参数
        }
      }).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){

          this.form.cloth += res.data[0].cloth
          this.form.food += res.data[0].food
          this.form.live += res.data[0].live
          this.form.move += res.data[0].move
          this.form.uses += res.data[0].uses
          this.form.sum += res.data[0].sum

          this.$axios.post(this.$myurl+'/storage/update',this.form,{
          }).then(res=>res.data).then(res=>{
            console.log(res)
            if(res.code==200){
              this.$message({
                message: '记录保存成功！',
                type: 'success'
              });
            }else{
              this.$message({
                message: '操作失败！',
                type: 'error'
              });
            }
          })
        }else{
          this.$axios.post(this.$myurl+'/storage/save',this.form,{
          }).then(res=>res.data).then(res=>{
            console.log(res)
            if(res.code==200){
              this.$message({
                message: '记录保存成功！',
                type: 'success'
              });
            }else{
              this.$message({
                message: '操作失败！',
                type: 'error'
              });
            }
          })
        }
      })
    },
    init(){
      this.user = JSON.parse(sessionStorage.getItem('CurUser'))
    },
    open4() {
      this.$message.error('数据不能为空！');
    },
    cleanAll(){
      this.$store.commit('clearTableData');
    },
    gores(){
      this.form.no = this.user.no
      this.form.cloth = this.clothres
      this.form.food = this.foodres
      this.form.live = this.liferes
      this.form.move = this.walkres
      this.form.uses = this.useres

      // alert(this.$store.state.tableData.length)
      if(this.$store.state.tableData.length!==0){
        this.doSave()
        this.$store.commit('clearTableData');
        this.$router.push("jiesuan")
      }
      else{
        this.open4()
      }
    },

    gocount(){
      this.$router.push("count")
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      // 使用Vuex状态中的数据
      const newData = [...this.$store.state.tableData];
      newData.splice(index, 1);
      this.$store.commit('setTableData', newData);
      console.log(index, row);
    }
  }
}
</script>

<template>
  <div class="list">
    <!--继续添加-->
    <button class="gocount" @click = "gocount()"><-- 继续添加</button>

<!--    确认评估-->
    <button class="gores" @click = "gores()">确认评估 --></button>

    <!--全部清空-->
    <button class="cleanAll" @click = "cleanAll()">全部清空</button>

    <div class="main" style="overflow: auto; margin-top: 140px">
      <el-table
          :data="$store.state.tableData"
          style="width: 100%"
          max-height="620px">
        <el-table-column
            style="color: white"
            label="名称"
            width="308.75px"
            header-align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px;">{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
            style="color: white"
            label="数值"
            width="308.75px"
            header-align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px;">{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="排碳(/kg)"
            width="308.75px"
            header-align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px; text-align: center !important;">{{ scope.row.out}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="308.75px" header-align="center">
          <template slot-scope="scope">
            <el-popconfirm
                title="确定删除吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
                style="margin-left: 5px;"
            >
<!--              <el-button slot="reference" size="medium" type="danger" >删除</el-button>-->
              <el-button
                  slot="reference"
                  size="medium"
                  type="danger">删除</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<style scoped>
.el-table{
  color: #1d1d1d!important;
  float: left;
  width: 100%;
  height: 100%;
  background-image: url("../assets/930.png");
  background-size: 100% 100%;
  object-fit: cover;
}
.el-table>>>::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}
.el-table >>> .el-table__cell {
  background-color: transparent;
  text-align: center; /* 设置文字居中 */
}
.el-table >>> tr {
  font-weight: 500;
  font-size: 20px;
  background-color: transparent;
}
.el-table >>> th.el-table__cell{
  background-color: transparent!important;
  color: #1d1d1d;
  font-size: 22px;
}
.el-table >>> tr{
  background-color: transparent;
}
@import url("../css/button.css");
@import url("../css/list.css");
</style>