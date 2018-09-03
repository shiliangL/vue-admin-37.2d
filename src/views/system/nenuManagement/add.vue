<template>
		<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form" style="margin-top: -25px;">
			<div style="padding-left: 70px;">
				<!-- <el-form-item label="父级节点:">
					<el-input style="width:220px;" readonly size="small" v-model="form.resourceTitle" auto-complete="off"></el-input>
				</el-form-item> -->
				<el-form-item label="菜单名称:" prop="resourceTitle" :rules="rules.input">
					<el-input style="width:220px;" size="small" v-model="form.resourceTitle" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="组织类型:" prop="orgType" :rules="rules.select">
					<el-select style="width:220px;" size="small" v-model="form.orgType" filterable placeholder="请选择" :disabled="propsSonData.isUpdate===1">
						<el-option v-for="(sub,index) in options" :key="index" :label="sub.title" :value="sub.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单图标:">
					<el-input style="width:220px;" size="small" v-model="form.resourceIcon" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="菜单排序:" prop="ordersIndex" :rules="rules.input">
					<el-input-number size="small" style="width:220px;" v-model="form.ordersIndex" :min="1" :max="1000"></el-input-number>
				</el-form-item>
				<el-form-item label="路由地址:">
					<el-input style="width:220px;" size="small" type="text" v-model="form.resourceUrl" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注:">
					<el-input size="small" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="form.remark2" style="width:220px" type="textarea" placeholder="不能超30位数" maxlength="30"></el-input>
				</el-form-item>
			</div>
			<div style="text-align: center;padding-top: 10px;">
				<el-button size="small" @click.stop="closeForm">取消</el-button>
				<el-button size="small" type="primary" @click.stop="submitForm">确定</el-button>
			</div>
	</el-form>
</template>

<script>
import { fetchTypeDropDown, createModule, createMenu, updateMenu, createPage } from '@/api/system/nenuManagement.js'
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      options: [],
      form: {
        'resourceIcon': '',
        'resourceTitle': '',
        'orgType': '',
        'ordersIndex': '',
        'resourceUrl': '',
        'remark2': ''
      }
    }
  },
  mounted() {
    this.fetchTypeDropDown()
    if (this.propsSonData.isUpdate === 1) {
      this.form.resourceIcon = this.propsSonData.data.icon
      this.form.resourceTitle = this.propsSonData.data.title
      this.form.orgType = this.propsSonData.data.orgType
      this.form.ordersIndex = this.propsSonData.data.ordersIndex
      this.form.resourceUrl = this.propsSonData.data.resourceUrl
      this.form.remark2 = this.propsSonData.data.remark2
    }
  },
  computed: {
  },
  methods: {
    closeForm() {
      this.$emit('close')
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
    createModule() {
      createModule(this.form).then(res => {
        this.$message({ type: 'success', message: '创建成功!' })
        this.$emit('add')
        this.closeForm()
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    createMenu() {
      const data = JSON.parse(JSON.stringify(this.form))
      data.parentId = this.propsSonData.data.id
      createMenu(data).then(res => {
        this.$message({ type: 'success', message: '创建成功!' })
        this.$emit('add')
        this.closeForm()
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    createPage() {
      const data = JSON.parse(JSON.stringify(this.form))
      data.parentId = this.propsSonData.data.id
      createPage(data).then(res => {
        this.$message({ type: 'success', message: '创建成功!' })
        this.$emit('add')
        this.closeForm()
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    updateMenu() {
      const data = JSON.parse(JSON.stringify(this.form))
      delete data.orgType
      data.id = this.propsSonData.data.id
      data.parentId = this.propsSonData.data.parentId
      updateMenu(data).then(res => {
        this.$message({ type: 'success', message: '更新成功!' })
        this.$emit('add')
        this.closeForm()
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.propsSonData.isUpdate && this.propsSonData.isUpdate === 2) {
            this.createModule()
          } else if (this.propsSonData.isUpdate && this.propsSonData.isUpdate === 1) {
            this.updateMenu()
          } else {
            if (!this.propsSonData.data.parentId) {
              this.createMenu()
            } else {
              this.createPage()
            }
          }
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