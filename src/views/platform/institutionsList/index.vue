
<!-- 机构列表 -->
<template>
    <div class="institutionsList">
			<search-bar :data="searchBarDate" @search="searchAction" @reset="fecthList"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 					<el-table-column prop="title" label="机构名称" align="center"></el-table-column>
					<el-table-column prop="contactPerson" label="法人代表" align="center"></el-table-column>
					<el-table-column prop="telephone" label="联系电话" align="center"></el-table-column>
					<el-table-column prop="orgType" label="机构类型" align="center"></el-table-column>
					<el-table-column prop="email" label="机构邮箱" align="center"></el-table-column>
					<el-table-column prop="status" label="机构状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status"> 已审核 </span>
						</template>
					</el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToView(scope.$index,scope.row)">查看</el-button>
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
              <!-- <el-button type="text" size="mini" @click.stop="clickToPass(scope.$index,scope.row)">审核</el-button> -->
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
      <el-dialog :title="dialogTitle" class="dialogTitle" width="640px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
        <Add v-if="dialogVisible" @close="resetForm" @add="fecthList" :propsSonData="propsParentData"></Add>
      </el-dialog>
      
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import Add from './add'
import { SearchBar } from '@/components/base.js'
import { fetchList } from '@/api/platform/institutionsList.js'

export default {
  name: 'institutionsList',
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
          { type: 'input', value: null, key: 'title', class: 'w180', placeholder: '机构名称检索' },
          { type: 'search', name: '搜索' },
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
      this.dialogTitle = '编辑机构'
      this.propsParentData.type = 'isUpdate'
      this.dialogVisible = true
      this.propsParentData.isUpdate = true
      this.propsParentData.data = row
    },
    clickToView(index, row) {
      this.dialogTitle = '查看机构'
      this.propsParentData.type = 'isView'
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
    clickToPass(index, item) {
      this.$confirm('确定该机构通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // if (!item.id) return
        // updateApplication(item).then(res => {
        //   this.$message({ type: 'success', message: `${res.msg}!` })
        //   this.fecthList()
        // }).catch((e) => {
        //   this.$message({ type: 'error', message: e.msg })
        // })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>