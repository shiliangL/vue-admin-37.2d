// 全局组件 服务 对象等
import Vue from 'vue'
import { Loading } from './base.js'
// import Print from './Print/print'

const components = [
  Loading
]
const install = (Vue, opts) => {
  // Vue.prototype.$print = new Print()
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

Vue.use(install)
