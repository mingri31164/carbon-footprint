<script>
export default {
  name: "Main",
  data() {
    let checkAge = (rule, value, callback) => {
      if(value>150){
        callback(new Error('年龄输⼊过⼤'));
      }else{
        callback();
      }
    };

    let checkDuplicate =(rule,value,callback)=>{
      if(this.form.id){
        return callback();
      }
      this.$axios.get("http://localhost:8090/user/findByNo?no="+this.form.no).then(res=>res.data).then(res=>{
        if(res.code!=200){
          callback()
        }else{
          callback(new Error('账号已经存在'));
        }
      })
    };
    return {
      tableData: [],
      pageNum:1,
      pageSize:10,
      total:0,
      name:'',
      sex:'',
      sexs:[
        {
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }
      ],
      centerDialogVisible:false,
      form:{
        id:'',
        no:'',
        name:'',
        password:'',
        age:'',
        sex:'',
        phone:'',
        roleId:''
      },
      rules: {
        no: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'},
          {validator:checkDuplicate,trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 8, message: '长度在 3 到 8字符', trigger: 'blur'}
        ],
        // admin: [
        //   {required: true, message: '请输入身份', trigger: 'blur'},
        // ],
        age: [
          {required: true, message: '请输⼊年龄', trigger: 'blur'},
          {min: 1, max: 3, message: '⻓度在 1 到 3 个位', trigger: 'blur'},
          {pattern: /^([1-9][0-9]*){1,3}$/,message: '年龄必须为正整数字',trigger: "blur"},
          {validator:checkAge,trigger: 'blur'}
        ],
        phone: [
          {required: true,message: "⼿机号不能为空",trigger: "blur"},
          {pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输⼊正确的⼿机号码", trigger:
                "blur"}
        ]
      }
    }
  },
  methods:{
    test(){
      this.$axios.get('http://10.38.139.120:8080/show').then(res=>res.data).then(res=>{
        alert(res);
      })
    },

    domod(){
      this.$axios.post('http://localhost:8090/user/update',this.form).then(res=>res.data).then(res=>{
        console.log(res)
        if (res.code == 200){
          this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success',
          });
          this.centerDialogVisible = false
          this.loadpost()
          this.resetForm()
        }
        else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      })
    },
    dosave(){
      this.$axios.post('http://localhost:8090/user/save',this.form).then(res=>res.data).then(res=>{
        console.log(res)
        if (res.code == 200){
          this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success',
          });
          this.centerDialogVisible = false
          this.loadpost()
          this.resetForm()
        }
        else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      })
    },
    mod(row){
      console.log(row)
      this.centerDialogVisible = true

      this.$nextTick(()=>{
        this.form.id = row.id
        this.form.no = row.no
        this.form.name = row.name
        this.form.password = row.password
        this.form.age = row.age
        this.form.sex = row.sex + ''
        this.form.phone = row.phone
        this.form.roleId = row.roleId
      })
    },
    del(id){
      this.$axios.get('http://localhost:8090/user/delete?id='+id,this.form).then(res=>res.data).then(res=>{
        console.log(res)
        if (res.code == 200){
          this.$message({
            message:'删除成功',
            type: 'success',
          });
          this.centerDialogVisible = false
          this.loadpost()
        }
        else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    add(){
      this.centerDialogVisible = true
      this.$nextTick(()=>{
        this.resetForm()
      })
    },
    save(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.id){
            this.domod()
          }
          else {
            this.dosave()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = 1
      this.pageSize = val;
      this.loadpost()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.loadpost()
    },

    loadget(){
        this.$axios.get(this.$myurl+'/user/list').then(res=>res.data).then(res=>{
            console.log(res)
          this.tableData = res
        })
    },
    loadpost(){
      this.$axios.post(this.$myurl+'/user/listpage',{
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        param: {
          name:this.name,
          sex:this.sex
        }
      }).then(res=>res.data).then(res=>{
        console.log(res)
        if (res.code == 200){
          this.tableData = res.data
          this.total = res.total
        }
        else{
          alert("获取数据失败")
        }
      })
    },
    resetParam(){
      this.name = '',
          this.sex = ''
    }
  },
  beforeMount() {
     // this.loadget();
    this.loadpost();
  }
}
</script>

<template>
  <div>
    <div style="display:flex;margin-bottom: 0px">
      <el-input  @keyup.enter.native = "loadpost" v-model="name"
                 placeholder="请输入名字" style="width: 200px" suffix-icon="el-icon-search">
      </el-input>

      <el-select v-model="sex" placeholder="请选择性别">
        <el-option
            v-for="item in sexs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>

      <el-button type="primary" @click = "resetParam" style="margin-left: 5px">重置</el-button>
      <el-button type="success" @click = "loadpost">查询</el-button>
      <el-button type="success" @click = "add">新增</el-button>
      <el-button type="success" @click = "test">测试</el-button>
    </div>

    <el-table :data="tableData">
      <el-table-column prop="id" label="ID" width="100px">
      </el-table-column>
      <el-table-column prop="no" label="账号" width="200px">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200px">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="200px">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="200px">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.sex ===  1 ? 'primary' : 'success'"
              disable-transitions>{{scope.row.sex === 1 ? '男' : '女'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roleId" label="角色" width="200px">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.roleId ===  0 ? 'danger' : (scope.row.roleId ===  1 ? 'primary' : 'success')"
              disable-transitions>{{scope.row.roleId ===  0 ? '初来乍到'
              : (scope.row.roleId ===  1 ? '进击的菜鸟' : '减排达人')}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="phone" label="电话" width="200px">
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
        <el-button type="success" size="small" @click = 'mod(scope.row)' style="margin-right: 10px">
          编辑</el-button>
          <el-popconfirm
              confirm-button-text='是'
              cancel-button-text='否'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm = 'del(scope.row.id)'
          >
            <el-button slot="reference" type="danger" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20,30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="display: flex">
    </el-pagination>

    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="no">
          <el-col :span="11">
            <el-input v-model="form.no"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-col :span="11">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="11">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-col :span="11">
            <el-input v-model="form.age"></el-input>
          </el-col>
        </el-form-item>
<!--        <el-form-item label="性别">-->
<!--          <el-col :span="11">-->
<!--            <el-input v-model="form.sex"></el-input>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
        <el-form-item label="角色" prop="admin">
          <el-col :span="11">
            <el-input v-model="form.roleId"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-col :span="11">
            <el-input v-model="form.phone"></el-input>
          </el-col>
        </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click= "save">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>