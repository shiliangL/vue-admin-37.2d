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

              <!--费用信息-->
            <div class="row-item">
                <div class="row-title">费用信息</div>
                <div class="row-content info">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="待采购参考金额:">
                        <span v-cloak>{{form.purchaseSum}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="实际采购金额:">
                       <span v-cloak>{{form.finalSum}}</span>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购退货金额:">
                       <span v-cloak>{{form.amountlSum}}</span>
                      </el-form-item>
                    </el-col> -->
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="应付采购款金额:">
                        <span v-cloak>{{form.amountlSum}}</span>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="未支付采购金额:">
                        <span v-cloak>{{form.orderNo}}</span>
                      </el-form-item>
                    </el-col> -->
                    <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="已支付采购金额:">
                        <span v-cloak>{{form.createTime}}</span>
                      </el-form-item>
                    </el-col> -->

                    <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购结算剩余应付金额:">
                         <span v-cloak>{{form.remainingSumPayable}}</span>
                      </el-form-item>
                    </el-col> -->

                    <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="采购结算应收金额(预付超额):">
                        <span v-cloak>{{form.personnelName}}</span>
                      </el-form-item>
                    </el-col> -->

                  </el-row>
                </div>
            </div>

            <!--商品信息-->
            <div class="row-item">
              <div class="row-title">商品信息</div>

                <div class="search-bar">
                  <div class="left">
                    <el-select class="w110" size="small" v-model="levelFirst" clearable filterable placeholder="一级分类">
                      <el-option v-for="sub in searchBarOptons.categoryOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                    </el-select>
                  </div>

                  <div class="left" v-if="searchBarOptons.levelTowOption.length">
                    <el-select class="w110" size="small" v-model="levelFecond" clearable filterable placeholder="二级分类">
                      <el-option v-for="sub in searchBarOptons.levelTowOption" :key="sub.id" :label="sub.title" :value="sub.id"></el-option>
                    </el-select>
                  </div>

                  <div class="left">
                    <el-input style="width:180px" v-model="productName" size="small" clearable @keyup.enter.native="clickToSearch" placeholder="输入商品名称检索"></el-input>
                  </div>
                  <div class="left">
                      <el-button  type="primary" size="small" @click.stop="clickToSearch" > 搜索 </el-button>
                  </div>
                  <div class="left">
                      <el-button size="small" @click.stop="reset" > 重置 </el-button>
                  </div>

                </div>

              <div class="row-content">
                <!-- 表格 -->
                <table-contain  :height.sync="table.maxHeight">
                  <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="categoryName" label="商品分类" align="center"></el-table-column>
                    <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="basicUnitName" label="基本单位" align="center"></el-table-column>
                    <el-table-column prop="orderQuantity" label="待采购量" align="center"></el-table-column>

                    <el-table-column prop="supplierPrice" label="供应单价" align="center"></el-table-column>
                    <el-table-column prop="supplierQuantity" label="供应数量" align="center"></el-table-column>
                    <el-table-column prop="supplierSum" label="供应金额" align="center"></el-table-column>

                    <el-table-column prop="purchasePrice" label="实际采购单价" align="center"></el-table-column>
                    <el-table-column prop="realQuantity" label="实际采购量" align="center"></el-table-column>
                    <el-table-column prop="sum" label="实际采购金额" align="center"></el-table-column>
                    <el-table-column prop="warehouseTime" label="入库时间" align="center"></el-table-column>
                    <el-table-column prop="quantity" label="实际入库量" align="center"></el-table-column>
                    <el-table-column prop="operator" label="入库操作人" align="center"></el-table-column>
                    <el-table-column prop="" label="采购退/换货状态" align="center">
                      <template slot-scope="scope" align="center">
                            <template v-if="scope.row.returnType === 1">
                              <!-- 退货 -->
                              <el-tag size="small" type="warning" v-if="scope.row.returnStatus ===0">退货进行中</el-tag>
                              <el-tag size="small" v-if="scope.row.returnStatus ===1">退货已完成</el-tag>
                            </template>
                            <template v-if="scope.row.returnType === 2">
                              <!-- 换货 -->
                              <el-tag size="small" type="warning" v-if="scope.row.returnStatus ===0">换货进行中</el-tag>
                              <el-tag size="small" v-if="scope.row.returnStatus ===1">换货已完成</el-tag>
                            </template>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" width="120" label="操作" align="center">
                      <template slot-scope="scope" align="center">
                        <template v-if="scope.row.noClick">
                          <el-button type="text" style="color:red" size="mini" @click.stop="handlerClick(scope.$index,scope.row,1)">退货</el-button>
                          <el-button type="text" size="mini" @click.stop="handlerClick(scope.$index,scope.row,2)">换货</el-button>
                        </template>
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


        <!-- 弹层区域 -->
        <el-dialog :title="dialogTitle"  width="390px" :visible.sync="dialogVisible" append-to-body center @close="onRefresh">
          <AddDetail v-if="dialogVisible" @close="dialogVisible=false" :propsSonData="propsParentData"> </AddDetail>
        </el-dialog>

      </div>

      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import model from '@/public/listModel.js'
import { Detail, tableDetail, fetchAvailableQuantity } from '@/api/buy/buyOrders.js'
import { fecthGoodsClass } from '@/api/goodsList.js'
import AddDetail from './AddDetail'

export default {
  mixins: [addModel, model],
  components: {
    AddDetail
  },
  data() {
    return {
      searchBarOptons: {
        categoryOption: [],
        levelTowOption: []
      },
      levelFirst: '',
      levelFecond: '',
      productName: '',

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

        purchaseSum: null,
        finalSum: null,
        amountlSum: null,
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
    this.fecthGoodsClass()
  },
  methods: {
    fecthGoodsClass() {
      fecthGoodsClass().then(({ data }) => {
        if (!Array.isArray(data) && data.length <= 0) return
        const result = []
        for (const item of data) {
          if (item.parentId === '0') {
            result.push({
              label: item.title,
              value: item.id
            })
          }
        }
        this.levelTypeOption = data
        this.searchBarOptons.categoryOption = result
      }).catch(e => {
        this.$message({ type: 'error', message: '加载分类失败失败' })
      })
    },
    reset() {
      this.productName = null
      this.levelFirst = null
      this.levelFecond = null
      this.fecthDetailById()
    },
    clickToSearch() {
      if (!this.data.obj.id) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        productName: this.productName,
        categoryId: this.levelFecond ? this.levelFecond : this.levelFirst,
        orderId: this.data.obj.id
      }
      tableDetail(data).then(({ data }) => {
        if (Array.isArray(data.rows)) {
          for (const item of data.rows) {
            // whetherCreateStockOrder 1标识已经生成入库单
            if (item.whetherCreateStockOrder === 0 && item.returnStatus !== 0) {
              item.noClick = true
            } else {
              item.noClick = false
            }
          }
          this.table.data = data.rows
        }
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
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
      this.propsParentData = null
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
        if (Array.isArray(data.rows)) {
          for (const item of data.rows) {
            // whetherCreateStockOrder 1标识已经生成入库单
            if (item.whetherCreateStockOrder === 0 && item.returnStatus !== 0) {
              item.noClick = true
            } else {
              item.noClick = false
            }
          }
          this.table.data = data.rows
        }
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
    handlerClick(index, item, type) {
      if (!item.id) return
      fetchAvailableQuantity(item.id).then(({ data }) => {
        if (data) {
          this.dialogTitle = type === 1 ? '采购退货申请' : '采购换货申请'
          this.dialogVisible = true
          this.propsParentData = item
          this.propsParentData.type = type
          this.propsParentData.canReturnsQuantity = data
        } else {
          this.$message({ type: 'warning', message: '无可退换数量' })
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      // this.dialogTitle = type === 1 ? '采购换货申请' : '采购换货申请'
      // this.dialogVisible = true
      // this.propsParentData = item
      // this.propsParentData.type = type
      // this.propsParentData.canReturnsQuantity = 1000
    },
    validateForm() {
      if (this.$refs['addview']) {
        this.$refs['addview'].validateForm()
      }
    }
  },
  watch: {
    levelFirst: {
      handler(val, old) {
        if (val) {
          const arr = []
          for (const item of this.levelTypeOption) {
            if (val === item.parentId) {
              arr.push(item)
            }
          }
          this.searchBarOptons.levelTowOption = arr
        } else {
          this.levelFecond = ''
          this.searchBarOptons.levelTowOption = []
        }
        if (val && old) {
          this.levelFecond = ''
        }
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
