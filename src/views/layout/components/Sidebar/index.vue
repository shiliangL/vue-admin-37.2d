<template>
  <scroll-bar class="scroll-bar">
    <div class="logo-layout">
      <a href="#/" class="logo">
        <h1>WebPro</h1>
      </a>
    </div>
    <el-menu
      :collapse="isCollapse" 
      :default-active="$route.path" 
      background-color="#f8f8f9" 
      text-color="#909399" 
      active-text-color="#409EFF" 
      :unique-opened="true">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.scroll-bar {
  -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.logo-layout {
  color: #909399;
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 24px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  background:#f8f8f9;
  overflow: hidden;
  vertical-align:middle a {
    color: #1890ff;
    background-color: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
    -webkit-text-decoration-skip: objects;
  }
  img {
    width: 30px;
    height: 30px;
    margin-top: 17px;
    margin-left: -3px;
    display: inline-block;
    vertical-align: middle;
  }
  h1 {
    float: left;
    width: 80px;
    line-height: 64px;
    color:$logoTextColor;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: Myriad Pro, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
}
</style>

