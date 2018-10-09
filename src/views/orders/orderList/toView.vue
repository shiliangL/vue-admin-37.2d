<template>
    <div class="toView">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" :inline="true">
        <!--基本信息-->
		    <div class="row-item">
						<div class="row-title">基本信息</div>
						<div class="row-content basicInfo">
					     <el-row>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="销售订单编号:">
                      <span v-cloak>{{form.scmOrder.orderNo}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="下单时间:">
                      <span v-cloak>{{form.scmOrder.orderTime}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户名称:">
                      <span v-cloak>{{form.scmOrder.customerName}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户账户:">
                      <span v-cloak>{{form.scmOrder.loginName}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="订单来源:">
											<span v-cloak v-if="form.scmOrder.orderSource ===0">App</span>
											<span v-cloak v-if="form.scmOrder.orderSource ===1">微信公众号</span>
											<span v-cloak v-if="form.scmOrder.orderSource ===2">微信小程序</span>
											<span v-cloak v-if="form.scmOrder.orderSource ===3">后台</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="支付类型:">
											<span v-cloak v-if="form.scmOrder.paymentType ===0">货到付款</span>
											<span v-cloak v-if="form.scmOrder.paymentType ===1">线上支付 </span>
									</el-form-item>
								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="要求送达日期:">
                      <span v-cloak>{{form.sendTime.sendDate}}</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="要求送达时间:">
                      <span v-cloak>{{form.sendTime.beginTime}}</span> -
                      <span v-cloak>{{form.sendTime.endTime}}</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="配送番薯:">
                      <span v-cloak> 厨满满专供 </span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="销售配送单号:">
                      <span v-cloak v-if="form.ship && form.ship[0]"> {{form.ship[0].shipNo}} </span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="配送员:">
                      <span v-cloak v-if="form.ship && form.ship[0]"> {{form.ship[0].driverName}} </span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="实际送达时间:">
                      <span v-cloak v-if="form.ship && form.ship[0]"> {{form.ship[0].factTime}} </span>
									</el-form-item>
								</el-col>

 
              </el-row>
						</div>
				</div>

        <!--收货信息-->
        <div class="row-item">
          <div class="row-title"> 收货信息 </div>
          <div class="row-content info">
            <el-row>
							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="收货人:" >
										<span v-cloak>{{form.scmOrder.contacts}}</span>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="手机号:" >
										<span v-cloak>{{form.scmOrder.mobile}}</span>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="收货地址:" >
										<span v-cloak>{{form.scmOrder.address}}</span>
								</el-form-item>
							</el-col>
 
						</el-row>
          </div>
        </div>

 				<!--费用信息-->
				<div class="row-item">
					<div class="row-title">费用信息</div>
					<div class="row-content">
						<el-row>

						 <el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="下单金额:" >
										<span v-cloak>{{form.totalOrderQuantityPrice}}</span>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="实际金额:" >
										<span v-cloak>{{form.totalSumPric}}</span>
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
								<el-form-item label="红包抵扣:">
										<span v-cloak>{{form.pacage}}</span>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="运费:" >
										<span v-cloak>{{form.freight}}</span>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="退货金额:" >
										<span v-cloak>{{form.returnAmount}}</span>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="应付款金额:" >
										<span v-cloak>{{form.amountPay}}</span>
								</el-form-item>
							</el-col>
							
							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="未支付金额:" >
										<span v-cloak>{{unpaidAmount}}</span>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="已支付金额:" >
										<span v-cloak>{{form.paidAmount}}</span>
								</el-form-item>
							</el-col>
							
							<!-- 加 -->
							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="付款方式:" >
										<span v-cloak v-if="form.scmOrder.payType === 0"> 支付宝支付 </span>
										<span v-cloak v-if="form.scmOrder.payType === 1"> 微信支付 </span>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="支付单号/交易号:" >
										<span v-cloak>{{form.scmOrder.tradeNo}}</span>
								</el-form-item>
							</el-col>

   					</el-row>
					</div>
				</div>

  			<!--商品信息-->
				<div class="row-item">
					<div class="row-title">商品信息</div>
					<div class="row-content">
						<el-table :data="form.saleDtails.rows" class="skuListTbale" size="small" :max-height="500" style="width: 100%;" highlight-current-row>
 
							<el-table-column label="序号" width="50" align="center">
								<template slot-scope="scope">
									<span>{{scope.$index + 1}}</span>
								</template>
							</el-table-column>

							<el-table-column prop="goodsImage" label="商品图片" align="center">
								<template slot-scope="scope">
									<div class="picBox">
										<img :src="`${scope.row.goodsImage}`">
									</div>
								</template>
							</el-table-column>

							<el-table-column prop="productName" label="名称" align="center"></el-table-column>
							<el-table-column prop="skuName" label="规格" align="center">
								<!-- <template slot-scope="scope">
									<span v-cloak> {{scope.row.skuName}} <span v-if="scope.row.summary"> ( {{scope.row.summary}} ) </span> </span>
								</template> -->
							</el-table-column>
							<el-table-column prop="skuPrice" label="价格" align="center"></el-table-column>
							<el-table-column prop="orderQuantity" label="下单数量" align="center"></el-table-column>
							<el-table-column prop="orderQuantityPrice" label="下单金额" align="center"></el-table-column>
							<el-table-column prop="finalQuantity" label="实际数量" align="center"></el-table-column>
							<el-table-column prop="sumPrice" label="实际金额" align="center"></el-table-column>

							<el-table-column prop="exchanage" label="退/换货状态" align="center">
								<template slot-scope="scope">
									<template v-if="scope.row.method ===1">
										<!-- 退货 -->
										<span v-cloak v-if="scope.row.exchanage ===0"> 退货待审核 </span>
										<span v-cloak v-if="scope.row.exchanage ===1"> 退货进行中 </span>
										<span v-cloak v-if="scope.row.exchanage ===2"> 退货已完成 </span>
										<span v-cloak v-if="scope.row.exchanage ===3"> 退货已拒绝 </span>
									</template>
									<template  v-if="scope.row.method ===2">
										<!-- 换货 -->
										<span v-cloak v-if="scope.row.exchanage ===0"> 换货待审核 </span>
										<span v-cloak v-if="scope.row.exchanage ===1"> 换货进行中 </span>
										<span v-cloak v-if="scope.row.exchanage ===2"> 换货已完成 </span>
										<span v-cloak v-if="scope.row.exchanage ===3"> 换货已拒绝 </span>
									</template>
								</template>
							</el-table-column>
							 
						</el-table>

						 <el-pagination
								slot="footer"
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="pagination.page"
								:page-sizes="pagination.pageSizes"
								:page-size="pagination.size"
								layout="total, sizes, prev, pager, next, jumper"
								:total="pagination.total">
							</el-pagination>
					</div>
				</div>

				<!-- 订单备注 -->
				<div class="row-item">
					<div class="row-title">订单备注:</div>
					<div class="row-content">
						<span v-cloak>{{form.scmOrder.remark}}</span>
					</div>
				</div>

			</el-form>
      <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading>
    </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { mapGetters } from 'vuex'
import rules from '@/public/rules.js'
import { orderDetail } from '@/api/orders.js'
import model from '@/public/listModel.js'

export default {
  mixins: [rules, addModel, model],
  name: 'toView',
  props: {
    isAllowToShow: {
      type: Boolean
    }
  },
  data() {
    return {
      overTime: false,
      form: {
        saleDtails: {
          rows: [],
          total: null
        },
        sendTime: {},
        scmOrder: {
          pk: null,
          createdBy: null,
          createdOn: null,
          updatedBy: null,
          updatedOn: null,
          deletedFlag: null,
          orderNo: null,
          paymentType: null,
          customerId: null,
          customerName: null,
          orderSum: null,
          finalSum: null,
          paymentAmount: null,
          orderSource: 0,
          offerAmount: null,
          remark: null,
          status: 0,
          address: null,
          contacts: null,
          mobile: null,
          phone: null,
          shippingTime: null
        },
        ship: null,
        flag: false,
        totalOrderQuantityPrice: 0,
        totalSumPric: 0,
        activityPreferences: 0,
        coupon: 0,
        pacage: 0,
        freight: 0,
        returnAmount: 0,
        amountPay: 0,
        unpaidAmount: 0,
        paidAmount: 0
      }
    }
  },
  mounted() {
    if (this.$attrs.loadID) {
      this.fecthDerDetailById()
    }
  },
  computed: {
    ...mapGetters(['baseImgUrl']),
    unpaidAmount() {
      if (!this.form.paidAmount) {
        return this.form.amountPay
      } else {
        return 0
      }
    }
  },
  methods: {
    fecthDerDetailById() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        id: this.$attrs.loadID
      }
      orderDetail(data).then(({ data }) => {
        this.form = data
        this.pagination.total = data.saleDtails.total
        if (this.form.scmOrder.paymentType === 0 && this.form.scmOrder.status === 0 && this.form.flag) {
          setTimeout(() => {
            this.$emit('update:isAllowToShow', true)
          }, 100)
        }
        setTimeout(() => {
          this.loading = false
        }, 200)
      }).catch(e => {
        this.loadingText = e.msg
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fecthDerDetailById()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fecthDerDetailById()
    },
    onRefresh() {
      this.fecthDerDetailById(this.$attrs.loadID)
    }
  }
}
</script>

<style scoped lang="scss">
.row-item {
  padding: 4px 0;
  .row-title {
    border-left: 2px solid #1cbc9c;
    padding-left: 8px;
    .desc {
      font-size: 12px;
      padding-left: 16px;
      color: rgb(128, 132, 143);
    }
  }
  .row-content {
    padding: 10px;
    .label {
      color: #696767;
      font-size: 14px;
    }
  }
  .el-col {
    padding: 5px 0;
  }
  .tips {
    padding: 10px 0;
  }
}

.basicInfo{
	.el-form-item {
		width: 320px;
		margin-bottom: 0;
	}
}

.el-form-item {
	margin-bottom: 0;
}
.remark{
	margin: 14px 0;
}
.picBox{
	width: 120px;
	height: 40px;
	text-align: center;
	display: inline-block;
	overflow: hidden;
	img{
		height: 100%;
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