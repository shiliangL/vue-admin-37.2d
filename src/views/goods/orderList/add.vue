<template>
  <div id="baseProps-add">
    <el-dialog :title="dialog.title" :visible.sync="dialog.visiable" @close="closeDialog" :fullscreen="true">

      <el-form :model="form" :rules="rules" ref="form" label-width="100px" id="form" :inline="true">
          测试数据弹层
          <h1>测试</h1>
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
export default {
  mixins: [addModel],
  data() {
    return {
      form: {
        subPropList: []
      },
      rules: {

      }
    }
  },
  created() {
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    if (this.data.type === 'view') {
      // this.loadInfo()
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    click2add() {
      this.form.subPropList.push({
        name: null,
        featureValue: null,
        status: 1
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
    error(data) {
      this.$message({ type: 'error', message: data.message })
      this.$setKeyValue(this.button, { loading: false, text: '确定' })
    }
  }
}
</script>


