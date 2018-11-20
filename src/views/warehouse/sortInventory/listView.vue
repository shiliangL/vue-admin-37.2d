	<!-- 库存盘点 -->
<template>
	<div class="sortInventory">
		<el-row :gutter="10">
			<el-col :span="6">
				<div class="mc-left">
					<div class="searchTree">
						<el-input style="width:180px" v-model.trim="searchTree" size="small" placeholder="输入商品分类检索"></el-input>
						<el-button size="small" @click="searchTreeReset"> 重置 </el-button>
					</div>
					<el-tree ref="tree"
						class="mc-tree"
						accordion
						:highlight-current="true" 
						:data="treeData"
						:filter-node-method="filterNode" 
						:props="defaultProps"
            :default-expanded-keys="[0]"
						@node-click="clickLoadDetails"
            node-key="value" 
						@check-change="currentChange">
					</el-tree>
				</div>
			</el-col>
			<el-col :span="18">
				<div class="mc-right">
					<div class="search-bar">
						<!-- <div class="left">
							<el-select class="w90'" size="small" v-model="searchBarDate.stockCategory" clearable filterable placeholder="选择仓库类别">
								<el-option v-for="sub in options.stockCategory" :key="sub.pk" :label="sub.title" :value="sub.pk"></el-option>
							</el-select>
						</div> -->
						<div class="left">
							<el-select class="w90'" size="small" v-model="searchBarDate.stockId" clearable filterable placeholder="选择仓库">
								<el-option v-for="sub in options.stock" :key="sub.id" :label="sub.title" :value="sub.id"></el-option>
							</el-select>
						</div>
            <div class="left">
				      <el-input size="small" style="width:180px"  v-model.trim="searchBarDate.title" @keyup.enter.native="fecthTableList" placeholder="输入商品名称"></el-input>
            </div>
						<div class="left">
          		<el-button type="primary" size="small" @click="fecthTableList"> 搜索 </el-button>
          		<el-button size="small"  @click="reset"> 重置 </el-button>
						</div>
					</div>
					<!-- 表格 -->
            <table-contain :height.sync="table.maxHeight">
              <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
                <el-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
                <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="basicUnit" label="基本单位" align="center"></el-table-column>
                <el-table-column prop="stockInfoName" label="仓库名称" align="center"></el-table-column>
                <!-- <el-table-column prop="createdName" label="仓位" align="center"></el-table-column> -->
                <el-table-column prop="stockQuantity" label="实际库存" align="center"></el-table-column>
                <!-- <el-table-column prop="inventoryQuantity" label="盘点库存" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column> -->
                <el-table-column prop="lastInventoryTime" label="盘点时间" width="90" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="180">
                  <template slot-scope="scope" align="center">
                    <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row,1)">正常</el-button>
                    <el-button type="text" size="mini" style="color:#FF9933" @click.stop="clickToEditor(scope.$index,scope.row,3)">报溢</el-button>
                    <el-button type="text" size="mini" style="color:red" @click.stop="clickToEditor(scope.$index,scope.row,2)">报损</el-button>
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

				</div>
			</el-col>
		</el-row>

    <!-- 弹层区域 -->
    <el-dialog :title="dialogTitle" class="dialogTitle" :visible.sync="dialogVisible"  width="360px" :modal-append-to-body="false"  center :close-on-press-escape="true" @close="refresh">
      <Add v-if="dialogVisible" :propsSonData="propsParentData" @close="dialogVisible = false"></Add>
    </el-dialog>


	</div>
</template>

<script>

import model from '@/public/listModel.js'
import Add from './add.vue'
import { fecthGoodsClass } from '@/api/goodsList.js'
import { fecthStockList, fetchInventoryProduct } from '@/api/warehouse/sortInventory.js'

export default {
  mixins: [model],
  name: 'sortInventory',
  components: {
    Add
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchTree: null,
      categoryId: null, // 商品分类 id
      options: {
        stockCategory: [],
        stock: []
      },
      searchBarDate: {
        stockCategory: null,
        title: null,
        stockId: null
      }
    }
  },
  mounted() {
    this.fecthGoodsClass()
    this.fecthStockList()
    this.fecthTableList()
  },
  methods: {
    searchTreeReset() {
      this.searchTree = null
      this.fecthGoodsClass()
    },
    fecthGoodsClass() {
      fecthGoodsClass().then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          const p = []
          const s = []
          for (const item of data) {
            if (item.parentId === '0') {
              p.push({
                value: item.id,
                label: item.title,
                children: []
              })
            } else {
              s.push(item)
            }
          }
          for (const item of s) {
            for (const key of p) {
              if (item.parentId === key.value) {
                key.children.push({
                  value: item.id,
                  label: item.title
                })
              }
            }
          }
          this.treeData = [{
            value: 0,
            label: '全部分类',
            children: p
          }]
        } else {
          this.treeData = [{
            value: 0,
            label: '全部分类',
            children: []
          }]
        }
      })
        .catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
    },
    fecthStockList() {
      fecthStockList().then(({ data }) => {
        this.options.stock = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    clickLoadDetails(val) {
      if (val) {
        this.categoryId = val.value ? val.value : null
        this.fecthTableList()
      }
    },
    currentChange(val) {
      console.log(val, 'xx')
    },
    fecthTableList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        stockId: this.searchBarDate.stockId,
        title: this.searchBarDate.title,
        categoryId: this.categoryId
      }
      fetchInventoryProduct(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fecthTableList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fecthTableList()
    },
    reset() {
      this.searchBarDate.stockCategory = null
      this.searchBarDate.stockId = null
      this.searchBarDate.title = null
      this.fecthTableList()
    },
    refresh() {
      this.propsParentData = null
      this.fecthTableList()
    },
    clickToEditor(index, item, type) {
      this.dialogTitle = type === 1 ? '库存正常' : type === 2 ? '库存报损' : '库存报溢'
      item.type = type
      this.dialogVisible = true
      this.propsParentData = item
    }
  },
  watch: {
    searchTree(val) {
      setTimeout(() => {
        this.$refs['tree'].filter(val)
      }, 20)
    },
    'searchBarDate.stockCategory': {
      handler(val) {
        this.searchBarDate.stockId = null
        setTimeout(() => {
          fecthStockList({ categoryId: val }).then(({ data }) => {
            this.options.stock = data
          }).catch(e => {
            console.log(e)
          })
        }, 200)
      }
    }
  }
}
</script>

<style scoped  lang="scss">
	.searchTree{
		width: 100%;
		margin: 10px 0;
    padding: 12px 5px;
		background-color: white;
	}
	.mc-left{
    min-height: 230px;
	}
	.mc-tree{
    min-height: 164px;
    height: 420px;
    overflow: auto;
  }
  .dialogTitle{
    .el-form-item {
      margin-bottom: 15px;
    }
  }
</style>