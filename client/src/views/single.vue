<template>
  <div class="single">
    <div class="container">
        <h1 class="title">在线系统</h1>
        <p class="lead"> 专注于管理系统, 一步一个脚印，用心做事情 </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'single'
}
</script>
<style lang="less" scoped>
.single {
  width: 100%;
  height: 100%;
  background: url(../assets/showcase.png) no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
</style>
