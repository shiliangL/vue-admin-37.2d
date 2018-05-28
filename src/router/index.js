import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/views/layout'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  // { path: '/404', component: _import('errorPage/404'), hidden: true },
  {
    path: '',
    component: Layout,
    // redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/goods',
    component: Layout,
    redirect: 'noredirect',
    name: 'goods',
    meta: {
      title: '商品',
      icon: 'component'
    },
    children: [
      { path: 'goods', component: _import('goods/index'), name: 'goods', meta: { title: 'goods' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
