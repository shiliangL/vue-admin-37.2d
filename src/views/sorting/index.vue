<!-- 分拣台 -->
<template>
    <div class="sorting">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>
      <search-bar :data="searchBarData" @search="searchAction"  @reset="resetSearchBar"></search-bar>
      <!-- 表格 -->
      <table-contain :height.sync="table.maxHeight">
        <el-table :data="table.data" v-loading="tableLoading" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
          </el-table-column>
          <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="basicUnitName" label="基本单位" align="center"></el-table-column>
          <el-table-column prop="stockOutOrderNo" label="关联出库单号" align="center"></el-table-column>
          <el-table-column prop="stockOutCreatedTime" label="出库单创建时间" align="center"></el-table-column>
          <el-table-column prop="finishStatus" label="状态" align="center">
              <template slot-scope="scope"> 
                <el-tag size="mini" type="success" v-if="scope.row.finishStatus===1">完成</el-tag>
                <el-tag size="mini" type="danger" v-if="scope.row.finishStatus===0">未完成</el-tag>
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
import { fecthList } from '@/api/sorting/index.js'

export default {
  name: 'sorting',
  mixins: [model],
  components: {
    Tabs,
    Add
  },
  data() {
    return {
      todayTime: '',
      curIndex: 1,
      searchBarData: [
        [
          { type: 'date', value: null, key: 'stockOutCreatedTime', width: '200px', placeholder: '创建时间' },
          { type: 'input', value: null, key: 'stockOutOrderNo', class: 'w180', placeholder: '输入商品名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          // { type: 'add', name: '新增' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ]
    }
  },
  created() {
    this.tabTitles = [
      { title: '销售订单', value: 1 },
      { title: '销售换货', value: 2 }
    ]
  },
  mounted() {
    this.loginKey = JSON.parse(sessionStorage.getItem('loginKey'))
    const date = new Date()
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    const ymd = date.getFullYear() + '-' + month + '-' + day
    this.searchBarData[0][0].value = ymd
    this.todayTime = ymd
    this.fecthList()
  },
  methods: {
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fecthList()
    },
    // 数据请求
    fecthList() {
      this.tableLoading = true
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        tableId: this.loginKey ? this.loginKey.id : null,
        stockOutCreatedTime: this.searchBarData[0][0].value,
        storehouseType: this.curIndex
      }
      fecthList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.$message({ type: 'error', message: e.msg })
      })
    },
    searchAction(item) {
      this.tableLoading = true
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        ...item,
        tableId: this.loginKey ? this.loginKey.id : null,
        storehouseType: this.curIndex
      }
      fecthList(data).then(({ data }) => {
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
      if (!row.whetherOut) {
        this.$message({ type: 'warning', message: '商品暂未出库，无法查看详情', duration: 3000 })
        return
      }
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '商品分拣详细信息' }})
    },
    refrehList() {
      this.fecthList()
    },
    resetSearchBar() {
      this.searchBarData[0][0].value = this.todayTime
      this.fecthList()
    }
  }
}
</script>

<style scoped>
 
</style>