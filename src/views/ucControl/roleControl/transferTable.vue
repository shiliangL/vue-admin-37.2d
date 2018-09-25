<template>
    <div class="transferTable" style="margin-top: -20px;">
			<el-form :model="form" ref="form" class="form" :rules="rules" :inline="true">
          <div class="tree">
            <el-tree ref="leftTree"
              accordion
              show-checkbox
              :highlight-current="true" 
              :data="form.tbaleLeft"
              :default-checked-keys="defaultArr"
              :filter-node-method="filterNode" 
              :props="defaultProps" node-key="id">
            </el-tree>
          </div>
			</el-form>
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
import { resetTreeData } from '@/utils/resetTreeData.js'
import { roleRelated, fetchMenuByRole } from '@/api/uc/roleControl.js'

export default {
  mixins: [rules, addModel],
  name: 'transferTable',
  data() {
    return {
      isViewPage: false,
      saveLoading: false,
      isUpdate: false,
      defaultArr: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        tbaleLeft: [],
        tbaleRight: []
      }
    }
  },
  mounted() {
    this.fetchMenuByRole()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    fetchMenuByRole() {
      if (!this.propsSonData.data.id) return
      fetchMenuByRole({ id: this.propsSonData.data.id }).then(({ data }) => {
        const treeData = resetTreeData(data)
        const ids = []
        for (const item of data) {
          if (item.flag) ids.push(item.id)
        }
        this.form.tbaleLeft = treeData
        setTimeout(() => { this.defaultArr = ids }, 200)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              if (!this.propsSonData.data.id) return
              this.saveLoading = true
              const d = this.$refs['leftTree'].getCheckedNodes() || []
              const ids = d.map(item => item.id)
              const p = {
                resouceIds: ids,
                roleId: this.propsSonData.data.id
              }
              roleRelated(p).then(res => {
                if (res.code !== '0') return
                this.saveLoading = false
                this.$message({ type: 'success', message: `资源分配成功，重登后生效` })
                this.$emit('close')
              }).catch(e => {
                this.saveLoading = false
                this.$message({ type: 'error', message: e.msg })
              })
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
	.tree{
		height: 300px;
    overflow-y: auto;
	}
  .arrowList{
		height: 300px;
    padding-top: 140px;
  }
</style>