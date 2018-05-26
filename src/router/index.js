import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'
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
        meta: { title: '设备监测', icon: '' }
      },
      {
        path: 'remote_setting',
        name: 'remote_setting',
        component: () => import('@/views/monitor/remote_setting/index'),
        meta: { title: '远程控制', icon: '' }
      },
      {
        path: 'devices_map',
        name: 'devices_map',
        component: () => import('@/views/monitor/devices_map/index'),
        meta: { title: '设备地图', icon: '' }
      },
      {
        path: 'record_query',
        name: 'record_query',
        component: () => import('@/views/monitor/record_query/index'),
        meta: { title: '设备记录', icon: '' }
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
        path: 'devices_list',
        name: 'devices_list',
        component: () => import('@/views/devices/devices_list/index'),
        meta: { title: '设备列表', icon: '' }
      },
      {
        path: 'devices_group',
        name: 'devices_group',
        component: () => import('@/views/devices/devices_group/index'),
        meta: { title: '设备分组', icon: '' }
      },
      {
        path: 'devices_me',
        name: 'devices_me',
        component: () => import('@/views/devices/devices_me/index'),
        meta: { title: '设备分类', icon: '' }
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
        component: () => import('@/views/maintenance/devices_deal/index'),
        meta: { title: '占位', icon: '' }
      },
      {
        path: 'tree4',
        name: 'Tree4',
        component: () => import('@/views/maintenance/devices_deal/index'),
        meta: { title: '占位', icon: '' }
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
        meta: { title: '企业列表', icon: '' }
      },
      {
        path: 'company_member',
        name: 'company_member',
        component: () => import('@/views/company/company_member/index'),
        meta: { title: '成员管理', icon: '' }
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

