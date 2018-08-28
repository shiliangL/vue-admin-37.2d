<template>
		<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
			<div style="padding-left: 70px;">
				<el-form-item label="用户账号:">
					<el-input style="width:180px;" readonly size="small" v-model="userObj.loginName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户名称:">
					<el-input style="width:180px;" readonly size="small" v-model="userObj.staffName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="岗位角色:">
					<el-input style="width:180px;" readonly size="small" v-model="userObj.position" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="旧登录密码" prop="oldPassword" :rules="rules.input">
					<el-input style="width:180px;" size="small" type="password" v-model="form.oldPassword" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新登录密码" prop="newPassword" :rules="rules.input">
					<el-input style="width:180px;" size="small" type="password" v-model="form.newPassword" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码" prop="confirmKey" :rules="rules.input">
					<el-input style="width:180px;" size="small" type="password" v-model="form.confirmKey" auto-complete="off"></el-input>
				</el-form-item>
			</div>
			<div style="text-align: center;padding-top: 10px;">
				<el-button size="small" @click.stop="closeForm">取消</el-button>
				<el-button size="small" type="primary" @click.stop="submitForm">确定</el-button>
			</div>
	</el-form>
</template>

<script>
import { changePassword } from '@/api/layout.js'
import rules from '@/public/rules.js'
import { mapGetters } from 'vuex'

export default {
  name: 'dialogKey',
  mixins: [rules],
  data() {
    return {
      form: {
        'newPassword': null,
        'oldPassword': null,
        'confirmKey': null
      }
    }
  },
  computed: {
    ...mapGetters(['userObj'])
  },
  methods: {
    closeForm() {
      this.$emit('close')
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.newPassword !== this.form.confirmKey) {
            this.$message({ type: 'warning', message: '两次输入的新登录密码不一致' })
            return
          }
          const { oldPassword, newPassword } = this.form
          changePassword({ oldPassword, newPassword }).then(res => {
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

<style scoped lang="scss">
	.form{
		.el-form-item {
      margin-bottom: 15px;
		}
	}
</style>