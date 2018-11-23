<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in routes" v-if="!item.hidden&&item.isLayOut">


      <ul :key="index" class="menu-ul">
        <li v-for="(itemKey,indexKey) in item.children" :key="indexKey">

          <router-link v-if="!itemKey.hidden" :to="item.path+'/'+itemKey.path">

            <el-menu-item :index="item.path+'/'+itemKey.path">
              <svg-icon v-if="itemKey.meta&&itemKey.meta.icon" :icon-class="itemKey.meta.icon"></svg-icon>
              <span v-if="itemKey.meta&&itemKey.meta.title" slot="title">{{generateTitle(itemKey.meta.title)}}</span>
            </el-menu-item>

          </router-link>
        </li>
      </ul>

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
  methods: {
    generateTitle
  }
}
</script>

<style lang="scss">
  .menu-ul{
    list-style: none;
    padding: 0;
    margin: 0;

    li:hover {
      background-color: #e8f8f5 ;
    }
  }
</style>

