export default {
  data() {
    return {
      rules: {
        input: [
          {
            required: true,
            message: '请输入',
            trigger: 'change'
          }
        ],
        select: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        validNumberR2: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        validPhone: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
          if (!reg.test(value)) {
            return callback(new Error('请输入正确的手机号'))
          }
          callback()
        },
        // 座机
        validTelphone: (rule, value, callback) => {
          if (!value) {
            callback()
          }
          var reg = /0\d{2,3}-\d{7,8}/
          if (!reg.test(value)) {
            return callback(new Error('请输入正确的座机'))
          }
          callback()
        },
        validNumberR8: (rule, value, callback) => {
          if (!value) {
            callback()
          }
          var reg = /^([0-9][\d]{0,8})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        validNumberR2N0: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([1-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        validNumberR2N: (rule, value, callback) => {
          if (!value) {
            callback()
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        validNumberZZS: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          const reg = /^[1-9]\d*$/
          if (!reg.test(value)) {
            return callback(new Error('请输入正整数'))
          }
          callback()
        },
        // 关联限制
        validNumberRe: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          if (value * 1 > rule.RE * 1) {
            return callback(new Error(rule.meg))
          }
          callback()
        },
        validNumberCar: (rule, value, callback) => {
          if (!value) {
            callback()
          }
          var reg = /^([0-9]{1})(\d{14}|\d{16}|\d{18})$/
          if (!reg.test(value)) {
            return callback(new Error('请输入正确的卡号'))
          }
          callback()
        },
        validNumberZh: (rule, value, callback) => {
          if (!value) {
            callback()
          }
          var reg = /[^\u4E00-\u9FA5]/
          if (reg.test(value)) {
            return callback(new Error('请输入汉字'))
          }
          callback()
        },
        // 验证折扣 0.01 - 9.99
        validNumberDiscount: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          if (value * 1 > 0 && value * 1 < 9.99) {
            callback()
          } else {
            return callback(new Error('请输正确范围'))
          }
        },
        // 关联限制-正整数
        validNumberReLimit: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          const reg = /^[1-9]\d*$/
          if (!reg.test(value)) {
            return callback(new Error('请输入正整数'))
          }
          if (rule.hasOwnProperty('limitL') && rule.limitL) {
            if (value * 1 >= rule.limitL * 1) {
              return callback(new Error(rule.meg))
            }
          }
          if (rule.hasOwnProperty('limitR') && rule.limitR) {
            if (value * 1 <= rule.limitR * 1) {
              return callback(new Error(rule.meg))
            }
          }
          callback()
        },
        validNumberZZS0: (rule, value, callback) => {
          if (value === 0) {
            callback()
          }
          if (!value && value !== 0) {
            return callback(new Error('请填写'))
          }
          const reg = /^[0-9]\d*$/
          if (!reg.test(value)) {
            return callback(new Error('请输入正整数'))
          }
          callback()
        },
        // 盘点相关联的相互校验
        validNumberPd: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          let msg = null
          if (rule.type === 1 && value * 1 !== rule.RE * 1) {
            msg = rule.v === 1 ? '盘点库存与实际库存不相等' : '核查库存与当时库存不相等'
            return callback(new Error(msg))
          }
          if (rule.type === 3 && value * 1 <= rule.RE * 1) {
            msg = rule.v === 1 ? '盘点库存应大于实际库存' : '核查库存应大于当时库存'
            return callback(new Error(msg))
          }
          if (rule.type === 2 && value * 1 >= rule.RE * 1) {
            msg = rule.v === 1 ? '盘点库存应小于实际库存' : '核查库存应小于当时库存'
            return callback(new Error(msg))
          }
          callback()
        }
      }
    }
  }
}
