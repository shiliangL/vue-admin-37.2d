<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules" label-width="120px" :inline="true">

				<template v-if="propsSonData.type === 'add'">
					<el-form-item label="登录账号:" prop="loginName" :rules="rules.input">
						<span class="view-item" v-if="isViewPage" v-cloak> {{form.loginName}} </span>
						<el-input v-else size="small" style="width:160px" v-model.trim="form.loginName" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="登录密码:" prop="password" :rules="rules.input">
						<span class="view-item" v-if="isViewPage" v-cloak> {{form.password}} </span>
						<el-input v-else size="small" style="width:160px" v-model.trim="form.password" placeholder="请输入"></el-input>
					</el-form-item>
				</template>

				<el-form-item label="机构名称:" prop="title" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.title}} </span>
					<el-input v-else size="small" style="width:160px" v-model.trim="form.title" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="机构类型:" prop="orgTypeCode" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.orgTypeName}} </span>
					<el-select v-else style="width:160px;" size="small" v-model="form.orgTypeCode" filterable placeholder="请选择" :disabled="propsSonData.type === 'isUpdate'">
						<el-option v-for="(sub,index) in options" :key="index" :label="sub.title" :value="sub.code"></el-option>
					</el-select>
				</el-form-item>  
				<el-form-item label="法人代表:" prop="contactPerson" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.contactPerson}} </span>
					<el-input  v-else size="small" style="width:160px" v-model.trim="form.contactPerson" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="法人电话:" prop="telephone" :rules="rules.select">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.telephone}} </span>
					<el-input v-else size="small" style="width:160px" v-model.trim="form.telephone" maxlength="11" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="机构邮箱:">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.email}} </span>
					<el-input  v-else size="small" style="width:160px" v-model.trim="form.email" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="机构全称:" prop="fullName" :rules="rules.select">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.fullName}} </span>
					<el-input  v-else size="small" style="width:160px" v-model.trim="form.fullName" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="机构简称:">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.shortName}} </span>
					<el-input  v-else size="small" style="width:160px" v-model.trim="form.shortName" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="机构代码:">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.shortCode}} </span>
					<el-input v-else size="small" style="width:160px" v-model.trim="form.shortCode" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="机构网址:">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.website}} </span>
					<el-input  v-else size="small" style="width:160px" v-model.trim="form.website" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="机构简介:">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.summary}} </span>
					<el-input v-else size="small" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="form.summary" style="width:160px" type="textarea" placeholder="不能超30位数"></el-input>
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

import { updateRow, fetchDetail, createRow, fetchTypeDropDown } from '@/api/platform/institutionsList.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      isViewPage: false,
      saveLoading: false,
      isUpdate: false,
      options: [],
      form: {
        'contactPerson': null,
        'email': null,
        'fullName': null,
        'loginName': null,
        'orgLogoId': null,
        'orgTypeCode': null,
        'parentId': null,
        'password': null,
        'remark': null,
        'shortCode': null,
        'shortName': null,
        'summary': null,
        'telephone': null,
        'title': null,
        'website': null
      }
    }
  },
  mounted() {
    this.fetchTypeDropDown()
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
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fetchTypeDropDown() {
      fetchTypeDropDown().then(({ data }) => {
        if (Array.isArray(data)) {
          this.options = data
        }
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
                  'contactPerson': data.contactPerson,
                  'email': data.email,
                  'fullName': data.fullName,
                  'id': data.id,
                  'orgLogoId': data.orgLogoId,
                  'remark': data.remark,
                  'shortCode': data.shortCode,
                  'shortName': data.shortName,
                  'summary': data.summary,
                  'telephone': data.telephone,
                  'title': data.title,
                  'website': data.website
                }
                updateRow(p).then(res => {
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
    margin-bottom: 18px;
	}
	.view-item{
		display: inline-block;
		width: 160px;
	}
}
</style>