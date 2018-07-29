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
      if (!this.isLock) {
        this.getPageList(1)
        if (this.selectList.length === 0) {
          this.$emit('input', this.name)
        }
      }
    },
    handleKeydown(e) {
      if (e.key === 'Backspace') {
        if (this.$util.isEmpty(this.name)) {
          this.selectList = []
          this.emitParentData()
        } else {
          if (this.selectList.length === 0) {
            this.$emit('input', this.name)
          }
        }
      }
    },
    getPageList(val) {
      if (!this.isLoading) {
        this.refresh = false
        this.isLoading = true
        this.loading = true
        this.progress = true
        this.loadingText = '加载中'
        const data = this.data
        const params = {
          itemType: data.byType,
          codeOrName: !this.name || this.name == null ? '' : this.name

        }
        if (data.isUpLevel) {
          if (this.upLevelId) {
            params.upLevelId = this.upLevelId
          }
        }

        fetchBase(this.url, params).then(res => {
          this.progress = false
          this.isLoading = false
        }).catch(e => {
          this.refresh = true
          this.loadingText = '查询出错'
        })

        // this.$http.get(this.url, params, (response, status) => {
        //   this.progress = false
        //   this.isLoading = false
        //   const result = response.data

        //   if (status && result.resultCode === 0) {
        //     if (result.data === null) {
        //       this.loadingText = '没有查询到数据'
        //       this.dataList = []
        //       return
        //     }

        //     this.currentPage = val
        //     result.data = result.data || []

        //     this.dataList = !this.notPaging ? result.data.content : result.data

        //     this.total = result.data.totalElements
        //     this.totalPages = result.data.totalPages

        //     if (!this.dataList || this.dataList === null || this.dataList.length === 0) {
        //       this.loading = false
        //     } else {
        //       this.loading = false
        //     }
        //   } else {
        //     this.refresh = true
        //     this.loadingText = '查询出错'
        //   }

        //   if (this.requestCount > 0) {
        //     this.requestCount = 0
        //     this.getPageList(1)
        //   }
        // })
      }
    },
    handleFocus() {
      this.className = 'input-layout1'
      if (!this.firstLoading) {
        if (this.data.isUpLevel && this.upLevelId == null) return
        this.getPageList(1)
        this.firstLoading = true
      }
      this.tableVisiable = true
      this.$emit('foucs')
    },
    handleBlur() {
      this.className = 'input-layout'
    },
    handleClose(tag) {
      this.selectList.splice(this.selectList.indexOf(tag), 1)
      this.emitParentData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getPageList(1)
    },
    clickTableRow(item) {
      this.name = null
      if (this.checkbox) {
        this.$refs.multipleTable.toggleRowSelection(item)
      } else {
        this.tableVisiable = false
        if (this.multiple) {
          if (this.selectList.indexOf(item) === -1) {
            if (this.multipleLimit > 0 && this.selectList.length == this.multipleLimit) return
            let isId = false
            if (this.selectList.length > 0) {
              for (let i = 0; i < this.selectList.length; i++) {
                const obj = this.selectList[i]
                if (item.id === obj.id) {
                  isId = true
                  break
                }
              }
            }
            if (!isId) {
              this.selectList.push(item)
              this.emitParentData()
            }
          }
          this.multipleText = '选中' + this.selectList.length + '个'
        } else {
          if (this.selectList.length > 0) {
            if (this.selectList.indexOf(item) != -1) {
              return
            }
          }
          this.selectList.splice(0, 1, item)
          this.emitParentData()
        }
      }
    },
    emitParentData() {
      if (this.selectList.length === 0) {
        this.$emit('input', this.name)
        this.$emit('call-back', null)
        return
      }

      if (!this.$util.isEmpty(this.getKeys)) {
        const keys = this.getKeys.split(',')
        if (this.multiple) {
          const array = []
          for (let i = 0; i < this.selectList.length; i++) {
            const obj = this.selectList[i]
            if (keys.length === 1) {
              array.push(obj[keys[0]])
            } else {
              const newObj = {}
              for (const key in keys) {
                newObj[keys[key]] = obj[keys[key]]
              }
              array.push(newObj)
            }
          }
          this.$emit('input', array)
        } else {
          const obj = this.selectList[0]
          if (keys.length === 1) {
            this.$emit('input', obj[keys[0]])
          } else {
            const newObj = {}
            for (const key in keys) {
              newObj[keys[key]] = obj[keys[key]]
            }
            this.$emit('input', newObj)
          }
        }
      } else {
        this.$emit('input', this.multiple ? this.selectList : this.selectList[0])
        this.$emit('call-back', this.multiple ? this.selectList : this.selectList[0])
      }
    },
    close() {
      this.tableVisiable = false
    },
    clickRefresh() {
      this.getPageList(this.currentPage)
    }
  },
  computed: {
    'currentWidth': function() {
      return this.offsetWidth ? this.offsetWidth : this.$refs.inputLayout.offsetWidth
    }
  }
}
