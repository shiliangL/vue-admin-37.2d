<template>
    <div class="topNavBar">
			<el-row>
				<el-col :span="24">
          <div class="topBar">
					  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
            <div class="nav">
              <!-- <span> {{menuList}} </span> -->
              <span class="nav-item" v-for="(item,index) in menuList" :key="index" v-cloak :class="curIndex==index?'active' : ''"  @click="clickTabTitle(item,index)">{{item.title}}</span>
            </div>
          </div>
					<div class="breadcrumb">
            <breadcrumb class="breadcrumb-container"></breadcrumb>
          </div>
				</el-col>
			</el-row>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Hamburger, Breadcrumb } from '@/components/base.js'

export default {
  name: 'topNavBar',
  components: {
    Hamburger,
    Breadcrumb
  },
  data() {
    return {
      curIndex: 0
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'menuList', 'name', 'avatar'])
  },
  methods: {
    clickTabTitle(item, index) {
      this.curIndex = index
      this.$emit('callback', index)
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
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
}
</style>