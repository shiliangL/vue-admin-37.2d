export default {
  data() {
    return {
      rules: {
        validNumber: (rule, value, callback) => { // 验证是否是数字
          const val = parseFloat(value)
          const limit = typeof rule.low !== 'undefined' ? rule.low : 1
          if (isNaN(val)) {
            return callback('请输入数字')
          } else if (val < limit) {
            return callback('不能小于' + limit)
          } else if (!/^([1-9]\d{0,5}|0)(\.[\d]+)?$/.test(val)) {
            return callback('请输入6位以内数字')
          }
          callback()
        },
        validAmount: (rule, value, callback) => { // 验证金额  不能小于0
          const val = parseFloat(value)
          if (isNaN(val)) {
            return callback('请输入数字')
          } else if (val <= 0) {
            return callback('不能小于等于0')
          } else if (!/^([1-9]\d{0,5}|0)(\.[\d]+)?$/.test(val)) {
            return callback('请输入6位以内数字')
          }
          callback()
        },
        validFee: (rule, value, callback) => { // 验证折扣  不能小于0
          if (value == '' || value == null || value == '0') {
            return callback()
          } else {
            const val = parseFloat(value)
            if (isNaN(val) || val < 0) {
              return callback('不能小于0')
            }
          }

          var reg = /^([1-9]\d{0,5}|0)$/

          if (!reg.test(value)) {
            return callback(new Error('请输入正整数'))
          }

          callback()
        },
        /**
				 * 验证是否为正整数(非空)
				 * @date   2017-06-06
				 * @param  {[type]}   rule     [description]
				 * @param  {[type]}   value    [description]
				 * @param  {Function} callback [description]
				 * @return {[type]}            [description]
				 */
        validPositiveNum: (rule, value, callback) => {
          const limit = typeof rule.low !== 'undefined' ? rule.low : 1

          if (value === undefined || value === '' || value === null) {
            return callback(new Error('不能为空'))
          }

          if (isNaN(value)) {
            return callback(new Error('请输入数字'))
          }

          if (value - 0 < limit) {
            return callback('不能小于' + limit)
          }

          var reg = /^([1-9]\d{0,5}|0)$/

          if (!reg.test(value)) {
            return callback(new Error('请输入正整数'))
          }
          callback()
        },
        /**
				 * 验证是否为正整数(可空)
				 * @date   2017-06-06
				 * @param  {[type]}   rule     [description]
				 * @param  {[type]}   value    [description]
				 * @param  {Function} callback [description]
				 * @return {[type]}            [description]
				 */
        validPositiveNum2: (rule, value, callback) => {
          var reg = /^([1-9]\d{0,5}|0)$/
          const limit = typeof rule.low !== 'undefined' ? rule.low : 1

          if (value === undefined || value === '' || value === null) {
            return callback()
          }

          if (isNaN(value)) {
            return callback(new Error('请输入数字'))
          }

          if (value - 0 < limit) {
            return callback('不能小于' + limit)
          }

          if (!reg.test(value)) {
            return callback(new Error('请输入正整数'))
          }
          callback()
        },
        validPositiveNum3: (rule, value, callback) => {
          var reg = /^([0-9]\d{0,5}|0)|(-[0-9]\d{0,5}|0)$/

          if (value === undefined || value === '' || value === null) {
            return callback()
          }

          if (isNaN(value)) {
            return callback(new Error('请输入数字'))
          }

          if (!reg.test(value)) {
            return callback(new Error('请输入正整数'))
          }
          callback()
        },
        validNumber2: (rule, value, callback) => {
          if (!value) {
            callback()
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        validPositiveNum4: (rule, value, callback) => {
          var reg = /^[-\+]?\d+$/

          if (value === undefined || value === '' || value === null) {
            return callback()
          }

          if (isNaN(value)) {
            return callback(new Error('请输入数字'))
          }

          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
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
        number: [{
          required: true,
          message: '请选择',
          trigger: 'change',
          type: 'number'
        }],
        string: [{
          required: true,
          message: '请选择',
          trigger: 'change',
          type: 'string'
        }]
      }
    }
  }
}
