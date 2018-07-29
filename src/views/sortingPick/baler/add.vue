<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules"  style="padding-left: 60px;">

					<el-form-item label="岗位角色:" label-width="100px">
						<span>配送员</span>
					</el-form-item>   
					<el-form-item label="用户账号:" label-width="100px">
						<span>cmmnj000061</span>
					</el-form-item>   
					<el-form-item label="用户账号:" label-width="100px">
						<span>123456(初始密码,登录后可修改)</span>
					</el-form-item>   

					<el-form-item label="用户名称:" label-width="100px" prop="mobile" :rules="rules.input">
						<span v-if="isViewPage" v-cloak>{{form.mobile}}</span>
						<el-input v-else size="small" style="width:140px"  v-model.trim="form.mobile" placeholder="手机号" maxlength="11"></el-input>
					</el-form-item>

					<el-form-item label="在职时间:" label-width="100px">
						<span  v-if="isViewPage" v-cloak>{{form.entryTime}}</span>
						<el-date-picker v-else style="width:140px" size="small" v-model="form.entryTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
					</el-form-item>  

					<el-form-item label="离职时间:" label-width="100px" v-if="this.propsSonData.type!=='add'">
						<span v-if="isViewPage" v-cloak>{{form.departureTime}}</span>
						<el-date-picker v-else style="width:140px" size="small" v-model="form.departureTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
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
import { createRow, fetchDetail, updateRow } from '@/api/distribution/deliveryer.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      isViewPage: false,
      saveLoading: false,
      isUpdate: false,
      form: {
        'carBrand': null,
        'carFlag': '0',
        'carId': null,
        'carModel': null,
        'carNo': null,
        'departureTime': null,
        'driverNo': null,
        'effectiveTime': null,
        'engineId': null,
        'entryTime': null,
        'id': null,
        'idcardNo': null,
        'idcardPicIds': 'string',
        'mobile': null,
        'name': null,
        'operatorId': null,
        'phone': null,
        'staffId': null,
        'status': '1',
        'summary': null,
        'takeTime': null,
        'title': null
      },
      stockOption: []
    }
  },
  mounted() {
    if (this.propsSonData.isUpdate) {
      this.isViewPage = this.propsSonData.type === 'view'
      fetchDetail({ id: this.propsSonData.data.id }).then(({ data }) => {
        data.carFlag = data.carFlag + ''
        data.status = data.status + ''
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
              this.form.carFlag = parseInt(this.form.carFlag)
              this.form.status = parseInt(this.form.status)
              if (this.propsSonData.isUpdate) {
                updateRow(this.form).then(res => {
                  this.saveLoading = false
                  this.$emit('add')
                  this.close()
                }).catch(e => {
                  this.saveLoading = false
                  this.$message({ type: 'error', message: e.msg })
                })
              } else {
                createRow(this.form).then(res => {
                  this.saveLoading = false
                  this.$emit('add')
                  this.close()
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