<template>
    <div class="buyReturn">

      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

      <search-bar ref="searchBar" :data="searchBarData" @search="searchAction" @reset="resetSearchBar" @command="clickMoreCommand"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 
          <el-table-column prop="categoryName" label="采购计划单号" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="采购计划来源" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="采购计划创建时间" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="采购申请时间" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="采购申请状态" align="center">
            <template slot-scope="scope" align="center">
               <el-tag size="small" v-if="scope.row.goodsStatus ===0">上架</el-tag>
               <el-tag size="small" type="warning" v-if="scope.row.goodsStatus ===1">下架</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="categoryName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="申请人" align="center"></el-table-column>
 
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
      
    </div>
</template>

<script>
import TipsBar from '../components/TipsBar'
import Add from './add'
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
export default {
  name: 'buyReturn',
  mixins: [model],
  components: {
    TipsBar,
    Tabs,
    Add
  },
  data() {
    return {
      searchBarData: [
        [
          { type: 'date', value: null, key: 'orderTime', width: '200px', placeholder: '创建时间' },
          { type: 'date', value: null, key: 'orderTime', width: '200px', placeholder: '申请时间' },
          { type: 'input', value: null, key: 'orderNoOrName', class: 'w180', placeholder: '输入采购的订单编号' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'button', name: '新增' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ]
    }
  },
  created() {
    this.tabTitles = [
      { title: '全部', value: 0 },
      { title: '待采购', value: 1 },
      { title: '采购中', value: 2 },
      { title: '待收货', value: 3 },
      { title: '已收货', value: 4 }
    ]
  },
  methods: {
    tabsCallBack(item) {
      this.$nextTick().then(() => {
        this.$refs['searchBar'].sendSearchParams()
      })
    },
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
      // orderList(data).then(({ data }) => {
      //   this.table.data = data.rows
      //   this.pagination.total = data.total
      // }).catch(e => {
      //   this.$message({ type: 'error', message: e, duration: 0, showClose: true })
      // })
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
    refrehList() {

    },
    resetSearchBar() {
      this.curIndex = 0
      this.fecthList()
    }
  }
}
</script>

<style scoped>
.buyOrders{
  background: #fff;
}
</style>