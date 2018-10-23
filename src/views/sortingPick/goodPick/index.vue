<!-- 商品分拣 -->
<template>
    <div class="goodPick">

			<search-bar :data="searchBarDate" @search="searchAction" @reset="fetchList"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight" :key="curIndex">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
					<el-table-column prop="stockInfoName" label="仓库" align="center"></el-table-column>
					<el-table-column prop="storehouseType" label="出库类型" align="center">
             <template slot-scope="scope">
              <span v-if="scope.row.storehouseType === 1"> 销售订单 </span>
              <span v-if="scope.row.storehouseType === 2"> 销售换货 </span>
            </template>
          </el-table-column>
					<el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
					<el-table-column prop="basicUnitName" label="基本单位" align="center"></el-table-column>
					<el-table-column prop="tableName" label="分拣台" align="center"></el-table-column>
					<!-- <el-table-column prop="sorterName" label="分拣员" align="center"></el-table-column> -->
					<el-table-column prop="stockOutOrderNo" label="关联出库单" align="center"></el-table-column>
					<el-table-column prop="stockOutCreatedTime" label="创建时间" align="center"></el-table-column>
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
import { SearchBar } from '@/components/base.js'
import { fetchList, fecthStockList, fecthWorkbench } from '@/api/sortingPick/goodPick.js'

export default {
  name: 'goodPick',
  mixins: [model],
  components: {
    Add,
    SearchBar
  },
  data() {
    return {
      curIndex: 0,
      searchBarDate: [
        [
          { type: 'date', value: null, key: 'stockOutCreatedTime', width: '200px', placeholder: '创建日期' },
          { type: 'option', value: null, key: 'stockId', class: 'w150', placeholder: '仓库', options: [] },
          { type: 'option', value: null, key: 'storehouseType', class: 'w150', placeholder: '出库类别', options: [
            { label: '销售订单', value: 1 },
            { label: '销售换货', value: 2 }
          ] },
          { type: 'option', value: null, key: 'tableId', class: 'w150', placeholder: '分拣台', options: [] },
          { type: 'option', value: null, key: 'sorterId', class: 'w150', placeholder: '分拣员', options: [] },
          { type: 'input', value: null, key: 'stockOutOrderNo', class: 'w180', placeholder: '输入商品名称/出库单号检索' },
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
      { title: '入库单', value: 0 },
      { title: '入库记录', value: 1 }
    ]
  },
  mounted() {
    this.fetchList()
    this.fecthStockList()
    this.fecthWorkbench()
  },
  methods: {
    // 数据请求
    fetchList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size
      }
      fetchList(data).then(({ data }) => {
        if (Array.isArray(data.rows)) {
          this.table.data = data.rows
        }
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthStockList() {
      fecthStockList().then(({ data }) => {
        if (Array.isArray(data)) {
          for (const item of data) {
            item.label = item.title
            item.value = item.id
          }
          this.searchBarDate[0][1].options = data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    fecthWorkbench() {
      fecthWorkbench({ type: 4 }).then(({ data }) => {
        for (const item of data) {
          item.label = item.title
          item.value = item.pk
        }
        this.searchBarDate[0][3].options = data
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
        ...item
      }
      fetchList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
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
    clickToEditor(index, row) {
      // 点击查看
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '查看商品分拣详细信息' }})
    },
    refrehList() {
      this.fetchList()
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>