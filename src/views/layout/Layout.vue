<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<StickyBar>
				<topNavBar></topNavBar>
				<tags-view></tags-view>
			</StickyBar>
			<app-main>
      </app-main>
		</div>
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, topNavBar } from './components'
import { StickyBar } from '@/components/base.js'
import { fetchMenuList } from '@/api/layout.js'
import { mapActions, mapGetters } from 'vuex'

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
    ...mapGetters([
      'qNtoken'
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  created() {

  },
  mounted() {
    this.fetchMenu()
    if (!this.qNtoken) {
      this.VX_SET_QNTOKEN()
    }
  },
  methods: {
    ...mapActions([
      'VX_SET_MENULIST',
      'VX_SET_QNTOKEN'
    ]),
    fetchMenu() {
      fetchMenuList().then(res => {
        const result = res.data
        const data = this.initMenuList(result)
        if (Array.isArray(data) && data.length > 0) {
          this.VX_SET_MENULIST(data)
        } else {
          this.VX_SET_MENULIST([])
        }
      }).catch(e => {
        this.$message({ type: 'error', message: '菜单获取失败,请刷新', duration: 0, showClose: true })
      })
    },
    // 初始化菜单列表
    initMenuList(data) {
      if (!Array.isArray(data)) return
      const temp = {}
      const result = []

      // 遍历子节点
      const iterNode = (node) => {
        const { id } = node
        for (const key in temp) {
          if (temp[key].parentId === id) {
            temp[key].flag = true
            iterNode(temp[key])
          }
        }
      }

      // 遍历父节点
      const iterParent = (parent) => {
        if (temp[parent.parentId]) {
          temp[parent.parentId].flag = true
          iterParent(temp[parent.parentId])
        }
      }

      // data.forEach(item => temp[item.id] = item)
      for (const item of data) {
        temp[item.id] = item
      }

      data.forEach(item => {
        const { flag, parentId } = item
        const parent = temp[parentId]

        if (!parent && typeof flag === 'string') {
          iterNode(item)
        } else if (parent && typeof flag === 'string') {
          parent.flag = true
          iterParent(parent)
          iterNode(item)
        }
      })

      data.forEach(item => {
        const { flag, parentId } = item
        const parent = temp[parentId]
        if (parent && parent.flag && flag) {
          item.text = item.title
          if (!parent['children']) {
            parent['children'] = []
          }
          parent['children'].push(item)
        } else if (!parent && flag) {
          item.text = item.title
          result.push(item)
        }
      })
      // 设置所有菜单列表
      // this.menuList = result
      return result
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
	  height: 100%;
		width: 100%;
		background: #f0f2f5;
		.main-container{
		  // transform: translateZ(0);
			// width: 100%;
			// height: 100%;
		}
	}
</style>
