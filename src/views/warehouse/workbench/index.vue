<!-- 工作台 -->
<template>
    <div class="workbench">
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
					<el-table-column prop="title" label="工作台名称" align="center"></el-table-column>
					<el-table-column prop="tableNo" label="工作台编号" align="center"></el-table-column>
					<el-table-column prop="electronicScale" label="外接设备名(电子秤)" align="center"></el-table-column>
					<el-table-column prop="labelingMachine" label="外接设备名(标签机)" align="center"></el-table-column>
					<el-table-column prop="barcodeScanner" label="外接设备名(扫码枪)" align="center"></el-table-column>
					<el-table-column prop="stockName" label="仓库" align="center"></el-table-column>
					<el-table-column prop="updatedTime" label="修改时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="290">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
							<el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index,scope.row)">删除</el-button>
              <!-- <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.workbenchUrl">
                <el-button type="text" size="mini" slot="reference"> 复制工作台登录网址 </el-button>
              </el-popover> -->
              <el-button type="text" size="mini" @click.stop="clickToCopy(scope.$index,scope.row)">复制工作台登录网址</el-button>
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
      <el-dialog :title="dialogTitle" class="dialogTitle" width="450px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
        <div v-if="dialogVisible">
          <el-form :model="form" ref="form" :rules="rules" :inline="true" style="padding-left: 40px">
            <el-form-item label="工作台类型:" label-width="100px">
              <span v-if="curIndex===1"> 验收台 </span>
              <span v-if="curIndex===2"> 入库台 </span>
              <span v-if="curIndex===3"> 出库台 </span>
              <span v-if="curIndex===4"> 分拣台 </span>
              <span v-if="curIndex===5"> 打包台 </span>
            </el-form-item>
            <el-form-item label="工作台名称:" label-width="100px" prop="title" :rules="rules.input">
              <el-input size="small" style="width:180px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
            </el-form-item>
            <el-form-item label="工作台编号:" label-width="100px" prop="tableNo" :rules="rules.input">
              <el-input size="small" style="width:180px"  v-model.trim="form.tableNo" placeholder="不能超过5位数" maxlength="5"></el-input>
            </el-form-item>
            <el-form-item label="仓库:" label-width="100px" prop="stockId" :rules="rules.input">
	            <el-select size="small" v-model="form.stockId" clearable filterable placeholder="选择仓库">
								<el-option v-for="sub in stockOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
							</el-select>
            </el-form-item>
            <el-form-item label="简要说明:" label-width="100px">
              <el-input size="small" v-model.trim="form.remark" style="width:180px" type="textarea" autosize  placeholder="不能超30位数" maxlength="30"></el-input>
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
import { fecthList, fecthStockList, create, deleteRow, detailRow, updateRow } from '@/api/warehouse/workbench.js'
// const baseUrl = 'http://10.1.1.119:8090/#/login?'// 深圳
// const baseUrl = 'http://192.168.1.119:8090/#/login?'// 南京
// const baseUrl = 'http://39.108.235.6:8081/workbench#/login?'// 阿里云 dev
// const baseUrl = 'http://39.108.235.6:81/workbench#/login?'// 阿里云 正式
let baseUrl = null
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://39.108.235.6:8081/workbench#/login?'// 阿里云 dev
} else {
  baseUrl = 'http://39.108.235.6:81/workbench#/login?' // 阿里云 正式
}
export default {
  name: 'workbench',
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
      form: {
        'remark': null,
        'stockId': null,
        'tableNo': null,
        'title': null
      },
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
      fecthList(data).then(({ data }) => {
        if (Array.isArray(data.rows)) {
          this.table.data = data.rows
        }
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
        if (Array.isArray(data.rows)) {
          this.table.data = data.rows
        }
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
      this.dialogTitle = '编辑工作台管理 '
      detailRow({ id: row.id }).then(({ data }) => {
        this.dialogVisible = true
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    showAdd() {
      this.dialogTitle = '新增工作台管理 '
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
    },
    clickToCopy(index, item) {
      if (item && item.id) {
        const url = `${baseUrl}type=${this.curIndex}&id=${item.id}&stockId=${item.stockId}`
        this.$copyText(url).then(s => {
          this.$message({ type: 'success', message: '复制到剪切板成功' })
        }, e => {
          this.$message({ type: 'error', message: '复制失败' })
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.dialogTitle{
  .el-form-item {
    margin: 8px;
  }
}
</style>