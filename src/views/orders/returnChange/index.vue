<!-- 销售退/换货 -->
<template>
    <div class="returnChange">

      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>
 
      <search-bar ref="searchBar" :data="searchBarData" @search="searchAction"  @clickBtn="exportFile"  @reset="resetSearchBar"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="销售退货单号" width="170" align="center"></el-table-column>
          <el-table-column prop="createdTime" label="申请退货时间" width="170" align="center"></el-table-column>
          <el-table-column prop="orderCode" label="销售订单编号" width="170" align="center"></el-table-column>
          <el-table-column prop="orderdTime" label="下单时间" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="sum" label="退货金额" align="center"></el-table-column>
          <el-table-column prop="status" label="处理状态" align="center">
             <template slot-scope="scope" align="center">
							 <!-- 0:待审核，1:进行中 2：已完成（退货退款结束）,3：已拒绝 , -->
              <span v-if="scope.row.status ===0">待审核</span>
              <span v-if="scope.row.status ===1">进行中</span>
              <span v-if="scope.row.status ===2">已完成</span>
              <span v-if="scope.row.status ===3">已拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="dealTime" label="审核时间" align="center"></el-table-column>
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
import Add from './add'
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
import { orderList } from '@/api/returnChange.js'
export default {
  name: 'returnChange',
  mixins: [model],
  components: {
    Add,
    Tabs
  },
  data() {
    return {
      curIndex: 0,
      tabTitles: [
        { title: '销售退货', value: 1 },
        { title: '销售换货', value: 2 }
      ],
      searchBarData: [
        [
          { type: 'option', value: null, key: 'status', class: 'w110', placeholder: '状态', options: [
            { label: '待审核', value: 0 },
            { label: '进行中', value: 1 },
            { label: '已完成', value: 2 },
            { label: '已拒绝', value: 3 }]
          },
          { type: 'datetime', value: null, key: 'orderTime', width: '200px', placeholder: '下单时间' },
          { type: 'date', value: null, key: 'createdTime', width: '200px', placeholder: '申请退货时间' },
          { type: 'date', value: null, key: 'dealTime', width: '200px', placeholder: '审核时间' },
          { type: 'input', value: null, key: 'codeOrNmae', class: 'w210', placeholder: '销售退货单号／销售订单/客户名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
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
  methods: {
    searchAction(params) {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        method: this.curIndex,
        ...params
      }
      orderList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 数据请求
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        method: this.curIndex
      }
      orderList(data).then(({ data }) => {
        this.table.data = data.rows
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
    click2view(index, row) {
      row.flag = this.curIndex
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '销售退货详情' }})
    },
    click2follow(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'follow', obj: row }})
    },
    refrehList() {

    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fecthList()
    },
    resetSearchBar() {
      this.fecthList()
    },
    exportFile(params) {
      let url = 'scmsaleRreturnsgoods/exportFile?'
      const data = {
        method: this.curIndex,
        ...params
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
</style>