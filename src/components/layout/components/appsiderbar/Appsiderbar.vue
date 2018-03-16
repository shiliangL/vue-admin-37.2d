
<template>
  <div class="appsiderbar">
    <el-menu default-active="1" @open="handleOpen" @close="handleClose" :collapse="getSidberIsCollapse" background-color="#fff" text-color="#333" active-text-color="#1976d2">
      <SidebarItem :routes="routes"></SidebarItem>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import menuList from './test.json'
import { mapGetters } from 'vuex'
export default {
  name: 'Appsiderbar',
  props: {

  },
  data () {
    return {
      routes: null
    }
  },
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters(['getSidberIsCollapse'])
  },
  created () {
    this.routes = menuList.data.children
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
 #app .hideSidebar .el-tooltip{
  padding: 0 10px !important;
  font-size: 12px !important;;
 }
</style>
