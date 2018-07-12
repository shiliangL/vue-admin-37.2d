<template>
    <div>
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" :inline="true">
 				<el-row>
					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="仓库名称:" prop="title" :rules="rules.select">
							<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="仓库类别:" prop="categoryId" :rules="rules.select">
							<el-select size="small" style="width:180px" v-model="form.categoryId" placeholder="请选择" clearable filterable>
								<el-option v-for="item in options.categoryTypeOption" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select> 
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="仓管员:" prop="staffId" :rules="rules.select">
							<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.staffId"></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="联系人:" prop="contacts" :rules="rules.select">
							<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.contacts"></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="联系电话:" prop="phone" :rules="rules.select">
							<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.phone"></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="地址:">
							<el-input type="textarea" :max="2" :rows="2" size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.address"></el-input>
						</el-form-item>
					</el-col>

				</el-row>

			</el-form>
    </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { detailCK, stockCategory } from '@/api/warehouse/setting.js'

export default {
  mixins: [rules, addModel],
  props: {
    viewData: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        address: null,
        categoryId: '38c8320378a84c75a44de71f4d6b3928',
        contacts: null,
        description: null,
        phone: null,
        staffId: null,
        title: null
      },
      options: {
        categoryTypeOption: []
      }
    }
  },
  mounted() {
    if (this.$attrs.loadID) {
      this.fecthDetail()
    }
    this.fecthStockCategory()
  },
  methods: {
    fecthStockCategory() {
      // 加载仓库类别下拉
      stockCategory().then(({ data }) => {
        for (const item of data) {
          item.label = item.title
          item.value = item.pk
        }
        this.options.categoryTypeOption = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthDetail() {
      if (!this.$attrs.loadID) return
      detailCK({ id: this.$attrs.loadID }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        // this.loadingText = e.msg
      })
    },
    validateForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('update:isPass', true)
          this.$emit('input', this.form)
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          this.$emit('update:isPass', false)
          return
        }
      })
    }
  }

}
</script>

<style scoped lang="scss">
</style>