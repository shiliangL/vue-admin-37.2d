<!-- 出库记录 -->
<template>
    <div class="storageRe">
			<search-bar :data="searchBarDate" @search="searchAction" @reset="fecthList"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight" :key="curIndex">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>

					<el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
					<el-table-column prop="basicUnit" label="基本单位" align="center"></el-table-column>
					<el-table-column prop="stockInfoName" label="仓库" align="center"></el-table-column>
					<el-table-column prop="storehouseType" label="出库类型" align="center">
            <template slot-scope="scope">
              <span v-cloak v-if="scope.row.storehouseType==1">销售订单</span>
              <span v-cloak v-if="scope.row.storehouseType==2">销售退货</span>
            </template>
          </el-table-column>
					<el-table-column prop="outQuantity" label="下单数量" align="center"></el-table-column>
					<el-table-column prop="realQuantity" label="出库数量" align="center"></el-table-column>
					<el-table-column prop="outageTime" label="出库时间" align="center"></el-table-column>
					<el-table-column prop="outOrderNo" label="关联出库单号" align="center"></el-table-column>
					<el-table-column prop="sortingTableName" label="分拣台" align="center"></el-table-column>
					<el-table-column prop="sorterName" label="分拣员" align="center"></el-table-column>

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
import model from '@/public/listModel.js'
import { fecthOutReList, fecthStockList } from '@/api/warehouse/goodsOut.js'

export default {
  name: 'storageRe',
  mixins: [model],
  data() {
    return {
      curIndex: 0,
      tabTitles: [],
      searchBarDate: [
        [
          { type: 'date', value: null, key: 'outageTime', width: '200px', placeholder: '出库日期' },
          { type: 'option', value: null, key: 'stockId', class: 'w150', placeholder: '仓库', options: [] },
          { type: 'option', value: null, key: 'storehouseType', class: 'w150', placeholder: '出库类别', options: [
            { label: '销售订单', value: 1 },
            { label: '销售换货', value: 2 }
          ] },
          { type: 'input', value: null, key: 'inputContent', class: 'w180', placeholder: '输入单号/商品名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [

        ]
      ]
    }
  },
  created() {
    this.tabTitles = [
      { title: '入库单', value: 0 },
      { title: '入库记录', value: 1 }
    ]
  },
  mounted() {
    this.fecthList()
    this.fecthStockList()
  },
  methods: {
    // 数据请求
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size
      }
      fecthOutReList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    searchAction(item) {
      if (!item) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        ...item
      }
      fecthOutReList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e })
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
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fecthList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fecthList()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
