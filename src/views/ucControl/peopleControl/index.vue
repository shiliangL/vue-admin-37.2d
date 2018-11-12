
<!-- 人员管理 -->
<template>
    <div class="peopleControl">
			<search-bar ref="searchBar" :data="searchBarDate" @search="searchAction" @reset="fetchList"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 					<el-table-column prop="staffName" label="员工姓名" align="center"></el-table-column>
					<el-table-column prop="loginName" label="账号名称" align="center"></el-table-column>
					<el-table-column prop="roleNameStr" label="拥有角色" width="300" align="center"></el-table-column>
					<el-table-column prop="status" label="账号状态" align="center">
						 <template slot-scope="scope">
              <el-tag v-cloak size="mini" v-if="scope.row.status ===1"> 启用 </el-tag>
              <el-tag size="mini" type="danger" v-cloak v-else> 禁用 </el-tag>
            </template>
					</el-table-column>
          <el-table-column label="操作" align="center" width="240">
            <template slot-scope="scope" align="center">
              <el-button type="text" style="color:red" size="mini" @click.stop="clickToReset(scope.$index,scope.row)"> 重置密码 </el-button>
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)"> 分配角色 </el-button>
              <el-button type="text" v-if="scope.row.status ===1" style="color:red" size="mini" @click.stop="clickDisable(scope.$index,scope.row)"> 禁用 </el-button>
              <el-button type="text" v-else size="mini" @click.stop="clickDisable(scope.$index,scope.row)"> 启用 </el-button>
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
      <el-dialog :title="dialogTitle" class="dialogTitle" width="520px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
        <Add v-if="dialogVisible" @close="resetForm" @add="fetchList" :propsSonData="propsParentData"></Add>
      </el-dialog>
      
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import Add from './add'
import { SearchBar } from '@/components/base.js'
import { fetchList, resetKey, forbiddenRow, unForbiddenRow } from '@/api/uc/peopleControl.js'

export default {
  name: 'peopleControl',
  mixins: [model],
  components: {
    Add,
    SearchBar
  },
  data() {
    return {
      searchBarDate: [
        [
          // { type: 'option', value: null, key: 'orgTypeCode', class: 'w150', placeholder: '机构类型', options: [
          //   { label: '启用', value: 1 },
          //   { label: '禁用', value: 0 }
          // ] },
          { type: 'input', value: null, key: 'loginName', class: 'w180', placeholder: '用户账号检索' },
          { type: 'search', name: '搜索' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '刷新' }
        ]
      ],
      dialogVisible: false,
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
      this.dialogTitle = '为所选用户分配角色'
      this.propsParentData.type = 'isUpdate'
      this.dialogVisible = true
      this.propsParentData.isUpdate = true
      this.propsParentData.data = row
    },
    clickToView(index, row) {
      this.dialogTitle = '查看详情'
      this.propsParentData.type = 'isView'
      this.dialogVisible = true
      this.propsParentData.isUpdate = true
      this.propsParentData.data = row
    },
    showAdd() {
      // this.dialogTitle = '新增角色'
      // this.propsParentData.type = 'add'
      // this.propsParentData.isUpdate = false
      // this.dialogVisible = true
      this.fetchList()
    },
    refrehList() {
      this.fetchList()
    },
    resetForm() {
      this.dialogVisible = false
    },
    clickDisable(index, item) {
      const title = item.status === 1 ? '确定禁用吗？' : '确定启用吗？'
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        if (item.status === 1) {
          forbiddenRow(item.id).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.fetchList()
          }).catch((e) => {
            this.$message({ type: 'error', message: e.msg })
          })
        } else {
          unForbiddenRow(item.id).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.fetchList()
          }).catch((e) => {
            this.$message({ type: 'error', message: e.msg })
          })
        }
      }).catch(() => {})
    },
    clickToReset(index, item) {
      this.$confirm('是否确定重置密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        resetKey(item.id).then(res => {
          if (res.code === '0') {
            this.$notify({ title: '温馨提示', message: `${res.data.loginName},重置随机密码为: ${res.data.password}`, duration: 10000 })
          }
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