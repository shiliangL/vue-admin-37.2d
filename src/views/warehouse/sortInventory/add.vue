<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules" label-width="90px">
				<el-form-item style="margin-bottom:0" label="商品名称:">
          <span v-cloak> {{ form.title }} </span>
				</el-form-item>
				<el-form-item style="margin-bottom:0" label="实际库存:">
          <span v-cloak> {{ form.stockQuantity }} </span>
				</el-form-item>
				<el-form-item label="盘点库存:" prop="inventoryQuantity" :rules="rules.input">
					<el-input size="small" style="width:180px" v-model.trim="form.inventoryQuantity"  placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="备注:">
  				<el-input size="small" 
            :autosize="{ minRows: 2, maxRows: 4}" 
            v-model.trim="form.remark" style="width:180px" 
            type="textarea" 
            placeholder="不能超30位数" maxlength="30">
          </el-input>
				</el-form-item>
			</el-form>
			<!-- 说明 -->
			<!-- 机构 LOGO -->
			<div class="footer-block">
				<el-button size="small" @click.stop="close">取 消</el-button>
				<el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
			</div>
    </div>
</template>

<script>
import rules from '@/public/rules.js'
import addModel from '@/public/addModel.js'

import { updateStockInventory } from '@/api/warehouse/sortInventory.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      form: {
        'title': null,
        'stockQuantity': null,
        'inventoryQuantity': null,
        'remark': null
      }
    }
  },
  mounted() {
    if (this.propsSonData) {
      this.form = Object.assign(this.form, this.propsSonData)
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
            const { inventoryQuantity, remark } = this.form
            const { type, productId, stockQuantity } = this.propsSonData
            const data = {
              'inventoryQuantity': inventoryQuantity,
              'inventoryState': type,
              'productId': productId,
              'remark': remark,
              'stockQuantity': stockQuantity
            }
            this.saveLoading = true
            updateStockInventory(data).then(res => {
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
  margin-bottom: 4px;
}
</style>