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
  },
  {
    path: '/orders',
    component: Layout,
    name: 'orders',
    meta: {
      title: 'orders',
      icon: 'component'
    },
    children: [
      { path: 'orderList', component: _import('orders/orderList/index'), name: 'orderList', meta: { title: 'orderList', noCache: true }},
      { path: 'returnChange', component: _import('orders/returnChange/index'), name: 'returnChange', meta: { title: 'returnChange', noCache: true }}
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
      { path: 'goodsList', component: _import('goods/goodsList/index'), name: 'goodsList', meta: { title: 'goodsList', noCache: true }},
      { path: 'bulkPricing', component: _import('goods/bulkPricing/index'), name: 'bulkPricing', meta: { title: 'bulkPricing', noCache: true }},
      { path: 'goodsProfile', component: _import('goods/goodsProfile/index'), name: 'goodsProfile', meta: { title: 'goodsProfile', noCache: true }},
      { path: 'goodsClass', component: _import('goods/goodsClass/index'), name: 'goodsClass', meta: { title: 'goodsClass', noCache: true }},
      { path: 'brand', component: _import('goods/brand/index'), name: 'brand', meta: { title: 'brand', noCache: true }}
    ]
  },
  {
    path: '/frontShop',
    component: Layout,
    name: 'frontShop',
    meta: {
      title: 'frontShop',
      icon: 'component'
    },
    children: [
      { path: 'banner', component: _import('frontShop/banner/index'), name: 'banner', meta: { title: 'banner', noCache: true }},
      { path: 'feedback', component: _import('frontShop/feedback/index'), name: 'feedback', meta: { title: 'feedback', noCache: true }}
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    name: 'promotion',
    meta: {
      title: 'promotion',
      icon: 'component'
    },
    children: [
      { path: 'activities', component: _import('promotion/activities/index'), name: 'activities', meta: { title: 'activities', noCache: true }}
    ]
  },
  {
    path: '/personnel',
    component: Layout,
    name: 'personnel',
    meta: {
      title: 'personnel',
      icon: 'component'
    },
    children: [
      { path: 'kFservice', component: _import('personnel/kFservice/index'), name: 'kFservice', meta: { title: 'kFservice', noCache: true }},
      { path: 'operating', component: _import('personnel/operating/index'), name: 'operating', meta: { title: 'operating', noCache: true }}
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
      { path: 'example', component: _import('buy/example/index'), name: 'example', meta: { title: 'example', noCache: true }},
      { path: 'buyPlan', component: _import('buy/buyPlan/index'), name: 'buyPlan', meta: { title: 'buyPlan', noCache: true }},
      { path: 'buyOrders', component: _import('buy/buyOrders/index'), name: 'buyOrders', meta: { title: 'buyOrders', noCache: true }},
      { path: 'buyReturn', component: _import('buy/buyReturn/index'), name: 'buyReturn', meta: { title: 'buyReturn', noCache: true }},
      { path: 'buyer', component: _import('buy/buyer/index'), name: 'buyer', meta: { title: 'buyer', noCache: true }},
      { path: 'supplier', component: _import('buy/supplier/index'), name: 'supplier', hidden: true, meta: { title: 'supplier', noCache: true }}
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
      { path: 'audit', component: _import('buyAudit/audit/index'), name: 'audit', meta: { title: 'audit', noCache: true }},
      { path: 'clearing', component: _import('buyAudit/clearing/index'), name: 'clearing', meta: { title: 'clearing', noCache: true }}
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
      { path: 'customerClass', component: _import('customer/customerClass/index'), name: 'customerClass', meta: { noCache: true, title: 'customerClass' }},
      { path: 'customerType', component: _import('customer/customerType/index'), name: 'customerType', meta: { noCache: true, title: 'customerType' }},
      { path: 'CustomerManager', component: _import('customer/CustomerManager/index'), name: 'CustomerManager', meta: { noCache: true, title: 'CustomerManager' }}
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
      { path: 'setting', component: _import('warehouse/setting/index'), name: 'setting', meta: { noCache: true, title: 'setting' }},
      { path: 'goodsIn', component: _import('warehouse/goodsIn/index'), name: 'goodsIn', meta: { noCache: true, title: 'goodsIn' }},
      { path: 'goodsOut', component: _import('warehouse/goodsOut/index'), name: 'goodsOut', meta: { noCache: true, title: 'goodsOut' }},
      { path: 'inventory', component: _import('warehouse/inventory/index'), name: 'inventory', meta: { noCache: true, title: 'inventory' }},
      { path: 'sortInventory', component: _import('warehouse/sortInventory/index'), name: 'sortInventory', meta: { noCache: true, title: 'sortInventory' }},
      { path: 'auditInventory', component: _import('warehouse/auditInventory/index'), name: 'auditInventory', meta: { noCache: true, title: 'auditInventory' }},
      { path: 'workbench', component: _import('warehouse/workbench/index'), name: 'workbench', meta: { noCache: true, title: 'workbench' }},
      { path: 'equipment', component: _import('warehouse/equipment/index'), name: 'equipment', meta: { noCache: true, title: 'equipment' }},
      { path: 'ckOperator', component: _import('warehouse/ckOperator/index'), name: 'ckOperator', meta: { noCache: true, title: 'ckOperator' }},
      { path: 'acceptance', component: _import('warehouse/acceptance/index'), name: 'acceptance', meta: { noCache: true, title: 'acceptance' }},
      { path: 'supplyDirector', component: _import('warehouse/supplyDirector/index'), name: 'supplyDirector', meta: { noCache: true, title: 'supplyDirector' }}
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
      { path: 'salesDelivery', component: _import('distribution/salesDelivery/index'), name: 'salesDelivery', meta: { noCache: true, title: 'salesDelivery' }},
      { path: 'areaDelivery', component: _import('distribution/areaDelivery/index'), name: 'areaDelivery', meta: { noCache: true, title: 'areaDelivery' }},
      { path: 'deliveryer', component: _import('distribution/deliveryer/index'), name: 'deliveryer', meta: { noCache: true, title: 'deliveryer' }}
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
      { path: 'goodPick', component: _import('sortingPick/goodPick/index'), name: 'goodPick', meta: { noCache: true, title: 'goodPick' }},
      { path: 'orderPick', component: _import('sortingPick/orderPick/index'), name: 'orderPick', meta: { noCache: true, title: 'orderPick' }},
      { path: 'sorter', component: _import('sortingPick/sorter/index'), name: 'sorter', meta: { noCache: true, title: 'sorter' }},
      { path: 'baler', component: _import('sortingPick/baler/index'), name: 'baler', meta: { noCache: true, title: 'baler' }}
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {
      title: 'system',
      icon: 'component'
    },
    children: [
      { path: 'nenuManagement', component: _import('system/nenuManagement/index'), name: 'nenuManagement', meta: { noCache: true, title: 'nenuManagement' }}
    ]
  },
  {
    path: '/platform',
    component: Layout,
    name: 'platform',
    meta: {
      title: 'platform',
      icon: 'component'
    },
    children: [
      { path: 'institutionsType', component: _import('platform/institutionsType/index'), name: 'institutionsType', meta: { noCache: true, title: 'institutionsType' }},
      { path: 'institutionsList', component: _import('platform/institutionsList/index'), name: 'institutionsList', meta: { noCache: true, title: 'institutionsList' }}
    ]
  },
  {
    path: '/ucControl',
    component: Layout,
    name: 'ucControl',
    meta: {
      title: 'ucControl',
      icon: 'component'
    },
    children: [
      { path: 'peopleControl', component: _import('ucControl/peopleControl/index'), name: 'peopleControl', meta: { noCache: true, title: 'peopleControl' }},
      { path: 'roleControl', component: _import('ucControl/roleControl/index'), name: 'roleControl', meta: { noCache: true, title: 'roleControl' }},
      { path: 'department', component: _import('ucControl/department/index'), name: 'department', meta: { noCache: true, title: 'department' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
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
      { path: 'orderList', component: _import('orders/orderList/index'), name: 'orderList', meta: { title: 'orderList' }},
      { path: 'returnChange', component: _import('orders/returnChange/index'), name: 'returnChange', meta: { title: 'returnChange' }}
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
      { path: 'customerType', component: _import('customer/customerType/index'), name: 'customerType', meta: { title: 'customerType' }},
      { path: 'CustomerManager', component: _import('customer/CustomerManager/index'), name: 'CustomerManager', meta: { title: 'CustomerManager' }}
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
      { path: 'goodsOut', component: _import('warehouse/goodsOut/index'), name: 'goodsOut', meta: { title: 'goodsOut' }},
      { path: 'inventory', component: _import('warehouse/inventory/index'), name: 'inventory', meta: { title: 'inventory' }},
      { path: 'workbench', component: _import('warehouse/workbench/index'), name: 'workbench', meta: { title: 'workbench' }},
      { path: 'equipment', component: _import('warehouse/equipment/index'), name: 'equipment', meta: { title: 'equipment' }},
      { path: 'ckOperator', component: _import('warehouse/ckOperator/index'), name: 'ckOperator', meta: { title: 'ckOperator' }},
      { path: 'supplyDirector', component: _import('warehouse/supplyDirector/index'), name: 'supplyDirector', meta: { title: 'supplyDirector' }}
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
