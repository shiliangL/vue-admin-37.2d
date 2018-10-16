<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog"  :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
             <template v-if="this.data.type === 'add'">
                <el-button type="text" size="mini" @click.stop="validateForm">提交</el-button>
             </template>
              <template v-if="this.data.type === 'view' && this.data.obj.status ===1">
                <el-button v-if="!isAudit" type="text" size="mini" @click.stop="clickToAudit">审核</el-button>
                <template v-if="isAudit">
                  <el-button type="text" size="mini" @click.stop="validateNoPassForm">拒绝</el-button>
                  <el-button type="text" size="mini" @click.stop="validatePassForm">同意</el-button>
                </template>
             </template>

              <template v-if="this.data.type === 'view' && this.data.obj.status ===3">
                <el-button v-if="!isEditor" type="text" size="mini" @click.stop="clickToEditor">编辑</el-button>
                <template v-if="isEditor">
                  <el-button type="text" size="mini" @click.stop="validateEditorForm">保存</el-button>
                </template>
              </template>

              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
		      <Tabs :data="tabTitles" @callBack="tabsCallBack" isBackIndex></Tabs>
           <div v-show="curIndex===0">
             <basicFrom ref="basicFrom" :isPass.sync="isPass" v-model="basicObj" :isAddView="isAddView" :data="data" @callBack="basicFromCallBack"></basicFrom>
           </div>

           <div v-show="curIndex===1">
             <!-- 地址相关 -->
              <div class="row-item">
                <div class="row-title">收货信息</div>
                <div class="row-content">
                  <div class="add-bar clearfix">
					          <el-button class="right"  type="primary" size="small" @click.stop="clickToAdd" v-show="isAddView"> 添加 </el-button>
                  </div>
                  <el-table :data="tableData" slot="table" size="small" style="width: 100%;" highlight-current-row>
                    <el-table-column prop="createdOn" label="是否默认" align="center">
                      <template slot-scope="scope" align="center">
                        <el-tag size="small" v-if="scope.row.status===1"> 是 </el-tag>
                        <el-tag size="small" type="info" v-else> 否 </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="contacts" label="收货人" align="center"></el-table-column>
                    <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="address" label="收货地址" align="center"></el-table-column>
                    <el-table-column align="center" label="操作"  v-if="isAddView">>
                      <template slot-scope="scope" align="center">
                        <el-button type="text" size="mini" @click.stop="clickToSet(scope.$index,scope.row)">设置为默认</el-button>
                        <el-button type="text" size="mini" @click.stop="clickToEdit(scope.$index,scope.row)">编辑</el-button>
                        <el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
           </div>
        </div>
      </div>

      <!-- 弹层区域 -->
      <el-dialog title="选择地址" class="dialogTitle" width="420px" :visible.sync="dialogVisible" append-to-body center @close="reset">
        <div v-if="dialogVisible">
          <el-form :model="addressForm" ref="addressForm" class="form" :rules="rules"  style="padding-left: 60px;">
              <el-form-item label="收货人:" label-width="100px" prop="contacts" :rules="rules.input">
                <el-input size="small" style="width:180px"  v-model.trim="addressForm.contacts" placeholder="不能超6位数" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" label-width="100px" prop="mobile" :rules="rules.input">
                <el-input size="small" style="width:180px"  v-model.trim="addressForm.mobile" placeholder="不能超11位数" maxlength="11"></el-input>
              </el-form-item>
              <el-form-item label="收货地址:" label-width="100px" prop="address" :rules="rules.input">
                <el-input size="small" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="addressForm.address" style="width:180px" type="textarea" placeholder="不能超30位数" maxlength="30"></el-input>
              </el-form-item>
          </el-form>
          <div class="footer-block">
            <el-button size="small" @click.stop="dialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click.stop="clickToConfirm"> 确定 </el-button>
          </div>
        </div>
      </el-dialog>

      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { Tabs } from '@/components/base.js'
import { create, update, fecthDetail } from '@/api/customer/customerClass.js'
import basicFrom from './basicFrom'
export default {
  mixins: [addModel, rules],
  components: {
    Tabs,
    basicFrom
  },
  data() {
    return {
      basicObj: null,
      isAddView: false,
      isEditor: false,
      isAudit: false,
      isUpdate: false,
      isUpdateIndex: null,
      dialogVisible: false,
      curIndex: 0,
      isPass: false, // 验证是否通过
      form: {
        subPropList: []
      },
      addressForm: {
        status: 0,
        contacts: null,
        mobile: null,
        address: null
      },
      tableData: [],
      loadID: null,
      currentTitle: null
    }
  },
  created() {
    this.tabTitles = [
      { title: '基本信息', value: 0 },
      { title: '收货信息', value: 1 }
    ]
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    this.currentTitle = this.data.title || ''
    if (this.data.type === 'view') {
      const id = this.data.obj.id
      if (id) this.loadID = id
      this.fecthDetail()
      this.isAddView = false
    }
    if (this.data.type === 'add') {
      this.isAddView = true
    }
  },
  methods: {
    clickToAudit() {
      this.isAudit = true
      this.isEditor = false
      this.isAddView = true
    },
    clickToEditor() {
      this.isAudit = false
      this.isEditor = true
      this.isAddView = true
    },
    closeDialog() {
      this.$emit('input', false)
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
    },
    onRefresh() {
      if (this.data.type === 'view') {
        const id = this.data.obj.id
        if (!id) return
        this.fecthDetail()
      }
    },
    validateForm() {
      if (this.$refs['basicFrom']) {
        this.$refs['basicFrom'].validateForm()
      }
    },
    fecthDetail() {
      if (!this.data.obj.id) return
      fecthDetail({ id: this.data.obj.id }).then(({ data }) => {
        this.tableData = data.address
      }).catch(e => {
        this.$message({ type: 'error', message: '详情加载失败' })
      })
    },
    basicFromCallBack(item) {
      if (!item) return
      const data = JSON.parse(JSON.stringify(item))
      data.address = this.tableData
      create(data).then(res => {
        if (res.code === '0') {
          this.$message({ type: 'success', message: res.msg })
          this.dialog.visiable = false
          this.$emit('add')
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    addCheckClose() {
      this.dialog.visiable = false
      this.$emit('add')
    },
    tabsCallBack(index) {
      this.curIndex = index
    },
    validateNoPassForm() {
      if (this.$refs['basicFrom']) this.$refs['basicFrom'].validateForm()
      if (!this.isPass) return
      this.$confirm('确定要拒绝该客户提交的资料信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.basicObj) return
        this.basicObj.status = 2
        update(this.basicObj).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.dialog.visiable = false
          this.$emit('add')
        }).catch(() => {
          this.$message({ type: 'error', message: '操作失败' })
        })
      }).catch(() => {})
    },
    validatePassForm() {
      if (this.$refs['basicFrom']) this.$refs['basicFrom'].validateForm()
      if (!this.isPass) return
      this.$confirm('是否确定通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.basicObj) return
        this.basicObj.status = 3
        update(this.basicObj).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.dialog.visiable = false
          this.$emit('add')
        }).catch(() => {
          this.$message({ type: 'error', message: '操作失败' })
        })
      }).catch(() => {})
    },
    validateEditorForm() {
      if (this.$refs['basicFrom']) this.$refs['basicFrom'].validateForm()
      if (!this.isPass) return
      this.$confirm('是否确定提交保存修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.basicObj) return
        const data = JSON.parse(JSON.stringify(this.basicObj))
        data.address = this.tableData
        update(data).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.dialog.visiable = false
          this.$emit('add')
        }).catch(() => {
          this.$message({ type: 'error', message: '操作失败' })
        })
      }).catch(() => {})
    },
    reset() {
      this.isUpdate = false
      this.isUpdateIndex = null
      this.$setKeyValue(this.addressForm, {
        status: 0,
        contacts: null,
        mobile: null,
        address: null })
    },
    clickToAdd() {
      this.dialogVisible = true
      this.isUpdate = false
      this.isUpdateIndex = null
    },
    clickToConfirm() {
      this.$refs['addressForm'].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.addressForm))
          if (this.isUpdate) {
            this.tableData[this.isUpdateIndex].contacts = data.contacts
            this.tableData[this.isUpdateIndex].mobile = data.mobile
            this.tableData[this.isUpdateIndex].address = data.address
          } else {
            if (this.tableData.length === 0) { data.status = 1 }
            this.tableData.push(data)
          }
          this.dialogVisible = false
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    clickToDelete(index, item) {
      this.tableData.splice(index, 1)
      if (this.tableData.length === 1) {
        this.tableData[0].status = 1
      }
    },
    clickToSet(index, item) {
      if (item.status === 1) return
      for (const key of this.tableData) {
        key.status = 0
      }
      item.status = 1
    },
    clickToEdit(index, item) {
      this.dialogVisible = true
      this.isUpdate = true
      this.isUpdateIndex = index
      this.addressForm = Object.assign(this.addressForm, item)
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__wrapper {
    transform: translateZ(0);
    min-height: 100%;
    min-height: 600px;
}
.content-box {
    width: 100%;
    position: relative;
    .header-bar {
        .left {
            color: #1cbc9c;
        }
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        width: 100%;
        position: fixed;
        top: 0px;
        left: 0;
        z-index: 900;
        background: #e8f8f5 !important;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.23);
    }
}
.add-bar{
  height: 40px;
}
// .Loading{
//     position: fixed;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     z-index: 10;
//   }
</style>
