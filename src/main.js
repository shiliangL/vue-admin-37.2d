import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css
import './components/index'

import App from './App'
import router from './router'
import store from './store'
// 使用公共方法
import './public/index'
import '@/icons' // icon
import '@/permission' // permission control

// import './mock' // simulation data

Vue.use(ElementUI, { size: 'medium', locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
