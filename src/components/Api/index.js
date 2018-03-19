import Vue from 'vue'
import Http from './http/http'

const install = function(Vue, opts = {}) {
  if (install.installed) return
  var http = new Http()
  Vue.prototype.$http = http
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

Vue.use(install)
