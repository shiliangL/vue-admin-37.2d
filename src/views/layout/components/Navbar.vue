<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="navbar_left left">
      <!-- 展开收起 -->
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <!-- 顶部菜单导航 -->
      <div class="topMenu">
        <span class="item" v-for="(item,index) in topMenuList" :key="index" @click="clickTabTitle(index)" :class="curIndex==index?'active' : ''" > {{item}} </span>
      </div>
    </div>
    <!-- <breadcrumb class="breadcrumb-container"></breadcrumb> -->
    <!-- 顶部右边菜单 -->
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="hover">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
          shiliangl
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data() {
    return {
      curIndex: 1,
      topMenuList: [
        '后台首页',
        '运营中心',
        '供应链',
        '财务中心',
        '系统管理'
      ]
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    clickTabTitle(index) {
      this.curIndex = index
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/navbar.scss";
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  position: relative;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .topMenu{
    .item{
      padding: 0 20px;
      cursor: pointer;
      display: inline-block;
      &:hover{
        // background: #3333;
      }
    }
    .active {
			color: #1cbc9c;
      // border-bottom: 2px solid #1cbc9c;
    }
  }
  .navbar_left{
    min-width: 1000px;
  }
  .right-menu {
    position: absolute;
    right: 0;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
