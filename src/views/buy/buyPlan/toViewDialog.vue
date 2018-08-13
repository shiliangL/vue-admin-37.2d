<template>
    <div class="changeDialog">

			<el-form :model="form" :rules="rules" ref="form" >
        <el-form-item label="申请采购量:" label-width="100px">
          <!-- <el-input size="small" class="w110" style="width: 160px;" placeholder="请输入" v-model.trim="form.applyQuantity"></el-input> -->
          <span>{{totalNumber}}</span>
        </el-form-item>

				 <!-- 表格 -->
        <el-table :data="form.table" size="small" :max-height="300" style="width: 100%;" highlight-current-row>

          <el-table-column label="操作" align="center" width="90">
            <template slot-scope="scope" align="center">
							<span class="handler-icon" @click.stop="clickToAdd" >
								<i class="el-icon-plus"></i>
							</span>
							<span class="handler-icon" @click.stop="clickToDelete(scope.$index, scope.row)">
								<i class="el-icon-minus"></i>
							</span>
            </template>
          </el-table-column>

					<el-table-column prop="quantity" label="采购量" align="center"  width="180">
						<template slot-scope="scope">

							<el-form-item label="" label-width="0px" :prop="'table.'+scope.$index+'.quantity'" :rules="[{trigger: 'change', validator: rules.validNumberR2}]">
								<el-input size="small" class="w110" @change="changeNumber(scope.row)" placeholder="请输入" v-model.trim="scope.row.quantity"></el-input>
							</el-form-item>

						</template>
					</el-table-column>

          <el-table-column prop="goodsImage" label="采购员/供应商" align="center">
             <template slot-scope="scope">
               
              <el-form-item label="" style="display: inline-block" label-width="0" :prop="'table.'+scope.$index+'.purchaseType'"  :rules="rules.select">
                <el-select class="w110" size="small" v-model="scope.row.purchaseType" placeholder="采购类型">
                  <el-option v-for="sub in searchBarOptons.type" :key="sub.value" :label="sub.label" :value="sub.value" :disabled="sub.disabled"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label=""  style="display: inline-block" label-width="0" :prop="'table.'+scope.$index+'.buyerId'" :rules="[{required: true,validator: rules.validPersonnel, item:scope.row}]"  v-if="scope.row.purchaseType ===1">
                <el-select style="180px" size="small" v-model="scope.row.buyerId" clearable filterable placeholder="请选择" @change="selectSaler($event,scope.row)">
                  <el-option v-for="sub in searchBarOptons.salerList" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="" style="display: inline-block" label-width="0" :prop="'table.'+scope.$index+'.supplyDto'"  :rules="rules.select"  v-if="scope.row.purchaseType ===2">
                <el-cascader style="180px" v-model="scope.row.supplyDto" size="small" :options="searchBarOptons.supplierList"  @change="selectSupply($event,scope.row)">></el-cascader>
              </el-form-item>

            </template>
          </el-table-column>
 
        </el-table>
 

			</el-form>

			<div class="footer-block">
				<el-button type="primary" size="small" @click.stop="submitForm('form')">确 定</el-button>
				<el-button size="small" @click.stop="close">取 消</el-button>
			</div>

    </div>
</template>

<script>
import { fecthTree, undateTableRow } from '@/api/buy/buyPlan.js'
import { fecthMemberSelect } from '@/api/members.js'
import rules from '@/public/rules.js'
export default {
  name: 'changeDialog',
  props: {
    value: {
      type: Object
    }
  },
  mixins: [rules],
  data() {
    return {
      form: {
        table: []
      },
      searchBarOptons: {
        type: [
          { label: '市场自采购', value: 1 },
          { label: '供应商直供', value: 2, disabled: true }
        ],
        salerList: [],
        supplyType: [],
        supplierList: []
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
        },
        validPersonnel: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          const buyerIds = this.form.table.map(item => {
            return item.buyerId
          })
          let count = 0
          for (const key of buyerIds) {
            if (key === rule.item.buyerId) {
              count++
              if (count >= 2) return callback(new Error('已存在'))
            }
          }
          callback()
        }
      }
    }
  },
  created() {
    if (this.value) {
      const data = JSON.parse(JSON.stringify(this.value))
      for (const item of data.supplierInfoList) {
        if (item.purchaseType === 1) {
          //  采购员
          item.buyerId = item.buyerId ? item.buyerId : item.personnelId
          item.buyerName = item.buyerName ? item.buyerName : item.personnelName
          item.supplierId = null
          item.supplierName = null
          item.supplyDto = []
        } else if (item.purchaseType === 2) {
          //  供应商
          item.buyerId = null
          item.buyerName = null
          item.supplierId = item.supplierId ? item.supplierId : item.personnelId
          item.supplierName = item.supplierName ? item.supplierName : item.personnelName
          item.supplyDto = item.supplyDto ? item.supplyDto : [item.supplierCategoryId, item.personnelId]
        }
      }
      this.form.table = data.supplierInfoList
    }
  },
  mounted() {
    this.fecthTree()
    this.fecthSalerList()
  },
  computed: {
    totalNumber() {
      let t = 0
      for (const item of this.form.table) {
        if (!isNaN(item.quantity)) {
          t += (item.quantity * 1)
        }
      }
      return t
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    fecthTree() {
      fecthTree().then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          this.searchBarOptons.supplierList = data
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e })
      })
    },
    fecthSalerList() {
      fecthMemberSelect({ staffType: 2 }).then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          this.searchBarOptons.salerList = data
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickToAdd() {
      this.form.table.push({
        orderRequestId: this.value.requestId,
        orderRequestDetailsId: this.value.detailId,
        buyerId: null,
        buyerName: null,
        supplierId: null,
        supplierName: null,
        personnelId: null, // 人员id(供应商/采购员)
        personnelName: null, // 人员姓名(供应商/采购员)
        purchaseType: 1, // 采购类型(1:市场自采,2:供应商直供)
        quantity: 1 // 数量
      })
    },
    clickToDelete(index, item) {
      if (this.form.table.length > 1) {
        this.form.table.splice(index, 1)
      } else {
        this.$message({ type: 'warning', message: '不能为空' })
      }
    },
    changeNumber(item) {
      console.log(item)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const list = JSON.parse(JSON.stringify(this.form.table))
          for (const item of list) {
            delete item.buyerId
            delete item.buyerName
            delete item.supplierName
            delete item.supplierId
            delete item.supplyDto
          }
          const data = {
            detailsId: this.value.detailId,
            applyQuantity: this.totalNumber,
            supplierInfoList: list
          }
          undateTableRow(data).then(res => {
            this.$emit('edit')
            this.$emit('close')
          }).catch(e => {
            console.log(e)
          })
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    selectSaler(val, item) {
      if (!val) return
      item.personnelId = val
      const obj = this.$arrayAttrGetObj(this.searchBarOptons.salerList, 'value', val)
      if (!obj) return
      item.buyerName = obj.label
      item.personnelName = obj.label
    },
    selectSupply(val, item) {
      if (!val) return
      const obj = this.$arrayAttrGetObj(this.searchBarOptons.supplierList, 'value', val[0])
      if (!obj) return
      const arr = this.$arrayAttrGetObj(obj.children, 'value', val[1])
      if (!arr) return
      item.supplierCategoryId = val[0]
      item.personnelName = arr.label
      item.personnelId = arr.value
      item.supplierName = arr.label
      item.supplierId = arr.value
    }
  }
}
</script>

<style scoped lang="scss">
.changeDialog{
	.el-form-item{
    margin-bottom: 0px;
	}
	.handler-icon{
		display: inline-block;
		cursor: pointer;
		i{
			display: inline-block;
		}
	}
}
</style>         