<!--批量调价 -->
<template>
    <div class="bulkPricing">

      <el-row :gutter="10">
        <el-col :span="16">

        <div class="search-bar">

            <div class="left">
              <el-select class="w110" size="small" v-model="levelFirst" clearable filterable placeholder="一级分类">
                <el-option v-for="sub in searchBarOptons.categoryOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
              </el-select>
            </div>

            <div class="left" v-if="searchBarOptons.levelTowOption.length"> 
              <el-select class="w110" size="small" v-model="levelFecond" clearable filterable placeholder="二级分类">
                <el-option v-for="sub in searchBarOptons.levelTowOption" :key="sub.id" :label="sub.title" :value="sub.id"></el-option>
              </el-select>
            </div>

            <div class="left">
      				<el-input clearable size="small" style="width:180px"  v-model.trim="title" placeholder="商品名称检索"></el-input>
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
        <el-col :span="8">
          <div class="settingForm">
            <el-form :model="form" ref="form" class="form" :rules="rules">
                <span class="topTitle">SKU市场价格</span>
                <div class="input">
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
                  <el-form-item label="数值:" label-width="100px" prop="value" :rules="[{trigger: 'change', required: true, validator: rules.validNumberR2}]">
                    <el-input size="small" clearable style="width:160px" v-model.trim="form.value" placeholder="请输入"></el-input> <span v-if="form.changeMethod===1"> % </span>
                  </el-form-item>
                </div>
                <span class="topTitle"> SKU客户类别价格 </span>

                <div class="input">
                  <span v-for="(item,index) in form.customerPriceArr" :key="index">

                    <el-form-item :label="item.title" label-width="100px"
                      :prop=" 'customerPriceArr.'+index+'.value' "  :rules="[{trigger: 'change', validator: rules.validNumberR2N}]">
                      <el-select size="small" v-model="form.changeDirection" filterable placeholder="请选择" style="width:70px">
                        <el-option v-for="sub in option.changeDirection" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                      </el-select>
                      <el-input size="small" style="width:86px" clearable v-model.trim="item.value" placeholder="请输入"></el-input> %
                    </el-form-item> 
                  </span>
                </div>
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
import { customerType } from '@/api/goodsList.js'
import { fetchList, updateRow } from '@/api/bulkPricing.js'
import { fecthGoodsClass } from '@/api/goodsList.js'

export default {
  name: 'bulkPricing',
  mixins: [model, rules],
  components: {
    Add
  },
  data() {
    return {
      searchBarOptons: {
        categoryOption: [],
        levelTowOption: []
      },
      levelFirst: '',
      levelFecond: '',
      title: null,

      form: {
        changeFlag: 1,
        changeDirection: 0,
        changeMethod: 1,
        customerPriceArr: [],
        customerPrice: [],
        value: null
      },
      option: {
        changeFlag: [
          // { label: '当前销售价格', value: 0 },
          { label: '最近采购单价', value: 1 }
        ],
        changeDirection: [
          { label: '上调', value: 0 },
          { label: '下调', value: 1 }
        ],
        changeMethod: [
          { label: '按数字额度', value: 0 },
          { label: '按百分比', value: 1 }
        ]
      },
      saveLoading: false
    }
  },
  mounted() {
    this.fecthList()
    this.customerType()
    this.fecthGoodsClass()
  },
  methods: {
    reset() {
      this.fecthList()
    },
    fecthGoodsClass() {
      fecthGoodsClass().then(({ data }) => {
        if (!Array.isArray(data) && data.length <= 0) return
        const result = []
        for (const item of data) {
          if (item.parentId === '0') {
            result.push({ label: item.title, value: item.id })
          }
        }
        this.levelTypeOption = data
        this.searchBarOptons.categoryOption = result
      }).catch(e => {
        this.$message({ type: 'error', message: '加载分类失败失败' })
      })
    },
    // 数据请求
    fecthList() {
      this.resetForm()
      const { index, size } = this.pagination
      const data = {
        title: this.title,
        categoryId: this.levelFecond ? this.levelFecond : this.levelFirst,
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
    customerType() {
      customerType().then(({ data }) => {
        if (data && Array.isArray(data)) {
          const result = []
          for (const item of data) {
            if (item.type !== 0) {
              result.push({
                'title': item.title,
                'groupId': item.pk,
                'value': null
              })
            }
          }
          this.form.customerPriceArr = result
        }
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
      this.form.changeFlag = 0
      this.form.changeDirection = 0
      this.form.changeMethod = 0
      this.form.value = null
      if (this.$refs['form']) this.$refs['form'].resetFields()
    },
    clickToReset() {
      this.levelFirst = null
      this.levelFecond = null
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
              data.categoryId = this.levelFecond ? this.levelFecond : this.levelFirst
              data.title = this.title
              for (const item of data.customerPriceArr) {
                if (item.value) {
                  data.customerPrice.push({
                    'groupId': item.groupId,
                    'value': item.value
                  })
                }
              }
              delete data.customerPriceArr

              updateRow(data).then(res => {
                if (res.code === '0') {
                  this.$message({ type: 'success', message: `设置成功` })
                  this.fecthList()
                  this.resetForm()
                }
                this.saveLoading = false
              }).catch(e => {
                this.saveLoading = false
                this.$message({ type: 'error', message: e.msg })
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
  },
  watch: {
    levelFirst: {
      handler(val, old) {
        if (val) {
          const arr = []
          for (const item of this.levelTypeOption) {
            if (val === item.parentId) {
              arr.push(item)
            }
          }
          this.searchBarOptons.levelTowOption = arr
        } else {
          this.levelFecond = ''
          this.searchBarOptons.levelTowOption = []
        }
        if (val && old) {
          this.levelFecond = ''
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bulkPricing{
 .settingForm{
   height: 530px;
   overflow-y: auto;
   padding: 10px;
   min-width: 280px;
   margin-top: 10px;
   background: #fff;
 }
  .form{
    // text-align: center;
    .input{
      padding-left: 60px;
    }
  }
  .topTitle{
    margin-left: 10px;
    margin-bottom: 10px;
    text-align: left;
    display: block;
    font-size: 14px;
    color: #606266;
    padding-left: 10px;
    padding-top: 10px;
    font-weight: 400;
  }
}
</style>