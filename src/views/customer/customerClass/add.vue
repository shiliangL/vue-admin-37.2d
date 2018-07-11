<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal-append-to-body="false" :modal="false">
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
		      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

           <template v-if="curIndex===0">
             <basicFrom ref="basicFrom" :isPass.sync="isPass" v-model="basicObj" :isAddView="isAddView" :data="data" @callBack="basicFromCallBack"></basicFrom>
           </template>

           <template v-if="curIndex===1">
             <!-- 地址相关 -->
           </template>
        </div>
      </div>

      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->

    </el-dialog>
  </div>
</template>

<script>

import addModel from '@/public/addModel.js'
import { Tabs } from '@/components/base.js'
import { create, update } from '@/api/customer/customerClass.js'
import basicFrom from './basicFrom'
export default {
  mixins: [addModel],
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
      dialogVisible: false,
      curIndex: 0,
      isPass: false, // 验证是否通过
      form: {
        subPropList: []
      },
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
        this.fecthDetailById(id)
      }
    },
    validateForm() {
      if (this.$refs['basicFrom']) {
        this.$refs['basicFrom'].validateForm()
      }
    },
    basicFromCallBack(data) {
      if (!data) return
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
    tabsCallBack(item) {
      this.curIndex = item.value
      console.log(item)
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
        update(this.basicObj).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.dialog.visiable = false
          this.$emit('add')
        }).catch(() => {
          this.$message({ type: 'error', message: '操作失败' })
        })
      }).catch(() => {})
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
// .Loading{
//     position: fixed;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     z-index: 10;
//   }
</style>
