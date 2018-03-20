<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="topBar">
			<navbar></navbar>
		</div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <div class="page-tags"></div>
      <div class="view-tips"></div>
      <app-main></app-main>
    </div>
  </div>

</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>
<style>
.topBar{
	position: fixed;
	top: 0;
	left: 0;
	height: 60px;
	width:100%!important;
	min-width: 700px;
	background:#2b2f48;
	z-index: 10;
}
.main-container{
  position: relative;
}
 .main-container .page-tags{
   margin-top: 60px;
    height: 35px;
    background: #ccc;
  }
 .main-container .app-main{
    padding: 20px;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
