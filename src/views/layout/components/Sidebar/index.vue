<template>
  <scroll-bar id="sider-scroll-bar">
    <div class="logo-layout">
      <a href="#/" class="logo">
        <span>厨满满</span>
      </a>
    </div>

    <el-menu mode="vertical" 
      :default-active="$route.path" 
      :collapse="isCollapse" 
      background-color="#f9f9f9" 
      text-color="#606266" 
      active-text-color="#1cbc9c" 
      :unique-opened="true">
      <!-- <sidebar-item :routes="permission_routers"></sidebar-item> -->
      <sidebar-item :routes="siderBarMenu"></sidebar-item>
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
    ...mapGetters([
      'permission_routers',
      'menuList',
      'curMenuIndex',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    siderBarMenu() {
      if (Array.isArray(this.menuList) && this.menuList.length > 0) {
        return this.menuList[this.curMenuIndex].children
      } else {
        return []
      }
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.permission_routers)
    }, 200)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#sider-scroll-bar {
  // -webkit-box-shadow: 2px 0 6px rgba(0,21,41,.35);
  // box-shadow: 2px 0 6px rgba(0,21,41,.35);
  background-color: #f9f9f9;
}
.logo-layout {
    color: #cccccc;
    height: 50px;
    position: relative;
    line-height: 50px;
    -webkit-transition: all .3s;
    transition: all .3s;
    overflow: hidden;
    vertical-align:middle
  a {
    background-color: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    -webkit-transition: color .3s;
    transition: color .3s;
    -webkit-text-decoration-skip: objects;
  }
  .logo{
    display: inline-block;
    text-align: center;
    span {
      width: 80px;
      color: #787a7d;
      font-size: 20px;
      font-family: Myriad Pro,Helvetica Neue,Arial,Helvetica,sans-serif;
      font-weight: 600;
    }
  }
}
</style>

