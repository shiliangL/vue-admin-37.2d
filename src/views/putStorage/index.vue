<!-- 验收台- 出库台 -->
<template>
    <div class="outStorage">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>
      <search-bar :data="searchBarData" @search="searchAction"  @reset="fecthList"></search-bar>
      <!-- 表格 -->
      <table-contain :height.sync="table.maxHeight">
        <el-table :data="table.data" v-loading="tableLoading" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="入库单号" align="center"></el-table-column>
          <el-table-column prop="createdName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="createdTime" label="入库单创建时间" align="center"></el-table-column>
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
import { fecthList } from '@/api/outStorage/index.js'
export default {
  name: 'outStorage',
  mixins: [model],
  components: {
    Tabs,
    Add
  },
  data() {
    return {
      curIndex: 1,
      searchBarData: [
        [
          { type: 'date', value: null, key: 'createdTime', width: '200px', placeholder: '创建时间' },
          { type: 'input', value: null, key: 'orderNo', class: 'w180', placeholder: '输入入库单号检索' },
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
      { title: '采购入库', value: 1 },
      { title: '销售退货', value: 2 },
      { title: '销售换货', value: 3 },
      { title: '其他', value: 4 }
    ]
  },
  mounted() {
    // this.fecthList()
    this.table.data = [{}]
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
        storageType: this.curIndex
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
        storageType: this.curIndex
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
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '入库信息详情' }})
    },
    refrehList() {
      this.fecthList()
    }
  }
}
</script>

<style scoped>
 
</style>