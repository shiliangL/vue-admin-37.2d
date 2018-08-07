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
    // 是否是加载商品
    isGoods: {
      type: Boolean,
      default: () => {
        return false
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
    },
    tableName: {
      type: String,
      default: 'title'
    },
    tableCode: {
      type: String,
      default: 'loginName'
    }
  }
}
