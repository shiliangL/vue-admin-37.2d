<template>
	<div class="dashboard">

		<div class="topCar">
			<el-row :gutter="12">
				<el-col :span="6" v-for="(item,index) in tipsCar" :key="index">
					<el-card shadow="hover">
						<div class="car-item">

							<div class="card-panel-icon" :class="item.class">
								<svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
							</div>

							<div class="card-panel-num">
								<div class="title" v-cloak> {{item.title}} </div>
								<count-to class="car-num" :startVal="0" :endVal="item.number" :duration="3000"></count-to>
							</div>

						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>

 		<div class="todo-kanban">
			<el-row :gutter="20">
				<el-col :span="24">
					<el-card shadow="hover">
						<div class="titelName"> 待处理事项 </div>

            <!-- 销售退/换货 -->
						<div class="row-item">
              <div class="title"> 销售退/换货: </div>
              <el-row style="width: 100%;">
                <el-col :span="6" v-for="(item,index) in todo.returnChange" :key="index">
                    <span class="desc"> {{item.title}} </span>
                    <span class="num" @click.stop="goTo(item.path)"> {{item.number}} </span>
                    <span> {{item.unit}} </span>
                </el-col>
              </el-row>
						</div>
            <!-- 采购计划 -->
						<div class="row-item">
              <div class="title"> 采购计划: </div>
              <el-row style="width: 100%;">
                <el-col :span="6" v-for="(item,index) in todo.purchaseOrderPlan" :key="index">
                    <span class="desc"> {{item.title}} </span>
                    <span class="num" @click.stop="goTo(item.path)"> {{item.number}} </span>
                    <span> {{item.unit}} </span>
                </el-col>
              </el-row>
						</div>

            <!-- 采购订单 -->
	          <div class="row-item">
              <div class="title"> 采购订单: </div>
              <el-row style="width: 100%;">
                <el-col :span="6" v-for="(item,index) in todo.purchaseOrder" :key="index">
                    <span class="desc"> {{item.title}} </span>
                    <span class="num" @click.stop="goTo(item.path)"> {{item.number}} </span>
                    <span> {{item.unit}} </span>
                </el-col>
              </el-row>
						</div>

            <!-- 仓库盘点 -->
            <div class="row-item">
              <div class="title">仓库盘点: </div>
              <el-row style="width: 100%;">
                <el-col :span="6" v-for="(item,index) in todo.inventory" :key="index">
                    <span class="desc"> {{item.title}} </span>
                    <span class="num" @click.stop="goTo(item.path)"> {{item.number}} </span>
                    <span> {{item.unit}} </span>
                </el-col>
              </el-row>
						</div>
            <!-- 未生成配送单 -->
            <div class="row-item">
              <div class="title"> 未生成配送单: </div>
              <el-row style="width: 100%;">
                <el-col :span="6" v-for="(item,index) in todo.distribution" :key="index">
                    <span class="desc"> {{item.title}} </span>
                    <span class="num" @click.stop="goTo(item.path)"> {{item.number}} </span>
                    <span> {{item.unit}} </span>
                </el-col>
              </el-row>
						</div>

            <!-- 销售订单配送 -->
            <div class="row-item">
              <div class="title"> 销售订单配送: </div>
              <el-row style="width: 100%;">
                <el-col :span="6" v-for="(item,index) in todo.salesOrders" :key="index">
                    <span class="desc"> {{item.title}} </span>
                    <span class="num" @click.stop="goTo(item.path)"> {{item.number}} </span>
                    <span> {{item.unit}} </span>
                </el-col>
              </el-row>
						</div>

            <!-- 销售换货配送 -->

            <div class="row-item">
              <div class="title"> 销售换货配送: </div>
              <el-row style="width: 100%;">
                <el-col :span="6" v-for="(item,index) in todo.salesOrdersChange" :key="index">
                    <span class="desc"> {{item.title}} </span>
                    <span class="num" @click.stop="goTo(item.path)"> {{item.number}} </span>
                    <span> {{item.unit}} </span>
                </el-col>
              </el-row>
						</div>

					</el-card>
				</el-col>
			</el-row>
		</div>

		<!-- <div class="theChart">
			<div class="titelName"> 订单统计 </div>
			<el-row  class="mc">
				<el-col  :span="6">

				<div class="desc-mc">
					<div class="desc">
						<div class="desc-item">
							<div>本月订单总数</div>
							<div class="num">30000</div>
							<div>同比上月 12%</div>
						</div>

						<div class="desc-item">
							<div>本月订单总数</div>
							<div class="num">30000</div>
							<div>同比上月 12%</div>
						</div>

					</div>
				</div>

				</el-col>
				<el-col :span="18">
					<Vehistogram :data="chartData" :settings="chartSettings"></Vehistogram>
				</el-col>
			</el-row>
		</div>

		<div class="kanban">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-card shadow="hover">
						<div class="titelName"> 商品总览 </div>

						<div class="kanban-item">
							<div class="item" v-for="item in 4" :key="item">
								<div class="num">3000</div>
								<div class="desc">上架出售</div>
							</div>
						</div>

					</el-card>
				</el-col>
				<el-col :span="12">
					<el-card shadow="hover">
						<div class="titelName"> 客户总览 </div>

						<div class="kanban-item">
							<div class="item" v-for="item in 4" :key="item">
								<div class="num">3000</div>
								<div class="desc">上架出售</div>
							</div>
						</div>

					</el-card>
				</el-col>
			</el-row>
		</div> -->

	</div>

</template>

<script>
import Vehistogram from 'v-charts/lib/histogram.common'
import CountTo from 'vue-count-to'
import { fetchCountHome, countPendingVerificationProduct, countPurchaseOrderRequestByStatus } from '@/api/dashboard.js'

export default {
  name: 'dashboard',
  components: {
    Vehistogram,
    CountTo
  },
  data() {
    return {
      'data': {
        'counTodyOrderNumber': 0, // 统计今天的下单数量
        'counTodyOrderSum': 0, // 统计今天的下单金额
        'counYesDayOrderFinaLSum': 0, // 统计昨天的销售金额
        'counSevenDayOrderFinaLSum': 0, // 统计近七天的销售金额

        // 销售退/换货
        'countNotAduitReturn': 0, // 统计 待审核的退换货 退货
        'countNotAduitExchange': 0, // 统计 待审核的退换货 换货

        // 采购计划
        'countHomeOrderNotPurChase': 0, // 销售订单未生成商品
        'countHomeExchangeOrderNotPurChase': 0, // 销售换货未生成商品
        // 未生成配送单
        'countOrderNotShip': 0, // 统计 未生成配送单 订单
        'countExchangeOrderNotShip': 0, // 统计 未生成配送单 换货

        // 销售订单配送
        'countOrderToShip': 0, // 统计 销售订待配送
        'countOrderDoingShip': 0, // 统计 销售订单 配送中
        'countOrdeShipReturnOrExchange': 0, // 统计 销售订单 退换货

        // 销售换货配送
        'countExchangeOrderToShip': 0, // 统计销售换货 待配送
        'countExchangeOrderDoingShip': 0 // 销售换货 配送中
      },
      tipsCar: [
        { title: '今日订单总数', icon: 'orders', class: 'todayTotal', number: 0 },
        { title: '今日销售总额', icon: 'money', class: 'yesterdayTotal', number: 0 },
        { title: '昨日销售总额', icon: 'zuotian', class: 'yesterdaySale', number: 0 },
        { title: '近7天销售总额', icon: 'qitian', class: 'weekSale', number: 0 }
      ],
      todo: {
        returnChange: [
          { title: '退货商品', unit: '个', number: 0, path: '/orders/returnChange' },
          { title: '换货商品', unit: '个', number: 0, path: '/orders/returnChange' }
        ],
        purchaseOrderPlan: [
          { title: '销售订单未生成', unit: '个商品', number: 0, path: '/buy/buyPlan' },
          { title: '销售换货未生成', unit: '个商品', number: 0, path: '/buy/buyPlan' },
          { title: '待申请', unit: '单', number: 0, path: '/buy/buyPlan' },
          { title: '待审核', unit: '单', number: 0, path: '/buy/buyPlan' }
        ],
        purchaseOrder: [
          { title: '待采购', unit: '个', number: 0, path: '/buy/buyOrders' },
          { title: '采购中', unit: '个', number: 0, path: '/buy/buyOrders' }
        ],
        inventory: [
          { title: '待核查', unit: '个', number: 0, path: '/warehouse/auditInventory' }
        ],
        distribution: [
          { title: '销售订单', unit: '个', number: 0, path: '/distribution/salesDelivery' },
          { title: '销售换货', unit: '个', number: 0, path: '/distribution/salesDelivery' }
        ],
        salesOrders: [
          { title: '待配送', unit: '个', number: 0, path: '/distribution/salesDelivery' },
          { title: '配送中', unit: '个', number: 0, path: '/distribution/salesDelivery' },
          { title: '退/换换', unit: '个', number: 0, path: '/distribution/salesDelivery' }
        ],
        salesOrdersChange: [
          { title: '待配送', unit: '个', number: 0, path: '/distribution/salesDelivery' },
          { title: '配送中', unit: '个', number: 0, path: '/distribution/salesDelivery' }
        ]
      },
      chartSettings: {},
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  },
  created() {
    this.chartSettings = {
      axisSite: { right: ['下单率'] },
      yAxisType: ['KMB', 'percent'],
      yAxisName: ['数值', '比率']
    }
  },
  mounted() {
    this.fetchCountHome()
    this.countPurchaseOrderRequestByStatus()
  },
  methods: {
    goTo(path) {
      this.$router.push(path)
    },
    fetchCountHome() {
      fetchCountHome().then(({ data }) => {
        if (!data) return
        const { tipsCar, todo } = this
        const result = Object.assign(this.data, data)
        tipsCar[0].number = result.counTodyOrderNumber || 0
        tipsCar[1].number = result.counTodyOrderSum || 0
        tipsCar[2].number = result.counYesDayOrderFinaLSum || 0
        tipsCar[3].number = result.counSevenDayOrderFinaLSum || 0

        // 销售退换
        todo.returnChange[0].number = result.countNotAduitReturn || 0
        todo.returnChange[1].number = result.countNotAduitExchange || 0
        // 采购计划
        todo.purchaseOrderPlan[0].number = result.countHomeOrderNotPurChase || 0
        todo.purchaseOrderPlan[1].number = result.countHomeExchangeOrderNotPurChase || 0

        // 未生成配送单
        todo.distribution[0].number = result.countOrderNotShip || 0
        todo.distribution[1].number = result.countExchangeOrderNotShip || 0
        // 销售订单配送
        todo.salesOrders[0].number = result.countOrderToShip || 0
        todo.salesOrders[1].number = result.countOrderDoingShip || 0
        todo.salesOrders[2].number = result.countOrdeShipReturnOrExchange || 0

        // 销售换货配送
        todo.salesOrdersChange[0].number = result.countExchangeOrderToShip || 0
        todo.salesOrdersChange[1].number = result.countExchangeOrderDoingShip || 0
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })

      countPendingVerificationProduct().then(({ data }) => {
        const { todo } = this
        todo.inventory[0].number = data || 0
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    countPurchaseOrderRequestByStatus() {
      // 审核状态(1:待申请,2:待审核)
      const { todo } = this
      countPurchaseOrderRequestByStatus({ auditStatus: 1 }).then(({ data }) => {
        todo.purchaseOrderPlan[2].number = data || 0
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      countPurchaseOrderRequestByStatus({ auditStatus: 2 }).then(({ data }) => {
        todo.purchaseOrderPlan[3].number = data || 0
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard{
	color:#787a7d;
}
.titelName{
	color:#787a7d;
	padding-left: 14px;
	font-weight: 800;
	border-left: 3px solid #1cbc9c
}
.topCar{
	padding: 10px;
}
.car-item{
	display: flex;
	align-items: center;
	.card-panel-icon{
		margin: 10px;
		font-size: 40px;
		color: #787a7d;
	}
	.title{
		cursor: pointer;
		font-weight: 800;
		color:#787a7d;
    font-size: 14px;
	}
	.car-num{
		display: inline-block;
		padding-left: 16px;
		padding: 5px 0;
    color: #fa6e85;
    font-size: 24px;
		font-weight: bold;
	}
}
.theChart{
	background: #fff;
	margin-top: 20px;
	padding-top: 10px;
	.mc{
		padding: 10px;
	}
}
.desc-mc{
	margin-top: 30px;
}
.desc{
	.desc-item{
		margin-bottom:20px;
		font-size: 14px;
		>div{
			margin-bottom: 10px;
		}
		text-align: left;
		margin-left: 20px;
		.num{
			font-size: 24px;
			padding-left:12px;
		}
	}
}
.car-item{
	.card-panel-icon{
		transition: all 0.38s ease-out;
		border-radius: 6px;
	}
	&:hover {
		.card-panel-icon {
			color: #fff;
		}
		.todayTotal {
				background: #40c9c6;
		}
		.yesterdayTotal {
			background: #36a3f7;
		}
		.yesterdaySale {
			background: #f4516c;
		}
		.weekSale {
			background: #34bfa3
		}
	}
	.icon-people {
		color: #40c9c6;
	}
	.icon-message {
		color: #36a3f7;
	}
	.icon-money {
		color: #f4516c;
	}
	.icon-shoppingCard {
		color: #34bfa3
	}
}
.kanban{
	margin: 10px;
	.titelName{
		margin-left: -20px;
	}
}
.kanban-item{
	color:#787a7d;
	display: flex;
	justify-content:space-around;
	margin: 20px 0;
	.num{
		color: #fa6e85;
		font-size: 24px;
	}
	.desc{
		margin-top: 6px;
		font-size: 14px;
	}
}

.row-item{
  color:#787a7d;
	display: flex;
	justify-content: space-between;
  align-items: center;
	margin: 20px 0;
  .title{
    width: 180px;
  }
  .num{
    color: #fa6e85;
    font-size: 24px;
    cursor: pointer;
  }
  .desc{
    margin-top: 6px;
    font-size: 14px;
  }
  .item{
    >div{
      margin-right: 20px;
    }
  }
}
</style>

<style lang="scss">
.dashboard{
	.topCar{
		.el-card__body{
			padding:2px!important;
		}
	}
}
</style>

