<!-- 角色管理 -->
<template>
    <div class="roleControl">
			<search-bar ref="searchBar" :data="searchBarDate" @search="searchAction" @reset="fetchList"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 					<el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
					<el-table-column prop="orgTypeName" label="角色类型" align="center"></el-table-column>
					<el-table-column prop="orgName" label="所属机构" align="center"></el-table-column>
					<el-table-column prop="remark" label="角色描述" align="center"></el-table-column>
					<el-table-column prop="createdName" label="创建人" align="center"></el-table-column>
					<el-table-column prop="createdTime" label="创建时间" align="center"></el-table-column>
					<el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="210">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
              <el-button type="text" size="mini" @click.stop="clickToAddResources(scope.$index,scope.row)">分配资源</el-button>
              <el-button type="text" style="color:red" size="mini" @click.stop="clickToDel(scope.$index,scope.row)"> 删除 </el-button>
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
      <el-dialog :title="dialogTitle" class="dialogTitle" :width="isTransferTable? '420px': '420px'" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
        <Add v-if="isAdd" @close="resetForm" @add="fetchList" :propsSonData="propsParentData"></Add>
        <transferTable v-if="isTransferTable" @close="resetForm" @add="fetchList" :propsSonData="propsParentData"></transferTable>
      </el-dialog>
      
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import Add from './add'
import transferTable from './transferTable'
import { SearchBar } from '@/components/base.js'
import { fetchList, deleteRow } from '@/api/uc/roleControl.js'

export default {
  name: 'roleControl',
  mixins: [model],
  components: {
    Add,
    SearchBar,
    transferTable
  },
  data() {
    return {
      searchBarDate: [
        [
          // { type: 'option', value: null, key: 'orgTypeCode', class: 'w150', placeholder: '机构类型', options: [
          //   { label: '启用', value: 1 },
          //   { label: '禁用', value: 0 }
          // ] },
          { type: 'input', value: null, key: 'roleName', class: 'w180', placeholder: '角色名称检索' },
          { type: 'search', name: '搜索' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
        ]
      ],
      dialogVisible: false,
      isTransferTable: false,
      isAdd: false,
      dialogTitle: null
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
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        ...item
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
      this.isTransferTable = false
      this.isAdd = true
      this.dialogTitle = '编辑角色'
      this.propsParentData.type = 'isUpdate'
      this.dialogVisible = true
      this.propsParentData.isUpdate = true
      this.propsParentData.data = row
    },
    clickToView(index, row) {
      this.isTransferTable = false
      this.isAdd = true
      this.dialogTitle = '查看详情'
      this.propsParentData.type = 'isView'
      this.dialogVisible = true
      this.propsParentData.isUpdate = true
      this.propsParentData.data = row
    },
    showAdd() {
      this.isTransferTable = false
      this.isAdd = true
      this.dialogTitle = '新增角色'
      this.propsParentData.type = 'add'
      this.propsParentData.isUpdate = false
      this.dialogVisible = true
    },
    clickToAddResources(index, row) {
      this.isTransferTable = true
      this.isAdd = false
      this.dialogTitle = '为角色分配资源'
      this.dialogVisible = true
      this.propsParentData.data = row
    },
    refrehList() {
      this.fetchList()
    },
    resetForm() {
      this.isTransferTable = false
      this.isAdd = false
      this.dialogVisible = false
    },
    clickToDel(index, item) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        deleteRow({ id: item.id }).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.fetchList()
        }).catch((e) => {
          this.$message({ type: 'error', message: e.msg })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>