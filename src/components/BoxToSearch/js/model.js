
export default {
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    // table 最大高
    maxHeight: {
      type: [String, Number],
      default: 350
    },
    // 多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 总是显示
    showAlway: {
      type: Boolean,
      default: false
    },
    beforeSend: {
      type: Function
    },
    // 延迟加载
    delay: {
      type: Number,
      default: 300
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
    // popper 配置
    popperOptions: {
      type: Object,
      default() {
        return {
          // 忽略滚动父级
          ignore: ['.el-table__body-wrapper']
        }
      }
    },
    symbol: {
      type: String,
      default: ','
    },
    modal: {
      type: String,
      default: 'itemType'
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
    showKey: {
      type: String,
      default: 'name'
    },
    // 相关联的search-input 改变就清空
    relateValue: null,
    default: {
      type: Object
    }
  },
  data() {
    return {
      codeOrname: '',
      total: 0,
      page: 1,
      size: 10,
      loading: true,
      selectList: [],
      tableData: [],
      showTable: false,
      showTags: false,
      showPopover: false,
      loadError: false,
      loadingError: '',
      isFocusLoad: true,
      timer: null,
      copyRequest: null,
      checkAll: true
    }
  },
  computed: {
    url() {
      if (this.request.url) return this.request.url
      if (this.modal === 'itemType') return 'productInfo/listProductInfo'
    },
    maxTagWidth() {
      return this.showPopover ? { maxWidth: '50%' } : ''
    },
    placeholder2() {
      return !this.showPopover && this.selectList.length >= 1 ? '' : this.placeholder
    },
    syncKeys() {
      return Object.keys(this.$options._parentListeners).filter((item) => {
        const keyArr = item.split(':')
        return keyArr.length > 1 && keyArr[0] === 'update'
      })
    },
    syncAttrs() {
      const obj = {}
      this.syncKeys.forEach((item) => {
        const keyArr = item.split(':')
        obj[keyArr[1]] = this.$attrs[keyArr[1]]
      })

      return obj
    }
  }
}
