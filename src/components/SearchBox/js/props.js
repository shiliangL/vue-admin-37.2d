export default {
  props: {
    value: {
      required: true
    },
    data: Object, // 设置数据类型 等
    requestUrl: String, // 请求的Url，在多参数时设置
    offsetWidth: String,
    placeholder: {
      type: String,
      default: () => {
        return '输入检索'
      }
    },
    keyName: {
      type: String,
      default: () => {
        return null
      }
    },
    maxlength: {
      type: Number,
      default: () => {
        return 10
      }
    },
    codeLabel: {
      type: String,
      default: '编号'
    },
    nameLabel: {
      type: String,
      default: '名称'
    }
  }
}
