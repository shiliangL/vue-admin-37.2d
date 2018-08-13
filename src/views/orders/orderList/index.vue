<!-- 订单列表 -->
<template>
    <div class="orderList">

      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>
 
      <search-bar ref="searchBar" :data="searchBarData" @search="searchAction" @reset="resetSearchBar" @command="clickMoreCommand"  @clickBtn="exportFile"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="订单编号" width="170" align="center"></el-table-column>
          <el-table-column prop="createdOn" label="下单日期" width="170" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>

          <el-table-column prop="orderSource" label="订单来源" align="center">
          <!-- // 0 代表app 1 微信公众号 2 微信小程序 -->
           <template slot-scope="scope" align="center">
            <span v-if="scope.row.orderSource ===0">App</span>
            <span v-if="scope.row.orderSource ===1">微信公众号</span>
            <span v-if="scope.row.orderSource ===2">微信小程序</span>
            <span v-if="scope.row.orderSource ===3">后台</span>
            </template>
          </el-table-column>
          <el-table-column prop="paymentType" label="支付类型" align="center">
            <!-- // 0 货到付款 1 线上支付 -->
             <template slot-scope="scope" align="center">
              <span v-if="scope.row.paymentType ===0">货到付款</span>
              <span v-if="scope.row.paymentType ===1">线上支付</span>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="订单状态" align="center">
            <template slot-scope="scope" align="center">
              {{ scope.row.status | filterStatus}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="click2view(scope.$index,scope.row)">订单查看</el-button>
              <!-- <el-button type="text" size="mini" @click.stop="click2follow(scope.$index, scope.row)">订单跟踪</el-button> -->
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
import Add from './add'
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
import { orderList } from '@/api/orders.js'
export default {
  name: 'orderList',
  mixins: [model],
  components: {
    Add,
    Tabs
  },
  data() {
    return {
      curIndex: 0,
      tabTitles: [
        { title: '全部', value: '' },
        { title: '待付款', value: 6 },
        { title: '待发货', value: 0 },
        { title: '待收货', value: 1 },
        { title: '退/换货', value: 2 },
        { title: '已完成', value: 3 },
        { title: '已取消', value: 4 },
        { title: '已关闭', value: 5 }
      ],
      searchBarData: [
        [
          // 0 代表app 1 微信公众号 2 微信小程序
          { type: 'option', value: null, key: 'orderSource', class: 'w110', placeholder: '订单来源', options: [
            { label: 'App', value: 0 },
            { label: '微信公众号', value: 1 },
            { label: '微信小程序', value: 2 },
            { label: '后台', value: 3 }]
          },
          // 0 货到付款 1线上支付
          { type: 'option', value: null, key: 'paymentType', class: 'w110', placeholder: '支付类型', options: [
            { label: '货到付款', value: 0 },
            { label: '线上支付', value: 1 }]
          },
          { type: 'datetime', value: null, key: 'orderTime', width: '200px', placeholder: '下单时间' },
          { type: 'input', value: null, key: 'orderNoOrName', class: 'w180', placeholder: '输入订单编号／客户名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' },
          { type: 'button', name: '导出Excel' }
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
    this.fecthList()
  },
  filters: {
    // <!-- status;//状态  0 待发货  1 待收货  2 退换货  3 已完成  4已取消 5 已关闭  6 待付款 -->
    filterStatus(status) {
      switch (status) {
        case 0:
          return '待发货'
        case 1:
          return '待收货'
        case 2:
          return '退换货'
        case 3:
          return '已完成'
        case 4:
          return '已取消'
        case 5:
          return '已关闭'
        case 6:
          return '待付款'
        default:
          return ''
      }
    }
  },
  methods: {
    searchAction(params) {
      this.paramsData = {
        orderNoOrName: params.orderNoOrName,
        orderTime: params.orderTime,
        paymentType: params.paymentType,
        orderSource: params.orderSource
      }
      this.fecthList()
    },
    clickMoreCommand(command) {
      this.$message({ type: 'success', message: command, duration: 0, showClose: true })
    },
    // 数据请求
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        status: this.curIndex,
        ...this.paramsData
      }
      orderList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e, duration: 0, showClose: true })
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
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row }})
    },
    click2follow(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'follow', obj: row }})
    },
    showAdd() {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: {}, title: '新增销售订单' }})
    },
    refrehList() {
      this.fecthList()
    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.$nextTick().then(() => {
        this.$refs['searchBar'].sendSearchParams()
      })
    },
    resetSearchBar() {
      this.curIndex = 0
      this.fecthList()
    },
    exportFile() {
      let url = 'scmSalesOrder/exportFile?'
      const data = {
        status: this.curIndex,
        ...this.paramsData
      }
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key]
          if (element) {
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
    }

  }
}
</script>

<style scoped lang="scss">
.orderList {
  width: 100%;
  height: 100%;
  .content {
    padding: 20px;
  }
}
</style>