<!-- 采购退换货 -->
<template>
    <div class="buyReturn">

      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

      <search-bar ref="searchBar" :data="searchBarData" @search="searchAction" @reset="resetSearchBar"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="returnOrderNo" :label="curIndex===0? '采购退货单号': '采购换货单号'" align="center"></el-table-column>
          <el-table-column prop="purchaseReturnsCreatedTime" width="90" :label="curIndex===0? '退货操作时间': '换货操作时间'" align="center"></el-table-column>
          <el-table-column prop="purchaseOrderNo" label="采购订单编号" align="center"></el-table-column>
          <el-table-column prop="purchaseOrderCreatedTime" width="90" label="采购订单生成时间" align="center"></el-table-column>
          <el-table-column prop="buyerName" label="采购员" align="center"></el-table-column>
          <el-table-column prop="returnSum" :label="curIndex===0? '退货金额': '换货金额'" align="center"></el-table-column>

          <el-table-column prop="" label="处理状态" align="center">
            <template slot-scope="scope" align="center">
               <el-tag size="small" type="warning" v-if="scope.row.status ===0">进行中</el-tag>
               <el-tag size="small" v-if="scope.row.status ===1">已完成</el-tag>
            </template>
          </el-table-column>

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
import { fetchList, fetchOptions } from '@/api/buy/buyReturn.js'

export default {
  name: 'buyReturn',
  mixins: [model],
  components: {
    Tabs,
    Add
  },
  data() {
    return {
      curIndex: 0,
      searchBarData: [
        [
          { type: 'option', value: null, key: 'status', class: 'w150', placeholder: '处理状态', options: [
            { label: '进行中', value: 0 },
            { label: '已完成', value: 1 }
          ] },
          { type: 'date', value: null, key: 'purchaseOrderCreatedTime', width: '200px', placeholder: '采购订单生成时间' },
          { type: 'date', value: null, key: 'purchaseReturnsCreatedTime', width: '200px', placeholder: '操作时间' },
          { type: 'option', value: null, key: 'buyerId', class: 'w150', placeholder: '采购员', options: [

          ] },
          { type: 'input', value: null, key: 'orderNo', class: 'w180', placeholder: '输入订单编号检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          // { type: 'button', name: '新增' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ]
    }
  },
  created() {
    this.tabTitles = [
      { title: '采购退货', value: 0 },
      { title: '采购换货', value: 1 }
    ]
  },
  mounted() {
    this.fetchOptions()
    this.$nextTick().then(() => {
      this.fetchList()
    })
  },
  methods: {
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fetchList()
    },
    // 数据请求
    fetchList() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    searchAction(item) {
      if (!item) return
      this.table.data = []
      this.pagination.total = 0
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        type: this.curIndex === 0 ? 1 : 2,
        ...item
      }
      fetchList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fetchOptions() {
      fetchOptions({ staffType: 2 }).then(({ data }) => {
        this.searchBarData[0][3].options = data || []
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fetchList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fetchList()
    },
    // 弹层操作
    click2view(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: this.curIndex, obj: row, title: this.curIndex === 0 ? '采购退货详情' : '采购换货详情' }})
    },
    refrehList() {
      this.fetchList()
    },
    resetSearchBar() {
      this.curIndex = 0
      this.fetchList()
    }
  }
}
</script>

<style scoped>
.buyOrders{
  background: #fff;
}
</style>
