<template>
  <div class="home">
    <HeaderNav></HeaderNav>
    <LeftMenu></LeftMenu>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import HeaderNav from '../components/headerNav'
import LeftMenu from '../components/leftMenu'
export default {
  name: 'home',
  components: {
    HeaderNav,
    LeftMenu
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>
