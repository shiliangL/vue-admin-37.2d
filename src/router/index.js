import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout
    }
  ]
})
