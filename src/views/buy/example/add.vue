<template>
  <div class="add">
		<div class="header-bar clearfix" slot="title">
			<div class="left"> 左边 </div>
			<div class="right">
				<el-button type="text" size="mini" @click.stop="closeAdd">返回</el-button>
			</div>
		</div>
		<div class="mc">
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
			<h1>内容</h1>
		</div>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { StickyBar } from '@/components/base.js'
import { createCK, createCW, updateCK, updateCW } from '@/api/warehouse/setting.js'

export default {
  mixins: [addModel],
  components: {
    StickyBar
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
      this.$emit('update:visiable', false)
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
.add{
	position: absolute;
  // transform: translateZ(0);
	left: 0;
	top: 80px;
	width: 100%;
	background: #ccc;
	transform: translateZ(0);
}

.header-bar {
		.left {
				color: #1cbc9c;
		}
		padding: 0 10px;
		height: 40px;
		line-height: 40px;
		width: 100%;
  	position: fixed;
		left: 0;
		top: 0;
		background: #e8f8f5 !important;
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.23);
}
		
.Loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
}
.mc{
	max-height: 100%;
	overflow-y: auto;
}
</style>
