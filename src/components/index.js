import Vue from 'vue'
import AMap from 'vue-amap'

import scrollBar from './scrollBar/scrollBar'
const components = [
  scrollBar
]
const install = function (Vue, opts = {}) {
  if (install.installed) return
  Vue.prototype.$AMap = AMap
  components.map(component => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};
Vue.use(install)

// Vue.use(AMap)
// AMap.initAMapApiLoader({
//   key: 'ff15d7002a53347c2ee4fd661403762c',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4'
// })
