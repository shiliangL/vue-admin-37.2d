<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules" label-width="110px" :inline="true" style="margin-top: -20px;">

				<el-form-item label="所选用户:">
					<span class="view-item" v-cloak> {{propsSonData.data.staffName}} </span>
				</el-form-item>
				<el-form-item label="账号名称:">
					<span class="view-item" v-cloak> {{propsSonData.data.loginName}} </span>
				</el-form-item>
				
				<div></div>
				<el-form-item label="授予角色:"></el-form-item>
				<div class="box">
					<span v-for="item in form.treeData" :key="item.pk">
						<el-checkbox class="item-checkbox" v-model="item.isCheck" :label="item.number"> {{item.roleName}} </el-checkbox>
					</span>
				</div>
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

import { list4operator, list4RelateRole, addRole } from '@/api/uc/roleControl.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      saveLoading: false,
      isUpdate: false,
      form: {
        treeData: []
      }
    }
  },
  mounted() {
    this.list4RelateRole()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    list4RelateRole() {
      // 可以分配角色
      list4RelateRole().then(({ data }) => {
        if (Array.isArray(data)) {
          for (const item of data) {
            item.isCheck = false
          }
        }
        const resultData = data
        if (this.propsSonData.data.id) {
          list4operator({ id: this.propsSonData.data.id }).then(({ data }) => {
            for (const item of data) {
              for (const key of resultData) {
                if (item.id === key.id) key.isCheck = true
              }
            }
            this.form.treeData = resultData
          }).catch(e => {
            this.$message({ type: 'error', message: e.msg })
          })
        } else {
          this.form.treeData = resultData
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
                const data = JSON.parse(JSON.stringify(this.form.treeData))
                const roleIDs = []
                for (const item of data) {
                  if (item.isCheck) roleIDs.push(item.id)
                }
                const p = {
                  'id': this.propsSonData.data.id,
                  roleIDs: roleIDs
                }
                addRole(p).then(res => {
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
    margin-bottom: 0px;
	}
	.view-item{
		display: inline-block;
		width: 140px;
	}

	.box{
    text-align: left;
    width: 90%;
    min-height: 120px;
		overflow-y: auto;
    border-radius: 4px;
    padding: 5px 5px;
    border: 1px solid #d9d9d9;
    margin: 0 auto;
 }
 .item-checkbox{
		margin-right: 10px;
 }
}
</style>