<template>
  <div id="nofind">
    <div class="center">
      <div class="circle">
        <div class="circle_text">404</div>
      </div>
      <div class="circle_nofind">您要找的页面未找到</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'nofind'
}
</script>
<style lang="less" scoped>
body{
    margin: 0 auto;  
    height: 100%;
}
#nofind{
  display:flex;
  min-height: 500px;
  min-width: 800px;
  justify-content: center;
  align-items: center;
}
.center{
    height: 350px;
    text-align: center;
    vertical-align: middle;
    font-family: Verdana;
}
.circle{
  margin: auto;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: #c0c6cc;
}
.circle_text{
    line-height: 260px;
    font-size: 100px;
    color: #ffffff;
    font-weight: bold;
}
.circle_nofind{
    margin-top:30px;
    line-height: 40px;
    font-size: 26px;
    color: #505a64;
}
</style>
