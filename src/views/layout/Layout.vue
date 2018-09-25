<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<StickyBar>
				<topNavBar></topNavBar>
				<tags-view></tags-view>
			</StickyBar>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, topNavBar } from './components'
import { StickyBar } from '@/components/base.js'
import { fetchMenuList } from '@/api/layout.js'
import { listToTree } from '@/utils/toTreeList.js'
// import { menuToTree } from '@/utils/menuToTree.js'
import { mapActions } from 'vuex'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    StickyBar,
    topNavBar
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  created() {
    console.log(process.env.NODE_ENV, '环境')
  },
  mounted() {
    this.fetchMenu()
  },
  methods: {
    ...mapActions([
      'VX_SET_MENULIST'
    ]),
    fetchMenu() {
      fetchMenuList().then(res => {
        const result = res.data
        const data = listToTree(result)
        // const data = menuToTree(result)
        // console.log(JSON.stringify(data))
        if (Array.isArray(data) && data.length > 0) {
          this.VX_SET_MENULIST(data)
        } else {
          this.VX_SET_MENULIST([])
        }
      }).catch(e => {
        this.$message({ type: 'error', message: '菜单获取失败,请刷新', duration: 0, showClose: true })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
		width: 100%;
		background: #f0f2f5;
		.main-container{
		  // transform: translateZ(0);
			// width: 100%;
			// height: 100%;
		}
	}
</style>
