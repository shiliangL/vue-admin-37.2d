<!-- 入库记录 -->
<template>
    <div class="storageRe">
			<search-bar :data="searchBarDate" @search="searchAction" @reset="fecthList"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight" :key="curIndex">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>

					<el-table-column prop="updatedName" label="商品名称" align="center"></el-table-column>
					<el-table-column prop="updatedName" label="基本单位" align="center"></el-table-column>
					<el-table-column prop="updatedName" label="商品批次条码" align="center"></el-table-column>
					<el-table-column prop="updatedName" label="关联入库单号" align="center"></el-table-column>
					<el-table-column prop="updatedName" label="仓库" align="center"></el-table-column>
					<el-table-column prop="updatedName" label="仓位" align="center"></el-table-column>
					<el-table-column prop="updatedName" label="入库类型" align="center"></el-table-column>
					<el-table-column prop="updatedName" label="入库数量" align="center"></el-table-column>
					<el-table-column prop="updatedName" label="入库时间" align="center"></el-table-column>
					<el-table-column prop="updatedName" label="产地" align="center"></el-table-column>
					<el-table-column prop="updatedName" label="生产日期" align="center"></el-table-column>

        </el-table>
        
        <el-pagination
          slot="footer"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.page"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>

      </table-contain>
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import { fecthList, fecthTableList, stockCategory, fetchStock, deleteCK, deleteCW } from '@/api/warehouse/setting.js'

export default {
  name: 'storageRe',
  mixins: [model],
  data() {
    return {
      curIndex: 0,
      tabTitles: [],
      searchBarDate: [
        [
          { type: 'option', value: null, key: 'categoryId', class: 'w150', placeholder: '仓库类别', options: [] },
          { type: 'input', value: null, key: 'title', class: 'w180', placeholder: '输入仓库名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [

        ]
      ],
      options: {
        stockCategory: [],
        stock: []
      }
    }
  },
  created() {
    this.tabTitles = [
      { title: '入库单', value: 0 },
      { title: '入库记录', value: 1 }
    ]
  },
  mounted() {
    // this.fecthList()
    // this.fecthStockCategory()
    // this.fetchStock()
  },
  methods: {
    tabsCallBack(item) {
      this.curIndex = item.value
      if (this.curIndex === 1) {
        this.fecthTableList()
      } else {
        this.fecthList()
      }
    },
    fecthStockCategory() {
      // 加载仓库类别下拉
      stockCategory().then(({ data }) => {
        for (const item of data) {
          item.label = item.title
          item.value = item.pk
        }
        this.searchBarDataOne[0][0].options = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fetchStock() {
      // 加载仓库下拉
      fetchStock().then(({ data }) => {
        for (const item of data) {
          item.label = item.title
          item.value = item.id
        }
        this.searchBarDataTwo[0][0].options = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 数据请求
    fecthList() {
      fecthList().then(({ data }) => {
        this.tableOne = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthTableList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size
      }
      fecthTableList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e })
      })
    },
    searchAction(item) {
      if (!item) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        ...item
      }
      fecthTableList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e })
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fecthTableList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fecthTableList()
    },
    clickMoreCommand(command) {
      this.$message({ type: 'success', message: command, duration: 0, showClose: true })
    },
    // 弹层操作
    clickToEditor(index, row) {
      const title = this.curIndex === 0 ? '编辑仓库' : '编辑仓位'
      const tab = this.curIndex === 0 ? 'sectionOne' : 'sectionTwo'
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, isEditor: true, title: title, tab: tab }})
    },
    showAdd() {
      const title = this.curIndex === 0 ? '新增仓库' : '新增仓位'
      const tab = this.curIndex === 0 ? 'sectionOne' : 'sectionTwo'
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: {}, isEditor: false, title: title, tab: tab }})
    },
    refrehList() {
      if (this.curIndex === 0) {
        this.fecthList()
        this.fecthStockCategory()
      } else {
        this.fecthTableList()
        this.fetchStock()
      }
    },
    clickBtnToAddSet(item) {
      const title = this.curIndex === 0 ? '仓库类别设置' : ''
      const tab = 'sectionOne-setType'
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: {}, isEditor: false, title: title, tab: tab }})
    },
    clickToDelete(index, item) {
      this.$confirm('是否需要删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.curIndex === 0) {
          deleteCK({ id: item.id }).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.fecthList()
          }).catch(() => {
            this.$message({ type: 'error', message: '删除失败' })
          })
        } else {
          deleteCW({ id: item.id }).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.fecthTableList()
          }).catch(() => {
            this.$message({ type: 'error', message: '删除失败' })
          })
        }
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>