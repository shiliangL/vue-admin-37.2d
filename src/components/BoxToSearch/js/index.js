import model from './model'
import { on, off } from 'element-ui/src/utils/dom'
import Loading from '../loading.vue'
import { fecthList } from '@/api/goodsList'

export default {
  name: 'BoxToSearch',
  components: {
    Loading
  },
  mixins: [model],
  mounted() {
    this.$nextTick(() => {
      on(document, 'click', this.$refs.searchPopover.handleDocumentClick)
    })
    // this.codeOrname = this.request.data.title
    this.copyRequest = this.copy(this.request)
    this.setSelect()
    this.$watch('$attrs.' + this.rowKey, this.rowKeyChange)
  },
  watch: {
    codeOrname() {
      if (this.showPopover) {
        this.update()
      }
    },
    request: {
      handler(val, old) {
        try {
          if (JSON.stringify(val) !== JSON.stringify(this.copyRequest)) {
            // this.codeOrname = val.data.title
            this.copyRequest = this.copy(this.request)
            this.update()
          }
        } catch (e) {
          console.log(e)
        }
      },
      deep: true
    },
    selectList(val) {
      this.$emit('change', [...val])
      this.emitSyncAttr()
    },
    relateValue(val, old) {
      if (!this.isEmpty(old)) {
        this.selectList = []
      }
    }
  },
  methods: {
    emitSyncAttr() {
      // 动态同步其他属性
      this.syncKeys.forEach((item) => {
        const keyArr = item.split(':')
        const key = keyArr[1]

        if (key) {
          const arr = []

          this.selectList.forEach((list) => {
            arr.push(list[key])
          })

          this.$emit(item, arr.join(this.symbol))
        }
      })
    },
    isEmpty(val) {
      return val === '' || typeof val === 'undefined' || val === null
    },
    rowKeyChange(val, old) {
      if (this.isEmpty(val)) {
        this.selectList = []
      } else if (val !== this.joinCodeAndName()[this.rowKey]) {
        this.setSelect()
      }
    },
    update() {
      this.tableData = []
      if (this.showPopover) {
        this.getList()
      } else {
        this.isFocusLoad = true
      }
    },
    joinCodeAndName() {
      const codeArr = []
      const nameArr = []
      const { rowKey, symbol } = this

      this.selectList.forEach((item) => {
        codeArr.push(item[rowKey])
        nameArr.push(item.name)
      })

      return {
        name: nameArr.join(symbol),
        [rowKey]: codeArr.join(symbol)
      }
    },
    setSelect() {
      const { rowKey, syncAttrs } = this
      const rowKeyItem = syncAttrs[rowKey]

      if (!rowKeyItem) {
        this.selectList = []
      } else {
        const arr = []

        rowKeyItem.split(this.symbol).forEach((item, index) => {
          const obj = {}

          for (const prop in syncAttrs) {
            obj[prop] = syncAttrs[prop].split(this.symbol)[index] || ''
          }

          if (!this.isActiveRow(obj)) {
            arr.push(obj)
            this.selectList.push(obj)
          }
        })
      }
    },
    copy(obj2) {
      let obj = null

      try {
        obj = JSON.parse(JSON.stringify(obj2))
      } catch (e) {
        obj = obj2
      }

      return obj
    },
    handleFocus() {
      // 延迟执行 当popover盖住输入框的时候 触发不了handleDocumentClick 导致其他search-input组件无法关闭
      setTimeout(() => {
        this.openTable()
      }, 300)

      if (this.isFocusLoad) {
        this.getList()
      }
    },
    getList() {
      if (typeof this.beforeSend === 'function' && !this.beforeSend()) {
        this.loading = false
        return
      }
      const { request, codeOrname, delay, url } = this
      const params = {
        page: this.page - 1,
        size: this.size
      }
      const key = this.request.key || 'codeOrname'
      params[key] = codeOrname

      if (!url) {
        return
      }

      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.loading = true
      this.timer = setTimeout(() => {
        fecthList({ ...params, ...request.data }).then(res => {
          if (res.code === '0') {
            this.loading = false
            let ret = res.data
            if (!ret) {
              ret = {}
              ret.rows = []
              ret.total = 0
            }
            const content = ret.rows || []

            content.forEach((item) => {
              item.code = item.goodsCode
              item.name = item.title
            })
            this.tableData = content
            this.updatePopper()
            this.total = ret.total
            this.isFocusLoad = false
            this.loadError = false
          }
        }).catch(e => {
          this.showError(e)
        })
      }, delay)
    },
    showError(e) {
      this.loading = false
      this.loadError = true
      this.isFocusLoad = true
      this.loadingError = (e && e.message) ? e : { message: '加载失败' }
    },
    updatePopper() {
      this.$nextTick(() => {
        this.$refs.searchPopover.updatePopper()
      })
    },
    close() {
      this.showPopover = false
      this.showTable = false
      this.showTags = false
    },
    handlePageSizeChange(val) {
      this.page = 1
      this.getList()
    },
    handlePageChange(val) {
      this.page = val
      this.getList()
    },
    clearAll() {
      this.handleTagClose(null, 2)
      this.openTable()
    },
    handleTagClose(tag, type) {
      if (tag) {
        this.removeSelectItem(tag)
      } else {
        this.selectList.splice(0, this.selectList.length)
      }

      if (type === 2 && this.selectList.length === 0) {
        this.handleFocus()
      }
    },
    openTable() {
      this.showPopover = true
      this.showTable = true
      this.showTags = false
    },
    toggleMoreTags() {
      this.showPopover = true
      this.showTags = !this.showTags
      this.showTable = !this.showTags
    },
    toggleRow(row) {
      // this.codeOrname = null
      if (this.multiple) {
        if (this.isActiveRow(row)) {
          this.removeSelectItem(row)
        } else {
          this.selectList.push(row)
        }
      } else {
        if (this.selectList.length && this.isActiveRow(row)) {
          this.selectList.splice(0, 1)
        } else {
          this.selectList.splice(0, 1, row)
          if (!this.showAlway) {
            this.showTable = false
            this.showPopover = false
          }
        }
      }
    },
    removeSelectItem(row) {
      const { selectList } = this
      const len = selectList.length
      let i = 0
      let index

      for (; i < len; i++) {
        const curItem = selectList[i]

        if (curItem[this.rowKey] === row[this.rowKey]) {
          index = i
          break
        }
      }

      selectList.splice(index, 1)
    },
    isActiveRow(row) {
      return !!(this.selectList.length &&
        this.selectList.filter((item) => {
          return item[this.rowKey] === row[this.rowKey]
        }).length)
    },
    keyupEnter(evt) {
      if (evt.keyCode === 13) {
        this.$emit('enter')
      }
    },
    clearSearch() {
      this.codeOrname = null
    }
  },
  beforeDestroy() {
    off(document, 'click', this.$refs.searchPopover.handleDocumentClick)
  }
}
