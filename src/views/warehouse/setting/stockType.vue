<template>
    <div>
			<el-row>
				<el-table :data="table" class="table" size="small" :max-height="300" style="width: 100%;" highlight-current-row>
					<el-table-column label="序号" width="50" align="center">
						<template slot-scope="scope">
							<span>{{scope.$index + 1}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="title" label="仓库类别名称" align="center"></el-table-column>
					<el-table-column prop="remark" label="描述" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="180">
						<template slot-scope="scope" align="center">
							<el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
							<el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index,scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="footer-block">
					<span class="page" v-cloak> 共 {{table.length}} 条</span>
				</div>
			</el-row>

			<el-dialog width="450px" :title="dialogTitle" :visible.sync="innerVisible" append-to-body @close="clickReset">
				<el-form :model="form" :rules="rules" ref="form" label-width="120px" :inline="true">
					<el-form-item label="仓库类别名称:" prop="title" :rules="rules.input">
						<el-input size="small" style="width:180px" maxlength="10" class="w180"  placeholder="小于10字" v-model.trim="form.title"></el-input>
					</el-form-item>
					<el-form-item label="描述:">
						<el-input size="small" type="textarea" maxlength="30"  :rows="1" style="width:180px" class="w180"  placeholder="小于30字" v-model.trim="form.remark"></el-input>
					</el-form-item>
					<div class="footer-block">
						<el-button size="small" type="primary"  @click.stop="clickToEditorSave">保存</el-button>
						<el-button size="small" @click.stop="clickReset">取消</el-button>
					</div>
				</el-form>
			</el-dialog>

    </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { stockCategory, createType, deleteType, updateType, detailType } from '@/api/warehouse/setting.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      innerVisible: false,
      isEditor: false,
      dialogTitle: '',
      form: {
        remark: null,
        title: null
      },
      table: [],
      options: {
        categoryTypeOption: []
      }
    }
  },
  mounted() {
    this.stockCategory()
  },
  methods: {
    stockCategory() {
      stockCategory().then(({ data }) => {
        this.table = data
      }).catch(e => {
        // this.loadingText = e.msg
      })
    },
    clickToAddNew() {
      this.dialogTitle = '新增仓库类别'
      this.innerVisible = true
      this.isEditor = false
      this.$setKeyValue(this.form, { remark: null, title: null })
    },
    clickReset() {
      this.innerVisible = false
      this.isEditor = false
      this.$setKeyValue(this.form, { remark: null, title: null })
      this.$refs['form'].resetFields()
    },
    clickToEditorSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (!this.isEditor) {
            createType(this.form).then((res) => {
              this.$message({ type: 'success', message: `${res.msg}!` })
              this.clickReset()
              this.stockCategory()
            }).catch(e => {
              this.$message({ type: 'error', message: e.msg })
            })
          } else {
            const data = {
              id: this.form.pk,
              remark: this.form.remark,
              title: this.form.title
            }
            updateType(data).then((res) => {
              this.$message({ type: 'success', message: `${res.msg}!` })
              this.clickReset()
              this.stockCategory()
            }).catch(e => {
              this.$message({ type: 'error', message: e.msg })
            })
          }
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    clickToDelete(index, item) {
      this.$confirm('是否需要删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteType({ id: item.pk })
            .then(res => {
              this.$message({
                type: 'success',
                message: `${res.msg}!`
              })
              this.stockCategory()
            })
            .catch(e => {
              this.$message({ type: 'error', message: e.msg })
            })
        })
        .catch(() => {})
    },
    clickToEditor(index, item) {
      detailType({ id: item.pk }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
        this.dialogTitle = '编辑仓库类别'
        this.innerVisible = true
        this.isEditor = true
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.table {
    .el-form-item {
        margin-bottom: 0 !important;
    }
}
</style>