<!--问题反馈 -->
<template>
    <div class="feedback">
			<search-bar ref="searchBar" :data="searchBarDate" @search="searchAction" @reset="reset"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 					<el-table-column prop="customerAccount" label="客户账号" align="center"></el-table-column>
					<el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
					<el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
					<el-table-column prop="sourceType" label="反馈来源" align="center">
             <template slot-scope="scope">
               <span v-if="scope.row.sourceType===1" size="small">App</span>
               <span v-if="scope.row.sourceType===2" size="small">微信公众号</span>
               <span v-if="scope.row.sourceType===3" size="small">微信小程序</span>
            </template>
          </el-table-column>
					<el-table-column prop="content" label="反馈内容" align="center" show-overflow-tooltip width="300"></el-table-column>
					<el-table-column prop="createdTime" label="反馈时间" align="center"></el-table-column>
					<el-table-column prop="whetherRead" label="状态" align="center">
						 <template slot-scope="scope">
               <el-tag type="info" v-if="scope.row.whetherRead===1" size="small">已读</el-tag>
               <el-tag v-if="scope.row.whetherRead===0" size="small">未读</el-tag>
            </template>
					</el-table-column>
          <el-table-column label="操作" align="center" width="140">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">查看</el-button>
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
      <el-dialog :title="dialogTitle" class="dialogTitle" width="720px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
          <Add v-if="dialogVisible" @close="resetForm" :propsSonData="propsParentData"></Add>
      </el-dialog>
      
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import Add from './add'
import { SearchBar } from '@/components/base.js'
import { fetchList } from '@/api/frontShop/feedback.js'

export default {
  name: 'feedback',
  mixins: [model],
  components: {
    Add,
    SearchBar
  },
  data() {
    return {
      searchBarDate: [
        [
          { type: 'date', value: null, key: 'createdTime', class: 'w180', placeholder: '反馈时间' },
          { type: 'option', value: null, key: 'sourceType', class: 'w150', placeholder: '反馈来源', options: [
            { label: 'App', value: 1 },
            { label: '微信公众号', value: 2 },
            { label: '微信小程序', value: 3 }
          ] },
          { type: 'input', value: null, key: 'inputContent', class: 'w180', placeholder: '输入用户名/客户账号称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          // { type: 'add', name: '新增' }
        ]
      ],
      dialogVisible: false,
      dialogTitle: null
    }
  },
  mounted() {
    // this.fecthList()
    if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
  },
  methods: {
    reset() {
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
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    // 弹层操作
    clickToEditor(index, row) {
      this.dialogTitle = '反馈内容详情'
      this.propsParentData.type = 'isUpdate'
      this.dialogVisible = true
      this.propsParentData.isUpdate = true
      this.propsParentData.data = row
    },
    resetForm() {
      this.dialogVisible = false
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>