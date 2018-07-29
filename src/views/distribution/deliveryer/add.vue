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
								<span v-if="isViewPage" v-cloak>{{form.mobile}}</span>
								<el-input v-else size="small" style="width:140px"  v-model.trim="form.mobile" placeholder="手机号" maxlength="11"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="登录密码:" label-width="100px">
								<span>123456（初始密码）</span>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="用户名称:" label-width="100px" prop="name" :rules="rules.input">
								<span  v-if="isViewPage" v-cloak>{{form.name}}</span>
								<el-input v-else size="small" style="width:140px"  v-model.trim="form.name" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="在职时间:" label-width="100px">
								<span  v-if="isViewPage" v-cloak>{{form.entryTime}}</span>
      					<el-date-picker v-else style="width:140px" size="small" v-model="form.entryTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6" v-if="propsSonData.type !== 'add'">
							<el-form-item label="离职时间:" label-width="100px">
								<span v-if="isViewPage" v-cloak>{{form.departureTime}}</span>
      					<el-date-picker v-else style="width:140px" size="small" v-model="form.departureTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="驾照号:" label-width="100px" prop="driverNo" :rules="rules.input">
								<span  v-if="isViewPage" v-cloak>{{form.driverNo}}</span>
								<el-input v-else size="small" style="width:140px"  v-model.trim="form.driverNo" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="有效期:" label-width="100px" prop="effectiveTime" :rules="rules.input">
								<span  v-if="isViewPage" v-cloak>{{form.effectiveTime}}</span>
      					<el-date-picker v-else style="width:140px" size="small" v-model="form.effectiveTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="首次发证:" label-width="100px" prop="takeTime" :rules="rules.input">
								<span  v-if="isViewPage" v-cloak>{{form.takeTime}}</span>
      					<el-date-picker v-else style="width:140px" size="small" v-model="form.takeTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="是否有车:" label-width="100px" prop="carFlag" :rules="rules.input">
								<el-radio v-model="form.carFlag"  :disabled="isViewPage" label="0">有</el-radio>
								<el-radio v-model="form.carFlag"  :disabled="isViewPage" label="1">无</el-radio>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车牌号:" label-width="100px" prop="carNo" :rules="rules.input">
								<span  v-if="isViewPage" v-cloak>{{form.carNo}}</span>
								<el-input v-else size="small" style="width:140px"  v-model.trim="form.carNo" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车架号:" label-width="100px" prop="carId" :rules="rules.input">
								<span  v-if="isViewPage" v-cloak>{{form.carId}}</span>
								<el-input v-else size="small" style="width:140px"  v-model.trim="form.carId" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="发动机号:" label-width="100px" prop="engineId" :rules="rules.input">
								<span  v-if="isViewPage" v-cloak>{{form.engineId}}</span>
								<el-input v-else size="small" style="width:140px"  v-model.trim="form.engineId" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车辆品牌:" label-width="100px" prop="carBrand" :rules="rules.input">
								<span  v-if="isViewPage" v-cloak>{{form.carBrand}}</span>
								<el-input v-else size="small" style="width:140px"  v-model.trim="form.carBrand" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车辆型号:" label-width="100px" prop="carModel" :rules="rules.input">
								<span  v-if="isViewPage" v-cloak>{{form.carModel}}</span>
								<el-input v-else size="small" style="width:140px"  v-model.trim="form.carModel" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="账号状态:" label-width="100px" prop="status" :rules="rules.input" style="height: 37px;">
								<el-radio v-model="form.status" :disabled="isViewPage" label="1">启用</el-radio>
								<el-radio v-model="form.status" :disabled="isViewPage" label="0">禁用</el-radio>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="身份证号:" label-width="100px" prop="idcardNo" :rules="rules.input">
								<span  v-if="isViewPage" v-cloak>{{form.idcardNo}}</span>
								<el-input v-else size="small" style="width:140px"  v-model.trim="form.idcardNo" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6" v-if="false">
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
								<el-input type="textarea" :readonly="isViewPage" :autosize="{ minRows: 2, maxRows: 4}" size="small" style="width:180px"  v-model.trim="form.summary" placeholder="不能超过30位数" maxlength="30"></el-input>
							</el-form-item>   
						</el-col>
				</el-row>
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