<template>
    <div class="toView">
          <div class="row-item">
            <div class="row-title">基本信息</div>
            <div class="row-content">
              <el-row>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">商品分类:</span>
                  休闲酒饮 / 牛奶乳品
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">商品编码:</span>
                  10358
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">商品名称:</span>
                  菜籽油
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">商品别名:</span>
                  CZYY
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">商品品牌:</span>
                  XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">商品产地:</span>
                  深圳果园
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">助记码:</span>
                  CAIZIYOU,CZY
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">采购类型:</span>
                  供应商送货/ 市场自采/ 临时指定
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">默认供应商:</span>
                  小马哥
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">标签 :</span>
                  产地直供
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row-item">
            <div class="row-title">商品主图 <span class="desc">大小≤6MB，支持JPG、PNG、JPEG</span></div>
            <div class="row-content">
              <el-row>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">商品编码:</span>
                  发票类型:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">商品编码:</span>
                  发票抬头:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">商品编码:</span>
                  发票内容:XSDD180530000010
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <span class="label">商品编码:</span>
                  收票人信息:XSDD180530000010
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row-item">
            <div class="row-title">商品价格</div>
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
          <div class="row-item">
            <div class="row-title">图文详情描述</div>
            <div class="row-content">
              <el-row>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea" />
              </el-row>
            </div>
          </div>
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
      textarea: null,
      viewData: {
        saleDtails: [],
        scmOrder: {},
        sendTime: {}
      }
    }
  },
  created() {
    console.log('xx')
  },
  watch: {
    data: {
      handler(value) {
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
      .desc{
        font-size: 12px;
        padding-left: 16px;
        color: rgb(128, 132, 143);
      }
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