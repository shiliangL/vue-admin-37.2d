import Vue from 'vue'
import tag from './tag/index'
const components = [
  tag
]
const install = function (Vue, opts = {}) {
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};
Vue.use(install)
