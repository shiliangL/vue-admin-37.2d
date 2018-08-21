<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal-append-to-body="false" :modal="false">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
             <template v-if="isShowView">
                <!-- <el-button v-if="this.data.type === 'add'" type="text" size="mini" @click.stop="clickToEdit">编辑</el-button> -->
             </template>
              <template v-else>
                <el-button type="text" v-if="this.data.type === 'add'" size="mini" @click.stop="validateForm">保存</el-button>
             </template>
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">

            <template v-if="this.data.type === 'add'">

              <div class="search">

                  <el-select size="small" v-model="stockId" filterable placeholder="选择仓库">
                    <el-option v-for="sub in options.stockOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                  </el-select>

                  <el-select v-model="storageType" placeholder="请选择类型" size="small" style="width:120px" filterable  @change="stockChange">
                    <el-option v-for="item in options.storageType" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
                  </el-select>
                  <el-button  type="primary" size="small" @click.stop="fecthList" > 加载数据 </el-button>
              </div>
              <div class="table">

                <!-- {{form.stockInDetailList}} -->
                <el-form :model="form" :rules="rules" ref="stockInDetailList" label-width="120px" :inline="true">

                  <el-table :data="form.stockInDetailList" size="small" class="stockInDetailList" max-height="420" style="width: 100%;" highlight-current-row>
                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="basicUnit" label="基本单位" align="center"></el-table-column>
                    <el-table-column prop="batchesBarCode" label="商品批次条码" align="center"></el-table-column>
                    <el-table-column v-if="storageType===1"  prop="orderNo" label="关联采购订单编号" align="center"></el-table-column>
                    <el-table-column v-if="storageType===2"  prop="orderNo" label="关联销售退货单号" align="center"></el-table-column>
                    <el-table-column v-if="storageType===3"  prop="orderNo" label="关联销售换货单号" align="center"></el-table-column>
                    <el-table-column prop="createdTime" label="仓位" align="center" width="220">
                      <template slot-scope="scope">
                        <div class="item-box">
                          <span v-for="item in scope.row.storageIdsOption" :key="item.pk">
                            <el-checkbox class="item-checkbox" v-model="item.isCheck" :label="item.number"></el-checkbox>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
                    <el-table-column prop="makePlace" label="产地" align="center" width="100">
                      <template slot-scope="scope">
                        <el-form-item label="" label-width="0">
                          <el-input size="small" style="width:90px" class="w180"  placeholder="请输入" v-model.trim="scope.row.makePlace"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="makeDate" label="生产日期" align="center" width="180">
                      <template slot-scope="scope">
                        <el-form-item label="" label-width="0">
                          <el-date-picker :style="{width:'136px'}" size="small" v-model="scope.row.makeDate" value-format="yyyy-MM-dd" type="date"></el-date-picker>
                        </el-form-item>
                      </template>
                    </el-table-column>
                  </el-table>

                </el-form>
                <div class="footer-block">
                  <span class="page" v-cloak> 共 {{form.stockInDetailList.length}} 条</span>
                </div>
              </div>

            </template>

            <template v-if="this.data.type === 'view'">

              <div class="viewPage"> 
                <!--基本信息-->
                <div class="row-item">
                  <div class="row-title">基本信息</div>
                  <div class="row-content">
                    <el-row>
                      <el-col :xs="24" :sm="10" :md="8" :lg="6">
                        <span class="title-label">入库单号:</span>
                        <span v-cloak>{{ viewData.orderNo }} </span>
                      </el-col>
                      <el-col :xs="24" :sm="10" :md="8" :lg="6">
                        <span class="title-label">仓库:</span>
                        <span v-cloak>{{ viewData.stockName }} </span>
                      </el-col>
                      <el-col :xs="24" :sm="10" :md="8" :lg="6">
                        <span class="title-label">入库类型:</span>
                        <span v-cloak v-if="viewData.storageType==1">采购入库</span>
                        <span v-cloak v-if="viewData.storageType==2">销售退货</span>
                        <span v-cloak v-if="viewData.storageType==3">销售换货</span>
                        <span v-cloak v-if="viewData.storageType==4">其他</span>
                      </el-col>
                      <el-col :xs="24" :sm="10" :md="8" :lg="6">
                        <span class="title-label">创建人:</span>
                        <span v-cloak>{{ viewData.createdName }} </span>
                      </el-col>
                      <el-col :xs="24" :sm="10" :md="8" :lg="6">
                        <span class="title-label">创建时间:</span>
                        <span v-cloak>{{ viewData.createdTime }} </span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                  
                <div class="row-item">
                  <div class="row-title">商品信息</div>
                  <div class="row-content">
                    
                    <div class="search">
                        <el-input size="small" style="width:190px" class="w180"  placeholder="请输入商品名称检索" v-model.trim="viewSearch"></el-input>
                        <el-button  type="primary" size="small" @click.stop="clickToSearch" > 搜索 </el-button>
                        <el-button style="margin-left: 0px;" size="small" @click.stop="resetSearch" > 重置 </el-button>
                    </div>

                    <el-table :data="viewData.tableView" size="small" max-height="420" style="width: 100%;margin-top: 10px;" highlight-current-row>

                      <el-table-column label="序号" width="50" align="center">
                        <template slot-scope="scope">
                          <span>{{scope.$index + 1}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                      <el-table-column prop="basicUnit" label="基本单位" align="center"></el-table-column>
                      <el-table-column prop="batchesBarCode" label="商品批次条码" align="center"></el-table-column>
                      <el-table-column prop="inOrderNo" label="关联入库单号" align="center"></el-table-column>
                      <el-table-column prop="stockInfoName" label="仓库" align="center"></el-table-column>
                      <el-table-column prop="stockStorageInfoNumbers" label="仓位" align="center"></el-table-column>
                      <el-table-column prop="storageType" label="入库类型" align="center">
                         <template slot-scope="scope">
                          <span v-if="scope.row.storageType === 1"> 采购入库 </span>
                          <span v-if="scope.row.storageType === 2"> 销售退货 </span>
                          <span v-if="scope.row.storageType === 3"> 销售换货 </span>
                          <span v-if="scope.row.storageType === 4"> 其他 </span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="quantity" label="入库数量" align="center"></el-table-column>
                      <el-table-column prop="warehouseTime" label="入库时间" width="90" align="center"></el-table-column>
                      <el-table-column prop="makePlace" label="产地" align="center"></el-table-column>
                      <el-table-column prop="makeDateStr" label="生产日期" width="90" align="center"></el-table-column>
                    </el-table>
                    <div class="footer-block">
                      <span class="page" v-cloak> 共 {{viewData.tableView.length}} 条</span>
                    </div>
                  </div>
                </div>

              </div>

            </template>
        </div>
      </div>

      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { findMore, createRk, detailRk, fecthBodyDetail, returnChangeList, fecthStockList } from '@/api/warehouse/goodsIn.js'
import { fecthAllCW } from '@/api/warehouse/setting.js'

export default {
  mixins: [addModel],
  data() {
    return {
      dialogVisible: false,
      stockId: null,
      propType: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      storageType: null,
      form: {
        stockId: null,
        stockInDetailList: []
      },
      viewData: {
        orderNo: null,
        stockName: null,
        storageType: null,
        createdName: null,
        createdTime: null,
        tableView: []
      },
      viewSearch: null,
      rules: {},
      isShowEditor: false,
      isShowView: false,
      currentTitle: null,
      options: {
        stockOption: [],
        stock: [],
        storageType: [
          { label: '采购入库', value: 1 },
          { label: '销售退货', value: 2 },
          { label: '销售换货', value: 3 }
        ]
      },
      cwOption: null
    }
  },
  created() {
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    this.currentTitle = this.data.title || ''
    if (this.data.type === 'view') {
      this.fecthDetailById()
      this.fecthBodyDetail()
    } else if (this.data.type === 'add') {
      this.fecthStockList()
      this.fecthAllCW()
    }
  },
  methods: {
    fecthDetailById() {
      if (!this.data.obj.id) return
      detailRk({ id: this.data.obj.id }).then(({ data }) => {
        this.viewData = Object.assign(this.viewData, data)
      }).catch(e => {
        console.log(e)
      })
    },
    fecthBodyDetail() {
      if (!this.data.obj.id) return
      fecthBodyDetail({ inId: this.data.obj.id }).then(({ data }) => {
        if (Array.isArray(data)) {
          for (const item of data) {
            if (item.makeDate) {
              item.makeDateStr = item.makeDate.split(' ')[0]
            } else {
              item.makeDateStr = null
            }
          }
        }
        this.viewData.tableView = data
      }).catch(e => {
        console.log(e)
      })
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
            this.storageType = 1
            this.stockId = data[0].id
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
    fecthList() {
      if (!this.stockId) {
        this.$message({ type: 'warning', message: '请选仓库' })
        return
      }
      if (!this.storageType) {
        this.$message({ type: 'warning', message: '请选择入库类型' })
        return
      }
      if (this.storageType === 1) {
        // 选中采购入库
        findMore({ stockId: this.stockId }).then(({ data }) => {
          if (!this.cwOption) return
          for (const item of data) {
            if (this.cwOption && this.cwOption[item.stockId]) {
              item.storageIdsOption = JSON.parse(JSON.stringify(this.cwOption[item.stockId]))
            } else {
              item.storageIdsOption = []
            }
          }
          this.form.stockInDetailList = data
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      } else if (this.storageType === 2 || this.storageType === 3) {
        const data = {
          method: this.storageType === 2 ? 1 : 2
        }
        returnChangeList(data).then(({ data }) => {
          if (!this.cwOption) return
          for (const item of data) {
            if (this.cwOption[item.stockId]) {
              item.storageIdsOption = JSON.parse(
                JSON.stringify(this.cwOption[item.stockId])
              )
            } else {
              item.storageIdsOption = []
            }
          }
          this.form.stockInDetailList = data
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      }
    },
    fecthAllCW() {
      fecthAllCW().then(({ data }) => {
        this.cwOption = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickToEdit() {
      this.typeIseditor = true // 点击判断编辑修改提交
      this.isShowView = false
      this.isShowEditor = true
    },
    closeDialog() {
      this.$emit('input', false)
    },
    success() {
      this.$message({ type: 'success', message: this.dialog.title + '成功' })
    },
    error(data) {
      this.$message({ type: 'error', message: data.msg })
    },
    onRefresh() {
      if (this.data.type === 'view') {
        const id = this.data.obj.id
        if (!id) return
        this.fecthDerDetailById(id)
      }
    },
    validateForm() {
      if (!this.form.stockInDetailList.length) {
        this.$message({ type: 'warning', message: '提交数据不能为空' })
        return
      }
      this.$refs['stockInDetailList'].validate(valid => {
        if (valid) {
          this.$confirm('是否确保保存', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.buyIn()
          }).catch(() => {})
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    buyIn() {
      const arr = JSON.parse(JSON.stringify(this.form.stockInDetailList))
      for (const item of arr) {
        const isCheckArr = []
        if (item.makeDate) {
          item.makeDate = item.makeDate + ' 00:00:00'
        }
        for (const k of item.storageIdsOption) {
          if (k.hasOwnProperty('isCheck')) {
            if (k.isCheck) {
              isCheckArr.push(k.pk)
            }
          }
        }
        item.storageIds = isCheckArr.toString()
        delete item.storageIdsOption
        if (item.hasOwnProperty('rate')) {
          delete item.rate
        }
      }
      const data = {
        storageType: this.storageType,
        stockId: this.stockId,
        stockInDetailList: arr
      }
      createRk(data).then(res => {
        this.dialog.visiable = false
        this.$message({ type: 'success', message: res.msg })
        this.$emit('add')
      }).catch(e => {
        this.error(e)
      })
    },
    stockChange(value) {
      this.form.stockInDetailList = []
    },
    validatePass() {
      if (this.$refs['toView']) {
        this.$refs['toView'].validateForm()
      }
    },
    addCheckClose() {
      this.dialog.visiable = false
      this.$emit('add')
    },
    clickToSearch() {
      if (!this.data.obj.id) return
      const data = {
        inputContent: this.viewSearch,
        id: this.data.obj.id
      }
      fecthBodyDetail(data).then(({ data }) => {
        this.viewData.tableView = data
      }).catch(e => {
        console.log(e)
      })
    },
    resetSearch() {
      this.viewSearch = null
      this.clickToSearch()
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__wrapper {
    min-height: 100%;
    min-height: 600px;
}
.content-box {
    width: 100%;
    position: relative;
    .header-bar {
        .left {
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
.stockInDetailList {
    .item-box {
        max-height: 80px;
        overflow-y: auto;
    }
    .el-form-item {
        margin-bottom: 0;
    }
}
.item-checkbox{
  padding-right: 10px;
}
</style>
