<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog"  :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
              <el-button type="text" size="mini" @click.stop="onRefresh">刷新</el-button>
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
	        <el-form :model="form" ref="form" :inline="true">

            <!--基本信息-->
            <div class="row-item">
                <div class="row-title">基本信息</div>
                <div class="row-content info">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购订单编号:">
                        <span v-cloak>{{form.purchaseOrderNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购订单生成时间:">
                       <span v-cloak>{{form.purchaseOrderCreatedTime}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购员:">
                       <span v-cloak>{{form.buyerName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.type===0? '采购退货单号:':'采购换货单号:'">
                        <span v-cloak>{{form.returnOrderNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.type===0? '退货操作时间:':'换货操作时间:'">
                        <span v-cloak>{{form.purchaseReturnsCreatedTime}}</span>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.type===0? '退货完成时间:':'换货完成时间:'">
                        <span v-cloak>{{form.purchaseReturnsFinishTime}}</span>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row>

                     <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.type===0? '退货原因':'换货原因'">
                        <span v-cloak>{{form.remark}}</span>
                      </el-form-item>
                    </el-col>

                  </el-row>
                </div>
            </div>

              <!--费用信息-->
            <div class="row-item">
                <div class="row-title">费用信息</div>
                <div class="row-content info">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.type===0? '退货数量':'换货数量'">
                        <span v-cloak>{{form.returnsQuantity}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.type===0? '退货金额':'换货金额'">
                       <span v-cloak>{{form.returnsSum}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="应付款金额:">
                        <span v-cloak>{{form.amountPayable}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="未支付金额:">
                        <span v-cloak>{{form.unpaidAmount}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="已支付金额:">
                        <span v-cloak>{{form.amountPaid}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.type===0? '实际退货数量':'实际换货数量'">
                        <span v-cloak>{{form.finalQuantity}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.type===0? '实际退货金额':'实际换货金额'">
                        <span v-cloak>{{form.sum}}</span>
                      </el-form-item>
                    </el-col>

                  </el-row>
                </div>
            </div>

            <!--供应商信息（无信息则是自采）-->
            <div class="row-item">
              <div class="row-title">供应商信息（无信息则是自采）</div>

              <div class="row-content">
                <!-- 表格 -->
                  <el-table :data="form.address" slot="table" :size="table.size" style="width: 100%;" highlight-current-row>
                    <el-table-column prop="supplierName" label="供应商名称" align="center"></el-table-column>
                    <el-table-column prop="supplierLoginName" label="供应商账号" align="center"></el-table-column>
                    <el-table-column prop="supplierContacts" label="联系人" align="center"></el-table-column>
                    <el-table-column prop="supplierMobile" label="联系电话" align="center"></el-table-column>
                    <el-table-column prop="supplierAddress" label="供应商地址" align="center"></el-table-column>
                  </el-table>
              </div>
            </div>

            <!--商品信息-->
            <div class="row-item">
              <div class="row-title">商品信息</div>

              <div class="row-content">
                <!-- 表格 -->
                  <el-table :data="table.data" slot="table" :size="table.size" style="width: 100%;" highlight-current-row>
                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="categoryName" label="商品分类" align="center"></el-table-column>
                    <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="basicUnitName" label="基本单位" align="center"></el-table-column>
                    <el-table-column prop="stockName" label="仓库" align="center"></el-table-column>
                    <el-table-column prop="orderQuantity" label="待采购量" align="center"></el-table-column>
                    <el-table-column prop="supplierInfoName" label="分发供应商" align="center"></el-table-column>
                    <el-table-column prop="supplierPrice" label="供应单价" align="center"></el-table-column>
                    <el-table-column prop="supplierQuantity" label="供应数量" align="center"></el-table-column>
                    <el-table-column prop="supplierSum" label="供应金额" align="center"></el-table-column>
                    <el-table-column prop="purchasePrice" label="实际采购单价" align="center"></el-table-column>
                    <el-table-column prop="realQuantity" label="实际采购量" align="center"></el-table-column>
                    <el-table-column prop="sum" label="实际采购金额" align="center"></el-table-column>
                  </el-table>

                  <div class="footer-block">
                    <span class="page" v-cloak> 共 {{table.data.length}} 条</span>
                  </div>
              </div>
            </div>

	        </el-form>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import model from '@/public/listModel.js'
import { fetchDetail, fetchTable } from '@/api/buy/buyReturn.js'

export default {
  mixins: [addModel, model],
  data() {
    return {
      form: {
        'status': 1,
        'purchaseOrderNo': null,
        'purchaseOrderCreatedTime': null,
        'buyerName': null,
        'returnOrderNo': null,
        'purchaseReturnsCreatedTime': null,
        'purchaseReturnsFinishTime': null,
        'returnsQuantity': null,
        'returnsSum': null,
        'finalQuantity': null,
        'price': null,
        'remark': null,
        'sum': null,
        'amountPayable': null,
        'amountPaid': null,
        'unpaidAmount': null,
        'supplierName': '供应商张三',
        'supplierLoginName': '张三',
        'supplierContacts': '联系人张三',
        'supplierMobile': '13380353512',
        'supplierAddress': '北京市直辖区东城区string',
        address: [],
        table: []
      }
    }
  },
  created() {
    this.$setKeyValue(this.dialog, { visiable: true })
  },
  mounted() {
    this.currentTitle = this.data.title || ''
    this.fecthDetailById()
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    onRefresh() {
      this.fecthDetailById()
    },
    fecthDetailById() {
      if (!this.data.obj.id) return
      fetchDetail({ id: this.data.obj.id }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
        this.form.address = [data] || []
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      this.tableDetail()
    },
    tableDetail() {
      if (!this.data.obj.id) return
      fetchTable({ returnsId: this.data.obj.id }).then(({ data }) => {
        this.table.data = data || []
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__wrapper {
  transform: translateZ(0);
  min-height: 100%;
  min-height: 600px;
}
.content-box {
  width: 100%;
  position: relative;
  .header-bar {
    .left{
      color: #1cbc9c;
    }
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0;
    z-index: 900;
    background: #e8f8f5 !important;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.23);
  }
}
.info{
  .el-form-item{
    margin-bottom: 0px;
  }
}
</style>
