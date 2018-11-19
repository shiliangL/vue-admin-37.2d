
<template>
    <div class="moneyPlan">
				<el-form :model="form" :rules="rules" ref="form" label-width="130px" :inline="true">

		    <div class="row-item">
						<div class="row-title">客户账期</div>
						<div class="row-content">
					     <el-row>
								 <el-col :xs="24" :sm="10" :md="8" :lg="8">
									<el-form-item label="可欠日期:" prop="limitTime" :rules="rules.input">
                    <div v-if="isAddView">
                      <el-input-number size="small" style="width:160px" v-model="form.limitTime" :min="1" :max="10000"></el-input-number>
                      <el-select size="small" style="width:60px" v-model="form.limitType">
                        <el-option v-for="sub in options.dateTime" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                      </el-select>
                    </div>
										<span v-else v-cloak> 
                      {{ form.limitTime }} 
                      <span v-if="form.limitType===0">天</span>
                      <span v-if="form.limitType===1">周</span>
                      <span v-if="form.limitType===2">月</span>
                    </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="8">
									<el-form-item label="可欠总金额:" prop="amount" :rules="[{trigger: 'change', required:true, validator: rules.validNumberR8}]">
                    <div v-if="isAddView">
										  <el-input size="small" style="width:160px" placeholder="大于等于0" maxlength="7" v-model.trim="form.amount"></el-input>
                      <span>元(人民币)</span>
                    </div>
										<span v-else v-cloak> {{ form.amount }} 元(人民币)</span>
									</el-form-item>
								</el-col>
              </el-row>
						</div>
				</div>

		    <div class="row-item">
						<div class="row-title"> 账户信息</div>
						<div class="row-content">
					     <el-row>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="账户余额:">
                    <span v-cloak> {{form.balance}} </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="信用额度:">
                    <span v-cloak> {{form.credence}} </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="应付款:">
                    <span v-cloak> {{form.payGather}} </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="应收款:">
                    <span v-cloak> {{form.mustGather}} </span>
									</el-form-item>
								</el-col>
              </el-row>
						</div>
				</div>

		    <!-- <div class="row-item">
						<div class="row-title">银行储蓄卡信息</div>
						<div class="row-content">
					     <el-row>
								  <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="开户银行:">
                    <el-input v-if="isAddView" size="small" style="width:180px" v-model.trim="form.companyBank" maxlength="11"></el-input>
										<span v-else v-cloak> {{ form.companyBank }} </span>
									</el-form-item>
								</el-col>

                <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="银行卡号:">
                    <el-input v-if="isAddView" size="small" style="width:180px" v-model.trim="form.bankNo" maxlength="11"></el-input>
										<span v-else v-cloak> {{ form.bankNo }} </span>
									</el-form-item>
								</el-col>

              </el-row>
						</div>
				</div> -->

			</el-form>
    </div>
</template>

<script>
import rules from '@/public/rules.js'
export default {
  name: 'moneyPlan',
  mixins: [rules],
  props: {
    data: {
      type: Object
    },
    isAddView: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        balance: 0,
        credence: 0,
        amount: 0,
        mustGather: 0,
        payGather: 0,
        companyBank: null,
        bankNo: null,
        limitTime: 3,
        limitType: 0
      },
      options: {
        dateTime: [
          { value: 0, label: '天' },
          { value: 1, label: '周' },
          { value: 2, label: '月' }
        ]
      }
    }
  },
  mounted() {

  },
  methods: {
    validateForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('update:isPass', true)
          const data = JSON.parse(JSON.stringify(this.form))
          this.$emit('callBack', data)
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          this.$emit('update:isPass', false)
          return
        }
      })
    }
  },
  watch: {
    data: {
      handler(item) {
        if (item) this.form = Object.assign(this.form, item)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.basicInfo,
.table {
    .el-form-item {
        margin-bottom: 18px;
    }
}
.AddTableList {
    margin-bottom: 10px;
}
.pages {
    text-align: center;
    padding: 20px;
}
.msg {
    margin-top: 10px;
}
.portraitId{
  display: flex;
  align-items: center;
  justify-items: center;
  width: 90px;
  height: 90px;
  // border-radius: 50%;
  overflow: hidden;
  img{
    display: inline-block;
    width: 100%;
    // height: 100%;
  }
}
</style>