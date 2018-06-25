<template>
<!-- 全屏固定表头弹层组件 -->
<!-- :title="dialog.title" -->
  <div>
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal-append-to-body="false">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> 订单详情 </div>
           <div class="right">
              <el-button v-if="isAllowToShow" type="text" size="mini" @click="clickToEdit">编辑</el-button>
              <template v-if="isEditStatus">
                <el-button type="text" size="mini" @click="validateForm">保存</el-button>
                <el-button type="text" size="mini" @click="disMiss">取消</el-button>
              </template>

              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">

          <template v-if="isShowView">
            <toView :isAllowToShow.sync="isAllowToShow" :loadID="loadID"></toView>
          </template>

          <template v-if="isShowEditor">
            <toEditor ref="toEditor"  @callBack="callBackToSubmit" :loadID="loadID"></toEditor>
          </template>

          <!-- <template v-if="this.data.type === 'follow'">
            <toFollow></toFollow>
          </template> -->
          
        </div>
      </div>
 
    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import toView from './toView'
import toEditor from './toEditor'
import { orderDetailUpdate } from '@/api/orders.js'

export default {
  mixins: [addModel],
  components: {
    toView,
    toEditor
  },
  data() {
    return {
      form: {
        subPropList: []
      },
      rules: {},
      loadID: null,
      isShowView: false,
      isShowEditor: false,
      isEditStatus: false,
      isAllowToShow: false // 是否显示编辑
    }
  },
  created() {
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    if (this.data.type === 'view') {
      const id = this.data.obj.id
      if (!id) return
      this.isShowView = true
      this.isShowEditor = false
      this.loadID = id
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    clickToEdit() {
      this.isEditStatus = true
      this.isShowView = false
      this.isShowEditor = true
      this.isAllowToShow = false
    },
    disMiss() {
      this.isEditStatus = false
      this.isShowView = true
      this.isShowEditor = false
    },
    validateForm() {
      if (this.$refs['toEditor']) {
        this.$refs['toEditor'].validateForm()
      }
    },
    callBackToSubmit(data) {
      if (data) {
        const upDate = {
          'address': data.scmOrder.address,
          'contacts': data.scmOrder.contacts,
          'customerId': data.scmOrder.customerId,
          'customerName': data.scmOrder.customerName,
          'id': data.scmOrder.pk,
          'mobile': data.scmOrder.mobile,
          'offerAmount': data.scmOrder.offerAmount,
          'orderNo': data.scmOrder.orderNo,
          'orderSource': data.scmOrder.orderSource,
          'orderSum': data.scmOrder.orderSum,
          'paymentType': data.scmOrder.paymentType,
          'phone': data.scmOrder.phone,
          'remark': data.scmOrder.remark,
          'sendTime': {
            'beginTime': data.sendTime.beginTime,
            'endTime': data.sendTime.endTime,
            'id': data.sendTime.pk,
            'remark': data.sendTime.remark,
            'status': data.sendTime.status,
            'title': data.sendTime.title
          },
          'status': data.scmOrder.title
        }

        const arr = []
        for (const item of data.saleDtails) {
          arr.push({
            'giftFlag': item.giftFlag,
            'id': item.id,
            'orderId': item.orderId,
            'orderQuantity': item.orderQuantity,
            'productId': item.productId,
            'productName': item.productName,
            'productPrice': item.productPrice,
            'remark': item.remark,
            'skuId': item.skuId,
            'skuName': item.skuId,
            'sum': item.sum
          })
        }
        upDate.saleDtails = arr
        orderDetailUpdate(upDate).then(res => {
          if (res.code === '0') {
            this.$message({ type: 'success', message: res.msg })
            this.dialog.visiable = false
            this.$emit('add')
          }
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      }
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

<style scoped lang="scss">
.el-dialog__wrapper{
  transform: translateZ(0);
  min-height: 100%;
  min-height: 700px;
}
.content-box {
  width: 100%;
  position: relative;
  .header-bar {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0;
    z-index: 900;
    background: #e8f8f5 !important;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.23);
  }
}
.Loading{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
  }
</style>
