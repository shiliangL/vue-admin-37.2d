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
									<el-form-item label="要求送达日期:" prop="sendTime.sendDate" :rules="rules.select">
                      <el-date-picker style="width:160px" value-format="yyyy-MM-dd" size="small" v-model="form.sendTime.sendDate" type="date"> </el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
										<div style="width:410px">
											<el-form-item label="要求送达时间:" prop="sendTime.endTime" :rules="rules.input">
												<el-time-select style="width:130px" size="small" v-model="form.sendTime.beginTime" :picker-options="{ start: '00:00', step: '00:30', end: '24:00',maxTime: form.sendTime.endTime }"> </el-time-select>
											</el-form-item>

											<el-form-item label="" prop="sendTime.endTime" :rules="rules.input" label-width="0">
												<el-time-select style="width:130px" size="small" v-model="form.sendTime.endTime" :picker-options="{ start: '00:00', step: '00:30', end: '24:00', minTime: form.sendTime.beginTime}"> </el-time-select>
											</el-form-item>
										</div>
								</el-col>

                <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="配送方式:" prop="categoryId">
                      <span v-cloak> 厨满满专供 </span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="销售配送单号:" prop="categoryId">
                      <span v-cloak v-if="form.ship"> {{form.ship[0].shipNo}} </span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="配送员:" prop="categoryId">
                      <span v-cloak v-if="form.ship"> {{form.ship[0].driverName}} </span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="实际送达时间:" prop="categoryId">
                      <span v-cloak v-if="form.ship"> {{form.ship[0].factTime}} </span>
									</el-form-item>
								</el-col>
 
              </el-row>
						</div>
				</div>

        <!--收货信息-->
        <div class="row-item">
          <div class="row-title"> 收货信息 </div>
          <div class="row-content info">
						<el-table :data="temAddress" class="saleDtails" size="small" style="width: 100%;" highlight-current-row>
							<el-table-column prop="contacts" label="收货人" align="center"></el-table-column>
							<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
							<el-table-column prop="address" label="收货地址" align="center"></el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<el-button type="text" size="mini" @click.stop="clickToChange(scope.$index, scope.row)">更改</el-button>
								</template>
							</el-table-column>
						</el-table>
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

				<!-- 订单备注 -->
				<div class="row-item">
				 	<div class="row-title">订单备注:</div>
							<div class="row-content">
								<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="请输入内容" v-model.trim="form.scmOrder.remark" />
							</div>
				</div>

  			<!--商品信息-->
				<div class="row-item">
					<div class="row-title">商品信息</div>
					<div class="row-content">

						<div class="add-bar">
                <el-form-item label="商品:" label-width="50px">
                  <SearchBox style="width:180px" keyName="title" isGoods nameLabel="商品" codeLabel="类别" tableCode="categoryName" requestUrl="productInfo/listProductInfo" v-model="addGood.goodsDTO"></SearchBox>
                </el-form-item>
                <el-form-item label="规格:" label-width="50px">
                  <el-select size="small" v-model="addGood.sku" filterable placeholder="选择规格">
                    <el-option v-for="sub in skuOption" :key="sub.id" :label="sub.skuTitle" :value="sub.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数量:" label-width="50px">
                  <el-input size="small" style="width:180px"  v-model.trim="addGood.number"></el-input>
                </el-form-item>
                <el-button  type="primary" size="small" @click.stop="clickToAdd" > 添加 </el-button>
						</div>

						<el-table :data="form.saleDtails" class="skuListTbale" size="small" :max-height="500" style="width: 100%;" highlight-current-row>

							<el-table-column label="序号" width="50" align="center">
								<template slot-scope="scope">
									<span>{{scope.$index + 1}}</span>
								</template>
							</el-table-column>

							<el-table-column prop="goodsImage" label="商品图片" align="center">
								<template slot-scope="scope"><div class="picBox"><img :src="`${scope.row.goodsImage}`"></div></template>
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
							<el-table-column prop="orderQuantityPrice" label="下单金额" align="center"></el-table-column>
							<el-table-column prop="exchanage" label="操作" align="center">
								<template slot-scope="scope">
              <el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
								
						</el-table>
 
            <!-- 分页 -->
            <div class="footer-block">
              <span class="page" v-cloak> 共 {{form.saleDtails.length}} 条</span>
            </div>
					</div>
				</div>
				

			</el-form>


			<!-- 弹层区域 -->
			<el-dialog title="选择地址" class="dialogTitle" width="720px" :visible.sync="dialogVisible" append-to-body center @close="dialogArry=[]">
				<div v-if="dialogVisible">
					<el-table :data="dialogArry" class="saleDtails" size="small" style="width: 100%;" max-height="250" @row-click="clickTableRow"  highlight-current-row>
							<el-table-column align="center" label="默认地址">
								<template slot-scope="scope" align="center">
									<label class="el-checkbox is-checked" v-if="scope.row.status===1">
										<span class="el-checkbox__input is-checked">
											<span class="el-checkbox__inner"></span>
										</span>
									</label>
								</template>
							</el-table-column>
							<el-table-column prop="contacts" label="收货人" align="center"></el-table-column>
							<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
							<el-table-column prop="address" label="收货地址" align="center" width="260"></el-table-column>
						</el-table>
					<div class="footer-block">
						<el-button size="small" @click.stop="dialogVisible = false">取 消</el-button>
						<el-button size="small" type="primary" @click.stop="clickToConfirm"> 确定 </el-button>
					</div>
				</div>
			</el-dialog>

      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->

    </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { mapGetters } from 'vuex'
import rules from '@/public/rules.js'
import { orderDetailNoPage, fetchSkuList } from '@/api/orders.js'
import { fetchCustomersAddress } from '@/api/customer/customerClass.js'
import { SearchBox } from '@/components/base.js'

export default {
  mixins: [rules, addModel],
  components: {
    SearchBox
  },
  data() {
    return {
      temAddress: [],
      dialogArry: [],
      skuOption: [],
      dialogVisible: false,
      form: {
        saleDtails: [],
        sendTime: {
          sendDate: '',
          beginTime: '',
          endTime: ''
        },
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
      addGood: {
        goodsDTO: null,
        sku: null,
        number: null
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
    },
    unpaidAmount() {
      if (!this.form.paidAmount) {
        return this.form.amountPay
      } else {
        return 0
      }
    }
  },
  methods: {
    fetchCustomersAddress(id) {
      if (!id) return
      fetchCustomersAddress({ id: id }).then(({ data }) => {
        if (Array.isArray(data.rows)) {
          this.dialogArry = data.rows
        }
      }).catch(e => {
        this.$message({ type: 'error', message: '获取客户地址失败' })
      })
    },
    fecthDerDetailById() {
      const ID = this.$attrs.loadID
      if (!ID) true
      orderDetailNoPage({ id: ID }).then(({ data }) => {
        if (!data) return
        this.form = Object.assign(this.form, data)
        this.temAddress = [
          {
            'contacts': data.scmOrder.contacts,
            'mobile': data.scmOrder.mobile,
            'address': data.scmOrder.address,
            'status': 1
          }
        ]
        this.loading = false
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
          const data = JSON.parse(JSON.stringify(this.form))
          data.address = this.temAddress[0].address
          data.contacts = this.temAddress[0].contacts
          data.mobile = this.temAddress[0].mobile
          this.$emit('callBack', data)
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    changeNumber(item) {
      if (!isNaN(item.orderQuantity)) {
        item.orderQuantityPrice = item.orderQuantity * item.skuPrice
      } else {
        item.orderQuantityPrice = 0
      }
    },
    fetchSkuList(id) {
      if (!id) return
      fetchSkuList({ id: id }).then(({ data }) => {
        if (Array.isArray(data)) {
          this.skuOption = data
        }
      }).catch(e => {
        this.$message({ type: 'error', message: '获取商品规格失败' })
      })
    },
    clickToAdd() {
      if (!this.addGood.goodsDTO || !this.addGood.number || !this.addGood.sku) {
        this.$message({ type: 'warning', message: '条件不足,请完善' })
        return
      }
      const reg = /^[1-9]\d*$/
      if (!reg.test(this.addGood.number)) {
        this.$message({ type: 'warning', message: '数量为不为0的正整数' })
        return
      }
      const productIds = this.form.saleDtails.map(item => {
        return item.productId
      })
      const skuNames = this.form.saleDtails.map(item => {
        return item.skuId
      })
      if (productIds.indexOf(this.addGood.goodsDTO.id) !== -1 && skuNames.indexOf(this.addGood.sku) !== -1) {
        this.$message({ type: 'warning', message: '请勿重复添加' })
        return
      } else {
        const skuObj = this.skuOption.filter(item => {
          return item.id === this.addGood.sku
        })
        if (skuObj.length === 0) return
        this.form.saleDtails.push(
          {
            'orderQuantity': this.addGood.number,
            'productId': this.addGood.goodsDTO.id,
            'goodsImage': this.addGood.goodsDTO.goodsImage,
            'productName': this.addGood.goodsDTO.title,
            'orderQuantityPrice': (skuObj[0].price * 1) * (this.addGood.number * 1),
            'skuId': skuObj[0].id,
            'skuName': skuObj[0].skuTitle,
            'skuPrice': skuObj[0].price
          }
        )
      }
      this.$setKeyValue(this.addGood, { goodsDTO: null, sku: null, number: null })
    },
    clickToChange() {
      this.dialogVisible = true
      this.fetchCustomersAddress(this.form.scmOrder.customerId)
    },
    clickTableRow(item) {
      for (const key of this.dialogArry) {
        key.status = 0
      }
      item.status = 1
    },
    clickToConfirm() {
      for (const item of this.dialogArry) {
        if (item.status === 1) {
          this.temAddress = [item]
        }
      }
      this.dialogVisible = false
      this.dialogArry = []
    }
  },
  watch: {
    customerDTO: {
      handler(val) {
        if (val) {
          this.Addform.customerId = val.id
          this.Addform.customerName = val.title
          this.Addform.mobile = val.loginName
          setTimeout(() => {
            this.fetchCustomersAddress(val.id)
          }, 400)
        } else {
          this.Addform.customerId = null
          this.Addform.customerName = null
          this.Addform.mobile = null
          this.temAddress = []
        }
      }
    },
    'addGood.goodsDTO': {
      handler(n, o) {
        if (n && o && n.id !== o.id) {
          this.addGood.sku = null
          this.skuOption = []
        }
        if (n) {
          setTimeout(() => {
            this.fetchSkuList(n.id)
          }, 400)
        } else {
          this.addGood.sku = null
          this.skuOption = []
        }
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
		padding: 0px;
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