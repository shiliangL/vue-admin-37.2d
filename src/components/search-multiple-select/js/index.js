import model from './model'
import { on, off } from 'element-ui/src/utils/dom'
import { fetchList } from '@/api/userInfo'
export default {
  mixins: [model],
  name: 'searchMultipleSelect',
  mounted() {
    this.$nextTick(() => {
      on(document, 'click', this.$refs.searchPopover.handleDocumentClick)
    })
  },
  beforeDestroy() {
    off(document, 'click', this.$refs.searchPopover.handleDocumentClick)
  },
  computed: {
    url() {
      if (this.request.url) {
        this.request.url
      } else {
        return 'foundation/v1.0/api/foundationOptionItem/queryOptionItemByType'
      }
    },
    placeholder2() {
      return !this.showPopover && this.selectList.length >= 1 ? '' : this.placeholder
    }
  },
  methods: {
    openTable() {
      this.updatePopper()
      this.showPopover = true
      this.showTable = true
      this.showTags = false
    },
    toggleMoreTags() {
      this.showPopover = true
      this.showTags = !this.showTags
      this.showTable = !this.showTags
    },
    handleFocus() {
      setTimeout(() => {
        this.openTable()
      }, 200)
      if (this.isFocusLoad) {
        this.fetchList()
      }
    },
    keyupEnter(e) {
      if (e.keyCode === 13) {
        this.$emit('enter')
      }
    },
    // 很重要的东西判断点击是否选中
    isActiveRow(row) {
      return !!(this.selectList.length &&
        this.selectList.filter((item) => {
          return item[this.rowKey] === row[this.rowKey]
        }).length)
      // if (this.selectList.length) {
      //   const keys = this.selectList.filter(item => {
      //     return item[this.rowKey] === row[this.rowKey]
      //   })
      //   if (keys.length) {
      //     return true
      //   } else {
      //     return false
      //   }
      // } else {
      //   return false
      // }
    },
    toggleRow(row) {
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
    fetchList() {
      if (typeof this.beforeSend === 'function' && !this.beforeSend()) {
        this.loading = false
        return
      }
      const { url, request } = this
      const params = {
        page: this.page - 1,
        size: this.size
      }

      if (!url) return
      fetchList(url, { ...params, ...request.data }).then(({ data }) => {
        this.loading = false
        this.updatePopper()
        this.tableData = data.content
        this.total = data.totalElements
      }).catch(() => {
        this.tableLoadingText = '加载失败'
      })
    },
    updatePopper() {
      this.$nextTick(() => {
        this.$refs.searchPopover.updatePopper()
      })
    },
    handlePageChange() {

    }
  }
}
