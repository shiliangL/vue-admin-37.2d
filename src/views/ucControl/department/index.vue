<!--部门管理 -->
<template>
    <div class="department">

    <el-row :gutter="10">
      <el-col :span="6">
        <div class="table-tree">
          <div style="background: #fff;margin-top: 10px;">
            <div class="searchBox">
              <el-input size="small" style="width:190px" class="w180 search-tree"  placeholder="请输入名称检索" v-model.trim="viewSearch"></el-input>
            </div>
            <el-tree ref="tree"
              accordion
              :highlight-current="true" 
              :data="treeData"
              :default-expanded-keys="[0]"
              @node-click="clickLoadDetails"
              :filter-node-method="filterNode" 
              :props="defaultProps" node-key="value">

              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text" size="small" @click.stop="() => append(data)"> 添加 </el-button>
                  <el-button type="text"  v-if="node.label!=='公司' " size="small" @click.stop="() => editor(data)"> 编辑 </el-button>
                  <!-- <el-button style="color:red" type="text" size="small" @click.stop="() => remove(node, data)"> 删除 </el-button> -->
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="18">

      <search-bar :data="searchBarDate" @search="searchAction" @reset="reset"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 					<el-table-column prop="operatorName" label="员工账号" align="center"></el-table-column>
					<el-table-column prop="staffName" label="员工姓名	" align="center"></el-table-column>
					<el-table-column prop="gender" label="性别	" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.gender=== 0"> 女 </span>
              <span v-if="scope.row.gender=== 1"> 男 </span>
            </template>
          </el-table-column>
					<el-table-column prop="departmentNamesStr" label="所属部门" align="center"></el-table-column>
					<el-table-column prop="jobNumber" label="工号" align="center"></el-table-column>
					<el-table-column prop="position" label="职位" align="center"></el-table-column>
					<el-table-column prop="mobile" label="电话号码" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="210">
            <template slot-scope="scope" align="center">
              <el-button type="text" v-if="!scope.row.operatorName" size="mini" @click.stop="clickToAddResources(scope.$index,scope.row)">开通账号</el-button>
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
              <!-- <el-button type="text" style="color:red" size="mini" @click.stop="clickToDel(scope.$index,scope.row)"> 删除 </el-button> -->
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

      </el-col>
    </el-row>


      <!-- 弹层区域 -->
      <el-dialog :title="dialogTitle" class="dialogTitle" :width="dialogWidth" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
        <Add v-if="isAdd" @close="resetForm" @add="fetchList" :propsSonData="propsParentData"></Add>
        <AddOpen v-if="isAddOpen" @close="resetForm" @add="fetchStaffList" :propsSonData="propsParentData"></AddOpen>
        <AddDepartment v-if="isAddDepartment" :selectOption="selectOption" @close="resetForm" @add="fetchStaffList" :propsSonData="propsParentData"></AddDepartment>
      </el-dialog>
      
    </div>
</template>

<script>
import { resetTreeData } from '@/utils/resetTreeData.js'
import model from '@/public/listModel.js'
import Add from './add'
import AddOpen from './addOpen'
import AddDepartment from './addDepartment'
import { SearchBar } from '@/components/base.js'
import { fetchList, fetchStaffList } from '@/api/uc/department.js'

export default {
  name: 'department',
  mixins: [model],
  components: {
    Add,
    AddOpen,
    SearchBar,
    AddDepartment
  },
  data() {
    return {
      searchBarDate: [
        [
          { type: 'input', value: null, key: 'operatorName', class: 'w180', placeholder: '员工账号' },
          { type: 'input', value: null, key: 'staffName', class: 'w180', placeholder: '员工姓名' },
          { type: 'input', value: null, key: 'mobile', class: 'w180', placeholder: '电话号码' },
          { type: 'search', name: '搜索' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
        ]
      ],
      dialogWidth: '420px',
      viewSearch: null,
      clickRow: null,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectOption: [],
      dialogVisible: false,
      isAdd: false,
      isAddDepartment: false,
      isAddOpen: false,
      dialogTitle: null
    }
  },
  mounted() {
    this.fetchList()
    this.fetchStaffList()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 数据请求
    fetchList() {
      fetchList().then(({ data }) => {
        if (Array.isArray(data)) {
          this.treeData = [
            {
              value: 0,
              label: '公司',
              title: '公司',
              children: resetTreeData(data) || []
            }
          ]
          this.selectOption = data
          console.log(data)
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickLoadDetails(val) {
      if (val) {
        this.clickRow = val
        const { index, size } = this.pagination
        const data = { index, size, departmentId: val.id }
        fetchStaffList(data).then(({ data }) => {
          if (data && Array.isArray(data.rows)) {
            for (const item of data.rows) {
              if (item.departmentNames) {
                item.departmentNamesStr = item.departmentNames.toString()
              }
            }
            this.table.data = data.rows
            this.pagination.total = data.total
          }
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      }
    },
    fetchStaffList() {
      const { index, size } = this.pagination
      const data = { index, size, departmentId: this.clickRow ? this.clickRow.id : null }
      fetchStaffList(data).then(({ data }) => {
        if (data && Array.isArray(data.rows)) {
          for (const item of data.rows) {
            if (item.departmentNames) {
              item.departmentNamesStr = item.departmentNames.toString()
            }
          }
          this.table.data = data.rows
          this.pagination.total = data.total
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    reset() {
      this.clickRow = null
      this.fetchStaffList()
    },
    append(data) {
      this.isAdd = true
      this.dialogTitle = '新增部门'
      this.propsParentData.type = 'add'
      this.propsParentData.isUpdate = false
      this.dialogVisible = true
      this.propsParentData.data = data
    },
    editor(data) {
      this.isAdd = true
      this.dialogTitle = '编辑部门'
      this.propsParentData.type = 'isUpdate'
      this.dialogVisible = true
      this.propsParentData.isUpdate = true
      this.propsParentData.data = data
    },
    searchAction(item) {
      const { index, size } = this.pagination
      const data = { index, size, ...item }
      fetchStaffList(data).then(({ data }) => {
        if (data && Array.isArray(data.rows)) {
          for (const item of data.rows) {
            if (item.departmentNames) {
              item.departmentNamesStr = item.departmentNames.toString()
            }
          }
          this.table.data = data.rows
          this.pagination.total = data.total
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fetchStaffList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fetchStaffList()
    },
    // 弹层操作
    clickToEditor(index, row) {
      this.isAdd = false
      this.isAddOpen = false
      this.isAddDepartment = true
      this.dialogVisible = true
      this.dialogWidth = '640px'
      this.dialogTitle = '编辑员工'
      this.propsParentData.data = row
      this.propsParentData.isUpdate = true
    },
    showAdd() {
      this.isAdd = false
      this.isAddOpen = false
      this.isAddDepartment = true
      this.dialogVisible = true
      this.dialogWidth = '640px'
      this.dialogTitle = '新增员工'
      this.propsParentData.type = 'add'
      this.propsParentData.isUpdate = false
    },
    clickToAddResources(index, row) {
      this.isAdd = false
      this.isAddOpen = true
      this.isAddDepartment = false
      this.dialogVisible = true
      this.dialogTitle = '开通账号'
      this.propsParentData.data = row
    },
    refrehList() {
      this.fetchList()
    },
    resetForm() {
      this.dialogWidth = '420px'
      this.isAdd = false
      this.isAddDepartment = false
      this.isAddOpen = false
      this.dialogVisible = false
    },
    clickToDel(index, item) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        // deleteRow({ id: item.id }).then(res => {
        //   this.$message({ type: 'success', message: `${res.msg}!` })
        //   this.fetchList()
        // }).catch((e) => {
        //   this.$message({ type: 'error', message: e.msg })
        // })
      }).catch(() => {})
    }
  },
  watch: {
    viewSearch(val) {
      setTimeout(() => {
        this.$refs['tree'].filter(val)
      }, 20)
    }
  }
}
</script>

<style scoped lang="scss">
 .tree{
	background: #fff;
	padding: 10px;
	width: 100%;
	min-height: 460px;
}
.custom-tree-node {
	font-size: 14px;
	flex: 1;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: justify;
	justify-content: space-between;
	padding-right: 10px;
}
.table-tree{

}
.search-tree{
  padding: 14px 0;
}
.searchBox{
  padding: 0 10px;
}
</style>