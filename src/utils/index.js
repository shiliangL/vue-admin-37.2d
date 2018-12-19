
export default class Util {
  isEmpty(str) {
    if (str == null || str === undefined || str === '') return true
    if (str.replace(' ', '').length === 0) return true
    return false
  }

  isEmptyArray(array) {
    if (array && Array.isArray(array) && array.length > 0) { return false }
    return true
  }

  arrayIndexOf(array, attr, str) {
    var subStr = []
    for (var obj in array) {
      subStr.push(array[obj][attr])
    }
    if (subStr.indexOf(str) >= 0) { return true }
    return false
  }

  arrayRemove(array, attr, str) {
    for (var obj in array) {
      if (array[obj][attr] === str) {
        return array.splice(obj, 1)
      }
    }
    return []
  }

  arrayAttrToIndex(array, attr, str) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][attr] === str) { return i }
    }
    return -1
  }

  arrayAttrToObj(array, attr, str) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][attr] === str) { return array[i] }
    }
    return null
  }

  getNowFormatDate() {
    var date = new Date()
    var seperator1 = '-'
    var seperator2 = ':'
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            ' ' + date.getHours() + seperator2 + date.getMinutes() +
            seperator2 + date.getSeconds()
    return currentdate
  }

  getToday() {
    const date = new Date()
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    const ymd = date.getFullYear() + '-' + month + '-' + day
    return ymd
  }

  getMonthOne() {
    const date = new Date()
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const ymd = date.getFullYear() + '-' + month + '-' + 1
    return ymd
  }

  isIp(ip) {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip)
  }

  downloadFile(href, name) {
    const a = document.createElement('a')

    a.href = href
    a.download = name
    a.style.display = 'none'

    document.body.appendChild(a)

    a.click()
    document.body.removeChild(a)
  }

  setToken(token) {
    this.token = token
  }

  getRandomKeys(data) {
    const key = Math.random().toString(36).substring(3, 10)
    data.randomKey = data.randomKey || key
    return key
  }
}

