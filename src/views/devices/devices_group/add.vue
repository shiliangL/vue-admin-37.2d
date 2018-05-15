<template>
  <div class="add">
    <el-dialog :title="dialog.title" width="370px" :visible.sync="dialog.visiable" @close="closeDialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" id="form" class="demo-ruleForm" :inline="true">
        <el-form-item label="组名称" :rules="rules.input"  prop="GroupName">
           <el-input class="w180" size="small" v-model.trim="form.GroupName"></el-input>
        </el-form-item>
         <!-- <multipleTable></multipleTable> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="button.loading" size="small" type="primary" @click="clickSaveOrUpdate('form')">{{button.text}}</el-button>
        <el-button size="small" @click="dialog.visiable = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { multipleTable } from '@/components/indexEx.js'
import addModel from '@/public/addModel.js'
import { creategroup, updategroup } from '@/api/devices_group'
export default {
  mixins: [addModel],
  components: {
    multipleTable
  },
  data() {
    return {
      form: {
        GroupId: null,
        GroupName: null
      },
      options: {
        status: [{ value: 0, label: '禁用' }, { value: 1, label: '启用' }]
      },
      rules: {
        existCode: (rule, value, callback) => {}
      }
    }
  },
  created() {
    const title = this.editType(this.data.type)
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    if (this.data.type === 'edit') {
      this.form.GroupId = this.data.obj.id
      this.form.GroupName = this.data.obj.name
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    clickSaveOrUpdate() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.data.type === 'edit' && this.data.obj.name === this.form.GroupName) {
            this.$message({ type: 'warning', message: '数据并未改变' })
            return
          }
          if (this.data.type === 'add') {
            creategroup({ GroupName: this.form.GroupName }).then(() => { this.success() }).catch((error) => { this.error(error) })
          } else {
            const data = {
              GroupId: this.form.GroupId,
              GroupName: this.form.GroupName
            }
            updategroup(data).then(() => { this.success() }).catch((error) => { this.error(error) })
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
    error(error) {
      this.$message({ type: 'error', message: error.msg })
      this.$setKeyValue(this.button, { loading: false, text: '确定' })
    }
  }
}
</script>
 