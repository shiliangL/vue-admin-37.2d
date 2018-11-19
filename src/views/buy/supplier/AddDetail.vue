<template>
  <div class="AddDetail">
    <el-form :model="form" ref="form" :inline="true">
      <!--基本信息-->
      <div class="row-item">
          <div class="row-title">基本信息</div>
          <div class="row-content info">
            <el-row>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="关联采购计划单号:">
                  <span v-cloak>{{form.orderRequestNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="采购申请时间:">
                  <span v-cloak>{{form.applicationDate}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="申请人:">
                  <span v-cloak>{{form.purchaserName}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="审核人:">
                  <span v-cloak>{{form.auditStaffName}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="采购订单编号:">
                  <span v-cloak>{{form.orderNo}}</span>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="采购订单创建时间:">
                  <span v-cloak>{{form.createTime}}</span>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="采购员:">
                  <span v-cloak>{{form.personnelName}}</span>
                </el-form-item>
              </el-col>

            </el-row>
          </div>
      </div>

        <!--费用信息-->
      <div class="row-item">
          <div class="row-title">费用信息</div>
          <div class="row-content info">
            <el-row>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="待采购参考金额:">
                  <span v-cloak>{{form.purchaseSum}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="实际采购金额:">
                  <span v-cloak>{{form.finalSum}}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="采购退货金额:">
                  <span v-cloak>{{form.amountlSum}}</span>
                </el-form-item>
              </el-col> -->
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="应付采购款金额:">
                  <span v-cloak>{{form.amountlSum}}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="未支付采购金额:">
                  <span v-cloak>{{form.orderNo}}</span>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="已支付采购金额:">
                  <span v-cloak>{{form.createTime}}</span>
                </el-form-item>
              </el-col> -->

              <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="采购结算剩余应付金额:">
                    <span v-cloak>{{form.remainingSumPayable}}</span>
                </el-form-item>
              </el-col> -->

              <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="采购结算应收金额(预付超额):">
                  <span v-cloak>{{form.personnelName}}</span>
                </el-form-item>
              </el-col> -->

            </el-row>
          </div>
      </div>

      <!--商品信息-->
      <div class="row-item">
        <div class="row-title">商品信息</div>

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
              <el-input style="width:180px" v-model="productName" size="small" clearable @keyup.enter.native="clickToSearch" placeholder="输入商品名称检索"></el-input>
            </div>
            <div class="left">
                <el-button  type="primary" size="small" @click.stop="clickToSearch" > 搜索 </el-button>
            </div>
            <div class="left">
                <el-button size="small" @click.stop="reset" > 重置 </el-button>
            </div>

          </div>

        <div class="row-content">
          <!-- 表格 -->
          <table-contain  :height.sync="table.maxHeight">
            <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

              <el-table-column label="序号" width="50" align="center">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="categoryName" label="商品分类" align="center"></el-table-column>
              <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
              <el-table-column prop="basicUnitName" label="基本单位" align="center"></el-table-column>
              <el-table-column prop="orderQuantity" label="待采购量" align="center"></el-table-column>

              <el-table-column prop="supplierPrice" label="供应单价" align="center"></el-table-column>
              <el-table-column prop="supplierQuantity" label="供应数量" align="center"></el-table-column>
              <el-table-column prop="supplierSum" label="供应金额" align="center"></el-table-column>

              <el-table-column prop="purchasePrice" label="实际采购单价" align="center"></el-table-column>
              <el-table-column prop="realQuantity" label="实际采购量" align="center"></el-table-column>
              <el-table-column prop="sum" label="实际采购金额" align="center"></el-table-column>
              <el-table-column prop="warehouseTime" label="入库时间" align="center"></el-table-column>
              <el-table-column prop="quantity" label="实际入库量" align="center"></el-table-column>
              <el-table-column prop="operator" label="入库操作人" align="center"></el-table-column>
              <el-table-column prop="auditStatus" label="采购退/换货状态" align="center">
                <template slot-scope="scope" align="center">
                  <span v-cloak> {{scope.row.returnState | filterStatus }} </span>
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


        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import model from '@/public/listModel.js'
import { fetchPurchaseOrderHeaderInfoDetail, fetchPurchaseOrderTableInfoDetail } from '@/api/buy/supplier.js'
import { fecthGoodsClass } from '@/api/goodsList.js'

export default {
  mixins: [addModel, model],
  data() {
    return {
      searchBarOptons: {
        categoryOption: [],
        levelTowOption: []
      },
      levelFirst: '',
      levelFecond: '',
      productName: '',

      dialogVisible: false,
      form: {
        orderRequestNo: null,
        applicationDate: null,
        purchaserName: null,
        auditStaffName: null,
        createTime: null,
        orderNo: null,
        purchaseType: null,
        personnelName: null,

        purchaseSum: null,
        finalSum: null,
        amountlSum: null,
        table: []
      },
      rules: {},
      loadID: null,
      isShowView: false,
      isShowEditor: false,
      currentTitle: null,
      viewData: null,
      typeIseditor: false
    }
  },
  mounted() {
    this.fecthGoodsClass()
    this.fecthDetailById()
  },
  filters: {
    filterStatus(status) {
      switch (status) {
        case 0:
          return '全部'
        case 1:
          return '待采购'
        case 2:
          return '采购中'
        case 3:
          return '待收货'
        case 4:
          return '已收货'
        default:
          return ''
      }
    }
  },
  methods: {
    fecthGoodsClass() {
      fecthGoodsClass().then(({ data }) => {
        if (!Array.isArray(data) && data.length <= 0) return
        const result = []
        for (const item of data) {
          if (item.parentId === '0') {
            result.push({
              label: item.title,
              value: item.id
            })
          }
        }
        this.levelTypeOption = data
        this.searchBarOptons.categoryOption = result
      }).catch(e => {
        this.$message({ type: 'error', message: '加载分类失败失败' })
      })
    },
    reset() {
      this.productName = null
      this.levelFirst = null
      this.levelFecond = null
      this.fecthDetailById()
    },
    clickToSearch() {
      if (!this.propsSonData.id || !this.propsSonData.operatorId) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        productName: this.productName,
        categoryId: this.levelFecond ? this.levelFecond : this.levelFirst,
        orderId: this.propsSonData.id,
        supplierInfoId: this.propsSonData.operatorId
      }
      fetchPurchaseOrderTableInfoDetail(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    closeDialog() {
      this.$emit('input', false)
    },
    onRefresh() {
      this.fecthDetailById()
    },
    fecthDetailById() {
      if (!this.propsSonData.id || !this.propsSonData.operatorId) return
      fetchPurchaseOrderHeaderInfoDetail({ id: this.propsSonData.id }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      this.fetchPurchaseOrderTableInfoDetail()
    },
    fetchPurchaseOrderTableInfoDetail() {
      if (!this.propsSonData.id || !this.propsSonData.operatorId) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        orderId: this.propsSonData.id,
        supplierInfoId: this.propsSonData.operatorId
      }
      fetchPurchaseOrderTableInfoDetail(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fetchPurchaseOrderTableInfoDetail()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fetchPurchaseOrderTableInfoDetail()
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
 
</style>
