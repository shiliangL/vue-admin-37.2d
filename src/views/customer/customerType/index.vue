
<!-- 客户类别 -->
<template>
	<div class="customerType">
        
    <search-bar ref="searchBar" :data="searchBarData" @add="showAdd" @search="searchAction" @reset="reset"></search-bar>

    <!-- 表格 -->
    <table-contain  :height.sync="table.maxHeight">
      <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="客户类别名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="简要说明" align="center"></el-table-column>
        <el-table-column prop="createdTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="createdName" label="创建人" align="center"></el-table-column>
        <el-table-column prop="updatedTime" label="最近修改时间" align="center"></el-table-column>
        <el-table-column prop="updatedName" label="修改人" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope" align="center">
            <el-button type="text" size="mini" @click.stop="clickToEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button type="text" size="mini" style="color:red" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        slot="footer"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>

    </table-contain>

		<!-- 弹层区域 -->
		<el-dialog :title="dialogTitle"  width="400px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
			<el-form :model="form" ref="form" :rules="rules">
				<el-form-item label="客户类别" label-width="100px" prop="title" :rules="rules.input">
					<el-input size="small" style="width:180px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
				</el-form-item>
				<el-form-item label="简要说明" label-width="100px">
					<el-input size="small" style="width:180px" type="textarea" autosize  v-model.trim="form.remark" placeholder="不能超30位数" maxlength="30"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click.stop="dialogVisible = false">取 消</el-button>
        <el-button :loading="button.loading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')">{{button.text}}</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import model from '@/public/listModel.js'
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { fetchList, create, update, detail, deleteOne } from '@/api/customer/customerType.js'

export default {
  name: 'goodsClass',
  mixins: [model, rules, addModel],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: null,
      searchBarData: [
        [
          {
            type: 'input',
            value: null,
            key: 'title',
            class: 'w180',
            placeholder: '输入名称检索'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [{ type: 'add', name: '新增' }]
      ],
      title: null,
      isEdit: false,
      form: {
        remark: null,
        title: null,
        id: null
      }
    }
  },
  mounted() {
    this.fecthList()
  },
  methods: {
    showAdd() {
      this.dialogTitle = '新增'
      this.dialogVisible = true
    },
    resetForm() {
      this.form.remark = null
      this.form.title = null
      this.$refs['form'].resetFields()
      this.$setKeyValue(this.form, { remark: null, title: null, id: null })
      this.$setKeyValue(this.button, { loading: false, text: '确定' })
    },
    searchAction(data) {
      this.title = data.title
      this.fecthList()
    },
    reset() {
      this.fecthList()
    },
    refrehList() {
      this.fecthList()
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fecthList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fecthList()
    },
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        title: this.title
      }
      fetchList(data)
        .then(({ data }) => {
          this.table.data = data.rows
          this.pagination.total = data.total
        }).catch(e => {
          this.$message({ type: 'error', message: '列表加载失败' })
        })
    },
    clickToEdit(index, item) {
      if (!item.id) return
      detail({ id: item.id })
        .then(({ data }) => {
          this.form.remark = data.remark
          this.form.title = data.title
          this.form.id = data.pk

          this.dialogTitle = '编辑'
          this.isEdit = true
          this.dialogVisible = true
        }).catch(() => {
          this.$message({ type: 'error', message: '加载失败' })
        })
    },
    clickToDelete(index, item) {
      this.$confirm('是否需要删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.pk) return
        deleteOne({ id: item.pk }).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.fecthList()
        }).catch(() => {
          this.$message({ type: 'error', message: '删除失败'
          })
        })
      }).catch(() => {})
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$setKeyValue(this.button, {
            loading: true,
            text: '提交中..'
          })
          if (this.isEdit) {
            update(this.form).then(res => {
              this.isEdit = false
              this.dialogVisible = false
              this.$setKeyValue(this.button, { loading: false, text: '确定' })
              this.$message({ type: 'success', message: `${res.msg}!` })
              this.fecthList()
            }).catch(e => {
              this.$setKeyValue(this.button, { loading: false, text: '确定' })
              this.$message({ type: 'error', message: e.msg })
            })
          } else {
            create({
              remark: this.form.remark,
              title: this.form.title
            }).then(res => {
              this.dialogVisible = false
              this.$message({ type: 'success', message: `${res.msg}!` })
              this.fecthList()
            }).catch(e => {
              this.$setKeyValue(this.button, { loading: false, text: '确定' })
              this.$message({ type: 'error', message: e.msg })
            })
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

<style lang="scss" scoped>
.customerType {
    .el-form-item {
        margin: 0;
    }
}
</style>
