<template>
	<div class="printLabel">
		<div id="box">
 
			<VueBarcode :value="barcode" :options="{ height:'60px' }" tag="img"></VueBarcode>
		</div>
		<div class="footer-block">
			<el-button size="small" @click.stop="close">取消</el-button>
			<el-button size="small" type="primary" @click.stop="submitForm">打印</el-button>
		</div>
	</div>
</template>

<script>
	import 'print-js'
	import VueBarcode from '@xkeshi/vue-barcode'
	
	export default {
	  name: 'printLabel',
	  props: {
	    propsSonData: {
	      type: Object
	    }
	  },
	  components: {
	    VueBarcode
	  },
	  mounted() {
	    this.barcode = this.propsSonData.barcode ? this.propsSonData.barcode : '获取失败'
	    this.code = this.propsSonData.code ? this.propsSonData.code : '获取失败'
	  },
	  data() {
	    return {
	      code: null,
	      barcode: null
	    }
	  },
	  methods: {
	    close() {
	      this.$emit('close')
	    },
	    submitForm() {
	      this.$nextTick().then(() => {
	        // header: `[商品批次条码] 订单编号:${this.code}`, targetStyle: ['padding-top:0px'], headerStyle: 'font-size: 13px'
	        if (window.printJS) window.printJS({ printable: 'box', type: 'html' })
	        setTimeout(() => {
	          this.close()
	        }, 500)
	      })
    }
	  }
	}
</script>

<style scoped>
	#box{
		text-align: center;
	}
</style>