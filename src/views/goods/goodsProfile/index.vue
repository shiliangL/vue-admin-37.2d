 
<!-- 辅助材料 -->
 
<template>
	<div class="goodsProfile">
        
    <search-bar ref="searchBar" :data="searchBarData" @add="showAdd" @search="searchAction" @reset="reset"></search-bar>

    <!-- 表格 -->
    <div>
      <el-table :data="table.data" slot="table" :size="table.size" max-height="420" style="width: 100%;" highlight-current-row>
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="计量单位名称" align="center"></el-table-column>
        <el-table-column prop="summary" label="简要介绍" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="230">
          <template slot-scope="scope" align="center">
            <el-button type="text" size="mini" @click.stop="clickToUp(scope.$index,scope.row)"><i class="el-icon-sort-up"></i></el-button>
            <el-button type="text" size="mini" @click.stop="clickToDown(scope.$index,scope.row)"><i class="el-icon-sort-down"></i></el-button>
            <el-button type="text" size="mini" @click.stop="clickToEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer-block" style="font-size: 14px;color: #747474;">
        <span class="page" v-cloak> 共 {{table.data.length}} 条</span>
      </div>
    </div>

		<!-- 弹层区域 -->
		<el-dialog :title="dialogTitle"  width="400px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
			<el-form :model="form" ref="form" :rules="rules">
				<el-form-item label="名称" label-width="100px" prop="title" :rules="rules.input">
					<el-input size="small" style="width:180px"  v-model.trim="form.title" placeholder="不能超过6位数" maxlength="6"></el-input>
				</el-form-item>
				<el-form-item label="备注" label-width="100px">
					<el-input size="small" style="width:180px" type="textarea" autosize  v-model.trim="form.summary" placeholder="不能超100位数" maxlength="100"></el-input>
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
import { packagingList, createPackaging, deletePackaging, packagingInfo, packagingUpdate, updateSort } from '@/api/goodsProfile.js'

export default {
  name: 'goodsClass',
  components: {},
  mixins: [model, rules, addModel],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: null,
      searchBarData: [[
        { type: 'input', value: null, key: 'title', class: 'w180', placeholder: '输入名称检索' },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
      ],
      [{ type: 'add', name: '新增' }]],
      searchTitle: null,
      isEdit: false,
      form: {
        summary: null,
        title: null,
        id: null
      }
    }
  },
  mounted() {
    this.fecthList()
  },
  created() {},
  methods: {
    showAdd() {
      this.dialogTitle = '新增'
      this.dialogVisible = true
    },
    resetForm() {
      this.form.summary = null
      this.form.title = null
      this.isEdit = false
      this.$refs['form'].resetFields()
      this.$setKeyValue(this.button, { loading: false, text: '确定' })
    },
    searchAction(data) {
      this.searchTitle = data.title
      this.fecthList()
    },
    reset() {
      this.fecthList()
    },
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        title: this.searchTitle
      }
      packagingList(data).then(({ data }) => {
        if (Array.isArray(data)) {
          this.table.data = data
        }
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: '列表加载失败' })
      })
    },
    clickToEdit(index, item) {
      this.dialogTitle = '编辑'
      this.isEdit = true
      this.dialogVisible = true
      if (!item.pk) return
      packagingInfo({ id: item.pk }).then(({ data }) => {
        this.form.summary = data.summary
        this.form.title = data.title
        this.form.id = data.pk
      }).catch((e) => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickToDelete(index, item) {
      this.$confirm('是否需要删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.pk) return
        deletePackaging({ id: item.pk }).then(res => {
          this.$message({ type: 'success', message: `${res.msg}成功!` })
          this.fecthList()
        }).catch((e) => {
          this.$message({ type: 'error', message: e.msg })
        })
      }).catch(() => {})
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$setKeyValue(this.button, { loading: true, text: '提交中..' })
          if (this.isEdit) {
            packagingUpdate(this.form).then(res => {
              this.isEdit = false
              this.dialogVisible = false
              this.$message({ type: 'success', message: `${res.msg}!` })
              this.fecthList()
            }).catch((e) => {
              this.$setKeyValue(this.button, { loading: false, text: '确定' })
              this.$message({ type: 'error', message: e.msg })
            })
          } else {
            createPackaging({
              summary: this.form.summary,
              title: this.form.title
            }).then(res => {
              this.dialogVisible = false
              this.$message({ type: 'success', message: `${res.msg}!` })
              this.fecthList()
            }).catch((e) => {
              this.$setKeyValue(this.button, { loading: false, text: '确定' })
              this.$message({ type: 'error', message: e.msg })
            })
          }
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    clickToUp(index, item) {
      if (index === 0) return
      const data = [{ id: item.pk, sort: this.table.data[index - 1].sort }, { id: this.table.data[index - 1].pk, sort: item.sort }]
      updateSort(data).then(res => {
        this.fecthList()
      }).catch(e => {
        this.$message({ type: 'error', message: e.meg })
      })
    },
    clickToDown(index, item) {
      if (!this.table.data[index + 1]) return
      const data = [{ id: item.pk, sort: this.table.data[index + 1].sort }, { id: this.table.data[index + 1].pk, sort: item.sort }]
      updateSort(data).then(res => {
        this.fecthList()
      }).catch(e => {
        this.$message({ type: 'error', message: e.meg })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.goodsProfile {
	.el-form-item {
		margin: 0;
	}
}
</style>
