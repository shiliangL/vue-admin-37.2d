<template>
<!-- 全屏固定表头弹层组件 -->
<!-- :title="dialog.title" -->
  <div>
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal="false" :modal-append-to-body="true">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
						 <!-- v-if="form.status===0" -->
              <template>
                <el-button type="text" size="mini" @click.stop="clickToPass(0)">拒绝</el-button>
                <el-button type="text" size="mini" @click.stop="clickToPass(1)">同意</el-button>
              </template>
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
				 	<el-form :model="form"  ref="form" label-width="120px" :inline="true">

						<div class="row-item">
								<div class="row-title">基本信息</div>
								<div class="row-content basicInfo">
									<el-row>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="销售订单编号:">
													<span v-cloak>{{form.orderNo}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="下单时间:">
													<span v-cloak>{{form.orderDate}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="客户名称:">
													<span v-cloak>{{form.customerName}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="客户账户:">
													<span v-cloak>{{form.loginName}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="订单来源:">
													<span v-cloak v-if="form.orderSource ===0">App</span>
													<span v-cloak v-if="form.orderSource ===1">微信公众号</span>
													<span v-cloak v-if="form.orderSource ===2">微信小程序</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="支付类型:">
													<span v-cloak v-if="form.paymentType ===0">货到付款</span>
													<span v-cloak v-if="form.paymentType ===1">线上支付 </span>
											</el-form-item>
										</el-col>

										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="要求送达日期:">
													<span v-cloak>{{form.sendDate}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="要求送达时间:">
													<span v-cloak>{{form.beginTime}}</span> -
													<span v-cloak>{{form.endTime}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="配送方式:">
													<span v-cloak>厨满满专供</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="销售配送单号:">
													<span v-cloak>{{form.serialNumber}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="配送员:">
													<span v-cloak>{{form.driverName}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="实际送达时间:">
													<span v-cloak>{{form.factTime}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="销售退货单号:">
													<span v-cloak>{{form.code}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="申请退货时间:">
													<span v-cloak>{{form.returnDate}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="审核时间:">
													<span v-cloak>{{form.examTime}}</span>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="10" :md="8" :lg="6">
											<el-form-item label="退货完成时间:">
													<span v-cloak>{{form.finishReturn}}</span>
											</el-form-item>
										</el-col>

		
									</el-row>
								</div>
						</div>

						<div class="row-item">
							<div class="row-title"> 费用信息 </div>
							<div class="row-content">
								<el-row>
									<el-col :xs="24" :sm="10" :md="8" :lg="8">
										<el-form-item label="申请退货金额:" >
												<span v-cloak>{{form.amountPrice}}</span>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="10" :md="8" :lg="8">
										<el-form-item label="活动优惠:" >
												<span v-cloak>{{form.activityPreferences}}</span>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="10" :md="8" :lg="8">
										<el-form-item label="优惠券:" >
												<span v-cloak>{{form.coupon}}</span>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="10" :md="8" :lg="8">
										<el-form-item label="红包抵扣:" >
												<span v-cloak>{{form.pacage}}</span>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="10" :md="8" :lg="8">
										<el-form-item label="运费:" >
												<span v-cloak>{{form.freight}}</span>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="10" :md="8" :lg="8">
										<el-form-item label="应付款金额:" >
												<span v-cloak>{{form.paidAmount}}</span>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="10" :md="8" :lg="8">
										<el-form-item label="未支付金额:" >
												<span v-cloak>{{form.price}}</span>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="10" :md="8" :lg="8">
										<el-form-item label="已支付金额:" >
												<span v-cloak>{{form.paidAmount}}</span>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="10" :md="8" :lg="8">
										<el-form-item label="实际退货数量:" >
												<span v-cloak>{{form.paidAmount}}</span>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="10" :md="8" :lg="8">
										<el-form-item label="实际退货金额:" >
												<span v-cloak>{{form.paidAmount}}</span>
										</el-form-item>
									</el-col>
		
								</el-row>
							</div>
						</div>

						<div class="row-item">
							<div class="row-title">收货信息</div>
							<div class="row-content">
								<el-row>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="收货人:" >
										<span v-cloak>{{form.contacts}}</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="手机号:" >
										<span v-cloak>{{form.phone}}</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="收货地址:" >
										<span v-cloak>{{form.address}}</span>
									</el-form-item>
								</el-col>
								</el-row>
							</div>
						</div>

						<div class="row-item">
							<div class="row-title">商品信息</div>
							<div class="row-content">
								<el-table :data="form.table" size="small" style="width: 100%;" highlight-current-row>
									<el-table-column prop="orderNo" label="商品图片" align="center"></el-table-column>
									<el-table-column prop="stockInfoName" label="商品名称" align="center"></el-table-column>
									<el-table-column prop="skuName" label="规格" align="center"></el-table-column>
									<el-table-column prop="price" label="价格" align="center"></el-table-column>
									<el-table-column prop="orderQuantity" label="下单数量" align="center"></el-table-column>
									<el-table-column prop="orderQuantityPrice" label="下单金额" align="center"></el-table-column>
									<el-table-column prop="amountNumber" label="实际数量" align="center"></el-table-column>
									<el-table-column prop="amountPrice" label="实际金额" align="center"></el-table-column>
									<el-table-column prop="createdTime" label="退货原因" align="center"></el-table-column>
				        </el-table>
							</div>
						</div>

					</el-form>
        </div>
      </div>
 
    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { orderDetail } from '@/api/returnChange.js'

export default {
  mixins: [addModel],
  components: {
  },
  data() {
    return {
      currentTitle: null,
      form: {
        'id': null,
        'orderId': null,
        'orderNo': null,
        'orderDate': null,
        'customerId': null,
        'customerName': null,
        'loginName': null,
        'orderSource': null,
        'paymentType': null,
        'beginTime': null,
        'endTime': null,
        'sendDate': null,
        'serialNumber': null,
        'driverName': null,
        'factTime': null,
        'code': null,
        'returnDate': null,
        'examTime': null,
        'serialNumberExchange': null,
        'driverNameExchange': null,
        'exchangeeDate': null,
        'finishReturn': null,
        'activityPreferences': null,
        'coupon': null,
        'pacage': null,
        'freight': null,
        'paidAmount': null,
        'amountNumber': null,
        'amountPrice': null,
        'address': null,
        'contacts': null,
        'mobile': null,
        'phone': null,
        'goodsImage': null,
        'skuId': null,
        'skuName': null,
        'price': null,
        'orderQuantity': null,
        'orderQuantityPrice': null,
        table: []
      }
    }
  },
  created() {
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    this.currentTitle = this.data.title || ''
    if (this.data.type === 'view') {
      this.orderDetail()
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    orderDetail() {
      if (!this.data.obj.id && !this.data.obj.flag) return
      orderDetail({ id: this.data.obj.id, flag: this.data.obj.flag }).then(({ data }) => {
        if (!data) return
        this.form = Object.assign(this.form, data)
        this.form.table = [{
          'goodsImage': this.form.goodsImage,
          'skuName': this.form.skuName,
          'price': this.form.price,
          'orderQuantity': this.form.orderQuantity,
          'orderQuantityPrice': this.form.orderQuantityPrice,
          'amountNumber': this.form.amountNumber
        }]
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickToPass(type) {
      const title = type === 1 ? '是否确定同意申请？' : '是否确定拒绝申请？'
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

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

.el-form-item{
	margin-bottom: 0px;
}
</style>
