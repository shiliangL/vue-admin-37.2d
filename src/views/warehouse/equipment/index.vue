<!-- 工作台外接设备 -->
<template>
    <div class="equipment">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>
			<search-bar :data="searchBarDate" @search="searchAction" @reset="fecthList"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight" :key="curIndex">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

				<el-table-column label="序号" width="50" align="center">
					<template slot-scope="scope">
						<span>{{scope.$index + 1}}</span>
					</template>
				</el-table-column>
 
        <el-table-column prop="title" label="外接设备名称" align="center"></el-table-column>
        <el-table-column prop="deviceNo" label="工作台编号" align="center"></el-table-column>
        <el-table-column prop="stockName" label="仓库" align="center"></el-table-column>
        <el-table-column prop="sortType" label="工作台类型" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.sortType === 1"> 验收台 </span>
						<span v-if="scope.row.sortType === 2"> 入库台 </span>
						<span v-if="scope.row.sortType === 3"> 出库台 </span>
						<span v-if="scope.row.sortType === 4"> 分拣台 </span>
						<span v-if="scope.row.sortType === 5"> 打包台 </span>
					</template>
				</el-table-column>
        <el-table-column prop="workbenchName" label="工作台名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column prop="updatedTime" label="修改时间" align="center"></el-table-column>
 
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
							<el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index,scope.row)">删除</el-button>
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
      <el-dialog :title="dialogTitle" class="dialogTitle" width="520px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
        <div v-if="dialogVisible">
          <el-form :model="form" :rules="rules" ref="form" class="form"  label-width="110px" style="padding-left: 60px;">
            <el-form-item label="外接设备类型:">
              <span v-if="curIndex===2"> 电子秤 </span>
              <span v-if="curIndex===3"> 标签机 </span>
              <span v-if="curIndex===1"> 扫码枪 </span>
            </el-form-item>
            <el-form-item label="外接设备名称:" prop="title" :rules="rules.input">
              <el-input size="small" style="width:180px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
            </el-form-item>
            <el-form-item label="外接设备号:" prop="deviceNo" :rules="rules.input">
              <el-input size="small" style="width:180px"  v-model.trim="form.deviceNo" placeholder="不能超过5位数" maxlength="5"></el-input>
            </el-form-item>
            <el-form-item label="仓库:" prop="stockId" :rules="rules.input">
	            <el-select size="small" v-model="form.stockId" filterable placeholder="选择">
								<el-option v-for="sub in stockOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
							</el-select>
            </el-form-item>
            <el-form-item label="工作台类型:" prop="sortType" :rules="rules.input">
	            <el-select size="small" v-model="form.sortType" filterable placeholder="选择">
								<el-option v-for="sub in workbenchType" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
							</el-select>
            </el-form-item>
            <el-form-item label="工作台名称:" prop="workbenchId" :rules="rules.input">
	            <el-select size="small" v-model="form.workbenchId" filterable placeholder="选择" :disabled="!form.sortType||!form.stockId">
								<el-option v-for="sub in workbenchOpiton" :key="sub.id" :label="sub.title" :value="sub.id"></el-option>
							</el-select>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input size="small" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="form.remark" style="width:180px" type="textarea" placeholder="不能超30位数" maxlength="30"></el-input>
            </el-form-item>
          </el-form>
          <div class="footer-block">
            <el-button size="small" @click.stop="dialogVisible = false">取 消</el-button>
            <el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
          </div>
        </div>
      </el-dialog>
      
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import rules from '@/public/rules.js'
import { Tabs, CascaderBox, SearchBar } from '@/components/base.js'
import { fecthList, fecthStockList, createRow, deleteRow, detailRow, updateRow, fecthWorkbenchList } from '@/api/warehouse/equipment.js'

export default {
  name: 'equipment',
  mixins: [model, rules],
  components: {
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
            placeholder: '仓库',
            options: []
          },
          {
            type: 'option',
            value: null,
            key: 'sortType',
            class: 'w150',
            placeholder: '工作台类型',
            options: [
              { label: '验收台', value: 1 },
              { label: '入库台', value: 2 },
              { label: '出库台', value: 3 },
              { label: '分拣台', value: 4 },
              { label: '打包台', value: 5 }
            ]
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
      isFetchLoading: false,
      isUpdate: false,
      dialogTitle: null,
      form: {
        'sortType': null,
        'deviceNo': null,
        'remark': null,
        'title': null,
        'workbenchId': null
      },
      stockOption: [],
      workbenchOpiton: [],
      workbenchType: [
        { label: '验收台', value: 1 },
        { label: '入库台', value: 2 },
        { label: '出库台', value: 3 },
        { label: '分拣台', value: 4 },
        { label: '打包台', value: 5 }
      ]
    }
  },
  created() {
    this.tabTitles = [
      { title: '扫码枪', value: 1 },
      { title: '电子秤', value: 2 },
      { title: '标签机', value: 3 }
    ]
  },
  mounted() {
    this.fecthList()
    this.fecthStockList()
  },
  methods: {
    fecthOption() {
      this.isFetchLoading = true
      const data = {
        stockId: this.form.stockId,
        type: this.form.sortType
      }
      fecthWorkbenchList(data).then(({ data }) => {
        this.isFetchLoading = false
        if (Array.isArray(data.rows)) {
          this.workbenchOpiton = data.rows
        }
      }).catch(e => {
        this.isFetchLoading = false
        console.log(e)
      })
    },
    // 数据请求
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        type: this.curIndex
      }
      fecthList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthStockList() {
      fecthStockList().then(({ data }) => {
        for (const item of data) {
          item.label = item.title
          item.value = item.id
        }
        this.searchBarDate[0][0].options = data
        this.stockOption = data
      }).catch(e => {
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
      fecthList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
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
      this.dialogTitle = '编辑外接设备'
      detailRow({ id: row.id }).then(({ data }) => {
        this.dialogVisible = true
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    showAdd() {
      this.isUpdate = false
      this.dialogTitle = '新增外接设备'
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
      this.isUpdate = false
      this.form = {
        'remark': null,
        'stockId': null,
        'tableNo': null,
        'title': null
      }
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
              'deviceNo': this.form.deviceNo,
              'id': this.form.id,
              'remark': this.form.remark,
              'title': this.form.title,
              'type': this.form.type,
              'workbenchId': this.form.workbenchId
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
            this.saveLoading = true
            const data = {
              'deviceNo': this.form.deviceNo,
              'remark': this.form.remark,
              'title': this.form.title,
              'type': this.curIndex,
              'workbenchId': this.form.workbenchId
            }
            createRow(data).then(res => {
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
  },
  watch: {
    'form.sortType': {
      handler(n, o) {
        if (n && o) {
          this.workbenchOpiton = []
          this.form.workbenchId = null
        }
        if (this.form.stockId && n) {
          setTimeout(() => {
            if (this.isFetchLoading) return
            this.fecthOption()
          }, 200)
        }
      }
    },
    'form.stockId': {
      handler(n, o) {
        if (n && o) {
          this.workbenchOpiton = []
          this.form.workbenchId = null
        }
        if (this.form.sortType && n) {
          setTimeout(() => {
            if (this.isFetchLoading) return
            this.fecthOption()
          }, 200)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.dialogTitle{
  .el-form-item {
		margin-bottom: 14px;
  }
}
</style>