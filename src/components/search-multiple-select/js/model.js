
export default {
  props: {
    placeholder: {
      type: String,
      default: '输入检索...'
    },
    // table 最大高
    maxHeight: {
      type: [String, Number],
      default: 350
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否获取焦点就加载
    isFocusLoad: {
      type: Boolean,
      default: true
    },
    // 发送请求之前执行方法
    beforeSend: {
      type: Function
    },
    // 延迟加载
    delay: {
      type: Number,
      default: 300
    },
    rowKey: {
      type: String,
      default() {
        if (this.modal === 'goods') {
          return 'code'
        } else {
          return 'id'
        }
      }
    },
    // 请求信息
    request: {
      type: Object,
      default() {
        return {
          url: '',
          data: {
            itemType: 'Branch',
            codeOrname: ''
          }
        }
      }
    },
    // 总是显示
    showAlway: {
      type: Boolean,
      default: false
    },
    showKey: {
      type: String,
      default: 'name'
    },
    // popper 配置
    popperOptions: {
      type: Object,
      default() {
        return {
          // 忽略滚动父级
          ignore: ['.el-table__body-wrapper']
        }
      }
    }
  },
  data() {
    return {
      showTable: true, // 是否显示表格
      showTags: false, // 是否显示标签🏷
      showPopover: false, // 弹层是否显示
      searchName: null, // 收搜关键字
      total: 0,
      page: 1,
      size: 10,
      loading: true,
      tableData: [],
      selectList: [],
      tableLoadingText: '加载中...'
    }
  }
}
