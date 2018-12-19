<template>
  <div>
    <search-bar
      goodsCategory="categoryId"
      ref="searchBar"
      :data="searchBarData"
      @add="showAdd"
      @search="searchAction"
      @reset="reset">
      <span class="search-title" slot="title">销售订单创建日期: </span>
    </search-bar>

    <table-contain :height.sync="table.maxHeight">
        <!-- show-summary
        :summary-method="getSummary" -->
      <el-table
        :data="table.data"
        slot="table"
        :size="table.size"
        :max-height="table.maxHeight"
        style="width: 100%;"
        highlight-current-row>
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="商品分类" align="center"></el-table-column>
        <el-table-column prop="unitTitle" label="基本单位" align="center"></el-table-column>
        <el-table-column prop="orderSum" label="有效下单单数" align="center"></el-table-column>
        <el-table-column prop="orderPaymentAmount" label="应收销售金额" align="center"></el-table-column>
      </el-table>
      <div class="footer-block" slot="footer">
        <div class="total-bar"> 应收销售金额合计: <span class="number">  {{ countTotal? `${countTotal}元` : null }} </span> </div>
        <span class="page" v-cloak>共 {{table.data.length}} 条</span>
      </div>
    </table-contain>
  </div>
</template>

<script>
import model from '@/public/listModel.js'
import { countHomeByGoods } from '@/api/allReports/index.js'
import Util from '@/utils'

export default {
  components: {},
  mixins: [model],
  data() {
    return {
      searchBarData: [[
        { type: 'multiple-date', value: null, key1: 'beginTime', key2: 'endTime', isClearable: true },
        { type: 'goodsCategory', value: null },
        { type: 'input', value: null, key: 'title', class: 'w180', placeholder: '输入商品名称检索' },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
      ],
      [{ type: 'add', name: '导出' }]],
      countTotal: null
    }
  },
  mounted() {
    const util = new Util()
    this.searchBarData[0][0].value = [util.getMonthOne().toString(), util.getToday().toString()]
    this.fecthList()
  },
  methods: {
    getSummary(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '汇总'
          return
        }
        if (index === columns.length - 1) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr).toFixed(2)
              if (!isNaN(value)) {
                return (prev + curr)
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = ''
          }
        }
      })
      return sums
    },
    showAdd() {
      console.log('导出')
    },
    reset() {
      const util = new Util()
      this.searchBarData[0][0].value = [util.getMonthOne().toString(), util.getToday().toString()]
      this.fecthList()
    },
    fecthList() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    searchAction(item) {
      const data = { ...item }
      countHomeByGoods(data).then(({ data }) => {
        if (Array.isArray(data.list)) {
          this.table.data = data.list
          this.countTotal = data.countTotal
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    }
  }
}
</script>

<style scoped>
</style>
