<template>
    <div>
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" :inline="true">
 				<el-row>
					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="仓位编号:" prop="number" :rules="rules.select">
							<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.number"></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="仓库:" prop="stockId" :rules="rules.select">
							<el-select size="small" style="width:180px" v-model="form.stockId" placeholder="请选择">
								<el-option v-for="item in options.categoryTypeOption" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select> 
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="仓库属性-长:" prop="lasting" :rules="rules.select">
							<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.lasting"></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="仓库属性-宽:" prop="width" :rules="rules.select">
							<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.width"></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="仓库属性-高:" prop="high" :rules="rules.select">
							<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.high"></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="10" :md="8" :lg="6">
						<el-form-item label="仓位描述:">
							<el-input type="textarea" :max="2" :rows="2" size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.description"></el-input>
						</el-form-item>
					</el-col>

				</el-row>

			</el-form>
    </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { detailCW, fetchStock } from '@/api/warehouse/setting.js'

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
        description: 'TEST',
        high: 50,
        lasting: 50,
        number: null,
        stockId: '75c388de32bd4afcab7c655ed548a295',
        width: 50
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
    this.fetchStock()
  },
  methods: {
    fetchStock() {
      // 加载仓库下拉
      fetchStock().then(({ data }) => {
        for (const item of data) {
          item.label = item.title
          item.value = item.id
        }
        this.options.categoryTypeOption = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthDetail() {
      if (!this.$attrs.loadID) return
      detailCW({ id: this.$attrs.loadID }).then(({ data }) => {
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