<template>
    <div class="topNavBar">
			<el-row>
				<el-col :span="24">
          <div class="topBar">

					  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
            <div class="nav">
              <ScrollPane class="nav-scroll-bar">
                <span class="nav-item" v-for="(item,index) in menuList" :key="index" v-cloak :class="curIndex==index?'active' : ''"  @click="clickTabTitle(item,index)">{{item.title}}</span>
              </ScrollPane>
            </div>

            <div class="userInfo">
              <el-dropdown class="avatar-container right-menu-item" trigger="hover">
              <div class="avatar-wrapper">
                <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
                {{name}}
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/">
                  <el-dropdown-item>
                    {{$t('navbar.dashboard')}}
                  </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                  <span @click="changeKey" style="display:block;">修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </div>

          </div>
					<!-- <div class="breadcrumb">
            <breadcrumb class="breadcrumb-container"></breadcrumb>
          </div> -->
				</el-col>
			</el-row>

    <!-- 弹层区域 -->
    <el-dialog title="修改密码" width="520px" :visible.sync="dialogVisible" append-to-body center @close="closeForm">
      <div v-if="dialogVisible"> <dialogKey @close="closeForm" @logout="logout"></dialogKey> </div>
    </el-dialog>

    </div>
</template>

<script>
import dialogKey from './dialogKey.vue'
import ScrollPane from '@/components/ScrollPane'
import { Hamburger, Breadcrumb } from '@/components/base.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'topNavBar',
  components: {
    Hamburger,
    ScrollPane,
    Breadcrumb,
    dialogKey
  },
  data() {
    return {
      curIndex: 0,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'menuList', 'name', 'avatar', 'curMenuIndex'])
  },
  methods: {
    ...mapActions([
      'VX_SET_CURMENUINDEX'
    ]),
    clickTabTitle(item, index) {
      this.curIndex = index
      this.VX_SET_CURMENUINDEX(index)
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$router.push({ path: '/login' })
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    changeKey() {
      this.dialogVisible = true
    },
    closeForm() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
.topNavBar {
  height: 50px;
  line-height: 50px;
  background: #f9f9f9;
  .topBar {
    display: flex;
    .hamburger-container {
      padding: 0 6px;
    }
    .nav {
      color: #77787b;
      width: 100%;
      .nav-scroll-bar{
        width: 100%;
        height: 50px;
      }
      span {
        cursor: pointer;
        display: inline-block;
        padding: 0 30px;
        font-weight: 400;
        &:hover {
          color: #1cbc9c;
        }
      }
      .active {
        color: #1cbc9c;
      }
    }
  }
  .breadcrumb {
    height: 40px;
    background: #fff;
  }
  .userInfo{
    position: fixed;
    top: 0px;
    right: 20px;
    z-index: 100;
  }
}
</style>