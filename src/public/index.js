import Vue from 'vue'

/**
 * 复制对象
 * @param {*} obj
 */
Vue.prototype.$copy = (obj) => {
  if (obj === undefined) {
    return null
  }
  const newObj = {}
  for (const key in obj) {
    newObj[key] = obj[key]
  }
  return newObj
}
