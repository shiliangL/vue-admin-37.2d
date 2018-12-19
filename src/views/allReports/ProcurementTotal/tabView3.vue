<template>
  <div>
    <search-bar
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
        <el-table-column prop="buyerName" label="采购员名称" align="center"></el-table-column>
        <el-table-column prop="orderNumber" label="负责采购订单单数" align="center"></el-table-column>
        <el-table-column prop="actualMoney" label="采购订单金额(不含退/换货)" align="center"></el-table-column>
        <el-table-column prop="returnPrimaryMoney" label="采购退/换货原采购金额" align="center"></el-table-column>
        <el-table-column prop="returnSurplusMoney" label="采购退/换货剩余金额" align="center"></el-table-column>
        <el-table-column prop="purchaseAmountPayable" label="应付采购金额" align="center"></el-table-column>
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
import { fetchBuyerDimension } from '@/api/allReports/index.js'
import { fecthMemberSelect } from '@/api/members.js'

import Util from '@/utils'

export default {
  components: {},
  mixins: [model],
  data() {
    return {
      searchBarData: [[
        { type: 'multiple-date', value: null, key1: 'startDate', key2: 'endDate', isClearable: true },
        { type: 'option', value: null, key: 'buyerId', class: 'w150', placeholder: '采购员', options: [
          // { label: '启用', value: 1 },
          // { label: '禁用', value: 0 }
        ] },
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
    this.fecthSalerList()
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
    showAdd() {
      console.log('导出')
    },
    reset() {
      const util = new Util()
      this.searchBarData[0][0].value = [util.getMonthOne().toString(), util.getToday().toString()]
      this.fecthList()
      this.fecthSalerList()
    },
    fecthList() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    searchAction(item) {
      const data = { ...item }
      fetchBuyerDimension(data).then(({ data }) => {
        if (Array.isArray(data.purchaseCountList)) {
          this.table.data = data.purchaseCountList
          this.countTotal = data.countPurchaseAmountPayable
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthSalerList() {
      fecthMemberSelect({ staffType: 2 }).then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          this.searchBarData[0][1].options = data || []
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e })
      })
    }
  }
}
</script>

<style scoped>
</style>
