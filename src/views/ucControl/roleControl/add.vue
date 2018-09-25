<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules" label-width="120px" :inline="true">
				<el-form-item label="角色编码:" prop="code" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.code}} </span>
					<el-input v-else size="small" style="width:180px" :disabled="propsSonData.type === 'isUpdate'" v-model.trim="form.code"  placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="角色名称:" prop="roleName" :rules="rules.input">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.roleName}} </span>
					<el-input  v-else size="small" style="width:180px" v-model.trim="form.roleName" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="备注信息:">
					<span class="view-item" v-if="isViewPage" v-cloak> {{form.remark}} </span>
					<el-input v-else size="small" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="form.remark" style="width:180px" type="textarea" placeholder="不能超30位数"></el-input>
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

import { updateRow, fetchDetail, createRow } from '@/api/uc/roleControl.js'

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
        'remark': null,
        'roleName': null
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
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // fetchTypeDropDown() {
    //   fetchTypeDropDown().then(({ data }) => {
    //     if (Array.isArray(data)) {
    //       this.options = data
    //     }
    //   }).catch(e => {
    //     this.$message({ type: 'error', message: e.msg })
    //   })
    // },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.saveLoading = true
              if (this.propsSonData.isUpdate) {
                const data = JSON.parse(JSON.stringify(this.form))
                const p = {
                  'id': data.id,
                  'remark': data.remark,
                  'roleName': data.roleName
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
		width: 180px;
	}
}
</style>