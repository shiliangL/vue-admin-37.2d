<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules" label-width="120px" :inline="true">
				<el-form-item label="员工姓名:" prop="staffName" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.staffName}} </span>
					<el-input v-else size="small" style="width:160px" v-model.trim="form.staffName"  placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="员工性别:" prop="gender" :rules="rules.input">
          <div style="width:160px">
            <el-radio v-model="form.gender" label="0">女</el-radio>
            <el-radio v-model="form.gender" label="1">男</el-radio>
          </div>
				</el-form-item>
				<el-form-item label="员工工号:" prop="jobNumber" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.jobNumber}} </span>
					<el-input v-else size="small" style="width:160px" v-model.trim="form.jobNumber"  placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="职位:" prop="position" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.position}} </span>
					<el-input v-else size="small" style="width:160px" v-model.trim="form.position"  placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="所属部门:" prop="departmentId" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.departmentId}} </span>
          <el-select  v-else size="small" style="width:160px" v-model="form.departmentId" filterable placeholder="选择职位">
	  				<el-option v-for="sub in selectOption" :key="sub.id" :label="sub.title" :value="sub.id"></el-option>
  				</el-select>
				</el-form-item>
				<el-form-item label="进入部门时间:"  prop="startTime" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.startTime}} </span>
          <el-date-picker v-else  :style="{width:'160px'}" size="small" v-model="form.startTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择"></el-date-picker>
				</el-form-item>
				<el-form-item label="手机号:" prop="mobile" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.mobile}} </span>
					<el-input v-else size="small" style="width:160px" v-model.trim="form.mobile" maxlength="11" placeholder="请输入"></el-input>
				</el-form-item>
			 
			</el-form>
			<!-- 说明 -->
			<!-- 机构 LOGO -->
			<div class="footer-block" v-if="!isViewPage">
				<el-button size="small" @click.stop="close">取 消</el-button>
				<el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
			</div>
    </div>
</template>

<script>
import rules from '@/public/rules.js'
import addModel from '@/public/addModel.js'

import { updateRow, fetchDetail, createDepartment } from '@/api/uc/department.js'

export default {
  mixins: [rules, addModel],
  props: {
    selectOption: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isViewPage: false,
      saveLoading: false,
      isUpdate: false,
      options: [],
      form: {
        'departmentInfo': [
          // {
          //   'departmentId': null, // 部门id
          //   'endTime': '', // 员工离开该部门时间
          //   'startTime': '' // 员工进入该部门时间
          // }
        ],

        'departmentId': null, // 部门id
        'endTime': '', // 员工离开该部门时间
        'startTime': '', // 员工进入该部门时间

        'departureTime': '', // 离职时间
        'email': null, // 邮箱
        'emergencyPerson': null, // 紧急联系人姓名
        'emergencyPhone': null, // 紧急联系人电话
        'entryTime': '', // 入职时间
        'gender': '0', // 员工性别
        'jobNumber': null, // 员工工号
        'mobile': null, // 手机号
        'photoFileId': null, // 员工照片
        'position': null, // 职位
        'qqNumber': null, // qq
        'staffName': null, // 员工姓名
        'telphone': null, // 座机电话
        'wechat': null // 微信
      }
    }
  },
  mounted() {
    this.isViewPage = this.propsSonData.type === 'isView'
    if (this.propsSonData.isUpdate) {
      this.fetchDetail()
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    fetchDetail() {
      if (!this.propsSonData.data.id) return
      fetchDetail({ id: this.propsSonData.data.id }).then(({ data }) => {
        if (data.departmentInfo.length) {
          data.departmentId = data.departmentInfo[0].departmentId
          data.endTime = data.departmentInfo[0].endTime
          data.startTime = data.departmentInfo[0].startTime
        }
        data.gender = data.gender + ''
        this.form = Object.assign(this.form, data)
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
              if (this.propsSonData.isUpdate) {
                const data = JSON.parse(JSON.stringify(this.form))
                data.startTime = `${data.startTime} 00:00:00`
                data.endTime = data.endTime ? `${data.endTime} 00:00:00` : ''
                data.gender = Number(data.gender)
                data.departmentInfo = [{
                  departmentId: data.departmentId,
                  endTime: data.endTime,
                  startTime: data.startTime
                }]
                delete data.departmentId
                delete data.endTime
                delete data.startTime
                delete data.operatorName
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
                data.startTime = `${data.startTime} 00:00:00`
                data.endTime = data.endTime ? `${data.endTime} 00:00:00` : ''
                data.gender = Number(data.gender)
                data.departmentInfo = [{
                  departmentId: data.departmentId,
                  endTime: data.endTime,
                  startTime: data.startTime
                }]
                delete data.departmentId
                delete data.endTime
                delete data.startTime
                createDepartment(data).then(res => {
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
    margin-bottom: 16px;
	}
	.view-item{
		display: inline-block;
		width: 180px;
	}
}
</style>