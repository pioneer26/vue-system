<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">在线后台管理系统</span>
      </div>
      <el-form :model="loginUser" :rules="rules" label-width="100px" ref="loginForm" class="loginForm">
        <el-form-item label="登录邮箱：" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="登录密码：" prop="password">
          <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">点击登录</el-button>
        </el-form-item>
        <div class="triparea">
          <p>还没有注册？ 点击这里，进行 <router-link to="/register">注册</router-link></p>
        </div>
      </el-form>
    </section>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode';
export default {
  name: 'login',
  data() {
    return {
      loginUser: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: '请输入正确的邮箱', trigger: 'blur', type: 'email' },     
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, min: 6, max: 12, message: '长度在6-12个字符', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          this.$http.post('/api/user/login', this.loginUser)
          .then(res => {
            // console.log(res);
            //登录成功
            const { token } = res.data;
            localStorage.setItem('eleToken', token);
            //解析token
            const decoded = jwt_decode(token);
            //存储数据
            this.$store.dispatch('setIsAutnenticated', !this.isEmpty(decoded));
            this.$store.dispatch('setUser', decoded);
          })
          this.$router.push('/home');
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
}
</script>
<style>
.login {
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
.loginForm {
  margin-top: 30px;
  background-color: #fff;
  padding: 30px 30px 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
.triparea {
  text-align: right;
  font-size: 12px;
  color: #333;
  margin-bottom:12px;
}
.triparea p a {
  color: #409eff;
}
</style>

