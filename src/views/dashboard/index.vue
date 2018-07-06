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
								<count-to class="car-num" :startVal="0" :endVal="102400" :duration="3000"></count-to>
							</div>

						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>

		<div class="theChart">
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
		</div>

		<div class="theChart">
				<div class="titelName"> 销售统计 </div>
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

		</div>

</template>

<script>
import Vehistogram from 'v-charts/lib/histogram.common'
import CountTo from 'vue-count-to'

export default {
  name: 'dashboard',
  components: {
    Vehistogram,
    CountTo
  },
  data() {
    return {
      tipsCar: [
        { title: '今日订单总数', icon: 'orders', class: 'todayTotal' },
        { title: '今日销售总额', icon: 'money', class: 'yesterdayTotal' },
        { title: '昨日销售总额', icon: 'zuotian', class: 'yesterdaySale' },
        { title: '近7天销售总额', icon: 'qitian', class: 'weekSale' }
      ],
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
	}
	.car-num{
		display: inline-block;
		padding-left: 16px;
		padding: 5px 0;
		color:#787a7d;
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

