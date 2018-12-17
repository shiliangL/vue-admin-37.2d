<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog"  :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
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
import { applyCreate } from '@/api/buy/buyPlan.js'
import { fecthMemberSelect } from '@/api/members.js'

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
      const result = JSON.parse(JSON.stringify(this.toViewObj))
      for (const item of result) {
        if (item.hasOwnProperty('buyerId')) { delete item.buyerId }
        if (item.hasOwnProperty('buyerName')) { delete item.buyerName }
        if (item.hasOwnProperty('supplierId')) { delete item.supplierId }
        if (item.hasOwnProperty('supplierName')) { delete item.supplierName }
        if (item.hasOwnProperty('supplyDto')) { delete item.supplyDto }
      }
      const data = {
        remark: this.ruleForm.remark,
        status: 4,
        requestId: this.data.obj.pk,
        requestDetailsList: result
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
    validatePass() {
      if (this.$refs['toView']) this.$refs['toView'].validateForm()
      if (!this.isPass) return
      this.$confirm('是否确定通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击同意的时候校验有效采购员
        if (!this.toViewObj) return
        const arr = JSON.parse(JSON.stringify(this.toViewObj))

        fecthMemberSelect({ staffType: 2 }).then(({ data }) => {
          const errorArr = []
          const arrData = data || []
          const arrDataIds = arrData.map(item => item.value)

          for (const item of arr) {
            // 差值 可用 - 申请
            const tem = ((item.availableQuantity * 1) - (item.applyQuantity * 1))
            tem !== 0 ? item.availableQuantity = tem.toFixed(2) : item.availableQuantity = 0

            const arrItem = item.supplierInfoList
            for (const key of arrItem) {
              if (key.buyerId || key.supplierId) {
                if (key.purchaseType === 2) {
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

            for (const itemKey of arrItem) {
              // 不符合
              if (!arrDataIds.includes(itemKey.personnelId)) {
                errorArr.push(itemKey)
              }
            }
          }
          if (errorArr.length) {
            const msg = errorArr.map(item => item.personnelName).toString()
            this.$notify({
              title: '警告',
              message: `无效采购员:${msg},请重新选择`,
              duration: 0
            })
          } else {
            const postData = {
              remark: this.ruleForm.remark,
              status: 3,
              requestId: this.data.obj.pk,
              requestDetailsList: arr
            }
            applyCreate(postData).then(res => {
              this.$message({ type: 'success', message: `${res.msg}!` })
              this.dialog.visiable = false
              this.$emit('add')
            }).catch(() => {
              this.$message({ type: 'error', message: '操作失败' })
            })
          }
        }).catch((e) => {
          this.$message({ type: 'error', message: e.msg })
        })

        // if (!this.toViewObj) return
        // const arr = JSON.parse(JSON.stringify(this.toViewObj))
        // console.log(arr, 'bb')
        // for (const item of arr) {
        //   // 差值 可用 - 申请
        //   const tem = ((item.availableQuantity * 1) - (item.applyQuantity * 1))
        //   tem !== 0 ? item.availableQuantity = tem.toFixed(2) : item.availableQuantity = 0

        //   const arrItem = item.supplierInfoList
        //   for (const key of arrItem) {
        //     if (key.buyerId || key.supplierId) {
        //       if (key.purchaseType === 2) {
        //         key.personnelId = key.supplyDto[1]
        //         key.personnelName = key.supplierName
        //       } else if (key.purchaseType === 1) {
        //         key.personnelId = key.buyerId
        //         key.personnelName = key.buyerName
        //       }
        //       delete key.supplyDto
        //       delete key.supplierName
        //       delete key.supplierId
        //       delete key.buyerId
        //       delete key.buyerName
        //     }
        //   }
        // }
        // const data = {
        //   remark: this.ruleForm.remark,
        //   status: 3,
        //   requestId: this.data.obj.pk,
        //   requestDetailsList: arr
        // }
        // console.log(data)
        // applyCreate(data).then(res => {
        //   this.$message({ type: 'success', message: `${res.msg}!` })
        //   this.dialog.visiable = false
        //   this.$emit('add')
        // }).catch(() => {
        //   this.$message({ type: 'error', message: '操作失败' })
        // })
      }).catch(() => {})
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
