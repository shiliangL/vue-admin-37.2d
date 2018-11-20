<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules" label-width="90px">
				<el-form-item style="margin-bottom:0" label="商品名称:">
          <span v-cloak> {{ form.productName }} </span>
				</el-form-item>
				<el-form-item style="margin-bottom:0" label="当时库存:">
          <span v-cloak> {{ form.stockQuantity }} </span>
				</el-form-item>
				<el-form-item style="margin-bottom:0" label="盘点库存:">
          <span v-cloak> {{ form.inventoryQuantity }} </span>
				</el-form-item>
				<el-form-item label="盘点状态:" prop="checkState" :rules="[{trigger: 'change', required:true, validator: rules.validNumberR2}]">
          <el-select size="small" v-model="form.checkState" filterable placeholder="请选择" style="width:180px">
            <el-option v-for="sub in optonsType" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
          </el-select>
				</el-form-item>
				<el-form-item label="核查库存:" prop="checkQuantity" :rules="rules.input">
					<el-input size="small" style="width:180px" v-model.trim="form.checkQuantity"  placeholder="请输入"></el-input>
				</el-form-item>
			</el-form>
			<!-- 说明 -->
              
			<div class="footer-block" style="margin-top: 10px;">
				<el-button size="small" @click.stop="close">取 消</el-button>
				<el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
			</div>
    </div>
</template>

<script>
import rules from '@/public/rules.js'
import addModel from '@/public/addModel.js'

import { updateStockCheck } from '@/api/warehouse/sortInventory.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      form: {
        'productName': null,
        'inventoryQuantity': null,
        'stockQuantity': null,
        'checkQuantity': null,
        'checkState': null
      },
      optonsType: [
        { label: '正常', value: 1 },
        { label: '报损', value: 2 },
        { label: '报溢', value: 3 }
      ]
    }
  },
  mounted() {
    if (this.propsSonData) {
      this.form = Object.assign(this.form, this.propsSonData)
      this.form.checkState = this.propsSonData.inventoryState
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.saveLoading && this.propsSonData) {
            const { checkQuantity, checkState } = this.form
            const { id } = this.propsSonData
            const data = {
              'checkQuantity': checkQuantity,
              'checkState': checkState,
              'id': id
            }
            this.saveLoading = true
            updateStockCheck(data).then(res => {
              this.$emit('close')
              this.$message({ type: 'success', message: `${res.msg}!` })
            }).catch(e => {
              this.saveLoading = false
              this.$message({ type: 'error', message: e.msg })
            })
          }
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
.el-form-item {
  margin-bottom: 2px;
}
</style>