// 添加编辑页面公用数据模型
export default {
  props: {
    data: { // 用于给外部的数据传递
      type: Object,
      default: null
    },
    propsSonData: {
      type: Object
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
      },
      currentTitle: null,
      saveLoading: false,
      loading: true,
      loadingText: null
    }
  }
}
