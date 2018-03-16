<template>
  <div class="menu-wrapper">
      <router-link to="/layout/deviceMonitoring">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title"> 地图测试 </span>
          </el-menu-item>
      </router-link>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>

      <!-- <template v-for="item in routes" v-if="!item.hidden&&item.children">
        测试
      </template> -->
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
}
</script>
