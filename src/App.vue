<!--  -->
<template>
  <div id="app">
    <div class="appBackground"></div>
    <div class="appContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },

};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.appBackground {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(../public/images/pc1.jpg);
  background-size: cover;
  filter: blur(2px);
  z-index: 1;
}

.appContent{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2
}
</style>
