<template>
  <div class="layout">
    <Apptopbar></Apptopbar>
    <div class="container" :class="{hideSidebar:!sidebar}">
      <div class="sider_bar app-wrapper scroll-container sidebar-container">
        <div class="mc_l_mc">
          <Appsiderbar class="sidebar-container"></Appsiderbar>
        </div>
      </div>
      <div class="view_content">
        <div class="view_content_inner">
          <div class="tags-view-wrapper">
            <a href="" class="tags-view-item"> <i class="tag-type"></i> 导航栏 <i class="btn-close"> × </i></a>
          </div>
          <h1>TEST</h1>

        </div>
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
    sidebar () {
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

  .container {
    width: 100%;
    height: 100%;
    background: #e8e8e8;
    display: flex;
  }

  .sider_bar {
    padding-top: 60px;
    background-color: #fff;
    box-shadow: 6px 0 6px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }

  .sider_bar::-webkit-scrollbar {
    display: none;
  }

  .view_content {
    height: 100%;
    width: 100%;
    transform: translate3d(0px, 0px, 0px);
  }

  .small {
    margin-left: 40px;
    transition-duration: 0.25s;
    transition-timing-function: initial;
    transition-delay: initial;
  }

  .view_content .view_content_inner {
    padding-top: 60px;
    overflow-y: auto;
    .tags-view-wrapper {
      padding: 0 16px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: azure;
      .tags-view-item {
        position: relative;
        display: inline-block;
        font-size: 12px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #e9eaec !important;
        color: #495060 !important;
        background: #fff !important;
        padding: 0 20px 0px 10px;
        border-radius: 4px 4px;
        .tag-type {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 8px;
          border-radius: 50%;
          background:#1a75d2;
          position: relative;
          top: 1px;
        }
        .btn-close {
          position: absolute;
          display: inline-block;
          opacity: .35;
          top: -4px;
          right: -10px;
          line-height: 10px;
          width: 18px;
          height: 18px;
          border-radius: 14px;
          font-size: 20px;
          transition: all .2s ease;
          &:hover {
            color: #333;
            transform: scale(1.25);
            cursor: pointer;
          }
        }
      }
    }
  }

  .hideSidebar .el-tooltip {
    padding: 0 6px !important;
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
