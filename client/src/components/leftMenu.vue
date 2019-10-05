<template>
  <div class="leftMenu">
    <el-row class="menu_page">
     <el-col>
        <el-menu
        class="el-menu-vertical-demo"
        mode="vertical"
        text-color="#fff"
        background-color="#324057"
        active-text-color="#409eff"
        >
          <router-link to="/Home">
            <el-menu-item index="0">
                <i class="fa fa-margin fa-server"></i>
                <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
          <template v-for="item in itemCont">
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
              <template slot="title">
                <i :class="'fa fa-margin '+item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </template>
              <router-link 
              v-for="(citem, cindex) in item.children"
              :key="cindex"
              :to="item.path">
                <el-menu-item :index="citem.path">
                  <span slot="title">{{citem.title}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </template>
        </el-menu>
     </el-col>
    </el-row>
  </div>  
</template>
<script>
export default {
  name: 'leftMenu',
  data() {
    return {
      flag: true,
      itemCont: [
        {
          icon: 'fa-money',
          title: '资金管理',
          path: 'foundlist',
          children: [
            {
              path: 'foundlist',
              title: '资金流水'
            }
          ]
        },
        {
          icon: 'fa-asterisk',
          title: '信息管理',
          path: 'info',
          children: [
            {
              path: 'infoshow',
              title: '个人信息'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>


