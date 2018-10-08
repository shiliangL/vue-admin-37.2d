<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules"  style="padding-left: 60px;">
					<el-form-item label="调价基准:" label-width="100px" prop="mobile" :rules="rules.input">
						<span v-if="propsSonData.isUpdate" v-cloak>{{form.mobile}}</span>
						<el-input v-else size="small" style="width:180px"  v-model.trim="form.mobile" placeholder="手机号" maxlength="11"></el-input>
					</el-form-item>
					<el-form-item label="调价方向:" label-width="100px" prop="name" :rules="rules.input">
						<span v-if="isViewPage" v-cloak>{{form.name}}</span>
						<el-input v-else size="small" style="width:180px"  v-model.trim="form.name" placeholder="" maxlength="11"></el-input>
					</el-form-item>
					<el-form-item label="调价方式:" label-width="100px">
						<span  v-if="isViewPage" v-cloak>{{form.beginTime}}</span>
						<el-date-picker v-else :picker-options="startTimeLimit(form.endTime)" style="width:180px" size="small" v-model="form.beginTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
					</el-form-item>  
					<el-form-item label="数值:" label-width="100px" v-if="this.propsSonData.type!=='add'">
						<span v-if="isViewPage" v-cloak>{{form.endTime}}</span>
						<el-date-picker v-else :picker-options="endTimeLimit(form.beginTime)" style="width:180px" size="small" v-model="form.endTime" value-format="yyyy-MM-dd" type="date"></el-date-picker>
					</el-form-item>
			</el-form>
			<div class="footer-block" v-if="!isViewPage">
				<el-button size="small" @click.stop="close">取 消</el-button>
				<el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
			</div>
    </div>
</template>

<script>
import { startTimeLimit, endTimeLimit } from '@/public/limitTime.js'
import rules from '@/public/rules.js'
import addModel from '@/public/addModel.js'
import { createRow, fetchDetail, updateRow } from '@/api/customer/customerManager.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      isViewPage: false,
      saveLoading: false,
      isUpdate: false,
      form: {
        'beginTime': '',
        'endTime': '',
        'id': null,
        'mobile': null,
        'name': null,
        'operatorId': null,
        'staffId': null,
        'status': '1'
      },
      stockOption: []
    }
  },
  mounted() {
    if (this.propsSonData.isUpdate) {
      this.isViewPage = this.propsSonData.type === 'view'
      fetchDetail({ id: this.propsSonData.data.id }).then(({ data }) => {
        data.status = data.status + ''
        if (data.beginTime == null) { data.beginTime = '' }
        if (data.endTime == null) { data.endTime = '' }
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    }
  },
  methods: {
    startTimeLimit,
    endTimeLimit,
    close() {
      this.$emit('close')
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.saveLoading = true
              if (this.propsSonData.isUpdate) {
                const data = JSON.parse(JSON.stringify(this.form))
                data.status = parseInt(this.form.status)
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
                data.status = parseInt(this.form.status)
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