<template>
  <div class="App_layout">
    <div class="App_topbar">
      <Apptopbar></Apptopbar>
    </div>
    <div class="App_sider" :class="{hideSidebar:!isShowSidebar}">
      <Appsiderbar class="sidebar-container"></Appsiderbar>
    </div>
    <div class="main-container" :class="{mxWidth:!isShowSidebar}">
      <div>

      </div>
      <div class="container_warp">
       <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Apptopbar,
  Appsiderbar
} from './components/index.js'
export default {
  name: 'layout',
  props: {},
  components: {
    Apptopbar,
    Appsiderbar
  },
  computed: {
    isShowSidebar () {
      return !this.$store.state.layout.sidberIsCollapse
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }
  .App_layout{
    width: 100%;
    height: 100%;
    .App_topbar{
      height: 60px;
      width: 100%;
      min-width: 700px;
      background:#9ea0a0;
      position: fixed;
      z-index: 10;
    }
    .App_sider{
      height: 100%;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
      background: #fff;
      position: fixed;
      top: 60px;
      left: 0;
    }
    .main-container{
      width: 100%;
      height: 100%;
      padding-top: 70px;
      background: #fff;
      .container_warp{
        padding: 10px;
      }
    }
  }
  #app .mxWidth {
    padding-left: 36px;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .layout {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
