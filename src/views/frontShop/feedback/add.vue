<template>
	<div>
		<el-form :model="form" ref="form" class="form" style="padding-left: 60px;" :inline="true">
			<div class="box">
				<span v-cloak v-if="propsSonData.data.content" >{{propsSonData.data.content}}</span>
				<span v-cloak v-else> 无 </span>
			</div>	
		</el-form>
		<div class="footer-block" v-if="!isViewPage">
			<el-button size="small" @click.stop="close">取 消</el-button>
			<el-button :loading="saveLoading" size="small" type="primary" @click.stop="close"> 确定 </el-button>
		</div>
	</div>
</template>

<script>
	import addModel from '@/public/addModel.js'
	import { fetchDetail } from '@/api/frontShop/feedback.js'
	
	export default {
	  mixins: [addModel],
	  data() {
	    return {
	      isViewPage: false,
	      saveLoading: false,
	      isUpdate: false,
	      form: {
	        beginTime: '',
	        endTime: '',
	        id: null,
	        mobile: null,
	        name: null,
	        operatorId: null,
	        staffId: null,
	        status: '1'
	      },
	      stockOption: []
	    }
	  },
	  mounted() {
	    if (this.propsSonData.isUpdate) {
	      this.isViewPage = this.propsSonData.type === 'view'
	      fetchDetail({ id: this.propsSonData.data.id }).then(({ data }) => {
	        this.form = Object.assign(this.form, data)
	      }).catch(e => {
	        this.$message({ type: 'error', message: e.msg })
	      })
	    }
	  },
	  methods: {
	    close() {
	      this.$emit('close')
	    }
	  }
	}
</script>

<style scoped lang="scss">
	.form {
		.box{
			padding: 10px;
			border: 1px solid #dcdfe6;
			border-radius: 4px;
		}
	}
</style>