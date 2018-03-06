
<template>

      <!-- <el-submenu v-if="item.children && item.children.length" :index="navIndex">
         创建父级菜单
        <template slot="title">
            <i class="anticon anticon-bar-chart"></i>
            <span slot="title">{{ item.text }}</span>
        </template>
         创建子菜单
        <menuList
            v-for="(subItem,subIndex) in item.children"
            :key="navIndex+'-'+subIndex"
            :navIndex="navIndex+'-'+subIndex"
            :item="subItem" >
        </menuList>
    </el-submenu>
    <el-menu-item v-else :index="navIndex">
        <span slot="title">{{ item.text }}</span>
    </el-menu-item> -->

  <div class="appsiderbar">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#fff" text-color="#333" active-text-color="#1976d2">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Appsiderbar',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
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
