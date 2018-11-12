<!-- 入库单 -->
<template>
    <div class="goodsIn">

			<search-bar ref="searchBar" :data="searchBarDate" @search="searchAction" @reset="refrehList"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight" :key="curIndex">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 
					<el-table-column prop="orderNo" label="入库单号" align="center"></el-table-column>
					<el-table-column prop="stockInfoName" label="仓库" align="center"></el-table-column>
					<el-table-column prop="storageType" label="入库类型" align="center">
             <template slot-scope="scope">
              <span v-if="scope.row.storageType === 1"> 采购入库 </span>
              <span v-if="scope.row.storageType === 2"> 销售退货 </span>
              <span v-if="scope.row.storageType === 3"> 销售换货 </span>
              <span v-if="scope.row.storageType === 4"> 其他 </span>
            </template>
          </el-table-column>
					<el-table-column prop="createdName" label="创建人" align="center"></el-table-column>
					<el-table-column prop="createdTime" label="创建时间" align="center"></el-table-column>
					<el-table-column prop="finishStatus" label="入库状态" align="center">
             <template slot-scope="scope">
                <el-tag size="mini" type="success" v-if="scope.row.finishStatus===1">完成</el-tag>
                <el-tag size="mini" type="danger" v-if="scope.row.finishStatus===0">未完成</el-tag>
            </template>
          </el-table-column>
 
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">查看</el-button>
							<!-- <el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index,scope.row)">删除</el-button> -->
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
import { Tabs, CascaderBox, SearchBar } from '@/components/base.js'
import { fecthList, fecthStockList } from '@/api/warehouse/goodsIn.js'

export default {
  name: 'goodsIn',
  mixins: [model],
  components: {
    Add,
    Tabs,
    SearchBar,
    CascaderBox
  },
  data() {
    return {
      curIndex: 0,
      CascaderBoxDTO: null,
      tableOne: [],
      tableTwo: [],
      tabTitles: [],
      searchBarDate: [
        [
          { type: 'date', value: null, key: 'createdTime', width: '200px', placeholder: '创建日期' },
          { type: 'option', value: null, key: 'stockId', class: 'w150', placeholder: '仓库', options: [] },
          { type: 'option', value: null, key: 'storageType', class: 'w150', placeholder: '入库类别', options: [
            { label: '采购入库', value: 1 },
            { label: '销售退货', value: 2 },
            { label: '销售换货', value: 3 },
            { label: '其他', value: 4 }
          ] },
          { type: 'input', value: null, key: 'orderNo', class: 'w180', placeholder: '输入单号检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增入库单' }
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
    // this.fecthList()
    this.fecthStockList()
    if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
  },
  methods: {
    // 数据请求
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size
      }
      fecthList(data).then(({ data }) => {
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
        ...item
      }
      fecthList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
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
    clickMoreCommand(command) {
      this.$message({ type: 'success', message: command, duration: 0, showClose: true })
    },
    // 弹层操作
    clickToEditor(index, row) {
      // 点击查看
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '入库单信息' }})
    },
    showAdd() {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: {}, title: '新增入库单信息' }})
    },
    refrehList() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>