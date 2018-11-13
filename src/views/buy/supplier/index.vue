<!-- 销售配送 -->
<template>
    <div class="supplier">

			<search-bar :data="searchBarDate" @search="searchAction" @add="showAdd" ref="searchBar" @reset="fetchList"></search-bar>

      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data = [{}]" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 
					<el-table-column prop="serialNumber" label="供应商账号" align="center"></el-table-column>
					<el-table-column prop="serialNumber" label="供应商名称" align="center"></el-table-column>
					<el-table-column prop="serialNumber" label="联系人" align="center"></el-table-column>
					<el-table-column prop="serialNumber" label="联系电话" align="center"></el-table-column>
					<el-table-column prop="serialNumber" label="应付供应商金额" align="center"></el-table-column>
					<el-table-column prop="serialNumber" label="应收供应商金额" align="center"></el-table-column>
					<el-table-column prop="serialNumber" label="采购订单" align="center">
						<template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">查看</el-button>
            </template>
					</el-table-column>
					<el-table-column prop="serialNumber" label="创建时间" align="center" width="90"></el-table-column>
					<el-table-column prop="serialNumber" label="账号状态" align="center">
						<template slot-scope="scope" align="center">
              <el-tag v-cloak size="mini" v-if="scope.row.status ===1"> 启用 </el-tag>
              <el-tag size="mini" type="danger" v-cloak v-if="scope.row.status===0"> 禁用 </el-tag>
            </template>
					</el-table-column>
 
          <el-table-column label="操作" align="center" width="210">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
              <el-button type="text" size="mini" @click.stop="clickToView(scope.$index,scope.row)">详情</el-button>
              <el-button type="text" size="mini" style="color:red" @click.stop="clickToEditor(scope.$index,scope.row)">重置密码</el-button>
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
import { Tabs, SearchBar } from '@/components/base.js'
import { fetchList } from '@/api/distribution/salesDelivery.js'

export default {
  name: 'supplier',
  mixins: [model],
  components: {
    Add,
    Tabs,
    SearchBar
  },
  data() {
    return {
      searchBarDate: [
        [
          {
            type: 'option',
            value: null,
            key: 'status',
            class: 'w150',
            placeholder: '账号状态',
            options: [
              { label: '禁用', value: 0 },
              { label: '启用', value: 1 }
            ]
          },
          {
            type: 'input',
            value: null,
            key: 'orderNoOrCumstorName',
            class: 'w180',
            placeholder: '输入供应商账号/名称'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [{ type: 'add', name: '新增配送派单' }]
      ]
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    // 数据请求
    fetchList() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
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
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    // 弹层操作
    clickToEditor(index, row, type) {
      // 点击查看
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '编辑供应商信息' }})
    },
    clickToView(index, row, type) {
      // 点击查看
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '查看供应商信息' }})
    },
    showAdd() {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: {}, title: '新增供应商' }})
    },
    refrehList() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>