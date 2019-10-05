<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">在线后台管理系统</span>
      </div>
      <el-form  :model="registerUser" :rules="rules" label-width="100px" ref="registerForm" class="registerForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="registerUser.checkPass" placeholder="请输入确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option 
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">点击注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
export default {
  name: 'register',
  data() {
    let validatePass = (rule, value, callback) => {
      if(value !== this.registerUser.password) {
        callback(new Error ('两次密码输入不一致'))
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: '',
        email: '',
        password: '',
        checkPass: '',
        identity: ''
      },
      options: [
        {
          value: 'manager',
          label: '管理员'
        },
        {
          value: 'employee',
          label: '员工'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'change' },                    
          { min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur' }                
        ],
        email: [
          { required: true, message: '请输入正确的邮箱', trigger: 'blur', type: 'email' },     
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6-12个字符', trigger: 'blur'},
        ],
        checkPass: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6-12个字符', trigger: 'blur'},
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
     this.$refs[formName].validate(valid => {
      if (valid) {
        this.$http.post('/api/user/register', this.registerUser)
          .then(res => {
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            console.log(res);
            this.$router.push('/login');
          })
      } else {
        console.log('error submit');
        return false;
      }
     })
    }
  }
}
</script>
<style>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 400px;
  height: 240px;
  position: absolute;
  top: 10%;
  left: 34%;

  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 30px;
  background-color: #fff;
  padding: 30px 30px 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
</style>

