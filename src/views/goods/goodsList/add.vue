<template>
<!-- 全屏固定表头弹层组件 -->
  <div>
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" modal-append-to-body :modal="false">
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
              <!-- <el-button type="text" size="mini" v-if="this.data.type !== 'add'">刷新</el-button> -->
            </div>
        </div>
        <div class="content-bar">
          <template v-if="isShowView">
            <toView :viewData="viewData"></toView>
          </template>
          <template v-if="isShowEditor">
            <toEditor :viewData="viewData" ref="toEditor" @callBack="callBackToSubmit"></toEditor>
          </template>
        </div>
      </div>
      <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading>

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { productDetail, productCreate, productUpdate } from '@/api/goodsList.js'
import toView from './toView'
import toEditor from './toEditor'

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
    if (this.data.type === 'view') {
      // this.isShowView = true
      this.currentTitle = '商品详情'
      const id = this.data.obj.id
      if (!id) return
      this.fecthDerDetailById(id)
    } else if (this.data.type === 'add') {
      this.currentTitle = '新增商品'
      this.isShowEditor = true
      this.loading = false
    }
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
    fecthDerDetailById(id) {
      productDetail({ id }).then(({ data }) => {
        this.viewData = data
        this.isShowView = true
        setTimeout(() => {
          this.loading = false
        }, 200)
      }).catch(e => {
        this.loadingText = e
      })
    },
    validateForm() {
      if (this.$refs['toEditor']) {
        this.$refs['toEditor'].validateForm()
      }
    },
    callBackToSubmit(data) {
      if (!data) return
      if (this.typeIseditor) {
        const update = {
          id: data.id,
          aliasTitle: data.aliasTitle,
          bannerIds: data.bannerIds,
          barCode: data.barCode,
          basePrice: data.basePrice,
          baseUnit: data.baseUnit,
          baseUnitName: data.baseUnitName,
          categoryId: data.categoryId,
          categoryName: data.categoryName,
          details: data.details,
          goodsImage: data.goodsImage,
          goodsStatus: data.goodsStatus,
          itemNumber: data.itemNumber,
          purchasePrice: data.purchasePrice,
          purchaseType: data.purchaseType,
          sellingPrice: data.sellingPrice,
          shortCode: data.shortCode,
          shortTitle: data.shortTitle,
          sortFlag: data.sortFlag,
          specificationId: data.specificationId,
          stockQuantity: data.stockQuantity,
          subTitle: data.subTitle,
          summary: data.summary,
          tags: data.tags,
          title: data.title,
          type: data.type
        }
        update.skuList = data.skuList
        update.supply = {
          id: data.supplyTempId,
          supplierId: data.supplyId
        }
        update.buyer = {
          id: data.buyerTempId,
          buyerId: data.buyerId
        }
        productUpdate(update).then(res => {
          if (res.code === '0') {
            this.$message({ type: 'success', message: res.msg })
            this.dialog.visiable = false
            this.$emit('add')
          }
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      } else {
        productCreate(data).then(res => {
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
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.23);
    // border-bottom: 1px solid #cccccc;
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
