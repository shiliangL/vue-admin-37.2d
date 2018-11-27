export default {
  data() {
    return {
      rules: {
        input: [{
          required: true,
          message: '请输入',
          trigger: 'change'
        }],
        select: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
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
          var reg = /^[1][3,4,5,7,8][0-9]{9}$/
          if (!reg.test(value)) {
            return callback(new Error('请输入正确的手机号'))
          }
          callback()
        },
        validNumberR8: (rule, value, callback) => {
          if (!value && value !== 0) {
            return callback(new Error('请输入'))
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
          if ((value) * 1 > (rule.RE) * 1) {
            return callback(new Error(rule.meg))
          }
          callback()
        }
      }
    }
  }
}
