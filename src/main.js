import Vue from 'vue'
import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'// CSS resets
import VueLazyLoad from 'vue-lazyload'

import '@/styles/index.scss' // global css
import '@/styles/element-cmm.scss' //

import App from './App'
import store from './store'
import i18n from './lang' // Internationalization
import './permission' // permission control
import './icons' // icon
import './public' // 全局公用方法
import './components' // 全局组件

import router from './router'

Vue.config.productionTip = false

// Vue.use(VueLazyLoad, {
//   error: './static/error.png',
//   loading: './static/loading.png'
// })
Vue.use(VueLazyLoad)

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
