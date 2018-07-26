<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules">
				<el-row>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="岗位角色:" label-width="100px" prop="title" :rules="rules.input">
								<span>配送员</span>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="用户账号:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="手机号" maxlength="11"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="登录密码:" label-width="100px" prop="title" :rules="rules.input">
								<span>123456（初始密码）</span>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="用户名称:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="在职时间:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="身份证图片:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="驾照号:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="有效期:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="首次发证:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="是否有车:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车牌号:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车架号:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="发动机号:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车辆品牌:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="车辆型号:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="账号状态:" label-width="100px" prop="title" :rules="rules.input">
								<el-input size="small" style="width:140px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
							</el-form-item>   
						</el-col>
						<el-col :xs="24" :sm="10" :md="8" :lg="6">
							<el-form-item label="身份证号:" label-width="100px" prop="title" :rules="rules.input">
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
							<el-form-item label="车辆信息:" label-width="100px" prop="title" :rules="rules.input">
								<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" size="small" style="width:180px"  v-model.trim="form.title" placeholder="不能超过30位数" maxlength="30"></el-input>
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
export default {
  mixins: [rules],
  data() {
    return {
      saveLoading: false,
      isUpdate: false,
      form: {
        remark: null,
        stockId: null,
        tableNo: null,
        title: null
      },
      stockOption: []
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('x')
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