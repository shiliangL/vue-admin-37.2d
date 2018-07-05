<template>
	<div class="dashboard">

		<div class="topCar">
			<el-row :gutter="12">
				<el-col :span="6" v-for="(item,index) in tipsCar" :key="index">
					<el-card shadow="hover">
						<div class="car-item">
							<div class="title" v-cloak> {{item.title}} </div>
							<count-to class="car-num" :startVal="0" :endVal="102400" :duration="3000"></count-to>
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
							<div>30000</div>
							<div>同比上月 12%</div>
						</div>

						<div class="desc-item">
							<div>本周订单总数</div>
							<div>30000</div>
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
        { title: '今日订单总数' },
        { title: '今日销售总额' },
        { title: '昨日销售总额' },
        { title: '近7天销售总额' }
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
	padding-left: 14px;
	font-weight: 800;
	border-left: 3px solid #1cbc9c
}
.topCar{
	padding: 10px;
}
.car-item{
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
		>div{
			margin-bottom: 10px;
		}
		text-align: left;
		margin-left: 20px;
	}
}
</style>
