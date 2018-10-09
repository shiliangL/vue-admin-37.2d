<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal-append-to-body="false" :modal="false">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
              <el-button type="text" size="mini" v-if="data.type==='add' && isBlank && TabsTitle.length" @click.stop="createOrder">生成配送单</el-button>
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
          <template v-if="data.type==='view'">
            <el-form :model="form" ref="form" class="viewForm" label-width="130px" :inline="true">
              <div class="row-item">
                <div class="row-title">基本信息</div>
                <div class="row-content">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.obj.flag === 0?'销售订单编号:':'销售换货单号:'">
                        <span v-cloak>{{form.orderNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.obj.flag === 0?'下单时间:':'申请换货时间:'">
                        <span v-cloak>{{form.orderDate}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="客户名称:">
                        <span v-cloak>{{form.customerTitle}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="客户账号:">
                        <span v-cloak>{{form.loginName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="订单来源:">
                        <span v-if="form.orderSource===0"> App </span>
                        <span v-if="form.orderSource===1"> 微信公众号  </span>
                        <span v-if="form.orderSource===2"> 微信小程序 </span>
                        <span v-if="form.orderSource===3"> 后台 </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="支付类型:">
                        <span v-if="form.paymentType===0"> 货到付款 </span>
                        <span v-if="form.paymentType===1"> 线上支付 </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="要求送达日期:">
                          <span v-cloak>{{form.sendDate}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="要求送达时间:">
                          <span v-cloak>{{form.beginTime}} - {{form.endTime}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="配送方式:">
                          <span v-cloak> 厨满满专供 </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="销售配送单号:">
                          <span v-cloak>{{form.serialNumber}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="仓库:">
                          <span v-cloak>{{form.stockName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item :label="data.obj.flag === 0?'配送员:':'换货配送员:'">
                        <span v-cloak>{{form.driverName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item  :label="data.obj.flag === 0?'实际送达时间:':'换货实际送达时间:'"> 
                        <span v-cloak>{{form.factTime}}</span>
                      </el-form-item>
                    </el-col>
                    
                  </el-row>
                </div>
              </div>

              <div class="row-item">
                <div class="row-title">收货信息</div>
                <div class="row-content">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="收货人:">
                        <span v-cloak>{{form.contactsName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="手机号:">
                        <span v-cloak>{{form.mobile}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="签收方式:" label-width="130px">
                        <span v-if="form.receiverFlag===0"> 当面签收 </span>
                        <span v-if="form.receiverFlag===1"> 拍照签收 </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6" v-if="form.receiverFlag===1">
                      <el-form-item label="照片:">
                        <div class="car" v-if="form.photos">
                          <img :src="form.photos" alt="">
                        </div>
                        <!-- <span v-cloak>{{form.photos}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="客户确认收货时间:" label-width="130px">
                        <span v-cloak>{{form.receiverDate}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col>
                      <el-form-item label="收货地址:">
                         <span v-cloak>{{form.address}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <div class="row-item">
                <div class="row-title">商品信息</div>
                <div class="row-content">
                  <!-- 表格 -->
                  <table-contain :height.sync="table.maxHeight">
                    <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
                      <el-table-column label="序号" width="50" align="center">
                        <template slot-scope="scope">
                          <span>{{scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="title" label="商品图片" align="center">
                        <template slot-scope="scope"> <div class="picBox"><img :src="`${scope.row.goodsImage}`"></div> </template>
                      </el-table-column>
                      <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                      <el-table-column prop="skuName" label="规格" align="center"></el-table-column>
                      <el-table-column prop="price" label="价格" align="center"></el-table-column>
                      <el-table-column prop="orderQuantity" label="下单数量" align="center"></el-table-column>
                      <el-table-column prop="orderQuantityPrice" label="下单金额" align="center"></el-table-column>
                      <el-table-column prop="finalQuantity" label="实际数量" align="center"></el-table-column>
                      <el-table-column prop="sumPrice" label="实际金额" align="center"></el-table-column>
                      <el-table-column  label="退/换货状态" align="center">
                        <template slot-scope="scope">

                          <template v-if="scope.row.method ===1">
                            <!-- 退货 -->
                            <span v-cloak v-if="scope.row.exchanage ===0"> 退货待审核 </span>
                            <span v-cloak v-if="scope.row.exchanage ===1"> 退货进行中 </span>
                            <span v-cloak v-if="scope.row.exchanage ===2"> 退货已完成 </span>
                            <span v-cloak v-if="scope.row.exchanage ===3"> 退货已拒绝 </span>
                          </template>
                          <template  v-if="scope.row.method ===2">
                            <!-- 换货 -->
                            <span v-cloak v-if="scope.row.exchanage ===0"> 换货待审核 </span>
                            <span v-cloak v-if="scope.row.exchanage ===1"> 换货进行中 </span>
                            <span v-cloak v-if="scope.row.exchanage ===2"> 换货已完成 </span>
                            <span v-cloak v-if="scope.row.exchanage ===3"> 换货已拒绝 </span>
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
          </template>
          <template v-if="data.type==='add'">
            <el-form :model="AddForm" ref="AddForm" class="viewForm" label-width="120px" :inline="true">
               <div class="search">
                  <el-select size="small" v-model="AddForm.stockId" filterable placeholder="选择仓库">
                    <el-option v-for="sub in options.stockOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                  </el-select>
                  <el-select v-model="AddForm.type" placeholder="请选择类型" size="small" style="width:120px" filterable>
                    <el-option v-for="item in options.storageType" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
                  </el-select>
                  <el-button  type="primary" size="small" @click.stop="confirmType" > 加载数据 </el-button>
              </div>

              <el-row :gutter="40" v-if="isShowCar">
                <el-col :span="12">
                  <el-card class="box-card">
                    <div class="search">
                      <span v-if="AddForm.type===0">发货日期: {{today}}</span>
                      <!-- <el-select size="small" v-model="form.regionId" filterable clearable placeholder="选择地区"  style="width:120px">
                        <el-option v-for="sub in options.regionOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                      </el-select>
                      <el-input size="small" style="width:160px" placeholder="订单编号检索" v-model.trim="AddForm.orderNo"></el-input> -->
                    </div>
                    <div class="table">
                      <el-table :data="tableData_L" size="small" max-height="300"  style="width: 100%;" highlight-current-row
                        @selection-change="handleTable_L_Change">
                       <el-table-column type="selection" width="40"> </el-table-column>
                        <el-table-column label="序号" width="50" align="center">
                          <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="orderCode" :label="isShowSaleType?'销售订单编号':'销售换货单号'" align="center"></el-table-column>
                        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
                        <el-table-column prop="regionName" label="配送区域" align="center"></el-table-column>
                      </el-table>
                      <div class="footer-block">
                        <span class="page" v-cloak> 共 {{tableData_L.length}} 条</span>
                      </div>
                    </div>
                    <el-button type="primary" v-if="TabsTitle.length" size="mini"  @click.stop="clickToRight">添加</el-button>
                  </el-card>
                </el-col>
                <el-col :span="12" v-if="TabsTitle.length">
                  <el-card class="box-card">
                    <SelectTabs :data="TabsTitle" @callBack="tabsCallBack">></SelectTabs>
                    <div v-for="(item,index) in TabsTitle" :key="index" v-show="curIndex===index">
                      <div class="desc">
                        <p v-cloak>关联配送区域:{{item.regionStr}};</p>
                        <p v-cloak>车辆品牌:{{item.carBrand}}; 车牌号:{{item.carNo}};</p>
                        <p v-cloak>备注:{{item.summary}}</p>
                      </div>
                      <div class="table">
                        <el-table :data="item.table" size="small" max-height="300" style="width: 100%;" highlight-current-row
                          @selection-change="handleTable_R_Change">
                          <el-table-column type="selection" width="40"> </el-table-column>
                          <el-table-column label="序号" width="50" align="center">
                            <template slot-scope="scope"> 
                              <span>{{scope.$index + 1}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="orderCode" :label="isShowSaleType?'销售订单编号':'销售换货单号'" align="center"></el-table-column>
                          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
                          <el-table-column prop="regionName" label="配送区域" align="center"></el-table-column>
                        </el-table>
                      </div>
                      <div class="footer-block">
                        <span class="page" v-cloak> 共 {{item.table.length}} 条</span>
                      </div>
                      <el-button type="primary" size="mini"  @click.stop="clickToRemove">移除</el-button>
                    </div>
                  </el-card>
                </el-col>
              </el-row>

            </el-form>
          </template>
        </div>
      </div>

      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->

    </el-dialog>
  </div>
</template>

<script>
import model from '@/public/listModel.js'
import addModel from '@/public/addModel.js'
import { SelectTabs } from '@/components/base.js'
import { fecthStockList } from '@/api/warehouse/goodsIn.js'
import { fetchAllList } from '@/api/distribution/areaDelivery.js'
import { fetchDetail, shipOrderAddList, createRow } from '@/api/distribution/salesDelivery.js'
export default {
  mixins: [addModel, model],
  components: {
    SelectTabs
  },
  data() {
    return {
      form: {
        'id': null,
        'orderId': null,
        'orderNo': null,
        'orderDate': null,
        'customerId': null,
        'customerTitle': null,
        'loginName': null,
        'orderSource': null,
        'paymentType': null,
        'beginTime': null,
        'endTime': null,
        'sendDate': null,
        'serialNumber': null,
        'driverId': null,
        'driverName': null,
        'factTime': null,
        'contactsName': null,
        'phone': null,
        'status': null,
        'mobile': null,
        'address': null,
        'receiver': null,
        'receiverFlag': null,
        'photos': null,
        'type': null
      },
      AddForm: {
        orderNo: null,
        regionId: null,
        type: 0,
        stockId: null
      },
      today: null,
      isShowCar: false,
      isBlank: false,
      isShowSaleType: true,
      curIndex: 0,
      tableData_L: [],
      selectTable_L: [],
      selectTable_R: [],
      TabsTitle: [],
      tableData_R: [],
      titleData_R: [],
      options: {
        storageType: [
          { label: '销售订单', value: 0 },
          { label: '销售换货', value: 1 }
        ],
        stockOption: [],
        regionOption: []
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
    if (this.data.type === 'view') {
      this.fetchDetail()
    } else {
      this.fecthStockList()
      this.fecthRegionList()
      const date = new Date()
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      const day = date.getDate() + 1 > 9 ? date.getDate() : '0' + date.getDate()
      const ymd = date.getFullYear() + '-' + month + '-' + day
      this.today = ymd
    }
  },
  methods: {
    tabsCallBack(index) {
      this.curIndex = index
    },
    fecthStockList() {
      fecthStockList().then(({ data }) => {
        if (Array.isArray(data)) {
          for (const item of data) {
            item.label = item.title
            item.value = item.id
          }
          this.options.stockOption = data
          if (data.length > 0) {
            this.AddForm.stockId = data[0].id
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
    fecthRegionList() {
      fetchAllList().then(({ data }) => {
        if (!data) return
        if (Array.isArray(data.relation)) {
          for (const item of data.relation) {
            item.label = item.title
            item.value = item.id
          }
          this.options.regionOption = data.relation
        }
      }).catch(e => {
        console.log(e)
      })
    },
    fetchDetail() {
      if (!this.data.obj.id) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        type: this.data.obj.type,
        id: this.data.obj.id
      }
      fetchDetail(data).then(({ data }) => {
        if (!data) return
        this.form = Object.assign(this.form, data)
        this.table.data = data.saleDtails.rows
        this.pagination.total = data.saleDtails.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fetchDetail()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fetchDetail()
    },
    closeDialog() {
      this.$emit('input', false)
    },
    onRefresh() {
      if (this.data.type === 'view') {
        this.fetchDetail()
      }
    },
    confirmType() {
      this.shipOrderAddList()
    },
    shipOrderAddList() {
      this.isShowSaleType = this.AddForm.type === 0
      shipOrderAddList({ type: this.AddForm.type }).then(({ data }) => {
        if (!data) return
        this.isShowCar = true
        if (Array.isArray(data.orderList)) {
          for (const item of data.orderList) {
            item.type = this.AddForm.type
          }
          this.tableData_L = data.orderList
          if (this.tableData_L.length === 0) {
            this.isBlank = false
          } else {
            this.isBlank = true
          }
        }
        if (Array.isArray(data.driverList)) {
          for (const item of data.driverList) {
            const regionStr = []
            item.table = []
            if (Array.isArray(item.region)) {
              for (const key of item.region) {
                if (key.regionName) {
                  regionStr.push(`${key.regionName}`)
                }
              }
            }
            item.regionStr = regionStr.toString()
          }
          this.TabsTitle = data.driverList
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      // 模拟数据
      // setTimeout(() => {
      //   this.isShowCar = true
      //   this.tableData_L = data.orderList
      //   this.TabsTitle = data.driverList
      // }, 500)
    },
    handleTable_L_Change(val) {
      this.selectTable_L = val
    },
    handleTable_R_Change(val) {
      this.selectTable_R = val
    },
    clickToRight() {
      for (const item of this.selectTable_L) {
        this.TabsTitle[this.curIndex].table.push(item)
      }

      for (const item of this.selectTable_L) {
        for (const key of this.tableData_L) {
          if (item.orderId === key.orderId) {
            this.tableData_L.splice(this.tableData_L.indexOf(item), 1)
          }
        }
      }
      this.selectTable_L = []
    },
    clickToRemove() {
      for (const item of this.selectTable_R) {
        this.tableData_L.push(item)
      }

      for (const item of this.selectTable_R) {
        for (const key of this.TabsTitle[this.curIndex].table) {
          if (item.orderId === key.orderId) {
            this.TabsTitle[this.curIndex].table.splice(this.TabsTitle[this.curIndex].table.indexOf(item), 1)
          }
        }
      }
      this.selectTable_R = []
    },
    createOrder() {
      if (!this.isShowCar || this.tableData_L.length > 0) {
        this.$message({ type: 'warning', message: '订单分配未完成' })
        return
      }
      if (this.TabsTitle.length === 0) return
      const arr = []
      for (const item of this.TabsTitle) {
        const temArr = []
        if (item.table.length > 0) {
          for (const key of item.table) {
            temArr.push({
              'address': key.address,
              'contactsName': key.contacts,
              'customerId': key.customerId,
              'customerTitle': key.customerName,
              'mobile': key.mobile,
              'orderCode': key.orderCode,
              'orderId': key.orderId,
              'phone': key.phone,
              'type': key.type
            })
          }
        }
        arr.push({
          driverId: item.id,
          driverName: item.name,
          shipOrder: temArr
        })
      }
      this.saveLoading = true
      createRow(arr).then(res => {
        this.saveLoading = false
        this.$emit('add')
        this.$message({ type: 'success', message: `${res.msg}!` })
        this.dialog.visiable = false
      }).catch(e => {
        this.saveLoading = false
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

	.car{
		cursor: pointer;
		width: 60px;
		height: 60px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #d9d9d9;
    img{
      width: 100%;
    }
  }

  .picBox{
    width: 120px;
    height: 40px;
    text-align: center;
    display: inline-block;
    overflow: hidden;
    img{
      height: 100%;
    }
  }

  .search{
    margin-bottom: 10px;
  }
  .desc{
    padding: 4px;
    p{
      margin: 5px 0;
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
