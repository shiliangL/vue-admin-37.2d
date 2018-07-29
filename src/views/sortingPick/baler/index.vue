<!-- 打包员 -->
<template>
    <div class="areaDelivery">
			<search-bar :data="searchBarDate" @search="searchAction" @reset="fecthList"  @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 
 					<el-table-column prop="title" label="用户账号" align="center"></el-table-column>
					<el-table-column prop="summary" label="用户名称" align="center"></el-table-column>
					<!-- <el-table-column prop="summary" label="岗位角色" align="center"></el-table-column> -->
					<el-table-column prop="scmDriverStr" label="创建时间" align="center"></el-table-column>
					<el-table-column prop="scmDriverStr" label="在岗开始时间" align="center"></el-table-column>
					<el-table-column prop="scmDriverStr" label="离岗时间" align="center"></el-table-column>
					<el-table-column prop="scmDriverStr" label="账号状态" align="center"></el-table-column>
		 
          <el-table-column label="操作" align="center" width="140">
            <template slot-scope="scope" align="center">
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
import { fetchList, fetchDriverList, deleteRow } from '@/api/distribution/areaDelivery.js'

export default {
  name: 'areaDelivery',
  mixins: [model],
  components: {
    Add,
    SearchBar
  },
  data() {
    return {
      searchBarDate: [
        [
          { type: 'option', value: null, key: 'stockId', class: 'w150', placeholder: '账号状态', options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ] },
          { type: 'input', value: null, key: 'orderNo', class: 'w180', placeholder: '输入用户名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
        ]
      ],
      options: {
        driverOption: [],
        provinceOption: [],
        cityOption: []
      },
      propsData: {
        isUpdate: false,
        type: null,
        data: null
      },
      dialogVisible: false,
      dialogTitle: null
    }
  },
  mounted() {
    this.fecthList()
    this.fetchOption()
  },
  methods: {
    reset() {
      this.searchBarDate = {
        title: null,
        driveId: null
      }
      this.cityDTO = null
      this.fecthList()
    },
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
    fetchOption() {
      // 配送员
      fetchDriverList().then(({ data }) => {
        if (Array.isArray(data.rows)) {
          this.options.driverOption = data.rows
        }
      }).catch(e => {
        console.log(e)
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
      this.dialogTitle = '编辑配送员'
      this.propsParentData.type = 'isUpdate'
      this.dialogVisible = true
      this.propsParentData.isUpdate = true
      this.propsParentData.data = row
    },
    showAdd() {
      this.dialogTitle = '新增配送员'
      this.propsParentData.type = 'add'
      this.propsParentData.isUpdate = false
      this.dialogVisible = true
    },
    refrehList() {
      this.fecthList()
    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fecthList()
    },
    resetForm() {
      this.dialogVisible = false
    },
    clickToDelete(index, item) {
      this.$confirm('是否确定重置密码为123456?', '提示', {
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