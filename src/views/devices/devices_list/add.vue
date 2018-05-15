<template>
  <div class="add">
    <el-dialog :title="dialog.title" width="370px" :visible.sync="dialog.visiable" @close="closeDialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" id="form" class="demo-ruleForm" :inline="true">
        
        <el-form-item label="PSN" :rules="rules.input"  prop="PSN" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.PSN"></el-input>
          <el-tooltip content="添加一个或连续的多个，如添加多个连续编号用：min-max形式" placement="top" effect="light">
            <el-button type="text">提示</el-button>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="设备名称" :rules="rules.input"  prop="DeviceName" v-if="this.data.type === 'edit'">
          <el-input class="w180" size="small" v-model.trim="form.DeviceName"></el-input>
        </el-form-item>

        <el-form-item label="绑定类型" :rules="rules.select"  prop="TypeId" v-if="this.data.type === 'bind'">
          <el-select v-model="form.TypeId" placeholder="类型" size="mini" class="w160" filterable clearable>
              <el-option v-for="item in option.TypeOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
import { create, rename, getalltypes, bindingtype } from '@/api/devices_list'
export default {
  mixins: [addModel],
  data() {
    return {
      form: {
        PSN: null,
        DeviceId: null,
        DeviceName: null,
        TypeId: null // 绑定类型 id
      },
      option: {
        TypeOption: []
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
      this.form.DeviceId = this.data.obj.id
      this.form.DeviceName = this.data.obj.name
    } else if (this.data.type === 'bind') {
      this.form.DeviceId = this.data.obj.id
      this.fectchType()
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
            create({ PSN: this.form.PSN }).then(() => { this.success() }).catch((error) => { this.error(error) })
          } else if (this.data.type === 'edit') {
            const data = {
              DeviceId: this.form.DeviceId,
              DeviceName: this.form.DeviceName
            }
            rename(data).then(() => { this.success() }).catch((error) => { this.error(error) })
          } else if (this.data.type === 'bind') {
            const data = {
              DeviceId: this.form.DeviceId,
              TypeId: this.form.TypeId
            }
            bindingtype(data).then(() => { this.success() }).catch((error) => { this.error(error) })
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
    },
    fectchType() {
      getalltypes().then(({ TypeList }) => {
        this.option.TypeOption = TypeList || []
      })
    }
  }
}
</script>
 