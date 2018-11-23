<!-- 业务实际操作说明
使用设备 : 电子秤
 -->

<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog"  :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
              <template>
                <el-button  v-if="data.type === 'add'" type="text" size="mini" @click.stop="validateAddForm">保存</el-button>
              </template>
              <!-- <template v-else>
                <el-button type="text" v-if="this.data.type === 'add'" size="mini" @click.stop="validateForm">保存</el-button>
             </template> -->
              <el-button v-if="data.type === 'view'" type="text" size="mini" @click.stop="onRefresh">刷新</el-button>
              <el-button type="text" size="mini" @click.stop="closeDialog">返回</el-button>
            </div>
        </div>
        <div class="content-bar">

            <template v-if="this.data.type === 'add'">
              <div class="search">

                  <el-select size="small" v-model="stockId" filterable placeholder="选择仓库">
                    <el-option v-for="sub in options.stockOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                  </el-select>
                  <el-select v-model="storageType" placeholder="请选择类型" size="small" style="width:120px" filterable  @change="stockChange" disabled>
                    <el-option v-for="item in options.storageType" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
                  </el-select>

                  <template v-if="storageType ===4">
                    <el-select class="w110" size="small" v-model="levelFirst" clearable filterable placeholder="一级分类">
                      <el-option v-for="sub in searchBarOptons.categoryOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                    </el-select>

                    <el-select class="w110" size="small" v-model="levelFecond" clearable filterable placeholder="二级分类" v-if="searchBarOptons.levelTowOption.length"> 
                      <el-option v-for="sub in searchBarOptons.levelTowOption" :key="sub.id" :label="sub.title" :value="sub.id"></el-option>
                    </el-select>

                    <SearchBox style="width:180px; display: inline-block;position: relative;top: 10px;" keyName="title"  
                      :updateKey="updateKey" 
                      tableName="productName"
                      tableCode="categoryName" 
                      nameLabel="商品" 
                      codeLabel="类别" 
                      PutInStorage
                      requestUrl="purchaseAcceptInfo/queryOtherStockInProductList" 
                      v-model="addDoodsDTO">
                    </SearchBox>

                    <el-button style="display: inline-block;position: relative;top: -2px;" type="primary" size="small" @click.stop="clickToAddOther"> 添加 </el-button>

                  </template>

                  <el-button  type="primary" size="small" @click.stop="fecthList" v-if="storageType !==4" > 加载数据 </el-button>

              </div>

              <div v-if="storageType ===4">

                 <el-form :model="Addform" :rules="rules" ref="AddInDetailList" label-width="120px" :inline="true">

                  <el-table :data="Addform.stockInDetailList" size="small" class="stockInDetailList" max-height="420" style="width: 100%;" highlight-current-row>
                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="categoryName" label="商品分类" align="center"></el-table-column>
                    <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="basicUnit" label="基本单位" align="center"></el-table-column>
                    <el-table-column prop="createdTime" label="仓位" align="center" width="220">
                      <template slot-scope="scope">
                        <div class="item-box">
                          <span v-for="item in scope.row.storageIdsOption" :key="item.pk">
                            <el-checkbox class="item-checkbox" v-model="item.isCheck" :label="item.number"></el-checkbox>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                    <!-- <el-table-column prop="planQuantity" label="数量" align="center">
                       <template slot-scope="scope">
                        <el-form-item label="" label-width="0px" :prop="'stockInDetailList.'+scope.$index+'.planQuantity'" :rules="[{trigger: 'change', validator: rules.validNumberR2N0}]">
                          <el-input style="width:110px" placeholder="请输入" size="small" v-model.trim="scope.row.planQuantity"></el-input> 
                        </el-form-item>
                      </template>
                    </el-table-column> -->
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
                    <el-table-column  label="操作" align="center" width="180">
                      <template slot-scope="scope">
                        <el-button type="text" style="color:red" @click.stop="clickToDelete(scope.$index, scope.row)" size="mini">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                </el-form>
                <div class="footer-block">
                  <span class="page" v-cloak> 共 {{Addform.stockInDetailList.length}} 条</span>
                </div>
              </div>

              <div class="table" v-else>
                <el-form :model="normalForm" :rules="rules" ref="stockInDetailList" label-width="120px" :inline="true">

                  <el-table :data="normalForm.stockInDetailList" size="small" class="stockInDetailList" max-height="420" style="width: 100%;" highlight-current-row>
                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="basicUnit" label="基本单位" align="center"></el-table-column>
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
                    <el-table-column prop="planQuantity" label="数量" align="center"></el-table-column>
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
                  <span class="page" v-cloak> 共 {{normalForm.stockInDetailList.length}} 条</span>
                </div>
              </div>

            </template>

            <template v-if="this.data.type === 'view'">
              <el-form :model="form" ref="form" label-width="130px" :inline="true">
                <!--基本信息-->
                <div class="row-item">
                    <div class="row-title">基本信息</div>
                    <div class="row-content view-header">
                      <el-row>
                        <el-col :xs="24" :sm="10" :md="8" :lg="6">
                          <el-form-item label="入库单号:">
                            <span v-cloak>{{form.orderNo}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="10" :md="8" :lg="6">
                          <el-form-item label="仓库:">
                          <span v-cloak>{{form.stockName}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="10" :md="8" :lg="6">
                          <el-form-item label="入库类型:">
                            <span v-if="form.storageType===1"> 采购入库 </span>
                            <span v-if="form.storageType===2"> 销售退货 </span>
                            <span v-if="form.storageType===3"> 销售换货 </span>
                            <span v-if="form.storageType===4"> 其他 </span>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="10" :md="8" :lg="6">
                          <el-form-item label="创建人:">
                            <span v-cloak>{{form.createdName}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="10" :md="8" :lg="6">
                          <el-form-item label="入库单创建时间:">
                            <span v-cloak>{{form.createdTime}}</span>
                          </el-form-item>
                        </el-col>
        
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
                      <el-table :data="form.table" size="small" max-height="450" class="table" style="width: 100%;" highlight-current-row>
                        <el-table-column label="序号" width="50" align="center">
                          <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
                        </el-table-column>
                        <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                        <el-table-column prop="basicUnit" label="基本单位" align="center"></el-table-column>
                        <!-- <el-table-column prop="batchesBarCode" label="商品批次条码" align="center"></el-table-column>  暂时隐藏-->
                        <!-- 加 -->
                        <el-table-column prop="planQuantity" :label="storageTypeTitle"  v-if="storageTypeTitle!==4" align="center"></el-table-column> 
                        <el-table-column prop="quantity" label="入库数量" align="center">
                          <template slot-scope="scope">
                            <span v-if="scope.row.warehouseTime" v-cloak>{{scope.row.quantity}}</span>
                            <el-form-item v-else label="" label-width="0px" :prop="'table.'+scope.$index+'.quantity'"  :rules="[{ required: true, validator: rules.validNumber2, trigger: 'change' }]">
                              <!-- @keyup.enter.native="clickToUpdate(scope.$index,scope.row)" :tabindex="(scope.$index + 1).toString()" -->
                              <el-input size="small" v-model.trim="scope.row.quantity"></el-input>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column prop="warehouseTime" label="入库时间" align="center">
                          <template slot-scope="scope">
                            <span v-if="scope.row.warehouseTime" v-cloak>{{scope.row.warehouseTime}}</span>
                            <span v-else v-cloak> / </span>
                          </template>
                        </el-table-column>
                        <!-- 加 -->
                        <el-table-column prop="operator" label="入库操作人" align="center"></el-table-column> 
                        <el-table-column prop="sum" label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button v-if="!scope.row.warehouseTime" type="text" size="mini" @click.stop="clickToUpdate(scope.$index,scope.row)">保存</el-button>
                            <el-button v-else type="text" size="mini"  @click.stop="clickToReset(scope.$index,scope.row)">再次增加</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    <div class="footer-block">
                      <span class="page" v-cloak> 共 {{form.table.length}} 条</span>
                    </div>
                  </div>
                </div>
              </el-form>
            </template>

        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import rules from '@/public/rules.js'
import { SearchBox } from '@/components/base.js'
import addModel from '@/public/addModel.js'
import { findMore, returnChangeList, fecthStockList, fecthGoodsClass, fecthAllCW, createRk } from '@/api/warehouse/goodsIn.js'
import { fecthHeaderDetail, fecthBodyDetail, warehousingUpdateQuantity } from '@/api/putStorage/index.js'

export default {
  mixins: [addModel, rules],
  components: {
    SearchBox
  },
  data() {
    return {
      currentTitle: null,
      searchKey: null,
      storageTypeTitle: '实际采购量',
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
      // 新增入库
      Addform: {
        stockInDetailList: []
      },
      normalForm: {
        stockId: null,
        stockInDetailList: []
      },
      stockId: null,
      storageType: 4,
      isShowView: false,
      addDoodsDTO: null,
      cwOption: null,

      options: {
        stockOption: [],
        stock: [],
        storageType: [
          { label: '采购入库', value: 1 },
          { label: '销售退货', value: 2 },
          { label: '销售换货', value: 3 },
          { label: '其他', value: 4 }
        ]
      },
      levelFirst: '',
      levelFecond: '',
      updateKey: {},
      searchBarOptons: {
        categoryOption: [],
        levelTowOption: []
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
    } else {
      this.fecthStockList()
      this.fecthGoodsClass()
      this.fecthAllCW()
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
        if (this.form.storageType === 2) {
          this.storageTypeTitle = '申请退货量'
        } else if (this.form.storageType === 3) {
          this.storageTypeTitle = '申请换货量'
        } else if (this.form.storageType === 4) {
          this.storageTypeTitle = 4
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      fecthBodyDetail({ inId: this.data.obj.id }).then(({ data }) => {
        this.form.table = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickToUpdate(index, item) {
      this.$refs['form'].validateField(`table.${index}.quantity`, (m) => {
        if (!m) {
          this.$confirm('请核实输入数量,是否确定？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const data = {
              'detailsId': item.id,
              'productId': item.productId,
              'quantity': item.quantity
            }
            warehousingUpdateQuantity(data).then(res => {
              this.$message({ type: 'success', message: '保存成功' })
              this.resetSearch()
            }).catch(e => {
              this.$message({ type: 'error', message: e.msg })
            })
          }).catch(() => {})
        } else {
          this.$message({ type: 'error', message: '请输入有效数值' })
          return
        }
      })
    },
    clickToReset(index, item) {
      item.warehouseTime = null
      item.quantity = null
    },
    clickToSearch() {
      if (!this.data.obj.id) return
      fecthHeaderDetail({ id: this.data.obj.id }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      fecthBodyDetail({ inId: this.data.obj.id, inputContent: this.searchKey }).then(({ data }) => {
        this.form.table = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    resetSearch() {
      if (!this.data.obj.id) return
      this.searchKey = null
      this.clickToSearch()
    },
    // -----------------
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
          this.normalForm.stockInDetailList = data
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
          this.normalForm.stockInDetailList = data
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      }
    },
    stockChange(value) {
      value === 4 ? this.isShowView = true : this.isShowView = false
      this.form.stockInDetailList = []
    },
    fecthAllCW() {
      fecthAllCW().then(({ data }) => {
        this.cwOption = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
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
            // this.storageType = 1
            this.stockId = data[0].id
            this.updateKey = {
              stockId: data[0].id
            }
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
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
        this.$message({ type: 'error', message: '加载商品分类失败失败' })
      })
    },
    clickToAddOther() {
      if (!this.addDoodsDTO) {
        this.$message({ type: 'warning', message: '请选择商品' })
        return
      }
      const data = JSON.parse(JSON.stringify(this.addDoodsDTO))
      if (this.cwOption && this.cwOption[data.stockId]) {
        data.storageIdsOption = JSON.parse(JSON.stringify(this.cwOption[data.stockId]))
      } else {
        data.storageIdsOption = []
      }

      const productIds = this.Addform.stockInDetailList.map(item => {
        return item.productId
      })
      if (productIds.indexOf(data.productId) !== -1) {
        this.$message({ type: 'warning', message: '请勿重复添加' })
        return
      } else {
        data.planQuantity = 0
        this.Addform.stockInDetailList.push(data)
        this.addDoodsDTO = null
      }
    },
    clickToDelete(index, row) {
      this.Addform.stockInDetailList.splice(index, 1)
    },
    validateAddForm() {
      if (!this.Addform.stockInDetailList.length) {
        this.$message({ type: 'warning', message: '提交数据不能为空' })
        return
      }
      this.$refs['AddInDetailList'].validate(valid => {
        if (valid) {
          this.$confirm('是否确保存？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const arr = JSON.parse(JSON.stringify(this.Addform.stockInDetailList))

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
              delete item.title
              delete item.categoryName
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
          }).catch(() => {})
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    validateForm() {
      if (!this.normalForm.stockInDetailList.length) {
        this.$message({ type: 'warning', message: '提交数据不能为空' })
        return
      }
      this.$refs['stockInDetailList'].validate(valid => {
        if (valid) {
          this.$confirm('是否确保存？', '提示', {
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
      const arr = JSON.parse(JSON.stringify(this.normalForm.stockInDetailList))
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
          this.updateKey['categoryId'] = val
        } else {
          this.levelFecond = ''
          this.searchBarOptons.levelTowOption = []
          this.updateKey = { }
        }
        if (val && old) {
          this.levelFecond = ''
        }
      }
    },
    levelFecond: {
      handler(val, old) {
        if (val) {
          this.updateKey['categoryId'] = val
        } else {
          this.updateKey['categoryId'] = this.levelFirst
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__wrapper {
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

 .flex-box{
   margin-top: 10px;
   >div{
     margin-left: 10px;
   }
 }
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
