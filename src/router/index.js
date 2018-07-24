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
      { path: 'goodsClass', component: _import('goods/goodsClass/index'), name: 'goodsClass', meta: { title: 'goodsClass' }},
      { path: 'brand', component: _import('goods/brand/index'), name: 'brand', meta: { title: 'brand' }}
    ]
  },
  {
    path: '/buy',
    component: Layout,
    name: 'buy',
    meta: {
      title: 'buy',
      icon: 'component'
    },
    children: [
      { path: 'example', component: _import('buy/example/index'), name: 'example', meta: { title: 'example' }},
      { path: 'buyPlan', component: _import('buy/buyPlan/index'), name: 'buyPlan', meta: { title: 'buyPlan' }},
      { path: 'buyOrders', component: _import('buy/buyOrders/index'), name: 'buyOrders', meta: { title: 'buyOrders' }},
      { path: 'buyReturn', component: _import('buy/buyReturn/index'), name: 'buyReturn', meta: { title: 'buyReturn' }},
      { path: 'buyer', component: _import('buy/buyer/index'), name: 'buyer', meta: { title: 'buyer' }},
      { path: 'supplier', component: _import('buy/supplier/index'), name: 'supplier', meta: { title: 'supplier' }}
    ]
  },
  {
    path: '/buyAudit',
    component: Layout,
    name: 'buyAudit',
    meta: {
      title: 'buyAudit',
      icon: 'component'
    },
    children: [
      { path: 'audit', component: _import('buyAudit/audit/index'), name: 'audit', meta: { title: 'audit' }},
      { path: 'clearing', component: _import('buyAudit/clearing/index'), name: 'clearing', meta: { title: 'clearing' }}
    ]
  },
  {
    path: '/customer',
    component: Layout,
    name: 'customer',
    meta: {
      title: 'customer',
      icon: 'component'
    },
    children: [
      { path: 'customerClass', component: _import('customer/customerClass/index'), name: 'customerClass', meta: { title: 'customerClass' }},
      { path: 'customerType', component: _import('customer/customerType/index'), name: 'customerType', meta: { title: 'customerType' }}
    ]
  },
  {
    path: '/warehouse',
    component: Layout,
    name: 'warehouse',
    meta: {
      title: 'warehouse',
      icon: 'component'
    },
    children: [
      { path: 'setting', component: _import('warehouse/setting/index'), name: 'setting', meta: { title: 'setting' }},
      { path: 'goodsIn', component: _import('warehouse/goodsIn/index'), name: 'goodsIn', meta: { title: 'goodsIn' }},
      { path: 'goodsOut', component: _import('warehouse/goodsOut/index'), name: 'goodsOut', meta: { title: 'goodsOut' }}
    ]
  },
  {
    path: '/distribution',
    component: Layout,
    name: 'distribution',
    meta: {
      title: 'distribution',
      icon: 'component'
    },
    children: [
      { path: 'salesDelivery', component: _import('distribution/salesDelivery/index'), name: 'salesDelivery', meta: { title: 'salesDelivery' }},
      { path: 'areaDelivery', component: _import('distribution/areaDelivery/index'), name: 'areaDelivery', meta: { title: 'areaDelivery' }},
      { path: 'deliveryer', component: _import('distribution/deliveryer/index'), name: 'deliveryer', meta: { title: 'deliveryer' }}
    ]
  },
  {
    path: '/sortingPick',
    component: Layout,
    name: 'sortingPick',
    meta: {
      title: 'sortingPick',
      icon: 'component'
    },
    children: [
      { path: 'goodPick', component: _import('sortingPick/goodPick/index'), name: 'goodPick', meta: { title: 'goodPick' }},
      { path: 'orderPick', component: _import('sortingPick/orderPick/index'), name: 'orderPick', meta: { title: 'orderPick' }},
      { path: 'sorter', component: _import('sortingPick/sorter/index'), name: 'sorter', meta: { title: 'sorter' }},
      { path: 'baler', component: _import('sortingPick/baler/index'), name: 'baler', meta: { title: 'baler' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
