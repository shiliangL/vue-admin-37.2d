<template>
  <div class="App_layout">
    <div class="App_topbar">
      <Apptopbar></Apptopbar>
    </div>
    <div class="app-wrapper" :class="{hideSidebar:!isShowSidebar}">
    <div class="App_sider">
      <!-- <Appsiderbar class="sidebar-container"></Appsiderbar> -->
    </div>
    <div class="main-container">
      <div>
        测试
      </div>
      <div class="container_warp">
        <Approuterview></Approuterview>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { Apptopbar, Appsiderbar, Approuterview } from './components/index.js'
export default {
  name: 'layout',
  props: {},
  components: {
    Apptopbar,
    Appsiderbar,
    Approuterview
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
      transition: width 0.28s;
      height: 100%;
      width: 180px !important;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
      background: rgb(161, 144, 144);
      position: fixed;
      top: 60px;
      left: 0;
    }
    .main-container{
      padding-left: 180px;
      transition: width 0.28s;
      width: 100%;
      height: 100%;
      padding-top: 70px;
      background: rgb(163, 135, 135);
    }
    .hideSidebar {
      .App_sider{
        width: 36px !important;
      }
      .main-container{
        padding-left: 36px;
      }
    }
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
