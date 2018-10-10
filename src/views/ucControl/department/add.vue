<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules" label-width="120px" :inline="true">
				<el-form-item label="上级名称:">
					<span class="view-item" v-if="isViewPage && !propsSonData.data.title" v-cloak> {{form.code}} </span>
					<el-input v-else size="small" style="width:180px" readonly v-model.trim="propsSonData.data.title"  placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="部门编号:" prop="code" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.code}} </span>
					<el-input v-else size="small" style="width:180px" v-model.trim="form.code"  placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="部门名称:" prop="deptName" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.deptName}} </span>
					<el-input v-else size="small" style="width:180px" v-model.trim="form.deptName"  placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="部门简称:">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.shortName}} </span>
					<el-input  v-else size="small" style="width:180px" v-model.trim="form.shortName" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="简称字母:">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.shortCode}} </span>
					<el-input  v-else size="small" style="width:180px" v-model.trim="form.shortCode" placeholder="请输入"></el-input>
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

import { DepartmentUpdate, DepartmentDetail, createRow } from '@/api/uc/department.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      isViewPage: false,
      saveLoading: false,
      isUpdate: false,
      options: [],
      form: {
        'code': null,
        'deptLogo': null,
        'deptName': null,
        'parentId': null,
        'shortCode': null,
        'shortName': null
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
      DepartmentDetail({ id: this.propsSonData.data.id }).then(({ data }) => {
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
                const p = {
                  'deptLogo': data.deptLogo,
                  'deptName': data.deptName,
                  'id': data.id,
                  'shortCode': data.shortCode,
                  'shortName': data.shortName
                }
                DepartmentUpdate(p).then(res => {
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
                data.parentId = this.propsSonData.data.id
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
    margin-bottom: 16px;
	}
	.view-item{
		display: inline-block;
		width: 180px;
	}
}
</style>