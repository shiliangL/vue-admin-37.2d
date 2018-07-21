<template>
  <div class="add">
    <el-dialog :title="dialog.title" width="420px" :visible.sync="dialog.visiable" @close="closeDialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="130px" id="form" class="demo-ruleForm" :inline="true">

        <el-form-item label="企业名称" :rules="rules.input"  prop="EnterpriseName">
          <el-input class="w180" size="small" v-model.trim="form.EnterpriseName"></el-input>
        </el-form-item>
        <el-form-item label="指派管理员账号" :rules="rules.input"  prop="AdminAccount">
          <el-input class="w180" size="small" v-model.trim="form.AdminAccount"></el-input>
        </el-form-item>
        <el-form-item label="指派管理员手机号" :rules="rules.input"  prop="AdminPhone">
          <el-input class="w180" size="small" v-model.trim="form.AdminPhone"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="button.loading" size="small" type="primary" @click="clickSaveOrUpdate('form')">{{button.text}}</el-button>
        <el-button size="small" @click="dialog.visiable = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { createData } from '@/api/company/index.js'
export default {
  mixins: [addModel],
  data() {
    return {
      form: {
        EnterpriseName: null,
        AdminAccount: null,
        AdminPhone: null
      },
      option: {
        TypeOption: []
      }
    }
  },
  created() {
    const title = this.editType(this.data.type)
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {

  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    clickSaveOrUpdate() {
      this.$refs['form'].validate(valid => {
        createData(this.form).then(() => {
          this.success()
        }).catch((e) => {
          this.error(e)
        })
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
 