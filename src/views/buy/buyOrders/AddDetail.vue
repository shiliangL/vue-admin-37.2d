<template>
  <div class="buyOrdersAddDetail">
    <el-form :model="form" ref="form" label-width="110px" :inline="true" :rules="rules" >

      <el-form-item prop="productName" label="商品名称:"  style="margin-bottom: 0px;">
        <!-- <el-input size="small" style="width:180px;" v-model="form.productName"></el-input> -->
        <span v-cloak> {{form.productName}} </span>
      </el-form-item>

      <el-form-item prop="canReturnsQuantity" :label="form.type===1? '可退数量:':'可换数量:'" style="margin-bottom: 0px;">
        <!-- <el-input size="small" style="width:180px" v-model="form.canReturnsQuantity"></el-input> -->
        <span v-cloak> {{form.canReturnsQuantity}} /  {{form.basicUnitName}} </span>
      </el-form-item>

      <el-form-item prop="returnsQuantity" :label="form.type===1? '退货申请数量:':'换货申请数量:'" :rules="[{trigger: 'change', required:true, validator: rules.validNumberRe, RE: form.canReturnsQuantity,meg:'输入数量不能大于可换数量'}]">
        <el-input size="small" style="width:180px" v-model="form.returnsQuantity"></el-input>
      </el-form-item>

      <el-form-item prop="remark" :label="form.type===1? '退货原因:':'换货原因:'" :rules="rules.input">
				<el-input size="small" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="form.remark" style="width:180px" type="textarea" placeholder="不能超30位数" maxlength="30"></el-input>
      </el-form-item>

      <div class="footer-block">
        <el-button size="small" @click.stop="close">取消</el-button>
        <el-button size="small" type="primary" @click.stop="submitForm('form')">确定</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
import rules from '@/public/rules.js'
import addModel from '@/public/addModel.js'
import { fetchApply } from '@/api/buy/buyOrders.js'

export default {
  name: 'buyOrdersAddDetail',
  mixins: [addModel, rules],
  data() {
    return {
      form: {
        'productName': null,
        'basicUnitName': null,
        'number': null,
        'purchaseOrderDetailsId': null,
        'remark': null,
        'returnsQuantity': null,
        'canReturnsQuantity': 0,
        'type': 0
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.saveLoading === true) false
          this.saveLoading = true
          const { id, returnsQuantity, remark, type } = this.form
          const data = {
            'purchaseOrderDetailsId': id,
            'remark': remark,
            'returnsQuantity': returnsQuantity,
            'type': type
          }
          fetchApply(data).then(res => {
            this.$emit('close')
            this.$message({ type: 'success', message: `${res.msg}!` })
          }).catch(e => {
            this.saveLoading = false
            this.$message({ type: 'error', message: e.msg })
          })
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.buyOrdersAddDetail{
    margin-top: -20px;
  .el-form-item {
      margin-bottom: 18px;
  }
}
</style>
