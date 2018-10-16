<template>
<!-- 全屏固定表头弹层组件 -->
  <div>
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog"  :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
              <el-button v-if="this.data.tab ==='sectionOne-setType'" type="text" size="mini" @click.stop="clickToAddType">新增</el-button>
              <el-button v-else type="text" size="mini" @click.stop="validateForm">保存</el-button>
              <el-button type="text" size="mini" @click.stop="closeAdd">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
          <template v-if="this.data.tab ==='sectionOne'">
						<sectionOne :isPass.sync="isPass" :loadID="loadID" ref="sectionOne" v-model="sectionOne"></sectionOne>
          </template>

          <template v-if="this.data.tab ==='sectionTwo'">
						<sectionTwo :isPass.sync="isPass" :loadID="loadID" ref="sectionTwo" v-model="sectionTwo"></sectionTwo>
          </template>

          <template v-if="this.data.tab ==='sectionOne-setType'">
            <stockType ref="stockType"></stockType>
          </template>
          
        </div>
      </div>
      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->
    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import sectionOne from './sectionOne'
import sectionTwo from './sectionTwo'
import stockType from './stockType'
import { createCK, createCW, updateCK, updateCW } from '@/api/warehouse/setting.js'

export default {
  mixins: [addModel],
  components: {
    sectionOne,
    sectionTwo,
    stockType
  },
  data() {
    return {
      isPass: false,
      loadID: false,
      sectionOne: null,
      sectionTwo: null
    }
  },
  created() {
    this.currentTitle = this.data.title
    this.$setKeyValue(this.dialog, { visiable: true })
  },
  mounted() {
    if (this.data.type === 'view') {
      const id = this.data.obj.id
      if (!id) return
      this.loadID = id
    }
  },
  methods: {
    closeAdd() {
      this.dialog.visiable = false
      this.$emit('add')
    },
    clickToEdit() {
      this.typeIseditor = true // 点击判断编辑修改提交
      this.isShowView = false
      this.isShowEditor = true
    },
    closeDialog() {
      this.$emit('input', false)
    },
    success() {
      this.$message({
        type: 'success',
        message: this.dialog.title + '成功'
      })
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
      }
    },
    validateForm() {
      if (this.data.tab === 'sectionOne') {
        if (this.$refs['sectionOne']) { this.$refs['sectionOne'].validateForm() }
        if (!this.isPass || !this.sectionOne) return
        if (this.data.isEditor) {
          const data = {
            'address': this.sectionOne.address,
            'categoryId': this.sectionOne.categoryId,
            'contacts': this.sectionOne.contacts,
            'currentUserId': this.sectionOne.currentUserId,
            'description': this.sectionOne.description,
            'id': this.sectionOne.pk,
            'phone': this.sectionOne.phone,
            'staffId': this.sectionOne.staffId,
            'title': this.sectionOne.title
          }
          updateCK(data).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.dialog.visiable = false
            this.$emit('add')
          }).catch((e) => {
            this.$message({ type: 'error', message: e.msg })
          })
        } else {
          createCK(this.sectionOne).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.dialog.visiable = false
            this.$emit('add')
          }).catch((e) => {
            this.$message({ type: 'error', message: e.msg })
          })
        }
      } else {
        if (this.$refs['sectionTwo']) { this.$refs['sectionTwo'].validateForm() }
        if (!this.isPass || !this.sectionTwo) return
        if (this.data.isEditor) {
          const data = {
            'description': this.sectionTwo.description,
            'high': this.sectionTwo.high,
            'id': this.sectionTwo.pk,
            'lasting': this.sectionTwo.lasting,
            'number': this.sectionTwo.number,
            'stockId': this.sectionTwo.stockId,
            'width': this.sectionTwo.width
          }
          updateCW(data).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.dialog.visiable = false
            this.$emit('add')
          }).catch((e) => {
            this.$message({ type: 'error', message: e.msg })
          })
        } else {
          createCW(this.sectionTwo).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.dialog.visiable = false
            this.$emit('add')
          }).catch((e) => {
            this.$message({ type: 'error', message: e.msg })
          })
        }
      }
    },
    clickToAddType() {
      if (this.$refs['stockType']) { this.$refs['stockType'].clickToAddNew() }
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__wrapper {
    transform: translateZ(0);
    min-height: 100%;
    min-height: 700px;
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
.Loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
}
</style>
