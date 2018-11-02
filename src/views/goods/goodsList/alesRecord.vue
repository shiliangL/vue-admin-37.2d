<!-- 查看销售记录 -->
<template>
 	<el-form :model="form"  ref="form" label-width="120px" :inline="true">

    <div class="row-item">
        <div class="row-title">基本信息</div>
        <div class="row-content basicInfo">
          <el-row>

            <el-col :xs="24" :sm="10" :md="8" :lg="6">
              <el-form-item label="商品名称:">
                <span v-cloak>{{form.title}}</span>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="10" :md="8" :lg="6">
              <el-form-item label="基本单位:">
                <span v-cloak>{{form.baseUnitName}}</span>
              </el-form-item>
            </el-col>
            
            <el-col :xs="24" :sm="10" :md="8" :lg="6">
              <el-form-item label="仓库:">
                <span v-cloak>{{form.stockName}}</span>
              </el-form-item>
            </el-col>

          </el-row>
        </div>
    </div>

    <div class="row-item">
      <div class="row-title">详细信息</div>
      <div class="row-content">
        <el-row :gutter="30">
        
          <el-col :span="12">
              <search-bar :data="searchBarData" @search="searchAction" @reset="reset"></search-bar>
              <!-- 表格 -->
              <table-contain  :height.sync="table.maxHeight">
                <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
                  <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.$index + 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="recordDate" label="采购时间" align="center"></el-table-column>
                  <el-table-column prop="purchasePrice" label="单价(基本单位)" align="center"></el-table-column>
                  <el-table-column prop="purchaseOrderNo" label="关联采购订单编号" align="center"></el-table-column>
                </el-table>
                
                <el-pagination
                  slot="footer"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pagination.page"
                  :page-sizes="pagination.pageSizes"
                  :page-size="pagination.size"
                  layout="total, sizes, prev, pager, next"
                  :total="pagination.total">
                </el-pagination>

              </table-contain>

          </el-col>

          <el-col :span="12">
              <search-bar :data="searchBarDataH" @search="searchActionH" @reset="resetH"></search-bar>
              <!-- 表格 -->
              <table-contain  :height.sync="table.maxHeight">
                <el-table :data="form.priceHistoryList" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
                  <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.$index + 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="createdOn" label="销售调价时间" align="center"></el-table-column>
                  <el-table-column prop="basePrice" label="单价(基本单位)" align="center"></el-table-column>
                </el-table>
                
                <el-pagination
                  slot="footer"
                  @size-change="handleSizeChangeH"
                  @current-change="handleCurrentChangeH"
                  :current-page="paginationH.page"
                  :page-sizes="paginationH.pageSizes"
                  :page-size="paginationH.size"
                  layout="total, sizes, prev, pager, next"
                  :total="paginationH.total">
                </el-pagination>

              </table-contain>
          </el-col>

        </el-row>
      </div>
    </div>

	</el-form>
</template>

<script>
// fetchHistoryPrice
import model from '@/public/listModel.js'
import { fetchHistoryPrice, fetchPurchasePriceHistory } from '@/api/goodsList.js'

export default {
  name: 'alesRecord',
  props: {
    loadID: {
      type: String
    }
  },
  mixins: [model],
  data() {
    return {
      searchBarDataH: [
        [
          {
            type: 'date',
            value: '',
            key: 'updateTime',
            class: 'w180',
            placeholder: '销售日期'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        []
      ],
      searchBarData: [
        [
          {
            type: 'date',
            value: '',
            key: 'recordDate',
            class: 'w180',
            placeholder: '采购日期'
          },
          {
            type: 'input',
            value: null,
            key: 'purchaseOrderNo',
            class: 'w180',
            placeholder: '采购订单编号检索'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        []
      ],
      form: {
        baseUnitName: null,
        stockName: null,
        title: null,
        priceHistoryList: []
      },
      paginationH: {
        pageSizes: [10, 20, 50, 100], // 默认分页可选择的每页显示的页数
        size: 10, // 分页每页默认显示10条
        index: 1, // 当前默认第一页
        total: 0 // 总条数
      }
    }
  },
  mounted() {
    this.fetchHistoryPrice()
    this.fetchPurchasePriceHistory()
  },
  methods: {
    fetchHistoryPrice() {
      if (!this.loadID) return
      fetchHistoryPrice({ productId: this.loadID }).then(({ data }) => {
        this.form.baseUnitName = data.baseUnitName
        this.form.stockName = data.stockName
        this.form.title = data.title
        if (!data.priceHistoryList) {
          this.form.priceHistoryList = []
          this.paginationH.total = 0
        } else {
          this.form.priceHistoryList = data.priceHistoryList.rows
          this.paginationH.total = data.priceHistoryList.total
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    searchActionH(item) {
      if (!this.loadID) return
      fetchHistoryPrice({ productId: this.loadID, ...item }).then(({ data }) => {
        this.form.baseUnitName = data.baseUnitName
        this.form.stockName = data.stockName
        this.form.title = data.title
        if (!data.priceHistoryList) {
          this.form.priceHistoryList = []
          this.paginationH.total = 0
        } else {
          this.form.priceHistoryList = data.priceHistoryList.rows
          this.paginationH.total = data.priceHistoryList.total
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fetchPurchasePriceHistory() {
      if (!this.loadID) return
      fetchPurchasePriceHistory({ productId: this.loadID }).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    searchAction(item) {
      if (!this.loadID) return
      fetchPurchasePriceHistory({ productId: this.loadID, ...item }).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // R
    handleSizeChange(value) {
      this.pagination.size = value
      this.fetchPurchasePriceHistory()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fetchPurchasePriceHistory()
    },
    // L
    handleSizeChangeH(value) {
      this.paginationH.size = value
      this.fetchHistoryPrice()
    },
    handleCurrentChangeH(value) {
      this.paginationH.index = value
      this.fetchHistoryPrice()
    },
    refresh() {
      this.fetchPurchasePriceHistory()
      this.fetchHistoryPrice()
    },
    reset() {
      this.fetchPurchasePriceHistory()
    },
    resetH() {
      this.fetchHistoryPrice()
    }
  }
}
</script>

<style scoped>

</style>