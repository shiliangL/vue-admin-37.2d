<!-- 配送员 -->
<template>
    <div class="deliveryer">
			<search-bar :data="searchBarDate" @search="searchAction" @reset="fetchList"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 
 					<el-table-column prop="mobile" label="用户账号" align="center"></el-table-column>
					<el-table-column prop="name" label="用户名称" align="center"></el-table-column>
					<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
					<el-table-column prop="entryTime" label="在岗时间" align="center"></el-table-column>
					<el-table-column prop="departureTime" label="离岗时间" align="center"></el-table-column>
					<el-table-column prop="carFlag" label="是否有车" align="center">
             <template slot-scope="scope" align="center">
               <span v-if="scope.row.carFlag===0"> 有 </span>
               <span v-if="scope.row.carFlag===1"> 无 </span>
            </template>
          </el-table-column>
					<el-table-column prop="status" label="账号状态" align="center">
            <template slot-scope="scope" align="center">
               <span v-if="scope.row.status===0"> 禁用 </span>
               <span v-if="scope.row.status===1"> 启用 </span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToDetail(scope.$index,scope.row)">详情</el-button>
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
							<el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index,scope.row)">重置密码</el-button>
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

      <!-- 弹层区域 -->
      <el-dialog :title="dialogTitle" class="dialogTitle" width="960px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
        <Add v-if="dialogVisible" @close="resetForm" :propsSonData="propsParentData" @add="fetchList"> </Add>
      </el-dialog>
      
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import Add from './add'
import { SearchBar } from '@/components/base.js'
import { fetchList, resetPassword } from '@/api/distribution/deliveryer.js'

export default {
  name: 'deliveryer',
  mixins: [model],
  components: {
    Add,
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
            placeholder: '状态',
            options: [
              { label: '无效', value: 0 },
              { label: '有效', value: 1 }
            ]
          },
          {
            type: 'input',
            value: null,
            key: 'name',
            class: 'w180',
            placeholder: '输入名称检索'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [{ type: 'add', name: '新增' }]
      ],
      dialogVisible: false,
      saveLoading: false,
      isUpdate: false,
      dialogTitle: null,
      stockOption: []
    }
  },
  mounted() {
    this.fetchList()
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
      this.dialogTitle = '编辑配送员'
      this.propsParentData.type = 'isUpdate'
      this.dialogVisible = true
      this.propsParentData.isUpdate = true
      this.propsParentData.data = row
    },
    clickToDetail(index, row) {
      this.dialogTitle = '配送员详情'
      this.propsParentData.type = 'view'
      this.propsParentData.isUpdate = true
      this.propsParentData.data = row
      this.dialogVisible = true
    },
    showAdd() {
      this.dialogTitle = '新增配送员'
      this.propsParentData.type = 'add'
      this.propsParentData.isUpdate = false
      this.dialogVisible = true
    },
    refrehList() {
      this.fetchList()
    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fetchList()
    },
    resetForm() {
      this.dialogVisible = false
    },
    clickToDelete(index, item) {
      this.$confirm('是否确定重置密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        const data = {
          operatorId: item.operatorId,
          password: 123456
        }
        resetPassword(data).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.fetchList()
        }).catch((e) => {
          this.$message({ type: 'error', message: e.msg
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>