<!-- 看板卡片 -->
<template>
    <div class="TipsBar">
		<el-row :gutter="20">
			<el-col :span="8" v-for="(item,index) in data" :key="index">
				 <el-card class="TipsBar-item" shadow="always">
          <div class="top">
            <span class="label"> 
              <span class="date">  昨日 </span>
              <span class="desc">（送货时间6月20日）</span>
            </span>
            <span class="bnt">
              <el-button type="text" size="mini">查看明细</el-button>
            </span>
          </div>
          <div class="dowm">
            <div class="desc">销售订单需采购商品：10</div>
            <div class="desc">未生成采购计划商品：2</div>
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
    data() {
      return {
  
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
        }
    }
}
</style>