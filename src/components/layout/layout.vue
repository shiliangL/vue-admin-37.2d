<template>
  <div class="App_layout">
    <div class="App_topbar">
      <Apptopbar></Apptopbar>
    </div>
    <div class="App_wrapper" :class="{showHide:!isShowSidebar}">
    <div class="App_sider">
      <Appsiderbar class="sidebar-container"></Appsiderbar>
    </div>
    <div class="App_container">
      <div>
        测试
      </div>
      <div class="">
        <!-- <Approuterview></Approuterview> -->
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
.App_layout {
  width: 100%;
  height: 100%;
  .App_topbar {
    height: 60px;
    width: 100%;
    min-width: 700px;
    position: fixed;
    z-index: 10;
  }
  .App_wrapper {
    width: 100%;
    height: 100%;
    .App_sider {
      transition: all 0.28s;
      height: 100%;
      width: 180px;
      position: fixed;
      top: 60px;
      left: 0;
      .sidebar-container {
        overflow: hidden;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
        .el-menu-item{
          padding-left: 6px;
        }
      }
    }
    .App_container {
      padding-left: 180px;
      transition: all 0.28s;
      padding-top: 70px;
    }
  }
  //隐藏的时候对菜单做的处理
  .showHide {
    .App_sider {
      width: 36px;
    }
    .App_container {
      padding-left: 36px;
    }
    .el-menu,
    .sidebar-container {
      width: 36px !important;
      .el-menu--collapse {
        .el-tooltip {
          padding: 0px 7px !important;
          span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
            opacity: 0;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
