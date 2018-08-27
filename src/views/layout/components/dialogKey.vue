<template>
		<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm" style="padding-left: 15px;">
			<el-form-item label="旧密码" prop="oldPassword" :rules="rules.input">
				<el-input style="width:180px;" size="small" type="password" v-model="form.oldPassword" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newPassword" :rules="rules.input">
				<el-input style="width:180px;" size="small" type="password" v-model="form.newPassword" auto-complete="off"></el-input>
			</el-form-item>
			<div style="text-align: center;">
				<el-button size="small" @click.stop="closeForm">取消</el-button>
				<el-button size="small" type="primary" @click.stop="submitForm">确定</el-button>
			</div>
	</el-form>
</template>

<script>
import { changePassword } from '@/api/layout.js'
import rules from '@/public/rules.js'

export default {
  name: 'dialogKey',
  mixins: [rules],
  data() {
    return {
      form: {
        'newPassword': null,
        'oldPassword': null
      }
    }
  },
  methods: {
    closeForm() {
      this.$emit('close')
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          changePassword(this.form).then(res => {
            if (res.code === '0') {
              this.$message({ type: 'success', message: '修改成功，请重新登录' })
              setTimeout(() => {
                this.$emit('logout')
              }, 1000)
            }
          }).catch(e => {
            if (e.data && Array.isArray(e.data)) {
              this.$message({ type: 'error', message: e.data[0].message })
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

<style scoped>
	
</style>