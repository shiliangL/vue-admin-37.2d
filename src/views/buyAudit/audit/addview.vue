<template>
    <div class="addview">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" :inline="true">
				<div class="row-item">
					<div class="row-title">商品信息</div>
					<div class="row-content">
						<!-- 添加区域 -->
						<div class="AddTableList">
							 <BoxToSearch ref="BoxToSearch" :request="request"  @change="selectChange" multiple :id.sync="goodIds" :name.sync="goodNames"> </BoxToSearch>  
							 <el-button  type="primary" size="small" @click.stop="clickToAdd" > 添加 </el-button>
               <!-- <CascaderBox></CascaderBox> -->
						</div>

						<!-- table区域 -->
						<el-table :data="form.dataList" class="skuListTbale" size="small" :max-height="500" style="width: 100%;" highlight-current-row>
 
							<el-table-column label="序号" width="50" align="center">
								<template slot-scope="scope">
									<span>{{scope.$index + 1}}</span>
								</template>
							</el-table-column>

							<el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
							<el-table-column prop="baseUnitName" label="基本单位" align="center"></el-table-column>
							<el-table-column prop="availableQuantity" label="可用库存量" align="center"></el-table-column>
							<el-table-column prop="planQuantity" label="计划采购量" align="center">
								<template slot-scope="scope">

									<el-form-item label="" label-width="0px" :prop="'dataList.'+scope.$index+'.planQuantity'" :rules="[{trigger: 'change', validator: rules.validNumberR2}]">
										<el-input size="small" class="w110" placeholder="请输入" v-model.trim="scope.row.planQuantity"></el-input>
									</el-form-item>

								</template>
							</el-table-column>

							<el-table-column label="采购员/供应商" align="center">
								<template slot-scope="scope">
                  <div class="clearfix">
                    <span  v-cloak> {{scope.row.supplierInfoList[0].personnelName}} </span>
                    <el-button type="text" size="mini" @click.stop="clickToChange(scope.$index, scope.row)">更改</el-button>
                  </div>
								</template>
							</el-table-column>
							<el-table-column prop="price" label="操作" align="center">
								<template slot-scope="scope">
            			<el-button type="text" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
 
						</el-table>
						<div class="pages">
							<span v-cloak> 共 {{this.form.dataList.length}} 条</span>
						</div>
					</div>
				</div>

        <el-dialog width="700px" title="更改采购员/供应商" :visible.sync="innerVisible" append-to-body center :modal="false">
          <changeDialog v-model="dialogData" @callBack="changeDialogCallBack" v-if="innerVisible" @close="innerVisible = false"></changeDialog>
        </el-dialog>

			</el-form>
    </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import changeDialog from './changeDialog'

import { BoxToSearch, CascaderBox } from '@/components/base.js'

// import { fecthGoodsClass, fecthUnit, fecthSupplierList, fecthSalerList, fecthByCategoryId } from '@/api/goodsList.js'

export default {
  mixins: [rules, addModel],
  props: {
    viewData: {
      type: Object
    }
  },
  components: {
    BoxToSearch,
    CascaderBox,
    changeDialog
  },
  data() {
    return {
      goods: null,
      goodIds: null,
      goodNames: null,
      innerVisible: false,
      dialogData: null,
      curIndex: null,
      form: {
        dataList: []
      },
      request: {
        key: 'title',
        data: {
        }
      },
      options: {
        goodClass: [],
        purchaseType: [
          { label: '供应商直供', value: 1 },
          { label: '市场自采购', value: 2 }
        ],
        categoryTypeOption: [
          { label: '标品', value: 0 },
          { label: '非标品', value: 1 }
        ],
        UnitOpton: [],
        supplierList: [],
        supplierType: [],
        salerList: []
      },
      rules: {
        validNumberR2: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        }
      }
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    clickToChange(index, item) {
      this.innerVisible = true
      this.curIndex = index
      this.dialogData = item
    },
    selectChange(value) {
      if (!value) return
      this.goods = value
    },
    clickToDelete(index, item) {
      this.goodIds = null
      this.goods = null
      this.$refs['form'].resetFields()
      this.form.dataList.splice(index, 1)
    },
    clickToAdd() {
      if (!this.goodIds) {
        this.$message({ type: 'warning', message: '请选择一个商品' })
        return
      }
      if (this.$refs['BoxToSearch']) { this.$refs['BoxToSearch'].clearSearch() }
      for (const item of this.goods) {
        if (!this.onlyOne(item.id)) {
          // console.log('没有重复的')
          const data = {
            productId: item.id,
            supplierCategoryId: item.supplierCategoryId,
            productName: item.name,
            baseUnitName: item.baseUnitName,
            availableQuantity: item.availableQuantity || 0,
            planQuantity: 1,
            supplierInfoList: [
              {
                buyerId: item.buyerId,
                buyerName: item.buyerName,
                supplierId: item.supplierId,
                supplierName: item.supplierName,
                personnelId: item.purchaseType === 1 ? item.supplierId : item.buyerId, // 人员id(供应商/采购员)
                personnelName: item.purchaseType === 1 ? item.supplierName : item.buyerName, // 人员姓名(供应商/采购员)
                purchaseType: item.purchaseType, // 采购类型(1:市场自采,2:供应商直供)
                quantity: 1, // 数量
                supplyDto: []
              }
            ]
          }
          if (item.purchaseType === 1) {
            data.supplierInfoList[0].supplyDto = [item.supplierCategoryId, item.supplierId]
          }
          this.form.dataList.push(data)
        } else {
          console.log('重复')
        }
      }
      this.goodIds = null
      this.goods = null
    },
    onlyOne(value) {
      if (!value) return
      const arr = this.form.dataList
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].productId === value) {
          return true
        }
      }
      return false
    },
    changeDialogCallBack(item) {
      this.form.dataList[this.curIndex].supplierInfoList = item.table
    },
    // 触发校验 处理参数
    validateForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('callBack', this.form.dataList)
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.addview{
	.el-form-item{
		padding: 15px;
		margin-bottom: 0;
	}
	.pages{
		text-align: center;
		padding: 20px;
  }
  .AddTableList{
    margin-bottom: 20px;
  }
}
</style>