// 添加编辑页面公用数据模型
import { PrintLabel } from '@/components/base.js'
export default {
  props: {
    data: { // 用于给外部的数据传递
      type: Object,
      default: null
    }
  },
  components: {
    PrintLabel
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
      },
      propsParentData: null,
      dialogVisible: false,
      saveLoading: false,
      loading: true,
      loadingText: null,
      rules: {
        validNumber2: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        }
      }
    }
  }
}
