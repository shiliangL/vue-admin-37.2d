<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
              <el-button type="text" size="mini" @click.stop="onRefresh">刷新</el-button>
              <el-button type="text" size="mini" @click.stop="closeDialog">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
         	   <el-form :model="form" ref="form" label-width="130px" :rules="rules" :inline="true">

            <!--基本信息-->
            <div class="row-item">
                <div class="row-title">基本信息</div>
                <div class="row-content view-header">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="出库单创建时间:">
                        <span v-cloak>{{form.stockOutCreatedTime}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="关联出库单号:">
                        <span v-cloak>{{form.stockOutOrderNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="仓库:">
                       <span v-cloak>{{form.stockInfoName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="出库类型:">
                        <span v-if="form.storehouseType===1"> 销售订单 </span>
                        <span v-if="form.storehouseType===2"> 销售换货 </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="商品名称:">
                       <span v-cloak>{{form.productName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="基本单位:">
                        <span v-cloak>{{form.basicUnitName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="分拣台:">
                        <span v-cloak>{{form.tableName}}</span>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="分拣员:">
                        <span v-cloak>{{form.sorterName}}</span>
                      </el-form-item>
                    </el-col> -->

                  </el-row>
                </div>
            </div>

            <!--商品信息-->
            <div class="row-item">
              <div class="row-title">商品信息</div>
              <div class="row-content">
                <div class="search">
                  <el-input size="small" style="width:190px" class="w180"  placeholder="请输入商品名称检索" v-model.trim="searchKey"></el-input>
                  <el-button type="primary" size="small" @click.stop="clickToSearch" > 搜索 </el-button>
                  <el-button style="margin-left:0px" size="small" @click.stop="resetSearch" > 重置 </el-button>
                </div>
                <!-- 表格 -->
                  <el-table :data="form.table" size="small" class="table" max-height="450" style="width: 100%;" highlight-current-row>
                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
                    </el-table-column>
                    <el-table-column prop="orderNo" label="销售订单编号" align="center"></el-table-column>
                    <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
                    <el-table-column prop="specification" label="规格" align="center"></el-table-column>
                    <el-table-column prop="orderQuantity" label="下单数量" align="center">
                       <template slot-scope="scope"> <span>{{scope.row.orderQuantity}} {{ scope.row.basicUnitName }}</span> </template>
                    </el-table-column>
                    <el-table-column prop="sortingQuantity" label="分拣数量" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.barCode" v-cloak>{{scope.row.sortingQuantity}}</span>
                        <el-form-item v-else label="" label-width="0px" :prop="'table.'+scope.$index+'.sortingQuantity'"  :rules="[{ required: true, validator: rules.validNumber2, trigger: 'change' }]">
                          <el-input size="small" @keyup.enter.native="clickToUpdate(scope.$index,scope.row)" v-model.trim="scope.row.sortingQuantity"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="barCode" label="商品分拣条码" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.barCode" v-cloak>{{scope.row.barCode}}</span>
                        <span v-else v-cloak> / </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="sortingTime" label="分拣时间" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.barCode" v-cloak>{{scope.row.sortingTime}}</span>
                        <span v-else v-cloak> / </span>
                      </template>
                    </el-table-column>
                      <!-- 加 -->
                    <el-table-column prop="operator" label="分拣操作人" align="center"></el-table-column>
                    <el-table-column prop="sum" label="操作" align="center">
                      <template slot-scope="scope">
                          <el-button type="text" size="mini" v-if="!scope.row.barCode" @click.stop="clickToUpdate(scope.$index,scope.row)">保存</el-button>
                           <el-button type="text" size="mini" v-else @click.stop="clickToPrintDD(scope.$index,scope.row)">打印标签</el-button>
                           <!-- <el-button type="text" size="mini" @click.stop="clickToPrint(scope.$index,scope.row)">打印标签</el-button> -->
                          <el-button type="text" size="mini" v-if="scope.row.barCode" @click.stop="clickToRest(scope.$index,scope.row)">重置</el-button>
                        <!-- <template v-else>
                         <el-button type="text" size="mini" disabled >打印标签</el-button>
                        </template> -->
                      </template>
                    </el-table-column>
                  </el-table>
                <div class="footer-block">
                  <span class="page" v-cloak> 共 {{form.table.length}} 条</span>
                </div>
              </div>
            </div>
	        </el-form>
        </div>
      </div>
    </el-dialog>

    <!-- 弹层区域 -->
    <el-dialog title="条码区域" class="dialogTitle" width="320px" :visible.sync="dialogVisible" append-to-body center @close="closeAdd">
      <PrintLabel isSorting v-if="dialogVisible" @close="closeAdd" :propsSonData="propsParentData"></PrintLabel>
    </el-dialog>

  </div>
</template>

<script>

import VueBarcode from '@xkeshi/vue-barcode'
import addModel from '@/public/addModel.js'
import { fecthHeaderDetail, fecthBodyDetail, outUpdateQuantity } from '@/api/sorting/index.js'
const loginKey = JSON.parse(sessionStorage.getItem('loginKey'))
import { printWeb } from '../Print/print.js'

export default {
  mixins: [addModel],
  components: {
    VueBarcode
  },
  data() {
    return {
      currentTitle: null,
      searchKey: null,
      barCode: null,
      form: {
        'stockOutCreatedTime': null,
        'stockOutOrderNo': null,
        'stockInfoName': null,
        'storehouseType': null,
        'tableName': null,
        'sorterName': null,
        'basicUnitName': null,
        'productName': null,
        table: []
      }
    }
  },
  created() {
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    this.currentTitle = this.data.title || ''
    if (this.data.type === 'view') {
      this.fecthDetail()
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
      this.$emit('add')
    },
    onRefresh() {
      if (this.data.type === 'view') {
        this.fecthDetail()
      }
    },
    fecthDetail() {
      if (!this.data.obj.id) return
      fecthHeaderDetail({ id: this.data.obj.id }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
        fecthBodyDetail({ scheduleInfoId: this.data.obj.id }).then(({ data }) => {
          for (const item of data) {
            item.basicUnitName = this.form.basicUnitName
            item.productName = this.form.productName
          }
          this.form.table = data
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickToRest(index, item) {
      this.form.table[index].barCode = null
      this.form.table[index].sortingQuantity = null
    },
    clickToSearch() {
      if (!this.data.obj.id) return
      fecthHeaderDetail({ id: this.data.obj.id }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
        fecthBodyDetail({ scheduleInfoId: this.data.obj.id, inputContent: this.searchKey }).then(({ data }) => {
          for (const item of data) {
            item.basicUnitName = this.form.basicUnitName
            item.productName = this.form.productName
          }
          this.form.table = data
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    resetSearch() {
      this.searchKey = null
      this.clickToSearch()
    },
    clickToUpdate(index, item) {
      this.$refs['form'].validateField(`table.${index}.sortingQuantity`, (m) => {
        if (!m) {
          if (!loginKey) {
            this.$message({ type: 'error', message: '工作台参数错误,F5刷新页面或者新登录' })
            return
          }
          const data = {
            'sortingDetailsId': item.id,
            'tableId': loginKey.id,
            'weight': item.sortingQuantity
          }
          outUpdateQuantity(data).then(res => {
            this.$message({ type: 'success', message: '保存成功' })
            this.resetSearch()
          }).catch(e => {
            this.$message({ type: 'error', message: e.msg })
          })
        } else {
          this.$message({ type: 'error', message: '请输入有效数值' })
          return
        }
      })
    },
    // clickToUpdate(index, item) {
    //   this.$refs['form'].validateField(`table.${index}.sortingQuantity`, (m) => {
    //     if (!m) {
    //       if (!loginKey) {
    //         this.$message({ type: 'error', message: '工作台参数错误,F5刷新页面或者新登录' })
    //         return
    //       }
    //       this.$confirm('是否确认？', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }).then(() => {
    //         const data = {
    //           'sortingDetailsId': item.id,
    //           'tableId': loginKey.id,
    //           'weight': item.sortingQuantity
    //         }
    //         outUpdateQuantity(data).then(res => {
    //           this.$message({ type: 'success', message: '保存成功' })
    //           this.resetSearch()
    //         }).catch(e => {
    //           console.log(e)
    //           this.$message({ type: 'error', message: e.msg })
    //         })
    //       }).catch(() => {})
    //     } else {
    //       this.$message({ type: 'error', message: '请输入有效数值' })
    //       return
    //     }
    //   })
    // },
    closeAdd() {
      this.dialogVisible = false
      this.propsParentData = null
    },
    clickToPrint(index, item) {
      this.dialogVisible = true
      item.barcode = item.barCode
      this.propsParentData = item
    },
    clickToPrintDD(index, item) {
      setTimeout(() => {
        const LODOP = printWeb.getCLodop()
        // const LODOP = this.$print.getCLodop()
        if (!LODOP) {
          // this.$message({ type: 'error', message: '打印插件未安装' })
          return
        }
        LODOP.PRINT_INITA(0, 0, 1000, 1000, '分拣条码')
        LODOP.SET_PRINT_PAGESIZE(0, 1000, 1000, 'CreateCustomPage')
        LODOP.ADD_PRINT_TEXT(10, 10, 130, 26, '【分拣条码:')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(10, 130, 240, 26, item.barCode + '】')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(36, 10, 110, 26, '客户名称:')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(36, 110, 260, 26, item.customerName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(62, 110, 260, 26, item.distributionArea || '无')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(62, 10, 110, 26, '配送区域:')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(114, 10, 110, 26, '商品名称:')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(88, 110, 260, 26, item.orderNo)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        if (this.form.storehouseType === 1) {
          LODOP.ADD_PRINT_TEXT(88, 10, 110, 26, '订单编号:')
        } else {
          LODOP.ADD_PRINT_TEXT(88, 10, 110, 26, '换货单号:')
        }
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(114, 110, 260, 26, this.form.productName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(138, 10, 110, 26, '下单数量:')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(138, 110, 260, 26, `${item.specification} * ${item.saleOrderQuantity}`)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(164, 10, 110, 26, '实际数量:')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(164, 110, 260, 26, `${item.specification} * ${item.sortingSaleQuantity}`)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(190, 10, 180, 26, '基本单位分拣量：')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_TEXT(190, 180, 190, 26, item.sortingQuantity + ' ' + item.basicUnitName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.ADD_PRINT_BARCODE('60.01mm', '5mm', '110.99mm', '20mm', '128A', item.barCode)

        // LODOP.PREVIEW()
        // LODOP.PRINT_DESIGN()
        // LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 0, 0, '')
        LODOP.PRINT()// 直接打印
      }, 400)
    }

  }
}
</script>

<style scoped lang="scss">
.el-dialog__wrapper {
  transform: translateZ(0);
  min-height: 100%;
  min-height: 650px;
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
</style>
