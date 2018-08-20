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
	        <el-form :model="form" ref="form" label-width="130px" :inline="true">
            <!--基本信息-->
            <div class="row-item">
                <div class="row-title">基本信息</div>
                <div class="row-content info">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="关联采购计划单号:">
                        <span v-cloak>{{form.orderRequestNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购申请时间:">
                       <span v-cloak>{{form.applicationDate}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="申请人:">
                       <span v-cloak>{{form.purchaserName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="审核人:">
                        <span v-cloak>{{form.auditStaffName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购订单编号:">
                        <span v-cloak>{{form.orderNo}}</span>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购订单创建时间:">
                        <span v-cloak>{{form.createTime}}</span>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购类型:">
                        <span v-if="form.purchaseType===2"> 供应商直供 </span>
                        <span v-if="form.purchaseType===1"> 市场自采 </span>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购员/供应商:">
                        <span v-cloak>{{form.personnelName}}</span>
                      </el-form-item>
                    </el-col>
    
                  </el-row>
                </div>
            </div>

            <!--商品信息-->
            <div class="row-item">
              <div class="row-title">商品信息</div>
              <div class="row-content">
                <!-- 表格 -->
                <table-contain  :height.sync="table.maxHeight">
                  <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                      </template>
                    </el-table-column>
          
                    <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="basicUnitName" label="基本单位" align="center"></el-table-column>
                    <el-table-column prop="orderQuantity" label="待采购量" align="center"></el-table-column>
                    <el-table-column prop="realQuantity" label="实际采购量" align="center"></el-table-column>
                    <el-table-column prop="deliveryTime" label="收货时间" align="center"></el-table-column>
                    <el-table-column prop="weighQuantity" label="收货称重量" align="center"></el-table-column>
                    <!-- <el-table-column prop="receivedStaffName" label="收货人" align="center"></el-table-column> -->
                    <el-table-column prop="receivedQuantity" label="验收接收量" align="center"></el-table-column>
                    <el-table-column prop="iqcStaffName" label="验货人" align="center"></el-table-column>
                    <el-table-column prop="purchasePrice" label="实际采购单价" align="center"></el-table-column>
                    <el-table-column prop="sum" label="实际采购金额" align="center"></el-table-column>

                    <el-table-column prop="auditStatus" label="采购退/换货状态" align="center">
                      <template slot-scope="scope" align="center">
                        <span v-cloak> {{scope.row.returnState | filterStatus }} </span>
                      </template>
                    </el-table-column>
 
                  </el-table>
                  
                  <el-pagination
                    slot="footer"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.page"
                    :page-sizes="pagination.pageSizes"
                    :page-size="pagination.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
                  </el-pagination>

                </table-contain>

 
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
import model from '@/public/listModel.js'

import { Detail, tableDetail } from '@/api/buy/buyOrders.js'

export default {
  mixins: [addModel, model],
  data() {
    return {
      dialogVisible: false,
      form: {
        orderRequestNo: null,
        applicationDate: null,
        purchaserName: null,
        auditStaffName: null,
        createTime: null,
        orderNo: null,
        purchaseType: null,
        personnelName: null,
        table: []
      },
      rules: {},
      loadID: null,
      isShowView: false,
      isShowEditor: false,
      currentTitle: null,
      viewData: null,
      typeIseditor: false
    }
  },
  created() {
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    this.currentTitle = this.data.title || ''
    this.fecthDetailById()
  },
  filters: {
    filterStatus(status) {
      switch (status) {
        case 0:
          return '全部'
        case 1:
          return '待采购'
        case 2:
          return '采购中'
        case 3:
          return '待收货'
        case 4:
          return '已收货'
        default:
          return ''
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    success() {
      this.$message({ type: 'success', message: this.dialog.title + '成功' })
      this.closeDialog()
      if (this.data.type === 'add') {
        this.$emit('add')
      } else {
        this.$emit('edit')
      }
    },
    error(data) {
      this.$message({ type: 'error', message: data.message })
      this.$setKeyValue(this.button, { loading: false, text: '确定' })
    },
    onRefresh() {
      this.fecthDetailById()
    },
    fecthDetailById() {
      if (!this.data.obj.id) return
      Detail({ id: this.data.obj.id }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      this.tableDetail()
    },
    tableDetail() {
      if (!this.data.obj.id) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        orderId: this.data.obj.id
      }
      tableDetail(data).then(({ data }) => {
        console.log(data, 'table')
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.tableDetail()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.tableDetail()
    },
    validateForm() {
      if (this.$refs['addview']) {
        this.$refs['addview'].validateForm()
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
.info{
  .el-form-item{
    margin-bottom: 0px;
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
