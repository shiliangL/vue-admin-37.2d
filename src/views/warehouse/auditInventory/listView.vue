	<!-- 待核查 -->
<template>
    <div class="auditInventoryNo">
			<search-bar ref="searchBar" :data="searchBarDate" @search="searchAction" @reset="reset"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight" :key="curIndex">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>

					<el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
					<el-table-column prop="basicUnitName" label="基本单位" align="center"></el-table-column>
					<!-- <el-table-column prop="basicUnit" label="仓位" align="center"></el-table-column> -->
					<el-table-column prop="createdTime" width="90" label="盘点时间" align="center"></el-table-column>
					<el-table-column prop="createdName" label="盘点人" align="center"></el-table-column>
          <el-table-column prop="remark" width="200" show-overflow-tooltip label="备注" align="center"></el-table-column>
					<el-table-column prop="stockQuantity" label="当时库存量" align="center"></el-table-column>
					<el-table-column prop="inventoryQuantity" label="盘点库存量" align="center"></el-table-column>
					<el-table-column prop="inventoryState" label="盘点状态" align="center">
            <template slot-scope="scope">
              <el-tag  size="small" v-if="scope.row.inventoryState === 1"> 正常 </el-tag>
              <el-tag  size="small" type="danger" v-if="scope.row.inventoryState === 2"> 报损 </el-tag>
              <el-tag  size="small" type="warning" v-if="scope.row.inventoryState === 3"> 报溢 </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope" align="center">
                <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row,1)">审核</el-button>
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

      <!-- 弹层区域 -->
      <el-dialog title="核查盘点" class="dialogTitle" :visible.sync="dialogVisible"  width="360px" :modal-append-to-body="false"  center :close-on-press-escape="true" @close="refresh">
        <Add v-if="dialogVisible" :propsSonData="propsParentData" @close="dialogVisible = false"></Add>
      </el-dialog>

    </div>
</template>

<script>
import Add from './add.vue'
import model from '@/public/listModel.js'
import { fecthStockList, fetchInventoryRecord } from '@/api/warehouse/sortInventory.js'
export default {
  name: 'auditInventoryNo',
  mixins: [model],
  components: {
    Add
  },
  data() {
    return {
      curIndex: 0,
      tabTitles: [],
      searchBarDate: [
        [
          { type: 'date', value: null, key: 'createdTime', width: '200px', placeholder: '盘点时间' },
          { type: 'option', value: null, key: 'stockId', class: 'w150', placeholder: '仓库', options: [] },
          { type: 'input', value: null, key: 'productName', class: 'w180', placeholder: '输入商品名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [

        ]
      ]
    }
  },
  mounted() {
    this.fecthList()
    this.fecthStockList()
  },
  methods: {
    // 数据请求
    fecthList() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    searchAction(item) {
      if (!item) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        checkType: 1,
        ...item
      }
      fetchInventoryRecord(data).then(({ data }) => {
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
    reset() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    refresh() {
      this.propsParentData = null
      this.fecthList()
    },
    clickToEditor(index, item, type) {
      this.dialogVisible = true
      this.propsParentData = item
    }
  }
}
</script>


 