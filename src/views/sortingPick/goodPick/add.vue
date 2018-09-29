<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal-append-to-body="false" :modal="false">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
          <el-form :model="form" ref="form" class="viewForm" label-width="120px" :inline="true">
            <div class="row-item">
              <div class="row-title">基本信息</div>
              <div class="row-content">
                <el-row>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="出库单创建时间:">
                			<span v-cloak>{{form.header.stockOutCreatedTime}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="关联出库单号:">
                    	<span v-cloak>{{form.header.stockOutOrderNo}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="仓库:">
                    		<span v-cloak>{{form.header.stockInfoName}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="出库类型:">
                    	<span v-if="form.header.storehouseType===1"> 销售订单 </span>
                     	<span v-if="form.header.storehouseType===2"> 销售换货 </span>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="商品名称:">
                      <span v-cloak>{{form.header.productName}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="基本单位:">
                      <span v-cloak>{{form.header.basicUnitName}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="分拣台:">
                      <span v-cloak>{{form.header.tableName}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="分拣员:">
                      <span v-cloak>{{form.header.sorterName}}</span>
                    </el-form-item>
                  </el-col>
                   
                </el-row>
              </div>
            </div>

             <div class="row-item">
              <div class="row-title">商品信息</div>
              <div class="row-content">
                <el-table :data="form.table" size="small" max-height="350" style="width: 100%;" highlight-current-row>

                  <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.$index + 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :prop="form.header.storehouseType===1?'orderNo':'returnOrderNo'" :label="form.header.storehouseType===1?'销售订单编号':'销售换货'" align="center"></el-table-column>
                  <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
                  <el-table-column prop="specification" label="规格(规格备注)" align="center"></el-table-column>
                  <el-table-column prop="orderQuantity" label="下单数量" align="center">
                    <template  slot-scope="scope">
                      <span> {{scope.row.orderQuantity}} {{scope.row.basicUnit}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sortingQuantity" label="分拣数量" align="center"></el-table-column>
                  <el-table-column prop="barCode" label="商品分拣条码" align="center"></el-table-column>
                  <el-table-column prop="sortingTime" label="分拣时间" align="center"></el-table-column>
                  <el-table-column prop="operator" label="操作人"  align="center"></el-table-column>

                </el-table>
                <div class="footer-block">
                  <span class="page" v-cloak> 共 {{form.table.length}} 条</span>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>

      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { fetchDetail, fetchTable } from '@/api/sortingPick/goodPick.js'
export default {
  mixins: [addModel],
  components: {
  },
  data() {
    return {
      form: {
        header: {
          'stockOutCreatedTime': null,
          'stockOutOrderNo': null,
          'stockInfoName': null,
          'storehouseType': 1,
          'tableName': null,
          'sorterName': null,
          'basicUnitName': null,
          'productName': null
        },
        table: []
      },
      currentTitle: null
    }
  },
  created() {
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    this.currentTitle = this.data.title || ''
    if (this.data.type === 'view') this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      if (!this.data.obj.id) return
      fetchDetail({ id: this.data.obj.id }).then(({ data }) => {
        this.form.header = Object.assign(this.form.header, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      fetchTable({ scheduleInfoId: this.data.obj.id }).then(({ data }) => {
        if (Array.isArray(data)) {
          this.form.table = data
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    closeDialog() {
      this.$emit('input', false)
    },
    onRefresh() {
      if (this.data.type === 'view') {
        this.fetchDetail()
      }
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
// .Loading{
//     position: fixed;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     z-index: 10;
//   }
</style>
