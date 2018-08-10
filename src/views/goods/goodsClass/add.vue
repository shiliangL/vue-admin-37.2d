<template>
  <div class="goodsClass-add">
    <el-dialog :title="dialog.title" width="370px" :visible.sync="dialog.visiable" @close="closeDialog" append-to-body center>

      <el-form :model="form" ref="form"  :inline="true" :rules="rules">
				<el-form-item label="名称" label-width="100px" prop="title" :rules="rules.input">
					<el-input size="small" style="width:180px"  v-model.trim="form.title" placeholder="不能超过6位数" maxlength="6"></el-input>
				</el-form-item>
				<!-- <el-form-item label="备注" label-width="100px">
					<el-input size="small" style="width:180px" type="textarea" autosize  v-model.trim="form.summary" placeholder="不能超100位数" maxlength="100"></el-input>
				</el-form-item> -->
			</el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog.visiable = false">取 消</el-button>
        <el-button :loading="button.loading" size="small" type="primary" @click="clickSaveOrUpdate('form')">{{button.text}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { createClass, classInfo, classUpdate } from '@/api/goodsClass.js'

export default {
  mixins: [addModel, rules],
  data() {
    return {
      form: {
        title: null
      },
      options: {

      },
      rules: {

      }
    }
  },
  created() {
    this.$setKeyValue(this.dialog, { title: this.data.title, visiable: true })
  },
  mounted() {
    if (this.data.type === 'editorParent' || this.data.type === 'editorChild') {
      this.fetchDetails()
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    clickSaveOrUpdate() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$setKeyValue(this.button, { loading: true, text: '提交中..' })
          // console.log('新增父类、子类')
          if (this.data.type === 'add' || this.data.type === 'adddChild') {
            const data = {
              flag: this.data.type === 'add' ? 0 : 1,
              parentId: this.data.type === 'add' ? '0' : this.data.obj.id,
              title: this.form.title
            }
            createClass(data).then(res => {
              this.closeDialog()
              this.$emit('add')
            }).catch((e) => {
              this.$setKeyValue(this.button, { loading: false, text: '确定' })
              this.$message({ type: 'error', message: e.msg })
            })
          } else if (this.data.type === 'editorParent' || this.data.type === 'editorChild') {
            // console.log('编辑父类编、辑子类')
            const flag = this.data.type === 'editorParent' ? 0 : 1
            const data = {
              flag: flag,
              id: this.data.obj.id,
              title: this.form.title
            }
            classUpdate(data).then(res => {
              this.closeDialog()
              this.$emit('edit')
            }).catch((e) => {
              this.$setKeyValue(this.button, { loading: false, text: '确定' })
              this.$message({ type: 'error', message: e.msg })
            })
          }
        }
      })
    },
    success() {
      this.$message({ type: 'success', message: this.dialog.title + '成功' })
      this.closeDialog()
      if (this.data.type === 'add') {
        this.$emit('add')
      } else {
        this.$emit('edit')
      }
    },
    error() {
      this.$message({ type: 'error', message: this.dialog.title + '失败' })
      this.$setKeyValue(this.button, { loading: false, text: '确定' })
    },
    fetchDetails() {
      const param = this.data.obj.id
      if (!param) return
      classInfo({ id: param }).then(({ data }) => {
        this.form.title = data.title
      }).catch(e => {
        this.$message({ type: 'error', message: '加载失败' })
      })
    }
  }
}
</script>


