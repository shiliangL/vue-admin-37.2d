<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog"  :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
              <el-button type="text" size="mini" v-if="data.type==='add' && isBlank && TabsTitle.length" @click.stop="createOrder">生成出库单</el-button>
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
          <template v-if="data.type==='view'">
            <el-form :model="form" ref="form" class="viewForm" label-width="120px" :inline="true">
              <div class="row-item">
                <div class="row-title">基本信息</div>
                <div class="row-content">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="出库单号:">
                        <span v-cloak>{{form.orderNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="仓库:">
                        <span v-cloak>{{form.stockName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="出库类型:">
                        <span v-if="form.storehouseType===1"> 销售订单 </span>
                        <span v-if="form.storehouseType===2"> 销售换货  </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="创建人:">
                        <span v-cloak>{{form.createdName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="出库单创建时间:">
                        <span v-cloak>{{form.createdTime}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <div class="row-item">
                <div class="row-title">商品信息</div>
                <div class="row-content">
                   <div class="search">
                      <!-- <span> 发货日期:{{today}}</span> -->
              				<el-input size="small"  v-model.trim="inputContent" style="width:180px" type="text" placeholder="输入商品名称检索" maxlength="40"></el-input>
                      <el-button  type="primary" size="small" @click.stop="fetchDetail"> 搜索 </el-button>
                  </div>
                  <!-- 表格 -->
                  <table-contain :height.sync="table.maxHeight">
                    <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
                      <el-table-column label="序号" width="50" align="center">
                        <template slot-scope="scope">
                          <span>{{scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                      <el-table-column prop="basicUnit" label="基本单位" align="center"></el-table-column>
                      <el-table-column prop="outQuantity" label="下单数量" align="center"></el-table-column>
                      <el-table-column prop="realQuantity" label="出库数量" align="center"></el-table-column>
                      <el-table-column prop="outageTime" label="出库时间" align="center"></el-table-column>
                        <el-table-column prop="operator" label="操作人"  align="center"></el-table-column>
                      <el-table-column prop="sortingTableName" label="分拣台" align="center"></el-table-column>
                      <!-- <el-table-column prop="sorterName" label="分拣员" align="center"></el-table-column> -->
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
                  <el-card class="box-card" style="position: relative;">
                    <div class="search">
                      <span class="today" v-if="AddForm.type===1">发货日期: {{today}}</span>
                      <!-- <el-select size="small" v-model="form.regionId" filterable clearable placeholder="配送区域"  style="width:120px">
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
                        <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                        <el-table-column prop="basicUnit" label="基本单位" align="center"></el-table-column>
                        <el-table-column prop="orderQuantity" label="下单数量" align="center"></el-table-column>
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
                    <SelectTabs :data="TabsTitle" @callBack="tabsCallBack"></SelectTabs>
                    <div v-for="(item,index) in TabsTitle" :key="index" v-show="curIndex===index">
                      <!-- <div class="desc">
                        <el-form-item label="分拣员:" label-width="60px">
                          <el-select size="small" v-model="item.sorterId" filterable clearable placeholder="分拣员"  style="width:180px">
                            <el-option v-for="sub in selectOption" :disabled="sub.disabled" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </div> -->
                      <div class="table">
                        <el-table :data="item.table" size="small" max-height="300" style="width: 100%;" highlight-current-row
                          @selection-change="handleTable_R_Change">
                          <el-table-column type="selection" width="40"> </el-table-column>
                          <el-table-column label="序号" width="50" align="center">
                            <template slot-scope="scope"> 
                              <span>{{scope.$index + 1}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                          <el-table-column prop="basicUnit" label="基本单位" align="center"></el-table-column>
                          <el-table-column prop="orderQuantity" label="下单数量" align="center"></el-table-column>
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
import { fecthStockList, fecthWorkBench, fecthWorkbenchUser, addProductList, createRow, fetchDetail, fetchTableDetail, addReturnList } from '@/api/warehouse/goodsOut.js'
export default {
  mixins: [addModel, model],
  components: {
    SelectTabs
  },
  data() {
    return {
      form: {
        'orderNo': null,
        'stockName': null,
        'storehouseType': null,
        'createdName': null,
        'createdTime': null
      },
      inputContent: null,
      AddForm: {
        orderNo: null,
        regionId: null,
        type: 1,
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
          { label: '销售订单', value: 1 },
          { label: '销售换货', value: 2 }
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
    const date = new Date()
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    const ymd = date.getFullYear() + '-' + month + '-' + day
    this.today = ymd
    if (this.data.type === 'view') {
      this.fetchDetail()
    } else {
      this.fecthStockList()
      this.fecthRegionList()
    }
  },
  computed: {
    selectArr() {
      const arr = []
      for (const item of this.TabsTitle) {
        if (item.sorterId) {
          arr.push(item.sorterId)
        }
      }
      return arr
    },
    selectOption() {
      for (const item of this.options.regionOption) {
        if (this.selectArr.indexOf(item.value) !== -1) {
          item.disabled = true
        } else {
          item.disabled = false
        }
      }
      return this.options.regionOption
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
      fecthWorkbenchUser({ staffType: 4 }).then(({ data }) => {
        if (!data) return
        if (Array.isArray(data)) {
          for (const item of data) {
            item.disabled = false
          }
          this.options.regionOption = data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    fetchDetail() {
      if (!this.data.obj.id) return
      fetchDetail({ id: this.data.obj.id }).then(({ data }) => {
        if (!data) return
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })

      const { index, size } = this.pagination
      const data = {
        index,
        size,
        inputContent: this.inputContent,
        outId: this.data.obj.id
      }
      fetchTableDetail(data).then(({ data }) => {
        if (!data) return
        this.table.data = data.rows
        this.pagination.total = data.total
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
      this.isShowCar = true
      this.loadOption()
    },
    loadOption() {
      if (!this.AddForm.stockId) return
      fecthWorkBench({ stockId: this.AddForm.stockId, type: 4 }).then(({ data }) => {
        if (!data) return
        if (Array.isArray(data)) {
          for (const item of data) {
            item.name = item.title
            item.sorterId = null
            item.table = []
          }
          this.TabsTitle = data
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      if (this.AddForm.type === 1) {
        addProductList({ stockId: this.AddForm.stockId, deliveryTime: this.today }).then(({ data }) => {
          if (!data) return
          if (Array.isArray(data)) {
            this.tableData_L = data
            if (this.tableData_L.length === 0) {
              this.isBlank = false
            } else {
              this.isBlank = true
            }
          }
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      } else if (this.AddForm.type === 2) {
        addReturnList({ stockId: this.AddForm.stockId }).then(({ data }) => {
          if (!data) return
          if (Array.isArray(data)) {
            this.tableData_L = data
            if (this.tableData_L.length === 0) {
              this.isBlank = false
            } else {
              this.isBlank = true
            }
          }
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      }
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
      const data = {
        deliveryTime: this.today,
        stockId: this.AddForm.stockId,
        storehouseType: this.AddForm.type,
        tableList: []
      }

      // for (let i = 0; i < this.TabsTitle.length; i++) {
      //   const item = this.TabsTitle[i]
      //   if (item.table.length > 0 && !item.sorterId) {
      //     this.$message({ type: 'error', message: `${item.name}请选择分拣员`, duration: 0, showClose: true })
      //     return
      //   }
      // }

      for (const item of this.TabsTitle) {
        data.tableList.push({
          productList: item.table,
          sorterId: item.sorterId,
          tableId: item.pk
        })
      }
      this.saveLoading = true
      createRow(data).then(res => {
        this.saveLoading = false
        this.$emit('add')
        this.$message({ type: 'success', message: `${res.msg}!` })
        this.dialog.visiable = false
      }).catch(e => {
        this.saveLoading = false
        this.$message({ type: 'error', message: e.msg })
      })
    },
    selectSorterOption(value, item) {
      let data = null
      if (value) {
        for (const key of this.options.regionOption) {
          if (key.value === value) {
            key.disabled = true
            data = key
          }
        }
      } else {
        if (data) {
          data.disabled = false
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
    padding: 8px;
  }
  .today{
    position: absolute;
    left: 10px;
    top:10px;
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
