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
                <search-bar :data="searchBarDate" @search="searchAction" @reset="searchAction"  @add="showAdd"></search-bar>
                <div>
                  <el-row :gutter="40">
                    <el-col :span="12">

                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <GoodsCascader class="left"/>
                            <el-input size="small" style="width:110px" class="left w180"  placeholder="商品名称检索" v-model.trim="viewSearch"></el-input>
                            <el-button  type="primary" size="small" class="left" @click.stop="clickToSearch" > 搜索 </el-button>
                        </div>
                        <div class="table">
                          <el-table :data="tableData_L" size="small" max-height="300" style="width: 100%;" highlight-current-row>

                            <el-table-column label="序号" width="50" align="center">
                              <template slot-scope="scope">
                                <span>{{scope.$index + 1}}</span>
                              </template>
                            </el-table-column>
                  
                            <el-table-column prop="orderNo" label="商品名称" align="center"></el-table-column>
                            <el-table-column prop="stockInfoName" label="基本单位" align="center"></el-table-column>
                            <el-table-column prop="createdTime" label="下单数量" align="center"></el-table-column>

                          </el-table>
                        </div>
                      </el-card>

                    </el-col>
                    <el-col :span="12">

                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                        </div>
                        <div class="table">
                          <el-table :data="tableData_L" size="small" max-height="300" style="width: 100%;" highlight-current-row>

                            <el-table-column label="序号" width="50" align="center">
                              <template slot-scope="scope">
                                <span>{{scope.$index + 1}}</span>
                              </template>
                            </el-table-column>
                  
                            <el-table-column prop="orderNo" label="商品名称" align="center"></el-table-column>
                            <el-table-column prop="stockInfoName" label="基本单位" align="center"></el-table-column>
                            <el-table-column prop="createdTime" label="下单数量" align="center"></el-table-column>

                          </el-table>
                        </div>
                      </el-card>

                    </el-col>
                  </el-row>
                </div>
                <!-- <el-cascader style="320px" v-model="stockDto" size="small"  placeholder="请选择仓库"  filterable :options="options.stock" @active-item-change="handleItemChange" :props="propType" @change="stockChange"></el-cascader>
                <el-select v-model="storageType" placeholder="请选择类型" size="small" style="width:120px" filterable  @change="stockChange">
                  <el-option v-for="item in options.storageType" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
                </el-select>
                <el-button  type="primary" size="small" @click.stop="fecthList" > 搜索 </el-button> -->
              </div>
              <div class="table">
 
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
                        <span v-cloak>{{ viewData.storageType }} </span>
                        <span v-cloak v-if="viewData.storageType==1">销售订单</span>
                        <span v-cloak v-if="viewData.storageType==2">销售退货</span>
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
                        <el-input size="small" style="width:190px" class="w180"  placeholder="请输入商品名称/出库单号检索" v-model.trim="viewSearch"></el-input>
                        <el-button  type="primary" size="small" @click.stop="clickToSearch" > 搜索 </el-button>
                        <el-button  size="small" @click.stop="resetSearch" > 重置 </el-button>
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

                      <el-table-column prop="storageType" label="入库类型" align="center"></el-table-column>
                      <el-table-column prop="quantity" label="入库数量" align="center"></el-table-column>
                      <el-table-column prop="warehouseTime" label="入库时间" align="center"></el-table-column>

                      <el-table-column prop="makePlace" label="产地" align="center"></el-table-column>
                      <el-table-column prop="makeDate" label="生产日期" width="90" align="center"></el-table-column>

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
import { SearchBar, GoodsCascader } from '@/components/base.js'
import { fecthOutDetail, fecthOutTableDetail } from '@/api/warehouse/goodsOut.js'
import { stockCategory, fecthStockByType, fecthAllCW } from '@/api/warehouse/setting.js'

export default {
  mixins: [addModel],
  components: {
    SearchBar,
    GoodsCascader
  },
  data() {
    return {
      dialogVisible: false,
      stockDto: [],
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
      searchBarDate: [
        [
          {
            type: 'option',
            value: null,
            key: 'stockId',
            class: 'w150',
            placeholder: '仓库',
            options: []
          },
          {
            type: 'option',
            value: null,
            key: 'storehouseType',
            class: 'w150',
            placeholder: '入库类别',
            options: [
              { label: '销售订单', value: 1 },
              { label: '销售换货', value: 2 }
            ]
          },
          {
            type: 'input',
            value: null,
            key: 'orderNo',
            class: 'w180',
            placeholder: '输入单号检索'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [{ type: 'add', name: '生成入库单' }]
      ],
      tableData_L: [],
      options: {
        stock: [],
        storageType: [
          { label: '销售订单', value: 1 },
          { label: '销售换货', value: 2 }
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
    } else if (this.data.type === 'add') {
      this.stockCategory()
      this.fecthAllCW()
    }
  },
  methods: {
    fecthDetailById() {
      // detailRk
      if (!this.data.obj.id) return
      fecthOutDetail({ id: this.data.obj.id })
        .then(({ data }) => {
          this.viewData = Object.assign(this.viewData, data)
        })
        .catch(e => {
          console.log(e)
        })
      fecthOutTableDetail({ outId: this.data.obj.id })
        .then(({ data }) => {
          this.viewData.tableView = data
        })
        .catch(e => {
          console.log(e)
        })
    },
    fecthOutTableDetail() {
      if (!this.data.obj.id) return
      const data = {
        outId: this.data.obj.id,
        inputContent: this.viewSearch
      }
      fecthOutTableDetail(data)
        .then(({ data }) => {
          this.viewData.tableView = data
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 加载仓库类别
    stockCategory() {
      stockCategory()
        .then(({ data }) => {
          if (Array.isArray(data) && data.length > 0) {
            const arr = []
            for (const item of data) {
              arr.push({
                value: item.pk,
                label: item.title,
                children: []
              })
            }
            this.options.stock = arr
          }
        })
        .catch(e => {
          // this.loadingText = e.msg
        })
    },
    handleItemChange(value) {
      const arr = this.options.stock
      let item = null
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        if (element.value === value[0]) {
          item = element
          break
        }
      }
      if (!item) return
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (item && item.value) {
          fecthStockByType({ categoryId: item.value })
            .then(({ data }) => {
              if (Array.isArray(data) && data.length > 0) {
                const arr = []
                for (const item of data) {
                  arr.push({
                    value: item.pk,
                    label: item.title
                  })
                }
                item.children = arr
              }
            })
            .catch(e => {
              console.log(e)
            })
        }
      }, 400)
    },
    fecthAllCW() {
      fecthAllCW()
        .then(({ data }) => {
          this.cwOption = data
        })
        .catch(e => {
          console.log(e)
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
      this.$message({
        type: 'success',
        message: this.dialog.title + '成功'
      })
    },
    error(data) {
      this.$message({ type: 'error', message: data.msg })
    },
    onRefresh() {
      if (this.data.type === 'view') {
        const id = this.data.obj.id
        if (!id) return
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
          })
            .then(() => {})
            .catch(() => {})
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
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
    resetSearch() {
      this.viewSearch = null
      this.clickToSearch()
    },
    clickToSearch() {
      this.fecthOutTableDetail()
    },
    // 生成出库单号
    searchAction() {},
    showAdd() {}
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
.clearfix{
  .left{
    margin-left: 4px;
  }
}
</style>
