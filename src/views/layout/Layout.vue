<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="topBar">
			<navbar></navbar>
		</div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <div class="sideClose" @click.stop="toggleSideBar"> </div>
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
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
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
	z-index: 2000;
}
 .main-container{
    position: relative;
 }

 .main-container .sideClose{
   position: absolute;
   cursor: pointer;
   width: 10px;
   height: 100%;
   background: #ccc;
 }

 .main-container .sideClose:hover{
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
 }

 .main-container .page-tags{
   padding-top: 80px;
    height: 30px;
    background: #fff;
  }
 .main-container .app-main{
    padding: 20px;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  height: 100%;
  width: 100%;
}
</style>
