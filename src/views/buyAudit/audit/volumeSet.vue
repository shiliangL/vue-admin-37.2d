<template>
    <div class="changeDialog">
			<el-form :model="form" :rules="rules" ref="form" :inline="true">

        <div>
          <div>
            <el-radio v-model="form.radio" label="1">按一级分类</el-radio>
            <el-radio v-model="form.radio" label="2">按二级分类</el-radio>
          </div>

          <div class="type">
            <el-form-item label="批量分类:" prop="levelA"  :rules="rules.select" v-if="form.radio==='1'">
              <el-select size="small" v-model="form.levelA" filterable placeholder="请选择">
                <el-option v-for="(sub,index) in optons.levelA" :key="index" :label="sub" :value="sub"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="批量分类:" prop="levelB"  :rules="rules.select" v-else>
              <el-select size="small" v-model="form.levelB" filterable placeholder="请选择">
                <el-option v-for="(sub,index) in optons.levelB" :key="index" :label="sub" :value="sub"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <el-form-item label="采购员批量设置为:" prop="saler"  :rules="rules.select">
            <el-select size="small" v-model="form.saler" filterable placeholder="请选择" style="width: 133px;">
              <el-option v-for="sub in optons.salerList" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
            </el-select>
					</el-form-item>

        </div>
				 <!-- 表格 -->
        <!-- <el-table :data="form.table" size="small" :max-height="300" style="width: 100%;" highlight-current-row>
          
					<el-table-column prop="categoryName" label="商品分类" align="center"> </el-table-column>
					<el-table-column prop="productName" label="商品名称" align="center"> </el-table-column>
					<el-table-column prop="personnelNames" label="采购员" align="center"> </el-table-column>
          
        </el-table> -->
       	<!-- <div class="footer-block">
					<span class="page" v-cloak> 共 {{form.table.length}} 条</span>
				</div> -->

			</el-form>

			<div class="footer-block">
				<el-button type="primary" size="small" @click.stop="submitForm('form')">确 定</el-button>
				<el-button size="small" @click.stop="close">取 消</el-button>
			</div>

    </div>
</template>

<script>
import { fecthMemberSelect } from '@/api/members.js'
import rules from '@/public/rules.js'
export default {
  name: 'changeDialog',
  props: {
    value: {
      type: Array
    }
  },
  mixins: [rules],
  data() {
    return {
      form: {
        radio: '1',
        saler: null,
        levelA: null,
        levelB: null,
        table: []
      },
      optons: {
        salerList: [],
        type: [],
        levelA: [],
        levelB: []
      }
    }
  },
  created() {
    if (this.value) {
      const data = JSON.parse(JSON.stringify(this.value))
      this.optons.levelA = []
      this.optons.levelB = []
      for (const item of data) {
        const arr = item.categoryName.split('/')
        if (arr[0] && !this.optons.levelA.includes(arr[0])) this.optons.levelA.push(arr[0])
        if (!this.optons.levelB.includes(item.categoryName)) this.optons.levelB.push(item.categoryName)
      }
      this.form.table = data
    }
  },
  mounted() {
    this.fecthSalerList()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    fecthSalerList() {
      fecthMemberSelect({ staffType: 2 }).then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          this.optons.salerList = data
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))
          for (const item of this.optons.salerList) {
            if (item.value === data.saler) {
              data.salerName = item.label
            }
          }
          const result = {
            level: this.form.radio === '1',
            personnelName: data.salerName,
            personnelId: data.saler,
            categoryName: this.form.radio === '1' ? this.form.levelA : this.form.levelB
          }
          this.$emit('callBack', result)
          this.$emit('close')
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
.changeDialog{
	.el-form-item{
    margin-bottom: 0px;
	}
	.handler-icon{
		display: inline-block;
		cursor: pointer;
		i{
			display: inline-block;
		}
  }
  .type{
    margin: 10px 0;
  }
}
</style>         