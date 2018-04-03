// 做全局的组件或者实例方法
import Vue from 'vue'
import './Api/index'
import loading from './Loading/index'
// register globally
const components = [
  loading
]
const install = function(Vue, opts = {}) {
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
Vue.use(install)
