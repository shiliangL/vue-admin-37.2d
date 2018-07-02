/**
 * 工具类(局部),需要用时直接引入
 */

const util = {

}

util.vad = {
  /**
	 * 判断是否为空
	 * @param {Object} value
	 */
  isBlank: function(value) {
    return value === undefined || value === null || value === ''
  },
  // 数字校验(小数,0,负数都可以)
  validateNum: function(rule, value, callback) {
    if (!value) {
      return callback()
    }
    setTimeout(() => {
      var regUrl = /^(-?\d+)(\.\d+)?$/
      if (!regUrl.test(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }, 100)
  },
  // 自然数校验(大于等于0)
  validateNaturalNumber: function(rule, value, callback) {
    if (!value) {
      return callback()
    }
    setTimeout(() => {
      var regUrl = /^[0-9]*$/
      if (!regUrl.test(value)) {
        callback(new Error('请输入自然数'))
      } else {
        callback()
      }
    }, 100)
  },
  // 正整数校验(不能为0)
  validatePositiveInteger: function(rule, value, callback) {
    if (!value) {
      return callback()
    }
    setTimeout(() => {
      var regUrl = /^[0-9]*[1-9][0-9]*$/
      if (!regUrl.test(value)) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }, 100)
  },
  // 手机号校验
  validatePhoneNumber: function(rule, value, callback) {
    if (!value) {
      return callback(new Error('手机号码不能为空'))
    }
    setTimeout(() => {
      var regUrl = /^1(3|4|5|7|8)\d{9}$/
      if (!regUrl.test(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }, 100)
  },
  // 网址校验
  validateUrl: function(rule, value, callback) {
    if (WUtil.vad.isBlank(value)) {
      callback(new Error('请输入链接地址'))
    }
    setTimeout(() => {
      var regUrl = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/
      if (!regUrl.test(value)) {
        callback(new Error('网址格式不正确,例：http://www.xxxx.com'))
      } else {
        callback()
      }
    }, 200)
  },
  // 电话校验
  validateTelephone: function(rule, value, callback) {
    if (WUtil.vad.isBlank(value)) {
      callback()
    }
    setTimeout(() => {
      var regPhone = /^0\d{2,3}-?\d{7,8}$/
      if (!regPhone.test(value)) {
        callback(new Error('请输入正确的电话号码'))
      } else {
        callback()
      }
    }, 200)
  },
  // 电话或手机校验
  validateTelephoneNumber: function(rule, value, callback) {
    if (WUtil.vad.isBlank(value)) {
      callback()
    }
    setTimeout(() => {
      var regPhone = /(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[34578]\d{9})$)/
      if (!regPhone.test(value)) {
        callback(new Error('请输入正确的联系方式'))
      } else {
        callback()
      }
    }, 200)
  },
  // 特殊符号校验
  validateSpecialCharacters: function(rule, value, callback) {
    if (!value) {
      return callback()
    }
    setTimeout(() => {
      var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/)
      if (containSpecial.test(value)) {
        callback(new Error('内容不能含有特殊字符'))
      } else {
        callback()
      }
    }, 200)
  },
  // 密码校验
  validatePassword: function(rule, value, callback) {
    if (!value) {
      return callback()
    }
    setTimeout(() => {
      var regUrl = /^[a-zA-Z][a-zA-Z0-9_]*$/
      if (!regUrl.test(value)) {
        callback(new Error('以字母开头，长度在6-18之间，只能包含字母、数字和下划线'))
      } else {
        callback()
      }
    }, 200)
  },
  // 邮箱校验
  validateEmail: function(rule, value, callback) {
    if (!value) {
      return callback()
    }
    setTimeout(() => {
      var regUrl = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!regUrl.test(value)) {
        callback(new Error('请输入正确格式的邮箱号码'))
      } else {
        callback()
      }
    }, 200)
  },
  // 身份证校验
  validateIdCard: function(rule, value, callback) {
    if (!value) {
      return callback()
    }
    setTimeout(() => {
      var regUrl = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (!regUrl.test(value)) {
        callback(new Error('请输入正确格式的身份证号码'))
      } else {
        callback()
      }
    }, 200)
  },
  // 大于0小于1的小数
  validateDecimal: function(rule, value, callback) {
    if (!value) {
      return callback()
    }
    setTimeout(() => {
      var regUrl = /^0\.[1-9]\d*$/
      if (!regUrl.test(value)) {
        callback(new Error('请输入0到1的小数'))
      } else {
        callback()
      }
    }, 200)
  },
  // 百分比校验
  validatePercentage: function(rule, value, callback) {
    if (!value) {
      return callback()
    }
    setTimeout(() => {
      var regUrl = /^(100|[1-9]?\d(\.\d\d?)?)%$/
      if (!regUrl.test(value)) {
        callback(new Error('请输入正确的百分比格式'))
      } else {
        callback()
      }
    }, 200)
  },
  // 价格校验
  validatePrice: function(rule, value, callback) {
    if (!value) {
      callback(new Error('不能为空'))
    }
    setTimeout(() => {
      var regUrl = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (!regUrl.test(value)) {
        callback(new Error('请输入正确格式的价格(x.xx;x.x;x)'))
      } else {
        callback()
      }
    }, 100)
  }
}

/**
 * 日期函数
 */
util.date = {
  strToDate: function(str) {
    var fullDate = str.split('-')
    return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0)
  },
  formatDate: function(date, format) {
    var v = ''
    if (typeof date === 'string' || typeof date !== 'object') {
      return
    }
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var weekDay = date.getDay()
    var ms = date.getMilliseconds()
    var weekDayString = ''

    if (weekDay == 1) {
      weekDayString = '星期一'
    } else if (weekDay == 2) {
      weekDayString = '星期二'
    } else if (weekDay == 3) {
      weekDayString = '星期三'
    } else if (weekDay == 4) {
      weekDayString = '星期四'
    } else if (weekDay == 5) {
      weekDayString = '星期五'
    } else if (weekDay == 6) {
      weekDayString = '星期六'
    } else if (weekDay == 7) {
      weekDayString = '星期日'
    }

    v = format
    // Year
    v = v.replace(/yyyy/g, year)
    v = v.replace(/YYYY/g, year)
    v = v.replace(/yy/g, (year + '').substring(2, 4))
    v = v.replace(/YY/g, (year + '').substring(2, 4))

    // Month
    var monthStr = ('0' + month)
    v = v.replace(/MM/g, monthStr.substring(monthStr.length - 2))

    // Day
    var dayStr = ('0' + day)
    v = v.replace(/dd/g, dayStr.substring(dayStr.length - 2))

    // hour
    var hourStr = ('0' + hour)
    v = v.replace(/HH/g, hourStr.substring(hourStr.length - 2))
    v = v.replace(/hh/g, hourStr.substring(hourStr.length - 2))

    // minute
    var minuteStr = ('0' + minute)
    v = v.replace(/mm/g, minuteStr.substring(minuteStr.length - 2))

    // Millisecond
    v = v.replace(/sss/g, ms)
    v = v.replace(/SSS/g, ms)

    // second
    var secondStr = ('0' + second)
    v = v.replace(/ss/g, secondStr.substring(secondStr.length - 2))
    v = v.replace(/SS/g, secondStr.substring(secondStr.length - 2))

    // weekDay
    v = v.replace(/E/g, weekDayString)
    return v
  },
  chsDay: ['日', '一', '二', '三', '四', '五', '六'],
  getLocalTime: function(i = 8) {
    // 参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
    if (typeof i !== 'number') return
    var d = new Date()
    // 得到1970年一月一日到现在的秒数
    var len = d.getTime()
    // 本地时间与GMT时间的时间偏移差
    var offset = d.getTimezoneOffset() * 60000
    // 得到现在的格林尼治时间
    var utcTime = len + offset
    return new Date(utcTime + 3600000 * i)
  }
}

// 默认地址坐标
util.mapCoordinate = { lng: 116.404, lat: 39.915, address: '北京市东城区' }

export default util
