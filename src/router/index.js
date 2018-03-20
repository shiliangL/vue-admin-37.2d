import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  {
    path: '/monitor',
    component: Layout,
    // redirect: '/example/table',
    name: 'monitor',
    meta: { title: '设备监控', icon: '监控服务' },
    children: [
      {
        path: 'real_time',
        name: 'real_time',
        component: () => import('@/views/monitor/real_time/index'),
        meta: { title: '监测', icon: 'tree' }
      },
      {
        path: 'remote_setting',
        name: 'remote_setting',
        component: () => import('@/views/monitor/remote_setting/index'),
        meta: { title: '远程', icon: 'tree' }
      },
      {
        path: 'devices_map',
        name: 'devices_map',
        component: () => import('@/views/monitor/devices_map/index'),
        meta: { title: '地图', icon: 'tree' }
      },
      {
        path: 'record_query',
        name: 'record_query',
        component: () => import('@/views/monitor/record_query/index'),
        meta: { title: '记录', icon: 'tree' }
      }
    ]
  },
  {
    path: '/devices',
    component: Layout,
    redirect: '/example/table',
    name: 'devices',
    meta: { title: '设备管理', icon: '监控' },
    children: [
      {
        path: 'devices_group',
        name: 'devices_group',
        component: () => import('@/views/devices/devices_group/index'),
        meta: { title: '设备列表', icon: 'tree' }
      },
      {
        path: 'devices_deal',
        name: 'devices_deal',
        component: () => import('@/views/devices/devices_deal/index'),
        meta: { title: '设备分组', icon: 'tree' }
      }
    ]
  },
  {
    path: '/maintenance',
    component: Layout,
    redirect: '/example/table',
    name: 'monitor3',
    meta: { title: '运维管理', icon: '指标监测' },
    children: [
      {
        path: 'tree3',
        name: 'Tree3',
        component: () => import('@/views/tree/index'),
        meta: { title: '占位', icon: 'tree' }
      },
      {
        path: 'tree4',
        name: 'Tree4',
        component: () => import('@/views/tree/index'),
        meta: { title: '占位', icon: 'tree' }
      }
    ]
  },
  {
    path: '/company',
    component: Layout,
    redirect: '/example/table',
    name: 'company',
    meta: { title: '企业管理', icon: '企业管理' },
    children: [
      {
        path: 'company_list',
        name: 'company_list',
        component: () => import('@/views/company/company_list/index'),
        meta: { title: '企业列表', icon: 'tree' }
      },
      {
        path: 'company_member',
        name: 'company_member',
        component: () => import('@/views/company/company_member/index'),
        meta: { title: '成员管理', icon: 'tree' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

