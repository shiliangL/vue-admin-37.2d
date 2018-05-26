<template>
  <div class="add">
    <el-dialog :title="dialog.title" width="1100px" :visible.sync="dialog.visiable" @close="closeDialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px" id="form" class="demo-ruleForm" :inline="true">
        
        <el-form-item label="类型名称" :rules="rules.input"  prop="name" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.name"></el-input>
        </el-form-item>

        <el-form-item label="类型" :rules="rules.input"  prop="setup_type" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.setup_type"></el-input>
        </el-form-item>

        <el-form-item label="显示的名称" :rules="rules.input"  prop="setup_caption" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.setup_caption"></el-input>
        </el-form-item>

        <el-form-item label="显示的后缀" :rules="rules.input"  prop="setup_suffix" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.setup_suffix"></el-input>
        </el-form-item>

        <el-form-item label="最小值" :rules="rules.input"  prop="setup_min" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.setup_min"></el-input>
        </el-form-item>

        <el-form-item label="最小大" :rules="rules.input"  prop="setup_max" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.setup_max"></el-input>
        </el-form-item>

        <el-form-item label="test类型" :rules="rules.input"  prop="test_type" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.test_type"></el-input>
        </el-form-item>

        <el-form-item label="test显示名称" :rules="rules.input"  prop="test_caption" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.test_caption"></el-input>
        </el-form-item>

        <el-form-item label="test显示后缀" :rules="rules.input"  prop="test_suffix" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.test_suffix"></el-input>
        </el-form-item>

        <el-form-item label="test保存使能" :rules="rules.input"  prop="test_save_enable" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.test_save_enable"></el-input>
        </el-form-item>

        <el-form-item label="test保存间隔" :rules="rules.input"  prop="test_save_interval" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.test_save_interval"></el-input>
        </el-form-item>

        <el-form-item label="ICCID绑定使能" :rules="rules.input"  prop="bundling_iccid_en" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.bundling_iccid_en"></el-input>
        </el-form-item>
				
        <el-form-item label="可视个数" :rules="rules.input"  prop="setup_user_visible" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.setup_user_visible"></el-input>
          <el-tooltip content="参数区普通用户可视个数" placement="top" effect="light">
            <el-button type="text">提示</el-button>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="可视个数" :rules="rules.input"  prop="setup_admin_visible" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.setup_admin_visible"></el-input>
          <el-tooltip content="参数区管理员可见个数" placement="top" effect="light">
            <el-button type="text">提示</el-button>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="test可视数" :rules="rules.input"  prop="test_user_visible" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.test_user_visible"></el-input>
           <el-tooltip content="test普通用户可视数" placement="top" effect="light">
            <el-button type="text">提示</el-button>
          </el-tooltip>
        </el-form-item>
        
        <el-form-item label="test可视数" :rules="rules.input"  prop="test_admin_visible" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.test_admin_visible"></el-input>
          <el-tooltip content="test管理员可视数" placement="top" effect="light">
            <el-button type="text">提示</el-button>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="控制" :rules="rules.input"  prop="ctrl_user_en" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.ctrl_user_en"></el-input>
          <el-tooltip content="普通用户允许控制" placement="top" effect="light">
            <el-button type="text">提示</el-button>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="控制" :rules="rules.input"  prop="ctrl_admin_en" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.ctrl_admin_en"></el-input>
          <el-tooltip content="管理员用户允许控制" placement="top" effect="light">
            <el-button type="text">提示</el-button>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="记录查询" :rules="rules.input"  prop="record_user_en" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.record_user_en"></el-input>
					<el-tooltip content="普通用户允许记录查询与否" placement="top" effect="light">
            <el-button type="text">提示</el-button>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="记录查询" :rules="rules.input"  prop="record_admin_en" v-if="this.data.type === 'add'">
          <el-input class="w180" size="small" v-model.trim="form.record_admin_en"></el-input>
					<el-tooltip content="管理员用户允许记录查询与否" placement="top" effect="light">
            <el-button type="text">提示</el-button>
          </el-tooltip>
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
import { createtype } from '@/api/devices_me'
export default {
  mixins: [addModel],
  data() {
    return {
      form: {
        name: null,
        setup_type: 'D,D,O[模式1|模式2|模式3],O[开|关]',
        setup_caption: '温度,湿度,运行模式,开关状态',
        setup_suffix: '℃,%,,',
        setup_min: '-20.0,0,0,0',
        setup_max: '299.9,99.9,2,1',
        setup_user_visible: '3',
        setup_admin_visible: '4',
        test_type: 'AI,AI,DI,DO',
        test_caption: '温度,湿度,开关量输入,开关量输出',
        test_suffix: '℃,%,,',
        test_save_enable: '1',
        test_save_interval: '300',
        test_user_visible: '2',
        test_admin_visible: '4',
        ctrl_user_en: '1',
        ctrl_admin_en: '1',
        record_user_en: '1',
        record_admin_en: '1',
        bundling_iccid_en: '0'
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

  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    clickSaveOrUpdate() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (
            this.data.type === 'edit' &&
            this.data.obj.name === this.form.GroupName
          ) {
            this.$message({ type: 'warning', message: '数据并未改变' })
            return
          }
          if (this.data.type === 'add') {
            createtype(this.form)
              .then(() => {
                this.success()
              })
              .catch(error => {
                this.error(error)
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
    error(error) {
      this.$message({ type: 'error', message: error.msg })
      this.$setKeyValue(this.button, { loading: false, text: '确定' })
    }
  }
}
</script>
 