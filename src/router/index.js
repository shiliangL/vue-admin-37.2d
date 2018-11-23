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
    isLayOut: true,
    redirect: null,
    hidden: false,
    children: [
      // { path: 'dashboard', component: _import('dashboard/index'), name: 'dashboard', meta: { title: 'dashboard', icon: 'dashboard', noCache: true, hidden: true }},
      { path: 'putStorage', component: _import('putStorage/index'), meta: { icon: 'component', title: 'putStorageIndex' }, noCache: true, hidden: true },
      { path: 'outStorage', component: _import('outStorage/index'), meta: { icon: 'component', title: 'outStorageIndex' }, noCache: true, hidden: true },
      { path: 'sorting', component: _import('sorting/index'), meta: { icon: 'component', title: 'sortingIndex' }, noCache: true, hidden: true },
      { path: 'packaging', component: _import('packaging/index'), meta: { icon: 'component', title: 'packagingIndex' }, noCache: true, hidden: true }
    ]
  }
]

export const asyncRouterMapTx = [
  { path: 'putStorage', component: _import('putStorage/index'), meta: { icon: 'component', title: 'putStorageIndex' }, noCache: true, hidden: true },
  { path: 'outStorage', component: _import('outStorage/index'), meta: { icon: 'component', title: 'outStorageIndex' }, noCache: true, hidden: true },
  { path: 'sorting', component: _import('sorting/index'), meta: { icon: 'component', title: 'sortingIndex' }, noCache: true, hidden: true },
  { path: 'packaging', component: _import('packaging/index'), meta: { icon: 'component', title: 'packagingIndex' }, noCache: true, hidden: true }
]

export const asyncRouterMap = [
  // {
  //   path: '/acceptance',
  //   component: Layout,
  //   alwaysShow: true,
  //   meta: {
  //     title: 'acceptance',
  //     icon: 'component'
  //   },
  //   children: [
  //     { path: 'acceptanceIndex', component: _import('acceptance/acceptanceIndex/index'), meta: { title: 'acceptanceIndex' }}
  //   ]
  // },
  {
    path: '/putStorage',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'putStorage',
      icon: 'component'
    },
    children: [
      { path: 'putStorage', component: _import('putStorage/index'), meta: { title: 'putStorageIndex' }}
    ]
  },
  {
    path: '/outStorage',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'outStorage',
      icon: 'component'
    },
    children: [
      { path: 'outStorage', component: _import('outStorage/index'), meta: { title: 'outStorageIndex' }}
    ]
  },
  {
    path: '/sorting',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'sorting',
      icon: 'component'
    },
    children: [
      { path: 'sorting', component: _import('sorting/index'), meta: { title: 'sortingIndex' }}
    ]
  },
  {
    path: '/packaging',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'packaging',
      icon: 'component'
    },
    children: [
      { path: 'packaging', component: _import('packaging/index'), meta: { title: 'packagingIndex' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
