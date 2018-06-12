<template>
  <div class="menu-wrapper">
    <!-- 有二级或更多菜单选择 -->
    <template v-for="item in routes" v-if="item.children">

      <!-- <router-link v-if="item.children.length===1 && !item.children[0].children" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span slot="title" v-if="item.children[0].meta&&item.children[0].meta.title">{{generateTitle(item.children[0].meta.title)}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu> -->

      <template v-if="item.children.length===1 && item.children[0].children && item.children[0].children.length ===0">

        <el-menu-item v-if="!item.resourceUrl" :index="item.id" :class="{'submenu-title-noDropdown':!isNest}" :key="item.id">
          <svg-icon v-if="item.children[0]&&item.children[0].icon" :icon-class="item.children[0].icon"></svg-icon>
          <span slot="title"> {{item.title}} </span>
        </el-menu-item>

        <router-link v-if="item.resourceUrl" :to="item.resourceUrl" :key="item.children[0].id">
          <el-menu-item :index="item.id" :class="{'submenu-title-noDropdown':!isNest}">
            <svg-icon v-if="item.children[0]&&item.children[0].icon" :icon-class="item.children[0].icon"></svg-icon>
            <span slot="title"> {{item.title}} </span>
          </el-menu-item>
        </router-link>
      </template>

      <template v-else>
       <el-submenu :index="item.resourceUrl || item.id" :key="item.id">
        <template slot="title">
          <svg-icon v-if="item&&item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item&&item.title">{{ item.title }}</span>
        </template> 

          <template v-for="child in item.children" v-if="item.children && item.children.length">
          
            <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.resourceUrl"></sidebar-item>

            <template v-else>
              <template v-if="!child.resourceUrl">
                <el-menu-item :index="child.resourceUrl || child.id"  :key="child.id">
                  <!-- <svg-icon v-if="child&&child.icon" :icon-class="child.icon"></svg-icon> -->
                  <span v-if="child&&child.title"> {{ child.title }} </span>
                </el-menu-item>
              </template>
              <template v-if="child.resourceUrl">
                <router-link :to="child.resourceUrl" :key="child.id">
                  <el-menu-item :index="child.resourceUrl || child.id">
                    <!-- <svg-icon v-if="child&&child.icon" :icon-class="child.icon"></svg-icon> -->
                    <span v-if="child&&child.title"> {{ child.title }} </span>
                  </el-menu-item>
                </router-link>
              </template>
            </template>
            
          </template>
        </el-submenu>

      </template>

    </template>
    <template v-else>
      <!-- 没有二级菜单显示 -->
      <el-menu-item :index="item.id" :class="{'submenu-title-noDropdown':!isNest}" :key="item.id">
        <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
        <span slot="title"> {{item.title}} </span>
      </el-menu-item>
    </template>
    
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

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
  created() {

  },
  methods: {
    generateTitle
  }
}
</script>



