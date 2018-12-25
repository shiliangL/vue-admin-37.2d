<template>
  <div>
    <search-bar
      ref="searchBar"
      :data="searchBarData"
      @clickBtn="showAdd"
      @search="searchAction"
      @reset="reset">
      <span class="search-title" slot="title">销售订单创建日期: </span>
    </search-bar>

    <table-contain :height.sync="table.maxHeight">
        <!-- show-summary
        测试+tag
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
        <el-table-column prop="createTime" label="销售订单创建日期" align="center"></el-table-column>
        <el-table-column prop="orderNumber" label="有效订单下单单数" align="center"></el-table-column>
        <el-table-column prop="orderSum" label="销售订单下单金额" align="center"></el-table-column>
        <el-table-column prop="orderFinalSum" label="销售订单实际金额" align="center"></el-table-column>
        <!-- <el-table-column prop="orderExchangeSum" label="销售换货金额" align="center"></el-table-column> -->
        <el-table-column prop="orderRetrunSum" label="销售退货金额" align="center"></el-table-column>
        <el-table-column prop="orderPaymentAmount" label="应收销售金额" align="center"></el-table-column>
      </el-table>

      <div class="footer-block" slot="footer">
        <div class="total-bar"> 应收销售金额合计: <span class="number"> {{ countTotal? `${countTotal}元` : null }} </span>  </div>
        <span class="page" v-cloak>共 {{table.data.length}} 条</span>
      </div>
    </table-contain>
  </div>
</template>

<script>
import model from '@/public/listModel.js'
import { countHomeByTime } from '@/api/allReports/index.js'
import Util from '@/utils'

export default {
  components: {},
  mixins: [model],
  data() {
    return {
      searchBarData: [[
        { type: 'multiple-date', value: null, key1: 'beginTime', key2: 'endTime', isClearable: true },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
      ],
      [{ type: 'button', name: '导出' }]],
      countTotal: null,
      exportLoading: false

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
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
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
    showAdd(item) {
      this.exportLoading = true
      if (!this.exportLoading) return
      let url = 'cmm/scmSalesOrder/exportFileCountHomeByTime?'
      const data = {
        ...item
      }
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key]
          if (element || element === 0) {
            url += `${key}=${element}&`
          }
        }
      }
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.href = url
      a.target = '_blank'
      a.click()
      setTimeout(() => {
        document.body.removeChild(a)
      }, 100)
      this.exportLoading = false
      this.$message({ type: 'success', message: '数据导出成功' })
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
      countHomeByTime(data).then(({ data }) => {
        if (Array.isArray(data.list)) {
          this.table.data = data.list
          this.countTotal = data.countTotal ? (data.countTotal).toFixed(2) : 0
        } else {
          this.table.data = []
          this.countTotal = 0
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
