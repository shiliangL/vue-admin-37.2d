import Clickoutside from 'element-ui/src/utils/clickoutside'
import { fetchBase } from '@/api/city.js'
import props from './props.js'
import model from './model.js'
import watch from './watch.js'
export default {
  name: 'SearchBox',
  mixins: [props, model, watch],
  directives: {
    Clickoutside
  },
  created() {
    if (this.requestUrl) {
      this.url = this.requestUrl
    } else {
      this.url = this.urls
    }
  },
  methods: {
    compositioninput(event) {
      if (!this.isLock) this.fetchList()
    },
    fetchList() {
      if (!this.isLoading) {
        this.refresh = false
        this.isLoading = true
        this.loading = true
        this.progress = true
        this.loadingText = '加载中'

        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.loading = true
        this.timer = setTimeout(() => {
          const { index, size } = this.pagination
          let datap = {
            index,
            size
          }
          if (this.isGoods) {
            datap.goodsStatus = 0
          }
          if (this.keyName) {
            datap[this.keyName] = this.name
          }
          if (this.updateKey) {
            datap = Object.assign(datap, this.updateKey)
          }
          fetchBase(this.url, datap).then(({ data }) => {
            this.loading = false
            this.progress = false
            this.isLoading = false
            if (Array.isArray(data.rows)) {
              if (this.PutInStorage) {
                for (const item of data.rows) {
                  item.title = item.productName
                }
              }
              this.dataList = data.rows
            }
            this.pagination.total = data.total
          }).catch(e => {
            this.progress = false
            this.isLoading = false
            this.refresh = true
            this.dataList = []
            this.pagination.total = 0
            this.loadingText = '查询出错'
          })
        }, 300)
      }
    },
    handleFocus() {
      this.className = 'input-layout1'
      this.tableVisiable = true
      this.$emit('foucs')
      this.fetchList()
    },
    handleBlur() {
      this.className = 'input-layout'
    },
    handleClose(tag) {
      this.selectList.splice(this.selectList.indexOf(tag), 1)
      this.name = null
      this.$emit('input', null)
      // this.fetchList()
    },
    handleSizeChange(value) {
      this.pagination.index = value
      this.fetchList()
    },
    clickTableRow(item) {
      this.name = null
      this.tableVisiable = false
      if (!item) return
      this.selectList = [item]
      this.$emit('input', item)
    },
    close() {
      this.tableVisiable = false
    },
    clickRefresh() {
      this.fetchList(this.pagination.index)
    }
  },
  computed: {
    'currentWidth': function() {
      return this.offsetWidth ? this.offsetWidth : this.$refs.inputLayout.offsetWidth
    },
    placeholderAn() {
      if (this.selectList.length) {
        return ''
      } else {
        return this.placeholder
      }
    }
  }
}
