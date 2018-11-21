<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog"  :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
             <template v-if="isShowView">
                <!-- <el-button v-if="this.data.type === 'add'" type="text" size="mini" @click.stop="clickToEdit">编辑</el-button> -->
             </template>
              <template v-else>
                <el-button type="text" v-if="this.data.type === 'add'" size="mini" @click.stop="validateForm">保存</el-button>
             </template>
              <el-button v-if="this.data.type === 'view' && this.data.obj.auditStatus ===1" type="text" size="mini" @click.stop="validatePass">申请</el-button>
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">

            <template v-if="this.data.type === 'add'">
              <addview ref="addview" @callBack="callBackToSubmit"></addview>
            </template>

            <template v-if="this.data.type === 'check'">
              <addcheck :data="data.obj.date" @close="addCheckClose"></addcheck>
            </template>

            <template v-if="this.data.type === 'exchange'">
              <exchange  @close="addCheckClose"></exchange>
            </template>

            <template v-if="this.data.type === 'view'">
              <toView ref="toView" :loadID="loadID"  @callBack="callBackToPass"></toView>
            </template>
        </div>
      </div>

      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import addview from './addview'
import addcheck from './addcheck'
import toView from './toView'
import exchange from './exchange'
import { save, applyCreate } from '@/api/buy/buyPlan.js'
export default {
  mixins: [addModel],
  components: {
    addview,
    exchange,
    addcheck,
    toView
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        subPropList: []
      },
      rules: {},
      loadID: null,
      isShowView: false,
      isShowEditor: false,
      currentTitle: null,
      viewData: null,
      typeIseditor: false
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
    clickToEdit() {
      this.typeIseditor = true // 点击判断编辑修改提交
      this.isShowView = false
      this.isShowEditor = true
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
        this.fecthDerDetailById(id)
      }
    },
    validateForm() {
      if (this.$refs['addview']) {
        this.$refs['addview'].validateForm()
      }
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
              personnelName: list.purchaseType === 1 ? list.buyerName : list.supplierName,
              personnelId: list.purchaseType === 1 ? list.buyerId : list.supplyDto[1]
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
      if (this.$refs['toView']) {
        this.$refs['toView'].validateForm()
      }
    },
    callBackToPass(data) {
      // console.log(JSON.stringify(data))
      if (!data) return
      if (this.data.obj.auditStatus !== 1) return
      const params = {
        remark: null,
        requestId: this.data.obj.pk,
        status: 2
      }
      const arr = JSON.parse(JSON.stringify(data))
      for (const item of arr) {
        delete item.personnelNamesStr
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
    addCheckClose() {
      this.dialog.visiable = false
      this.$emit('add')
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
