// 做全局的组件或者实例方法
import Vue from 'vue'
import $ from 'jquery'
import Util from './Util/util'
import './Api/index'
const components = [
]
const install = function(Vue, opts = {}) {
  if (install.installed) return
  var util = new Util()
  Vue.prototype.$util = util
  Vue.prototype.$jq = $
  components.map(component => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
Vue.use(install)
