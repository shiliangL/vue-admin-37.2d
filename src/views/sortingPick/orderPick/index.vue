<!-- 订单打包 -->
<template>
    <div class="orderPick">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

			<search-bar :data="searchBarDate" @search="searchAction" @reset="fetchList"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight" :key="curIndex">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
          </el-table-column>
 		      <el-table-column prop="orderNo" label="销售订单号" align="center"></el-table-column>
					<el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
					<el-table-column prop="distributionArea" label="配送区域" align="center"></el-table-column>
					<el-table-column prop="stockName" label="仓库" align="center"></el-table-column>
					<!-- <el-table-column prop="tableName" label="打包台" align="center"></el-table-column>
					<el-table-column prop="packerName" label="打包员" align="center"></el-table-column> -->
					<!-- <el-table-column prop="barCode" label="订单打包条码" align="center"></el-table-column> -->
					<!-- <el-table-column prop="completionTime" label="订单打包完成时间" align="center"></el-table-column> -->
					<el-table-column prop="createdTime" label="创建时间" align="center" width="90"></el-table-column>
           <el-table-column prop="finishStatus" label="状态" align="center">
             <template slot-scope="scope">
                <el-tag size="mini" type="success" v-if="scope.row.finishStatus===1">完成</el-tag>
                <el-tag size="mini" type="danger" v-if="scope.row.finishStatus===0">未完成</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">详情</el-button>
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
import { SearchBar, Tabs } from '@/components/base.js'
import { fetchList, fecthStockList, fecthWorkbench } from '@/api/sortingPick/orderPick.js'

export default {
  name: 'orderPick',
  mixins: [model],
  components: {
    Add,
    Tabs,
    SearchBar
  },
  data() {
    return {
      curIndex: 1,
      searchBarDate: [
        [
          { type: 'date', value: null, key: 'createdTime', width: '200px', placeholder: '创建日期' },
          { type: 'option', value: null, key: 'stockId', class: 'w150', placeholder: '仓库', options: [] },
          { type: 'option', value: null, key: 'tableId', class: 'w150', placeholder: '打包台', options: [] },
          { type: 'option', value: null, key: 'packerId', class: 'w150', placeholder: '打包员', options: [] },
          { type: 'input', value: null, key: 'inputContent', class: 'w180', placeholder: '输入订单编号/客户名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          // { type: 'add', name: '新增' }
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
    this.fetchList()
    this.fecthStockList()
    this.fecthWorkbench()
  },
  methods: {
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fetchList()
    },
    // 数据请求
    fetchList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        storehouseType: this.curIndex
      }
      fetchList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthStockList() {
      fecthStockList().then(({ data }) => {
        for (const item of data) {
          item.label = item.title
          item.value = item.id
        }
        this.searchBarDate[0][1].options = data
      }).catch(e => {
        console.log(e)
      })
    },
    searchAction(item) {
      if (!item) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        ...item,
        storehouseType: this.curIndex
      }
      fetchList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthWorkbench() {
      fecthWorkbench({ type: 5 }).then(({ data }) => {
        for (const item of data) {
          item.label = item.title
          item.value = item.pk
        }
        this.searchBarDate[0][2].options = data
      }).catch(e => {
        console.log(e)
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
    clickToEditor(index, row) {
      // 点击查看
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '查看订单打包详细信息' }})
    },
    refrehList() {
      this.fetchList()
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>