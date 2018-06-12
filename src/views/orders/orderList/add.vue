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
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
              <el-button type="text" size="mini">刷新</el-button>
            </div>
        </div>
        <div class="content-bar">
          <template v-if="this.data.type === 'view'">
            <toView :data="viewData"></toView>
          </template>

          <template v-if="this.data.type === 'follow'">
            <toFollow></toFollow>
          </template>
          
        </div>
      </div>
      <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading>
      <!-- <el-form :model="form" :rules="rules" ref="form" label-width="100px" id="form" :inline="true">
          测试数据弹层
          <h1>测试</h1>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button :loading="button.loading" size="small" type="primary" @click="clickSaveOrUpdate('form')">{{button.text}}</el-button>
        <el-button size="small" @click="dialog.visiable = false">取 消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import toView from './view'
import toFollow from './follow'
import { ScrollBar } from '@/components/base.js'
import { orderDetail } from '@/api/orders.js'

export default {
  mixins: [addModel],
  components: {
    toView,
    ScrollBar,
    toFollow
  },
  data() {
    return {
      form: {
        subPropList: []
      },
      rules: {},
      viewData: null
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
      this.fecthByID(id)
    }
    setTimeout(() => {
      this.loadingText = '加载错误'
    }, 3000)
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
      console.log('刷新')
      if (this.data.type === 'view') {
        const id = this.data.obj.id
        if (!id) return
        this.fecthByID(id)
      }
    },
    fecthByID(id) {
      orderDetail({ id }).then(({ data }) => {
        this.viewData = data
        setTimeout(() => {
          this.loading = false
        }, 2000)
      }).catch(e => {
        this.loadingText = '加载错误'
      })
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
