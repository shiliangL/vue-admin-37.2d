<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules"  style="padding-left: 60px;">

					<el-form-item label="岗位角色:" label-width="100px">
						<span>供应链主管</span>
					</el-form-item>   
					<el-form-item label="用户密码:" label-width="100px">
						<span>123456(初始密码,可重置)</span>
					</el-form-item>   
					<el-form-item label="用户账号:" label-width="100px" prop="loginName" :rules="rules.input">
						<span v-if="propsSonData.isUpdate" v-cloak>{{form.loginName}}</span>
						<el-input v-else size="small" style="width:180px"  v-model.trim="form.loginName" placeholder="" maxlength="11"></el-input>
					</el-form-item>
					<el-form-item label="用户名称:" label-width="100px" prop="staffName" :rules="rules.input">
						<span v-if="isViewPage" v-cloak>{{form.staffName}}</span>
						<el-input v-else size="small" style="width:180px"  v-model.trim="form.staffName" placeholder="" maxlength="11"></el-input>
					</el-form-item>
					<el-form-item label="手机号:" label-width="100px" prop="mobile" :rules="rules.input">
						<span v-if="isViewPage" v-cloak>{{form.mobile}}</span>
						<el-input v-else size="small" style="width:180px"  v-model.trim="form.mobile" placeholder="手机号" maxlength="11"></el-input>
					</el-form-item>
					<el-form-item label="在职时间:" label-width="100px">
						<span  v-if="isViewPage" v-cloak>{{form.entryTime}}</span>
						<el-date-picker v-else style="width:180px" size="small" v-model="form.entryTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
					</el-form-item>  
					<el-form-item label="离职时间:" label-width="100px" v-if="this.propsSonData.type!=='add'">
						<span v-if="isViewPage" v-cloak>{{form.departureTime}}</span>
						<el-date-picker v-else style="width:180px" size="small" v-model="form.departureTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
					</el-form-item>
					<el-form-item label="账号状态:" label-width="100px" prop="status" :rules="rules.input" style="height: 37px;">
						<el-radio v-model="form.status" :disabled="isViewPage" label="1">启用</el-radio>
						<el-radio v-model="form.status" :disabled="isViewPage" label="0">禁用</el-radio>
					</el-form-item>   
			</el-form>
			<div class="footer-block" v-if="!isViewPage">
				<el-button size="small" @click.stop="close">取 消</el-button>
				<el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
			</div>
    </div>
</template>

<script>
import rules from '@/public/rules.js'
import addModel from '@/public/addModel.js'
import { createRow, fetchDetail, updateRow } from '@/api/members.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      isViewPage: false,
      saveLoading: false,
      isUpdate: false,
      form: {
        'entryTime': null,
        'departureTime': null,
        'loginName': null,
        'mobile': null,
        'staffType': 6,
        'status': '1',
        'staffName': null
      },
      stockOption: []
    }
  },
  mounted() {
    if (this.propsSonData.isUpdate) {
      this.isViewPage = this.propsSonData.type === 'view'
      fetchDetail({ operatorId: this.propsSonData.data.operatorId }).then(({ data }) => {
        data.status = data.status + ''
        if (data.entryTime) { data.entryTime = data.entryTime.split(' ')[0] }
        if (data.departureTime) { data.departureTime = data.departureTime.split(' ')[0] }
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.saveLoading = true
              this.form.status = parseInt(this.form.status)
              if (this.propsSonData.isUpdate) {
                const data = JSON.parse(JSON.stringify(this.form))
                if (data.entryTime) { data.entryTime = data.entryTime + ' 00:00:00' }
                if (data.departureTime) { data.departureTime = data.departureTime + ' 00:00:00' }
                delete data.loginName
                delete data.staffType
                updateRow(data).then(res => {
                  this.saveLoading = false
                  this.$emit('add')
                  this.close()
                  this.$message({ type: 'success', message: `${res.msg}!` })
                }).catch(e => {
                  this.saveLoading = false
                  this.$message({ type: 'error', message: e.msg })
                })
              } else {
                const data = JSON.parse(JSON.stringify(this.form))
                if (data.entryTime) { data.entryTime = data.entryTime + ' 00:00:00' }
                delete data.departureTime
                createRow(data).then(res => {
                  this.saveLoading = false
                  this.$emit('add')
                  this.close()
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
    margin-bottom: 14px;
	}
}
</style>