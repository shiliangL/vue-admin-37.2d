<template>
  <div class="add">
      <h1>测试</h1>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { createCK, createCW, updateCK, updateCW } from '@/api/warehouse/setting.js'

export default {
  mixins: [addModel],
  components: {

  },
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

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
        this.fecthDerDetailById(id)
      }
    },
    fecthDetailById(id) {
      // productDetail({ id })
      //   .then(({ data }) => {
      //     this.viewData = data
      //     this.isShowView = true
      //     setTimeout(() => {
      //       this.loading = false
      //     }, 200)
      //   })
      //   .catch(e => {
      //     this.loadingText = e
      //   })
    },
    validateForm() {
      if (this.data.tab === 'sectionOne') {
        if (this.$refs['sectionOne']) { this.$refs['sectionOne'].validateForm() }
        if (!this.isPass || !this.sectionOne) return
        if (this.data.isEditor) {
          updateCK(this.sectionOne).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.dialog.visiable = false
            this.$emit('add')
          }).catch(() => {
            this.$message({ type: 'error', message: '操作失败' })
          })
        } else {
          createCK(this.sectionOne).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.dialog.visiable = false
            this.$emit('add')
          }).catch(() => {
            this.$message({ type: 'error', message: '操作失败'
            })
          })
        }
      } else {
        if (this.$refs['sectionTwo']) { this.$refs['sectionTwo'].validateForm() }
        if (!this.isPass || !this.sectionTwo) return
        if (this.data.isEditor) {
          updateCW(this.sectionOne).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.dialog.visiable = false
            this.$emit('add')
          }).catch(() => {
            this.$message({ type: 'error', message: '操作失败' })
          })
        } else {
          createCW(this.sectionTwo).then(res => {
            this.$message({ type: 'success', message: `${res.msg}!` })
            this.dialog.visiable = false
            this.$emit('add')
          }).catch(() => {
            this.$message({ type: 'error', message: '操作失败' })
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
