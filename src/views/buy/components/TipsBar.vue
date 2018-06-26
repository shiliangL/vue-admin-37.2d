<!-- 看板卡片 -->
<template>
    <div class="TipsBar">
		<el-row :gutter="20">
			<el-col :span="8" v-for="(item,index) in data" :key="index">
				 <el-card class="TipsBar-item" shadow="always">
          <div class="top">
            <span class="label"> 
              <span class="date" v-cloak> {{item.title}} </span>
              <span class="desc" v-cloak> （送货时间 {{item.date}} 日）</span>
            </span>
            <span class="bnt">
              <el-button type="text" size="mini" @click.stop="clickCallBack(item,index)">查看明细</el-button>
            </span>
          </div>
          <div class="dowm">
            <div class="desc" v-cloak>销售订单需采购商品: <span class="num">{{item.goodsNumber || 0}}</span> </div>
            <div class="desc" v-cloak>未生成采购计划商品:  <span class="num"> {{item.goodsNotPrchase || 0}} </span> </div>
          </div>
        </el-card>
			</el-col>
		</el-row>
    </div>
</template>

<script>
  export default {
    name: 'TipsBar',
    props: {
      data: {
        type: Array
      }
    },
    methods: {
      clickCallBack(item, index) {
        if (!item) return
        this.$emit('TipsBarCallBack', item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .TipsBar{
    padding: 10px;
    font-size: 14px;
    .TipsBar-item{
      .top{
        margin-bottom: 6px;
      }
      .date{
        font-size: 20px;
        font-weight: bold;
        color: rgb(102, 102, 102);
      }
      .desc{
          color:#7e8188;
          margin-bottom: 6px;
          .num{
            color:#49c9b0;
          }
        }
    }
}
</style>