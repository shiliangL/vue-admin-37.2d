<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal-append-to-body="false" :modal="false">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
             <template v-if="isShowView">
                <el-button type="text" size="mini" @click.stop="clickToEdit">编辑</el-button>
             </template>
              <template v-else>
                <el-button type="text" size="mini" @click.stop="validateForm">保存</el-button>
             </template>
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">

            <template v-if="this.data.type === 'add'">
              <addview ref="addview" @callBack="callBackToSubmit"></addview>
            </template>

            <template v-if="this.data.type === 'check'">
              <addcheck></addcheck>
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
import { save } from '@/api/buy/buyPlan.js'
export default {
  mixins: [addModel],
  components: {
    addview,
    addcheck
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        subPropList: []
      },
      rules: {},
      test: false,
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
      console.log('x')
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
