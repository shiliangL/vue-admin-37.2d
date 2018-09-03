<!-- 机构类别 -->
<template>
    <div class="institutionsType">
			<search-bar :data="searchBarDate" @search="searchAction" @reset="fecthList"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 					<el-table-column prop="code" label="机构类型编号" align="center"></el-table-column>
					<el-table-column prop="title" label="机构类型名称" align="center"></el-table-column>
					<el-table-column prop="shortTitle" label="机构类型简称" align="center"></el-table-column>
					<el-table-column prop="remark" label="备注" width="210" show-overflow-tooltip align="center"></el-table-column>
					<el-table-column prop="createdName" label="创建人" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="140">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
							<el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index,scope.row)">删除</el-button>
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
          <Add v-if="dialogVisible" @close="resetForm" @add="fecthList" :propsSonData="propsParentData"></Add>
      </el-dialog>
      
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import Add from './add'
import { SearchBar } from '@/components/base.js'
import { fetchList, deleteRow } from '@/api/platform/institutionsType.js'

export default {
  name: 'institutionsType',
  mixins: [model],
  components: {
    Add,
    SearchBar
  },
  data() {
    return {
      searchBarDate: [
        [
          { type: 'input', value: null, key: 'inputContent', class: 'w180', placeholder: '输入名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
        ]
      ],
      dialogVisible: false,
      dialogTitle: null
    }
  },
  mounted() {
    this.fecthList()
  },
  methods: {
    // 数据请求
    fecthList() {
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
      this.fecthList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fecthList()
    },
    // 弹层操作
    clickToEditor(index, row) {
      this.dialogTitle = '编辑机构类型'
      this.propsParentData.type = 'isUpdate'
      this.dialogVisible = true
      this.propsParentData.isUpdate = true
      this.propsParentData.data = row
    },
    showAdd() {
      this.dialogTitle = '新增机构类型'
      this.propsParentData.type = 'add'
      this.propsParentData.isUpdate = false
      this.dialogVisible = true
    },
    refrehList() {
      this.fecthList()
    },
    resetForm() {
      this.dialogVisible = false
    },
    clickToDelete(index, item) {
      this.$confirm('确认删除数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        deleteRow({ id: item.id }).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.fecthList()
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