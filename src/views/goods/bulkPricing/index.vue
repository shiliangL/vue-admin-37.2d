<!--批量调价 -->
<template>
    <div class="bulkPricing">

      <el-row :gutter="10">
        <el-col :span="18">
          <!-- <search-bar :data="searchBarDate" @search="searchAction" @reset="fecthList"  @add="showAdd"></search-bar> -->
          <div class="search-bar">
            <div class="left">
              <GoodsCascader class="CascaderBox" v-model="GoodsCascaderDTO"></GoodsCascader>
            </div>
            <div class="left">
      				<el-input size="small" style="width:180px"  v-model.trim="title" placeholder="商品名称检索"></el-input>
            </div>
            <div class="left">
                <el-button  type="primary" size="small" @click.stop="fecthList" > 搜索 </el-button>
            </div>
            <div class="left">
                <el-button size="small" @click.stop="clickToReset" > 重置 </el-button>
            </div>
          </div>
          <!-- 表格 -->
          <table-contain  :height.sync="table.maxHeight">
            <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

              <el-table-column label="序号" width="50" align="center">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
    
              <el-table-column prop="categoryName" label="商品分类" align="center"></el-table-column>
              <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
              <el-table-column prop="baseUnitName" label="基本单位" align="center"></el-table-column>
              <el-table-column prop="purchasePrice" label="最近采购单价" align="center"></el-table-column>
              <el-table-column prop="basePrice" label="当前销售单价" align="center"></el-table-column>
              <el-table-column prop="createdOn" label="最近调价时间" align="center"></el-table-column>
    
              <!-- <el-table-column label="操作" align="center" width="140">
                <template slot-scope="scope" align="center">
                  <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">设置</el-button>
                  <el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index,scope.row)">重置密码</el-button>
                </template>
              </el-table-column> -->

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
        </el-col>
        <el-col :span="6">
          <div class="settingForm">
            <el-form :model="form" ref="form" class="form" :rules="rules" :inline="true">
                <el-form-item label="调价基准:" label-width="100px" prop="changeFlag" :rules="rules.select">
                  <el-select size="small" v-model="form.changeFlag" filterable placeholder="请选择" style="width:160px">
                    <el-option v-for="sub in option.changeFlag" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="调价方向:" label-width="100px" prop="changeDirection" :rules="rules.select">
                  <el-select size="small" v-model="form.changeDirection" filterable placeholder="请选择" style="width:160px">
                    <el-option v-for="sub in option.changeDirection" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="调价方式:" label-width="100px" prop="changeMethod" :rules="rules.select">
                  <el-select size="small" v-model="form.changeMethod" filterable placeholder="请选择" style="width:160px">
                    <el-option v-for="sub in option.changeMethod" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                  </el-select>
                </el-form-item>  
                <el-form-item label="数值:" label-width="100px" prop="value" :rules="rules.input">
                  <el-input size="small" style="width:140px" v-model.trim="form.value" placeholder="请输入"></el-input> <span v-if="form.changeMethod===1"> % </span>
                </el-form-item>
            </el-form>
            <div class="footer-block">
              <el-button size="small" @click.stop="resetForm">重置</el-button>
              <el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
</template>

<script>
import model from '@/public/listModel.js'
import rules from '@/public/rules.js'
import Add from './add'
import { SearchBar, GoodsCascader } from '@/components/base.js'
import { fetchList, updateRow } from '@/api/bulkPricing.js'

export default {
  name: 'bulkPricing',
  mixins: [model, rules],
  components: {
    Add,
    GoodsCascader,
    SearchBar
  },
  data() {
    return {
      GoodsCascaderDTO: null,
      title: null,
      searchBarDate: [
        [
          { type: 'option', value: null, key: 'status', class: 'w150', placeholder: '账号状态', options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ] },
          { type: 'input', value: null, key: 'name', class: 'w180', placeholder: '输入用户名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          // { type: 'add', name: '新增' }
        ]
      ],
      form: {
        changeFlag: null,
        changeDirection: null,
        changeMethod: 0,
        value: null
      },
      option: {
        changeFlag: [
          { label: '当前销售价格', value: 0 },
          { label: '最近采购单价', value: 1 }
        ],
        changeDirection: [
          { label: '上调', value: 0 },
          { label: '下调', value: 1 }
        ],
        changeMethod: [
          { label: '按数字额度', value: 0 },
          { label: '按百分百', value: 1 }
        ]
      },
      saveLoading: false,
      dialogVisible: false,
      dialogTitle: null
    }
  },
  mounted() {
    this.fecthList()
  },
  methods: {
    reset() {
      this.fecthList()
    },
    // 数据请求
    fecthList() {
      this.resetForm()
      const { index, size } = this.pagination
      const data = {
        title: this.title,
        categoryId: this.GoodsCascaderDTO,
        index,
        size
      }
      fetchList(data).then(({ data }) => {
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
    refrehList() {
      this.fecthList()
    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fecthList()
    },
    resetForm() {
      this.form.changeFlag = null
      this.form.changeDirection = null
      this.form.changeMethod = null
      this.form.value = null
      if (this.$refs['form']) this.$refs['form'].resetFields()
    },
    clickToReset() {
      this.GoodsCascaderDTO = null
      this.title = null
      this.fecthList()
    },
    clickSaveOrUpdate(formName) {
      if (!this.table.data.length) {
        this.$message({ type: 'warning', message: '设置目标为空,无法设置' })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.saveLoading = true
              const data = JSON.parse(JSON.stringify(this.form))
              data.categoryId = this.GoodsCascaderDTO
              data.title = this.title
              updateRow(data).then(res => {
                if (res.code === '0') {
                  this.$message({ type: 'success', message: `设置成功` })
                  this.fecthList()
                  this.resetForm()
                }
                this.saveLoading = false
              }).catch(e => {
                this.saveLoading = false
              })
            } else {
              this.saveLoading = false
              this.$message({ type: 'warning', message: '请核实表单' })
              return
            }
          })
        } else {
          this.saveLoading = false
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bulkPricing{
 .settingForm{
   min-width: 280px;
   margin-top: 10px;
   background: #fff;
   padding-top: 50px;
 }
  .footer-block{
    padding-bottom: 20px;
  }
  .form{
    text-align: center;
  }
}
</style>