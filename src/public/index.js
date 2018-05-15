import Vue from 'vue'

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

Vue.prototype.$setKeyValue = (original, obj) => {
  for (const key in obj) {
    original[key] = obj[key]
  }
}

Vue.prototype.$compareObjValue = (original, obj) => {
  for (const key in obj) {
    debugger
    if (!original.hasOwnProperty(key) || obj[key] !== original[key]) {
      return false
    }
  }
  return true
}
