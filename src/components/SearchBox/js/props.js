export default {
  props: {
    value: {
      required: true
    },
    data: Object, // 设置数据类型 等
    request: Object, // 请求多参数设置，还未处理
    upLevelId: String, // 父级Id
    setTitles: String, // 设置要显示的表头, 默认是编码，名称
    requestUrl: String, // 请求的Url，在多参数时设置
    offsetWidth: String,
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
