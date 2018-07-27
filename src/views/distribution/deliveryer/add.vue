<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules">
				<el-row>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="岗位角色:" label-width="100px">
								<span>配送员</span>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="用户账号:" label-width="100px" prop="mobile" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.mobile" placeholder="手机号" maxlength="11"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="登录密码:" label-width="100px">
								<span>123456（初始密码）</span>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="用户名称:" label-width="100px" prop="name" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.name" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="在职时间:" label-width="100px" prop="entryTime" :rules="rules.select">
      					<el-date-picker style="width:140px" size="small" v-model="form.entryTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="驾照号:" label-width="100px" prop="driverNo" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.driverNo" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="有效期:" label-width="100px" prop="effectiveTime" :rules="rules.input">
      					<el-date-picker style="width:140px" size="small" v-model="form.effectiveTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="首次发证:" label-width="100px" prop="takeTime" :rules="rules.input">
      					<el-date-picker style="width:140px" size="small" v-model="form.takeTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="是否有车:" label-width="100px" prop="carFlag" :rules="rules.input">
								<el-radio v-model="form.carFlag" label="0">有</el-radio>
								<el-radio v-model="form.carFlag" label="1">无</el-radio>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车牌号:" label-width="100px" prop="carNo" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.carNo" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车架号:" label-width="100px" prop="carId" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.carId" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="发动机号:" label-width="100px" prop="engineId" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.engineId" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车辆品牌:" label-width="100px" prop="carBrand" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.carBrand" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车辆型号:" label-width="100px" prop="carModel" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.carModel" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="账号状态:" label-width="100px" prop="status" :rules="rules.input">
								<el-radio v-model="form.status" label="1">启用</el-radio>
								<el-radio v-model="form.status" label="0">禁用</el-radio>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="身份证号:" label-width="100px" prop="idcardNo" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.idcardNo" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="身份证图片:" label-width="100px" prop="idcardPicIds" :rules="rules.select">
								<el-input size="small" style="width:140px;display: none;"  v-model.trim="form.idcardPicIds" placeholder="不能超过5位数" maxlength="5"></el-input>
								<div class="flex-box">
									<div class="car"> 
										<i class="el-icon-plus"></i>
									</div>
									<div class="car car-right">
										<i class="el-icon-plus"></i>
									</div>
								</div>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车辆信息:" label-width="100px">
								<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" size="small" style="width:180px"  v-model.trim="form.summary" placeholder="不能超过30位数" maxlength="30"></el-input>
							</el-form-item>   
						</el-col>
				</el-row>
			</el-form>
			<div class="footer-block">
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
      saveLoading: false,
      isUpdate: false,
      form: {
        'carBrand': 'string',
        'carFlag': '1',
        'carId': 'string',
        'carModel': 'string',
        'carNo': 'string',
        'departureTime': '2018-07-26',
        'driverNo': 'string',
        'effectiveTime': '2018-07-26',
        'engineId': 'string',
        'entryTime': '2018-07-26',
        'id': 'string',
        'idcardNo': 'string',
        'idcardPicIds': 'string',
        'mobile': 'string',
        'name': 'string',
        'operatorId': 'string',
        'phone': 'string',
        'staffId': 'string',
        'status': '0',
        'summary': 'string',
        'takeTime': '2018-07-26',
        'title': 'string'
      },
      stockOption: []
    }
  },
  mounted() {
    if (this.propsSonData.isUpdate) {
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
    fetchDetail() {

    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.saveLoading = true
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
	.car{
		cursor: pointer;
		width: 60px;
		height: 60px;
    border-radius: 4px;
		border: 1px solid #d9d9d9;
		i{
			text-align: center;
			line-height: 60px;
			margin-left: 22px;
		}
	}
	.car-right{
		margin-left: 10px;
	}
}
</style>