<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal-append-to-body="false" :modal="false">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
             <template v-if="this.data.obj.auditStatus===2">
              <el-button type="text" size="mini" @click.stop="validateNoPass"> 拒绝 </el-button>
              <el-button type="text" size="mini" @click.stop="validatePass"> 同意 </el-button>
             </template>
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">

          <template v-if="this.data.type === 'view'">
            <!-- @callBack="callBackToPass" -->
            <toView ref="toView" :loadID="loadID"  :isPass.sync="isPass" v-model="toViewObj"></toView>
          </template>

        </div>
      </div>

	    <el-dialog width="400px" title="拒绝采购申请" :visible.sync="innerVisible" append-to-body center @close="formClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
          <el-form-item label="拒绝原因:" prop="remark">
            <el-input size="small" maxlength="20" placeholder="输入长度小于20字" type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div class="footer-block">
          <el-button size="small" @click="formClose">取消</el-button>
          <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </div>
      </el-dialog>
      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->
    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import toView from './toView'
import { save, applyCreate } from '@/api/buy/buyPlan.js'
export default {
  mixins: [addModel],
  components: {
    toView
  },
  data() {
    return {
      dialogVisible: false,
      form: {
      },
      toViewObj: null,
      isPass: false, // 验证是否通过
      rules: {},
      loadID: null,
      isShowView: false,
      isShowEditor: false,
      currentTitle: null,
      viewData: null,
      typeIseditor: false,
      innerVisible: false,
      ruleForm: {
        remark: null
      }
    }
  },
  created() {
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    this.currentTitle = this.data.title || ''
    if (this.data.type === 'view') {
      const id = this.data.obj.pk
      if (id) this.loadID = id
    } else if (this.data.type === 'add') {
      console.log('x')
    }
    setTimeout(() => {
      this.loading = false
    }, 200)
  },
  methods: {
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
        const id = this.data.obj.pk
        if (!id) return
        this.fecthDerDetailById(id)
      }
    },
    validateNoPass() {
      this.innerVisible = true
      if (this.$refs['toView']) this.$refs['toView'].validateForm()
    },
    submitForm() {
      if (!this.toViewObj || !this.isPass) return
      const data = {
        remark: this.ruleForm.remark,
        status: 4,
        requestId: this.data.obj.pk,
        requestDetailsList: this.toViewObj
      }
      applyCreate(data).then(res => {
        if (res.code === '0') {
          this.$message({ type: 'success', message: res.msg })
          this.dialog.visiable = false
          this.$emit('add')
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    callBackToSubmit(data) {
      if (!data) return
      const result = []
      for (const item of data) {
        const key = {
          planQuantity: item.planQuantity,
          productId: item.productId,
          supplierInfoList: []
        }
        if (Array.isArray(item.supplierInfoList)) {
          for (const list of item.supplierInfoList) {
            const keyList = {
              purchaseType: list.purchaseType,
              quantity: list.quantity,
              personnelName: list.purchaseType === 1 ? list.supplierName : list.buyerName,
              personnelId: list.purchaseType === 1 ? list.supplyDto[1] : list.buyerId
            }
            key.supplierInfoList.push(keyList)
          }
        }
        result.push(key)
      }
      if (result.length === 0) {
        this.$message({ type: 'warning', message: '请添加一条数据' })
        return
      }
      save(result).then(res => {
        if (res.code === '0') {
          this.$message({ type: 'success', message: res.msg })
          this.dialog.visiable = false
          this.$emit('add')
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    validatePass() {
      if (this.$refs['toView']) this.$refs['toView'].validateForm()
      if (!this.isPass) return
      this.$confirm('是否确定通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.toViewObj) return
        const data = {
          remark: this.ruleForm.remark,
          status: 3,
          requestId: this.data.obj.pk,
          requestDetailsList: this.toViewObj
        }
        applyCreate(data).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.dialog.visiable = false
          this.$emit('add')
        }).catch(() => {
          this.$message({ type: 'error', message: '操作失败' })
        })
      }).catch(() => {})
    },
    callBackToPass(data) {
      if (!data) return
      if (this.data.obj.auditStatus !== 2) return
      const params = {
        remark: null,
        requestId: this.data.obj.pk,
        status: 3
      }
      const arr = JSON.parse(JSON.stringify(data))
      for (const item of arr) {
        const arrItem = item.supplierInfoList
        for (const key of arrItem) {
          if (key.buyerId || key.supplierId) {
            if (key.purchaseType === 1) {
              key.personnelId = key.supplyDto[1]
              key.personnelName = key.supplierName
            } else if (key.purchaseType === 1) {
              key.personnelId = key.buyerId
              key.personnelName = key.buyerName
            }
            delete key.supplyDto
            delete key.supplierName
            delete key.supplierId
            delete key.buyerId
            delete key.buyerName
          }
        }
      }
      params.requestDetailsList = arr
      applyCreate(params).then(res => {
        if (res.code === '0') {
          this.$message({ type: 'success', message: res.msg })
          this.dialog.visiable = false
          this.$emit('add')
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    formClose() {
      this.innerVisible = false
      this.ruleForm.remark = null
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
    .left{
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
// .Loading{
//     position: fixed;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     z-index: 10;
//   }
</style>
