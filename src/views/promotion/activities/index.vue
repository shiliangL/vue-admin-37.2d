
<!-- 特惠推荐 -->
<template>
    <div class="activities">
			<search-bar :data="searchBarDate" @search="searchAction" @reset="fecthList"  @clickBtn="fecthList" @add="showAdd"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 					<el-table-column prop="url" label="图片" align="center">
						<template slot-scope="scope">
               <div class="picBox" v-if="scope.row.url"> <img :src="scope.row.url"> </div>
            </template>
					 </el-table-column>
					<el-table-column prop="skuName" label="商品分类" align="center"></el-table-column>
					<el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
					<el-table-column prop="skuPrice" label="市场价格(全国)" align="center"></el-table-column>
					<el-table-column prop="upperGoodsTime" label="商品上架时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="140">
            <template slot-scope="scope" align="center">
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
      <el-dialog :title="dialogTitle" class="dialogTitle" width="420px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
          <Add v-if="dialogVisible" @close="resetForm" @add="fecthList" :propsSonData="propsParentData"></Add>
      </el-dialog>
      
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import Add from './add'
import { SearchBar } from '@/components/base.js'
import { fecthListSku, deleteRow } from '@/api/frontShop/banner.js'

export default {
  name: 'activities',
  mixins: [model],
  components: {
    Add,
    SearchBar
  },
  data() {
    return {
      searchBarDate: [
        [
          // { type: 'input', value: null, key: 'name', class: 'w180', placeholder: '输入商品名称检索' },
          // { type: 'search', name: '查询' },
          // { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' },
          { type: 'button', name: '刷新' }
        ]
      ],
      dialogVisible: false,
      dialogTitle: '添加商品'
    }
  },
  mounted() {
    this.fecthList()
  },
  methods: {
    reset() {
      this.fecthList()
    },
    // 数据请求
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        type: 2,
        method: 2
      }
      fecthListSku(data).then(({ data }) => {
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
        method: 2,
        type: 2,
        ...item
      }
      fecthListSku(data).then(({ data }) => {
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
    showAdd() {
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
      if (this.table.data.length === 1) {
        this.$message({ type: 'warning', message: '不能清空数据' })
        return
      }
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        deleteRow({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.fecthList()
            this.$message({ type: 'success', message: '删除成功' })
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
   .picBox{
    width: 120px;
    height: 40px;
    text-align: center;
    display: inline-block;
    overflow: hidden;
    img{
      height: 100%;
    }
  }
</style>