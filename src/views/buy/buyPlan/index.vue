<!-- 采购计划 -->
<template>
    <div class="buyPlan">
      <span class="topTitle">销售订单商品汇总</span>
      <TipsBar :data="TipsBarData" @TipsBarCallBack="TipsBarCallBack"></TipsBar>

      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

      <search-bar ref="searchBar" :data="searchBarData" @search="searchAction"  @add="showAdd"  @reset="resetSearchBar"></search-bar>

      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 
          <el-table-column prop="orderNo" label="采购计划单号" align="center"></el-table-column>
          <el-table-column prop="sourceType" label="采购计划来源" align="center">
            <template slot-scope="scope" align="center">
              <span v-cloak v-if="scope.row.sourceType ===1"> 销售订单 </span>
              <span v-cloak v-if="scope.row.sourceType ===2"> 后台新增 </span>
            </template>
          </el-table-column>
          <el-table-column prop="createdOn" label="采购计划创建时间" align="center"></el-table-column>
          <el-table-column prop="createdName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="applicationDate" label="采购申请时间" align="center"></el-table-column>
          <el-table-column prop="purchaserName" label="申请人" align="center"></el-table-column>
          <el-table-column prop="auditStatus" label="采购申请状态" align="center">
             <template slot-scope="scope" align="center">
              <span v-cloak> {{scope.row.auditStatus | filterStatus }} </span>
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
import TipsBar from '../components/TipsBar'
import Add from './add'
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
import { fecthList, fecthTipsBar } from '@/api/buy/buyPlan.js'

export default {
  name: 'buyPlan',
  mixins: [model],
  components: {
    TipsBar,
    Tabs,
    Add
  },
  data() {
    return {
      curIndex: 0,
      TipsBarData: [],
      searchBarData: [
        [
          { type: 'option', value: null, key: 'sourceType', class: 'w110', placeholder: '计划来源', options: [
            { label: '全部', value: 0 },
            { label: '销售订单', value: 1 },
            { label: '后台新增', value: 2 }]
          },
          { type: 'date', value: null, key: 'generationTime', width: '200px', placeholder: '创建时间' },
          { type: 'date', value: null, key: 'applicationDate', width: '200px', placeholder: '申请时间' },
          { type: 'input', value: null, key: 'orderNo', class: 'w180', placeholder: '输入采购计划单号检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ]
    }
  },
  filters: {
    filterStatus(status) {
      switch (status) {
        case 0:
          return '全部'
        case 1:
          return '待申请'
        case 2:
          return '待审核'
        case 3:
          return '已通过'
        case 4:
          return '已拒绝'
        default:
          return ''
      }
    }
  },
  created() {
    this.tabTitles = [
      { title: '全部', value: 0 },
      { title: '待申请', value: 1 },
      { title: '待审核', value: 2 },
      { title: '已通过', value: 3 },
      { title: '已拒绝', value: 4 }
    ]
  },
  mounted() {
    // this.fecthList()
    if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
  },
  methods: {
    tabsCallBack(item) {
      this.curIndex = item.value
      // this.fecthList()
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    searchAction(params) {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        ...params,
        auditStatus: this.curIndex
      }
      fecthList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      this.fecthTipsBar()
    },
    fecthTipsBar() {
      fecthTipsBar().then(({ data }) => {
        const type = Object.prototype.toString.call(data)
        if (data && type === '[object Object]') {
          const arr = []
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const element = data[key]
              const title = key === 'yesterday' ? '昨日' : key === 'today' ? '今日' : '明日'
              arr.push({ title, ...element })
            }
          }
          this.TipsBarData = arr
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e })
      })
    },
    // 数据请求
    fecthList() {
      this.fecthTipsBar()
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        auditStatus: this.curIndex
      }
      fecthList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e })
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    // 弹层操作
    click2view(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '采购计划详情' }})
    },
    click2follow(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'follow', obj: row }})
    },
    showAdd() {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: {}, title: '新增采购计划（后台新增可预采购商品）' }})
    },
    TipsBarCallBack(value) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'check', obj: value, title: '销售订单采购计划' }})
    },
    refrehList() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    resetSearchBar() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    }
  }
}
</script>

<style scoped lang="scss">
.buyPlan{
  background: #fff;
  .topTitle{
    border-left: 2px solid #1cbc9c;
    display: inline-block;
    padding-left: 10px;
    padding-top: 10px;
    font-size: 16px;
    font-weight: 400;
    color: #666666;
  }
}
</style>