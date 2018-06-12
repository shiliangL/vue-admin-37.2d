<template>
    <div class="toView">
          <div class="row-item">
            <div class="row-title">基本信息</div>
            <div class="row-content">
              <el-row>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">销售订单编号:</span>
                  XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  下单时间:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  客户名称:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  客户账号:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  订单来源:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  支付类型:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  要求送达日期:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  要求送达时间:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  销售配送单号:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  要求送达时间:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  配送员:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  实际送达时间:XSDD180530000010
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row-item">
            <div class="row-title">发票信息</div>
            <div class="row-content">
              <el-row>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  发票类型:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  发票抬头:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  发票内容:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  收票人信息:XSDD180530000010
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row-item">
            <div class="row-title">收货信息</div>
            <div class="row-content">
               <el-row>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  收货人:张海洋
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  手机号:13023456789
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  收货地址:广东省 深圳市 福田区 香蜜湖街道 深南大道车公庙财富广场a座13号
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row-item">
            <div class="row-title">商品信息</div>
            <div class="row-content">
              <el-table :data="viewData.saleDtails" size="small" :max-height="300" style="width: 100%;" highlight-current-row>
                <el-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="orderNo" label="商品图片" align="center"></el-table-column>
                <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="customerName" label="规格" align="center"></el-table-column>
                <el-table-column prop="price" label="价格" align="center"></el-table-column>
                <el-table-column prop="shopName" label="下单数量" align="center"></el-table-column>
                <el-table-column prop="purchaseCount" label="下单金额" align="center"></el-table-column>
                <el-table-column prop="purchaseCount" label="分拣数量" align="center"></el-table-column>
                <el-table-column prop="purchaseCount" label="分拣金额" align="center"></el-table-column>
                <el-table-column prop="status" label="退/换货状态" align="center">
                  <!-- <template slot-scope="scope" align="center">
                    
                  </template> -->
                </el-table-column>
              </el-table>
              <div class="tips">
                备注：注意不要把菜压扁了！
              </div>
            </div>
          </div>
          <!-- <div class="row-item">
            <div class="row-title">费用信息</div>
            <div class="row-content">
              <el-row>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  下单金额:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  分拣金额:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  活动优惠:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  优惠券:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  红包抵扣:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  运费:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  退货金额:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  应付款金额:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  未支付金额:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  已支付金额:XSDD180530000010
                </el-col>
              </el-row>
            </div>
          </div> -->
    </div>
</template>

<script>
export default {
  name: 'toView',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      viewData: {
        saleDtails: [],
        scmOrder: {},
        sendTime: {}
      }
    }
  },
  created() {

  },
  watch: {
    data: {
      handler(value) {
        console.log(value)
        if (value) {
          this.viewData = value
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
    }
    .row-content {
      padding: 10px;
      .label{
        color: #696767;
        font-size: 14px;
        font-weight: 600;
      }
    }
    .el-col{
      padding: 5px 0;
    }
    .tips{
      padding: 10px 0;
    }
  }
</style>