<!-- 配送员 -->
<template>
    <div class="deliveryer">
			<search-bar :data="searchBarDate" @search="searchAction" @reset="fecthList"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight" :key="curIndex">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 
 					<el-table-column prop="orderNo" label="用户账号" align="center"></el-table-column>
					<el-table-column prop="stockInfoName" label="用户名称" align="center"></el-table-column>
					<el-table-column prop="stockInfoName" label="岗位角色" align="center"></el-table-column>
					<el-table-column prop="storageType" label="创建时间" align="center"></el-table-column>
					<el-table-column prop="storageType" label="在岗日期" align="center"></el-table-column>
					<el-table-column prop="storageType" label="离岗日期" align="center"></el-table-column>
					<el-table-column prop="createdName" label="是否有车" align="center"></el-table-column>
					<el-table-column prop="createdTime" label="账号状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">详情</el-button>
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
							<el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index,scope.row)">重置密码</el-button>
            </template>
          </el-table-column>

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

      <!-- 弹层 -->

      <!-- 弹层区域 -->
      <el-dialog :title="dialogTitle" class="dialogTitle" width="1110px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
        <Add v-if="dialogVisible" @close="resetForm"> </Add>
      </el-dialog>
      
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import Add from './add'
import { Tabs, CascaderBox, SearchBar } from '@/components/base.js'
import { fecthList, fecthStockList, create, deleteRow, detailRow, updateRow } from '@/api/warehouse/workbench.js'

export default {
  name: 'deliveryer',
  mixins: [model],
  components: {
    Add,
    Tabs,
    SearchBar,
    CascaderBox
  },
  data() {
    return {
      curIndex: 1,
      CascaderBoxDTO: null,
      tableOne: [],
      tableTwo: [],
      tabTitles: [],
      searchBarDate: [
        [
          {
            type: 'option',
            value: null,
            key: 'stockId',
            class: 'w150',
            placeholder: '状态',
            options: []
          },
          {
            type: 'input',
            value: null,
            key: 'inputContent',
            class: 'w180',
            placeholder: '输入工作台名称检索'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [{ type: 'add', name: '新增' }]
      ],
      dialogVisible: false,
      saveLoading: false,
      isUpdate: false,
      dialogTitle: null,
      stockOption: []
    }
  },
  created() {
    this.tabTitles = [
      { title: '验收台', value: 1 },
      { title: '入库台', value: 2 },
      { title: '出库台', value: 3 },
      { title: '分拣台', value: 4 },
      { title: '打包台', value: 5 }
    ]
  },
  mounted() {
    this.fecthList()
    this.fecthStockList()
  },
  methods: {
    // 数据请求
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        type: this.curIndex
      }
      fecthList(data)
        .then(({ data }) => {
          this.table.data = data.rows
          this.pagination.total = data.total
        })
        .catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
    },
    fecthStockList() {
      fecthStockList()
        .then(({ data }) => {
          for (const item of data) {
            item.label = item.title
            item.value = item.id
          }
          this.searchBarDate[0][0].options = data
          this.stockOption = data
        })
        .catch(e => {
          console.log(e)
        })
    },
    searchAction(item) {
      if (!item) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        type: this.curIndex,
        ...item
      }
      fecthList(data)
        .then(({ data }) => {
          this.table.data = data.rows
          this.pagination.total = data.total
        })
        .catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fecthList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fecthList()
    },
    // 弹层操作
    clickToEditor(index, row) {
      this.isUpdate = true
      detailRow({ id: row.id }).then(({ data }) => {
        this.dialogVisible = true
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    showAdd() {
      this.isUpdate = false
      this.dialogVisible = true
    },
    refrehList() {
      this.fecthList()
    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fecthList()
    },
    resetForm() {
      this.dialogVisible = false
    },
    clickToDelete(index, item) {
      this.$confirm('是否需要删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        deleteRow({ id: item.id }).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.fecthList()
        }).catch(() => {
          this.$message({ type: 'error', message: '删除失败'
          })
        })
      }).catch(() => {})
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isUpdate) {
            this.form.type = this.curIndex
            this.saveLoading = true
            const data = {
              'id': this.form.pk,
              'remark': this.form.remark,
              'stockId': this.form.stockId,
              'tableNo': this.form.tableNo,
              'title': this.form.title,
              'type': this.form.type
            }
            updateRow(data).then(res => {
              this.dialogVisible = false
              this.$message({ type: 'success', message: `${res.msg}!` })
              this.fecthList()
              this.saveLoading = false
            }).catch(e => {
              this.saveLoading = false
              this.$message({ type: 'error', message: e.msg })
            })
          } else {
            this.form.type = this.curIndex
            this.saveLoading = true
            create(this.form).then(res => {
              this.dialogVisible = false
              this.$message({ type: 'success', message: `${res.msg}!` })
              this.fecthList()
              this.saveLoading = false
            }).catch(e => {
              this.saveLoading = false
              this.$message({ type: 'error', message: e.msg })
            })
          }
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>