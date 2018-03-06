<template>
  <div class="layout">
    <Apptopbar></Apptopbar>
    <div class="container">
      <div class="sider_bar">
        <div class="mc_l_mc">
          <Appsiderbar class="sidebar-container"></Appsiderbar>
        </div>
      </div>
      <div class="view_content">
        <div class="view_content_inner">
          <h1>TEST</h1>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Apptopbar, Appsiderbar } from './components/index.js'
export default {
  name: 'layout',
  props: {},
  components: {
    Apptopbar,
    Appsiderbar
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

.container {
  width: 100%;
  height: 100%;
  background: #e8e8e8;
}

.sider_bar {
  position: fixed;
  top: 64px;
  bottom: 0;
  left: 0;
  padding: 0;
  background-color: #fafafa;
  box-shadow: 6px 0 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}
.sider_bar::-webkit-scrollbar {
    display: none;
}
.view_content {
  margin-left: 186px;
  margin-right: 0px;
  height: 100%;
  transform: translate3d(0px, 0px, 0px);
  background: rgb(235, 184, 184);
}
.view_content_inner {
  padding-top: 60px;
  overflow-y: auto;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
