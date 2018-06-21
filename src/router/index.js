import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

// 标准路由
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/index'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
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
    path: '/orders',
    component: Layout,
    name: 'orders',
    meta: {
      title: 'orders',
      icon: 'component'
    },
    children: [
      { path: 'orderList', component: _import('orders/orderList/index'), name: 'orderList', meta: { title: 'orderList' }}
    ]
  },
  {
    path: '/goods',
    component: Layout,
    name: 'goods',
    meta: {
      title: 'goods',
      icon: 'component'
    },
    children: [
      { path: 'goodsList', component: _import('goods/goodsList/index'), name: 'goodsList', meta: { title: 'goodsList' }},
      { path: 'goodsProfile', component: _import('goods/goodsProfile/index'), name: 'goodsProfile', meta: { title: 'goodsProfile' }},
      { path: 'goodsClass', component: _import('goods/goodsClass/index'), name: 'goodsClass', meta: { title: 'goodsClass' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
