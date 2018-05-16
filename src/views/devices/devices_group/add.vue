<template>
  <div class="add">
    <el-dialog :title="dialog.title" :width="dialogWidth" :visible.sync="dialog.visiable" @close="closeDialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" id="form" class="demo-ruleForm" :inline="true">
        <el-form-item v-if="this.data.type === 'add'" label="组名称" :rules="rules.input"  prop="GroupName">
           <el-input class="w180" size="small" v-model.trim="form.GroupName"></el-input>
        </el-form-item>

        <template v-if="this.data.type === 'add-de'">
          <multipleTable ref="multipleTable" v-model="multipleValue"></multipleTable>
        </template>

        <template v-if="this.data.type === 'add-view-de'">
          <multipleTable ref="multipleTable" isHander :isSearch="false" :GroupID="data.obj.id"></multipleTable>
        </template>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <template  v-if="this.data.type !== 'add-view-de'">
          <el-button :loading="button.loading" size="small" type="primary" @click="clickSaveOrUpdate('form')">{{button.text}}</el-button>
          <el-button size="small" @click="dialog.visiable = false">取 消</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { multipleTable } from '@/components/indexEx.js'
import addModel from '@/public/addModel.js'
import { creategroup, updategroup, adddevtogroup } from '@/api/devices_group'
export default {
  mixins: [addModel],
  components: {
    multipleTable
  },
  data() {
    return {
      dialogWidth: '370px',
      form: {
        GroupId: null,
        GroupName: null
      },
      multipleValue: null,
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
    } else if (this.data.type === 'add-de') {
      this.dialogWidth = '480px'
    } else if (this.data.type === 'add-view-de') {
      this.dialogWidth = '480px'
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
          this.button.loading = true
          if (this.data.type === 'add') {
            // 新增组
            creategroup({ GroupName: this.form.GroupName }).then(() => { this.success() }).catch((error) => { this.error(error) })
          } else if (this.data.type === 'add-de') {
            // 组添加设备
            this.$refs['multipleTable'].clickEmit()
            this.button.loading = false
            setTimeout(() => {
              const { multipleValue } = this
              if (Array.isArray(multipleValue) && multipleValue.length > 0) {
                const ids = multipleValue.map(item => {
                  return item.id.toString()
                }).join(',')
                const data = {
                  GroupId: this.data.obj.id.toString(),
                  DeviceId: ids
                }
                adddevtogroup(data).then(() => { this.success() }).catch((error) => { this.error(error) })
              } else {
                return
              }
            }, 20)
          } else {
            // 组修改名称
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
      this.button.loading = false
      if (this.data.type === 'add') {
        this.$emit('add')
      } else {
        this.$emit('edit')
      }
    },
    error(error) {
      this.button.loading = false
      this.$message({ type: 'error', message: error.msg })
      this.$setKeyValue(this.button, { loading: false, text: '确定' })
    }
  }
}
</script>
 
 <style>
   .dialog-footer{
      padding-top: 20px;
   }
 </style>