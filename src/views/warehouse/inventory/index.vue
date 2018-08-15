	<!-- 库存明细 -->
<template>
	<div class="inventory">
		<el-row :gutter="10">
			<el-col :span="6">
				<div class="mc-left">
					<div class="searchTree">
						<el-input style="width:180px" v-model.trim="searchTree" size="small" placeholder="输入商品分类检索"></el-input>
						<el-button size="small" @click="searchTree=null"> 重置 </el-button>
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
						<div class="left">
							<el-select class="w90'" size="small" v-model="searchBarDate.stockCategory" clearable filterable placeholder="选择仓库类别">
								<el-option v-for="sub in options.stockCategory" :key="sub.pk" :label="sub.title" :value="sub.pk"></el-option>
							</el-select>
						</div>
						<div class="left">
							<el-select class="w90'" size="small" v-model="searchBarDate.stockId" clearable filterable placeholder="选择仓库">
								<el-option v-for="sub in options.stock" :key="sub.id" :label="sub.title" :value="sub.id"></el-option>
							</el-select>
						</div>
            <div class="left">
				      <el-input size="small" style="width:180px"  v-model.trim="searchBarDate.title" placeholder="输入商品名称"></el-input>
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
              <el-table-column prop="storageType" label="仓库类别" align="center"></el-table-column>
              <el-table-column prop="stockInfoName" label="仓库名称" align="center"></el-table-column>
              <!-- <el-table-column prop="createdName" label="出库明细" align="center"></el-table-column> -->
              <el-table-column prop="stockQuantity" label="实际库存" align="center"></el-table-column>
              <el-table-column prop="availableQuantity" label="可用库存" align="center"></el-table-column>
              <el-table-column prop="safeStock" label="安全上限" align="center"></el-table-column>
              <el-table-column prop="safeStockFloor" label="安全下限" align="center"></el-table-column>
              <el-table-column label="操作" align="center" width="180">
                <template slot-scope="scope" align="center">
                  <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">设置上下限</el-button>
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
    <el-dialog title="库存上下限设置" class="dialogTitle" width="400px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
      <div v-if="dialogVisible">
        <el-form :model="form" ref="form" :rules="rules" :inline="true" style="text-align: center;">
          <el-form-item label="商品名称:" label-width="100px">
            <el-input readonly size="small" style="width:180px" v-model.trim="form.title" ></el-input>
          </el-form-item>
          <el-form-item label="基本单位:" label-width="100px">
            <el-input readonly size="small" style="width:180px" v-model.trim="form.basicUnit" ></el-input>
          </el-form-item>
          <el-form-item label="安全上限:" label-width="100px" prop="safeStock" :rules="[{ required: true, validator: rules.validNumber2, trigger: 'change',item:form }]">
            <el-input size="small" style="width:180px"  v-model.trim="form.safeStock" placeholder="不能超过5位数" maxlength="8"></el-input>
          </el-form-item>
          <el-form-item label="安全下限:" label-width="100px" prop="safeStockFloor"  :rules="[{ required: true, validator: rules.validNumber2, trigger: 'change',item:form }]">
            <el-input size="small" style="width:180px"  v-model.trim="form.safeStockFloor" placeholder="不能超过5位数" maxlength="8"></el-input>
          </el-form-item>
        </el-form>
        <div class="footer-block">
          <el-button size="small" @click.stop="dialogVisible = false">取 消</el-button>
          <el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
        </div>
      </div>
    </el-dialog>

	</div>
</template>

<script>
import model from '@/public/listModel.js'
import { fecthGoodsClass, fecthProductInventory, updateSafeStock } from '@/api/goodsList.js'
import { fecthStockCategory, fecthStockList } from '@/api/warehouse/inventory.js'

export default {
  mixins: [model],
  name: 'inventory',
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
      },
      rules: {
        validNumber2: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        }
      },
      form: {
        'id': null,
        'title': null,
        'basicUnit': null,
        'safeStock': 0,
        'safeStockFloor': 0
      },
      dialogVisible: false,
      saveLoading: false
    }
  },
  mounted() {
    this.fecthGoodsClass()
    this.fecthStockCategory()
    this.fecthStockList()
    this.fecthTableList()
  },
  methods: {
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
          console.log(e)
        })
    },
    fecthStockCategory() {
      fecthStockCategory().then(({ data }) => {
        this.options.stockCategory = data
      }).catch(e => {
        console.log(e)
      })
    },
    fecthStockList() {
      fecthStockList().then(({ data }) => {
        this.options.stock = data
      }).catch(e => {
        console.log(e)
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
      fecthProductInventory(data).then(({ data }) => {
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
    resetForm() {
      this.dialogVisible = false
      this.form.id = null
      this.form.title = null
      this.form.basicUnit = null
      this.form.safeStock = null
      this.form.safeStockFloor = null
    },
    clickToEditor(index, item) {
      this.dialogVisible = true
      this.form.id = item.id
      this.form.title = item.title
      this.form.basicUnit = item.basicUnit
      this.form.safeStock = item.safeStock
      this.form.safeStockFloor = item.safeStockFloor
    },
    clickSaveOrUpdate(formName) {
      if (this.form.safeStockFloor > this.form.safeStock) {
        this.$message({ type: 'warning', message: '下限不能大于上限' })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true
          const data = {
            'id': this.form.id,
            'safeStock': this.form.safeStock,
            'safeStockFloor': this.form.safeStockFloor
          }
          updateSafeStock(data).then(res => {
            this.dialogVisible = false
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.fecthTableList()
            this.saveLoading = false
          }).catch(e => {
            this.saveLoading = false
            this.$message({ type: 'error', message: e.msg })
          })
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
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