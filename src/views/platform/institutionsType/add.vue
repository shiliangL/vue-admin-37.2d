<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules"  style="padding-left: 60px;">
					<el-form-item label="机构类型编码:" label-width="120px" prop="code" :rules="rules.input">
						<el-input size="small" style="width:180px" :disabled="propsSonData.type === 'isUpdate'" v-model.trim="form.code" placeholder="请输入" maxlength="11"></el-input>
					</el-form-item>
					<el-form-item label="机构类型名称:" label-width="120px" prop="title" :rules="rules.input">
						<el-input size="small" style="width:180px" v-model.trim="form.title" placeholder="请输入" maxlength="11"></el-input>
					</el-form-item>  
					<el-form-item label="机构类型简称:" label-width="120px" >
						<el-input size="small" style="width:180px" v-model.trim="form.shortTitle" placeholder="请输入" maxlength="11"></el-input>
					</el-form-item>
					<el-form-item label="备注信息:" label-width="120px">
						<el-input size="small" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="form.remark" style="width:180px" type="textarea" placeholder="不能超30位数" maxlength="30"></el-input>
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

import { updateRow, fetchDetail, createRow } from '@/api/platform/institutionsType.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      isViewPage: false,
      saveLoading: false,
      isUpdate: false,
      form: {
        'title': null,
        'code': null,
        'shortTitle': null,
        'orgLogoFileId': null,
        'remark': null
      }
    }
  },
  mounted() {
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
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.saveLoading = true
              if (this.propsSonData.isUpdate) {
                const data = JSON.parse(JSON.stringify(this.form))
                delete data.code
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
}
</style>