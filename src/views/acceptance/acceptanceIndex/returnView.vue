<!-- 销售退货-->
<template>
    <div class="returnChange">
 
      <search-bar ref="searchBar" :data="searchBarData" @search="searchAction"  @reset="resetSearchBar"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="销售退货单号" width="170" align="center"></el-table-column>
          <el-table-column prop="productName" label="商品名称" width="170" align="center"></el-table-column>
          <el-table-column prop="orderCode" label="关联销售订单编号" width="170" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请退货时间" align="center"></el-table-column>
          <el-table-column prop="examTime" label="退货审核同意时间" align="center"></el-table-column>
          <el-table-column prop="driverName" label="配送员" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="click2view(scope.$index,scope.row)">查看</el-button>
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
        <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refrehList" @edit="refrehList"></add>
    </div>
</template>

<script>
import Add from './returnViewAdd'
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
import { returnFetchList } from '@/api/acceptance/index.js'
export default {
  name: 'returnChange',
  mixins: [model],
  components: {
    Add,
    Tabs
  },
  data() {
    return {
      todayTime: '',
      searchBarData: [
        [
          { type: 'date', value: null, key: 'createTime', width: '200px', placeholder: '下单时间' },
          { type: 'option', value: null, key: 'driverId', class: 'w110', placeholder: '配送员', options: [] },
          { type: 'input', value: null, key: 'productNameOrCode', class: 'w210', placeholder: '商品名称／销售退货单检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          // { type: 'button', name: '导出Excel' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ],
      paramsData: {
        orderNoOrName: null,
        orderTime: null,
        paymentType: null,
        orderSource: null
      }
    }
  },
  created() {

  },
  mounted() {
    const date = new Date()
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    const ymd = date.getFullYear() + '-' + month + '-' + day
    this.todayTime = ymd
    this.searchBarData[0][0].value = ymd
    this.fecthList()
  },
  methods: {
    searchAction(params) {
      this.tableLoading = true
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        method: 1,
        ...params
      }
      returnFetchList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 数据请求
    fecthList() {
      this.tableLoading = true
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        createTime: this.searchBarData[0][0].value,
        method: 1
      }
      returnFetchList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
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
    click2view(index, row) {
      row.flag = this.curIndex
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '销售退货详情' }})
    },
    click2follow(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'follow', obj: row }})
    },
    refrehList() {

    },
    resetSearchBar() {
      this.searchBarData[0][0].value = this.todayTime
      this.fecthList()
    }

  }
}
</script>

<style scoped lang="scss">
</style>