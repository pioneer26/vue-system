<template>
  <div class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" id="logo" alt="">
        <span>在线管理系统</span>
      </el-col>
       <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" alt="">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="signout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'headNav',
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
  },
  methods: {
    handleCommand(item) {
    //  console.log(item);
    switch(item) {
      case 'info':
        this.message();
        break;
      case 'signout':
        this.signout();
        break;  
    }
    },
    message() {
      this.$router.push('/infoshow');
    },
    signout() {
      //清除token
      localStorage.removeItem('eleToken');
      this.$store.dispatch('clearCurrenState');
      this.$router.push('/login');
    }
  }
}
</script>
<style lang="less" scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
#logo {
  height: 40px;
  width: 40px;
  margin-right: 12px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
