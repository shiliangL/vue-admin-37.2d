<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules" label-width="120px" :inline="true">
				<el-form-item label="登录账号:" prop="loginName" :rules="rules.input">
					<el-input size="small" style="width:180px" v-model.trim="form.loginName"  placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="账号类别:" prop="staffType" :rules="rules.input">
				  <el-select size="small" style="width:180px" v-model="form.staffType" filterable placeholder="选择职位">
	  				<el-option v-for="sub in selectOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
  				</el-select>
				</el-form-item>
				<el-form-item label="登录密码:" prop="password" :rules="rules.input">
					<el-input size="small" style="width:180px" v-model.trim="form.password"  placeholder="请输入"></el-input>
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
import { createOperator, fetchKey } from '@/api/uc/department.js'
export default {
  mixins: [rules, addModel],
  data() {
    return {
      saveLoading: false,
      selectOption: [
        { value: 0, label: '运营人员' },
        { value: 3, label: '仓管员' },
        { value: 6, label: '供应链主管' },
        { value: 9, label: '客服人员' },
        { value: 11, label: '财务人员' }
      ],
      form: {
        loginName: null,
        staffType: null,
        password: null
      }
    }
  },
  mounted() {
    this.fetchKey()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    fetchKey() {
      fetchKey().then(({ data }) => {
        this.form.password = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.saveLoading = true
              const data = JSON.parse(JSON.stringify(this.form))
              data.staffId = this.propsSonData.data.id
              createOperator(data).then(res => {
                this.saveLoading = false
                this.$emit('add')
                this.close()
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
.form{
	.el-form-item {
    margin-bottom: 16px;
	}
	.view-item{
		display: inline-block;
		width: 180px;
	}
}
</style>