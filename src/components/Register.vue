<script>
export default {
  data() {
    return {
      registerForm: {
        username: '',
        password:'',
        email:'',
        EmailCode:''
      },
    };
  },
  methods: {
    register(){
      // alert(this.registerForm.EmailCode)
      this.$refs.registerForm.validate((valid) => {
        if (valid) { //valid成功为true，失败为false
          let formData = new FormData();
          formData.append('username', this.registerForm.name);
          formData.append('password', this.registerForm.password);
          formData.append('email', this.registerForm.email);
          formData.append('EmailCode', this.registerForm.EmailCode);
          this.$axios.post('http://localhost:8000/user/register', formData)
              .then((res) => {
                console.log(res.data)
                // alert(res.data.code === 200)
                if (res.data.code === 200) {
                  alert('注册成功');
                  console.log(res.data);
                  // 清空表单字段
                  this.registerForm.name = '';
                  this.registerForm.email = '';
                  this.registerForm.password = '';
                  this.registerForm.EmailCode = '';
                }
                else{
                  this.confirm_disabled=false;
                  alert('注册失败');
                  return false;
                }
              });
        }
        else {
          this.register_disabled = false;
          alert('注册失败');
          return false;
        }
      });
    },
    sendVerifyCode() {

      // 检查邮箱格式是否正确
      if (!this.validateEmail(this.registerForm.email)) {
        this.$message.error('请输入正确的邮箱地址');
        return;
      }
      // alert(this.registerForm.email)

      // 将邮箱发送到后端
      this.$axios.post(`http://localhost:8000/user/getcode?email=${this.registerForm.email}`)
          .then(res => {
            // alert(res.data.code)
            if (res.data.code === 200) {
              this.$message.success('验证码已发送到您的邮箱,请查收');
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error('发送验证码失败');
          });
    },

    validateEmail(email) {
      // 简单的邮箱格式校验
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

  },
}
</script>

<template>
  <el-form :model="registerForm" status-icon ref="registerForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="name">
      <el-input v-model.number="registerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input  v-model="registerForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerForm.email"></el-input>
      <el-button type="primary" @click="sendVerifyCode">获取验证码</el-button>
    </el-form-item>
    <el-form-item label="验证码" prop="EmailCode">
      <el-input v-model="registerForm.EmailCode"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click=register>提交</el-button>
      <el-button >重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
