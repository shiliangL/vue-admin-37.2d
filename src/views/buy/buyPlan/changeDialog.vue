<template>
    <div class="changeDialog">

			<el-form :model="form" :rules="rules" ref="form" >
				 <!-- 表格 -->
				  <!-- v-if="form.table && form.table.length>1" -->
        <el-table :data="form.table" size="small" :max-height="300" style="width: 100%;" highlight-current-row>

          <el-table-column label="操作" align="center" width="90">
            <template slot-scope="scope" align="center">
							<span class="handler-icon" @click.stop="clickToAdd" >
								<i class="el-icon-plus"></i>
							</span>
							<span class="handler-icon" @click.stop="clickToDelete(scope.$index, scope.row)">
								<i class="el-icon-minus"></i>
							</span>
            </template>
          </el-table-column>

          <el-table-column prop="quantity" label="采购量" align="center" width="180">
             <template slot-scope="scope">

							<el-form-item label="" label-width="0px" :prop="'table'+scope.$index+'.quantity'" :rules="[{trigger: 'change', validator: rules.validNumberR2}]">
								<el-input size="small" class="w110" @change="changeNumber(scope.row)" placeholder="请输入" v-model.trim="scope.row.quantity"></el-input>
							</el-form-item>

            </template>
          </el-table-column>

          <el-table-column prop="goodsImage" label="采购员/供应商" align="center">
             <template slot-scope="scope">
               <CascaderBox></CascaderBox>
            </template>
          </el-table-column>
 
        </el-table>
 

			</el-form>

			<div class="footer-block">
				<el-button type="primary" size="small" @click.stop="dialogFormVisible = false">确 定</el-button>
				<el-button size="small" @click.stop="close">取 消</el-button>
			</div>

    </div>
</template>

<script>
import { CascaderBox } from '@/components/base.js'
export default {
  name: 'changeDialog',
  components: {
    CascaderBox
  },
  data() {
    return {
      form: {
        table: [{
          'personnelId': 'string', // 人员id(供应商/采购员)
          'personnelName': 'string', // 人员姓名(供应商/采购员)
          'purchaseType': 0, // 采购类型(1:市场自采,2:供应商直供)
          'quantity': 0 // 数量
        }]
      },
      rules: {
        validNumberR2: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    clickToAdd() {
      this.form.table.push({
        'personnelId': 'string', // 人员id(供应商/采购员)
        'personnelName': 'string', // 人员姓名(供应商/采购员)
        'purchaseType': 0, // 采购类型(1:市场自采,2:供应商直供)
        'quantity': 0 // 数量
      })
    },
    clickToDelete(index, item) {
      if (this.form.table.length > 1) {
        this.form.table.splice(index, 1)
      } else {
        this.$message({ type: 'warning', message: '不能为空' })
      }
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
}
</style>         