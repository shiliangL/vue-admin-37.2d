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
									<el-form-item label="下单时间:" prop="categoryId">
                      <span v-cloak>{{form.scmOrder.createdOn}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户名称:" prop="categoryId">
                      <span v-cloak>{{form.scmOrder.customerName}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户账户:" prop="categoryId">
                      <span v-cloak>{{form.scmOrder.customerName}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="订单来源:" prop="categoryId">
											<span v-cloak v-if="form.scmOrder.orderSource ===0">App</span>
											<span v-cloak v-if="form.scmOrder.orderSource ===1">微信公众号</span>
											<span v-cloak v-if="form.scmOrder.orderSource ===2">微信小程序</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="支付类型:" prop="categoryId">
											<span v-cloak v-if="form.scmOrder.paymentType ===0">货到付款</span>
											<span v-cloak v-if="form.scmOrder.paymentType ===1">线上支付 </span>
									</el-form-item>
								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="要求送达日期:" prop="categoryId">
                      <span v-cloak>{{form.sendTime.beginTime}}</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="要求送达日期:" prop="categoryId">
                      <span v-cloak>{{form.sendTime.endTime}}</span>
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
										<span v-cloak>{{form.scmOrder.phone}}</span>
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
							<el-table-column prop="skuName" label="规格" align="center"></el-table-column>
							<el-table-column prop="orderQuantityPrice" label="下单数量" align="center"></el-table-column>
							<el-table-column prop="orderQuantityPrice" label="下单金额" align="center"></el-table-column>
							<el-table-column prop="finalQuantity" label="分拣量(斤)" align="center"></el-table-column>
							<el-table-column prop="sumPrice" label="实际金额" align="center"></el-table-column>

							<el-table-column prop="exchanage" label="退/换货状态" align="center">
								<template slot-scope="scope">
									<span v-cloak v-if="form.scmOrder.exchanage ===0">退货</span>
									<span v-cloak v-if="form.scmOrder.exchanage ===1">换货 </span>
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

				<div class="row-item">
					<div class="row-title">费用信息</div>
					<div class="row-content">
						 
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
										<span v-cloak>{{form.unpaidAmount}}</span>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="已支付金额:" >
										<span v-cloak>{{form.paidAmount}}</span>
								</el-form-item>
							</el-col>

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
  data() {
    return {
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
  },
  computed: {
    ...mapGetters(['baseImgUrl'])
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