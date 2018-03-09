import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/layout.vue'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/', redirect: '/layout' },
  {
    path: '/layout',
    component: Layout,
    name: Layout,
    children: [{
      path: 'deviceMonitoring',
      component: _import('device-monitoring/index'),
      name: 'deviceMonitoring'
    }]
  },
  { path: '*', redirect: '/' }
]

export default new Router({
  routes: constantRouterMap
})
