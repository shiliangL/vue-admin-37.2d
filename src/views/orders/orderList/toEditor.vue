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
								 <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="下单时间:">
                      <span v-cloak>{{form.scmOrder.createdOn}}</span>
									</el-form-item>
								</el-col> -->
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户名称:">
                      <span v-cloak>{{form.scmOrder.customerName}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户账户:">
                      <span v-cloak>{{form.scmOrder.customerName}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="订单来源:">
											<span v-cloak v-if="form.scmOrder.orderSource ===0">App</span>
											<span v-cloak v-if="form.scmOrder.orderSource ===1">微信公众号</span>
											<span v-cloak v-if="form.scmOrder.orderSource ===2">微信小程序</span>
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
										<div style="width:410px">
											<el-form-item label="要求送达时间:" prop="sendTime.endTime" :rules="rules.input">
												<el-time-select style="width:130px" v-model="form.sendTime.beginTime" :picker-options="{ start: '00:00', step: '00:30', end: '24:00',maxTime: form.sendTime.endTime }"> </el-time-select>
											</el-form-item>

											<el-form-item label="" prop="sendTime.endTime" :rules="rules.input" label-width="0">
												<el-time-select style="width:130px" v-model="form.sendTime.endTime" :picker-options="{ start: '00:00', step: '00:30', end: '24:00', minTime: form.sendTime.beginTime}"> </el-time-select>
											</el-form-item>
										</div>
									</el-col>

 
              </el-row>
						</div>
				</div>

        <!--收货信息-->
        <div class="row-item">
          <div class="row-title"> 收货信息 </div>
          <div class="row-content info">
            <el-row>
							<el-col :xs="24" :sm="10" :md="8" :lg="6">
								<el-form-item label="收货人:" prop="scmOrder.contacts" :rules="rules.input" label-width="84px">
									<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.scmOrder.contacts"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="6">
								<el-form-item label="手机号:" prop="scmOrder.phone" :rules="rules.input" label-width="84px">
									<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.scmOrder.phone"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="10" :md="8" :lg="6">
								<el-form-item label="收货地址:" prop="scmOrder.address" :rules="rules.input" label-width="84px">
									<el-input size="small" style="width:180px" type="textarea"  placeholder="请输入" v-model.trim="form.scmOrder.address"></el-input>
								</el-form-item>
							</el-col>
 
						</el-row>
          </div>
        </div>

				<!-- 费用信息 -->
 				<div class="row-item">
          <div class="row-title"> 费用信息 </div>
  				<div class="row-content"> 
						<el-row>
							<el-col :xs="24" :sm="10" :md="8" :lg="8">
								<el-form-item label="下单金额:" >
										<span v-cloak>{{totalOrderQuantityPrice}}</span>
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
   					</el-row>
					</div>
        </div>

  			<!--商品信息-->
				<div class="row-item">
					<div class="row-title">商品信息</div>
					<div class="row-content">

						<div class="add-bar">
							<!-- 商品添加模块 -->
							
						</div>

						<el-table :data="form.saleDtails" class="skuListTbale" size="small" :max-height="500" style="width: 100%;" highlight-current-row>

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
							<el-table-column prop="skuPrice" label="价格" align="center"></el-table-column>
							<el-table-column prop="orderQuantity" label="下单数量" align="center">
								<template slot-scope="scope">

									<el-form-item label="" label-width="0px" :prop="'saleDtails.'+scope.$index+'.orderQuantity'" :rules="[{trigger: 'change', validator: rules.validNumberR2}]">
										<el-input size="small" class="w110" @change="changeNumber(scope.row)" placeholder="请输入" v-model.trim="scope.row.orderQuantity"></el-input>
									</el-form-item>

								</template>
							</el-table-column>
							<el-table-column prop="orderQuantityPrice" label="下单金额" align="center">
								<!-- <template slot-scope="scope">

									<el-form-item label="" label-width="0px" :prop="'saleDtails.'+scope.$index+'.orderQuantityPrice'" :rules="rules.input">
										<el-input size="small" class="w110" type="number" placeholder="请输入" v-model.trim="scope.row.orderQuantityPrice"></el-input>
									</el-form-item>

								</template> -->
							</el-table-column>

							<el-table-column prop="exchanage" label="操作" align="center">
								<template slot-scope="scope">
              <el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
								
						</el-table>
 
					</div>
				</div>
				
				<!-- 订单备注 -->
				<div class="row-item">
				 	<div class="row-title">订单备注:</div>
							<div class="row-content">
								<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="请输入内容" v-model.trim="form.scmOrder.remark" />
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
import { orderDetailNoPage } from '@/api/orders.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      form: {
        saleDtails: [],
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
      },
      rules: {
        validNumberR2: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        }
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
    totalOrderQuantityPrice() {
      let sum = 0
      for (const item of 	this.form.saleDtails) {
        sum += parseInt(item.orderQuantityPrice)
      }
      return sum
    }
  },
  methods: {
    fecthDerDetailById() {
      const ID = this.$attrs.loadID
      if (!ID) true
      orderDetailNoPage({ id: ID }).then(({ data }) => {
        this.form = data
        setTimeout(() => {
          this.loading = false
        }, 200)
      }).catch(e => {
        this.loadingText = e.msg
      })
    },
    onRefresh() {
      this.fecthDerDetailById()
    },
    clickToDelete(index, item) {
      if (this.form.saleDtails.length > 1) {
        this.form.saleDtails.splice(index, 1)
      } else {
        this.$message({ type: 'warning', message: '商品不能为空' })
      }
    },
    validateForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('callBack', this.form)
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    changeNumber(item) {
      console.log(item.orderQuantity, '修改了数量')
      if (!isNaN(item.orderQuantity)) {
        item.orderQuantityPrice = item.orderQuantity * item.skuPrice
      } else {
        item.orderQuantityPrice = 0
      }
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
		// width: 320px;
		margin-bottom: 0;
	}
}
.skuListTbale{
	.el-form-item {
		padding: 15px;
	}
}
.el-form-item {
  margin-bottom: 0;
}
.remark {
  margin: 14px 0;
}
.picBox {
  width: 120px;
  height: 40px;
  text-align: center;
  display: inline-block;
  overflow: hidden;
  img {
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