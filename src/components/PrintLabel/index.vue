<template>
	<div class="printLabel">
		<div id="box">
			<div class="box-text">
				<template v-if="isSorting">
					<div class="item center">
						【 分拣条码: {{propsSonData.barCode}} 】 
					</div>
					<div class="item">
							<span v-if="propsSonData.storehouseType === 1 "> 	订单编号: {{propsSonData.orderNo}} </span>
							<span v-if="propsSonData.storehouseType === 2 "> 	换货单号: {{propsSonData.orderNo}} </span>
					</div>
					<div class="item">
						客户名称: {{propsSonData.customerName}}
					</div>
					<div class="item">
						配送区域: {{propsSonData.distributionArea}}
					</div>
					<div class="item">
						商品名称: {{propsSonData.productName}}
					</div>
					<div class="item">
						下单数量: {{ propsSonData.specification}} * {{propsSonData.saleOrderQuantity}}
					</div>
					<div class="item">
						实际数量:  {{ propsSonData.specification}} * {{propsSonData.sortingSaleQuantity}}
					</div>
					<div class="item">
						基本单位分拣量: {{propsSonData.sortingQuantity}} {{propsSonData.basicUnitName}}
					</div>
				</template>
				<template v-else>
					<div class="title">
						<div class="item center">
							【 打包条码: {{propsSonData.barCode}} 】 
						</div>
						<div class="item">
							<span v-if="propsSonData.storehouseType === 1 "> 	订单编号: {{propsSonData.orderNo}} </span>
							<span v-if="propsSonData.storehouseType === 2 "> 	换货单号: {{propsSonData.orderNo}} </span>
						</div>
						<div class="item">
							客户名称: {{propsSonData.customerName}} 
						</div>
						<div class="item">
							配送区域: {{propsSonData.distributionArea}} 
						</div>
						<div class="item">
							下单时间: {{propsSonData.createdTime}}
						</div>
						<div class="item">
							要求送达日期: {{propsSonData.sendDate}} 
						</div>
						<div class="item">
							要求送达时间: {{propsSonData.sendTime}} 
						</div>
						<div class="item">
							收货人: {{propsSonData.contacts}} 
						</div>
						<div class="item">
							联系电话: {{propsSonData.mobile}} 
						</div>
						<div class="item">
							收货地址: {{propsSonData.address}} 
						</div>
					</div>
				</template>
			</div>
			<div class="barcode">
				<VueBarcode :value="barcode" v-if="barcode" :options="{ height:'60px'}" tag="img"></VueBarcode>
				<span v-else> 条码生成失败 </span>
			</div>
		</div>
		<div class="footer-block">
			<el-button size="small" @click.stop="close">取消</el-button>
			<el-button size="small" type="primary" :disabled="!barcode" @click.stop="submitForm">打印</el-button>
		</div>
	</div>
</template>

<script>
import 'print-js'
import VueBarcode from '@xkeshi/vue-barcode'

export default {
  name: 'printLabel',
  props: {
    isSorting: {
      type: Boolean,
      default: true
    },
    propsSonData: {
      type: Object
    }
  },
  components: {
    VueBarcode
  },
  mounted() {
    console.log(this.propsSonData)
    this.barcode = this.propsSonData.barCode ? this.propsSonData.barCode : null
  },
  data() {
    return {
      barcode: null
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submitForm() {
      this.$nextTick().then(() => {
        if (window.printJS) {
          window.printJS({
            printable: 'box',
            type: 'html',
            targetStyles: ['*']
          })
        }
        setTimeout(() => {
          this.close()
        }, 500)
      })
    }
  }
}
</script>

<style scoped lang="scss">
#box {
    margin: 0;
    padding: 0;
    text-align: center;
    .box-text {
        // padding-left: 10px;
        .item {
					padding-top: 4px;
          text-align: left;
        }
    }
    .center {
				margin-bottom: 6px;
    }
    .title {
      font-size: 13px;
    }
}
</style>