
// rules
import rules from './rules.js'
export default {
  mixins: [rules],
  props: {
    data: { // 用于给外部的数据传递
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: {
        visiable: false, // 显示弹出框
        title: null // 弹出框标题
      },
      button: {
        loading: false, // 确定按钮状态
        text: '确定' // 按钮默认文字
      }
    }
  }
}
