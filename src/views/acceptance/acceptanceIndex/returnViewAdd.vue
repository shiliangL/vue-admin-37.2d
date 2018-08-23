<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal-append-to-body="false" :modal="false">
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
         	   <el-form :model="form" ref="form" label-width="130px" :inline="true">
            <!--基本信息-->
            <div class="row-item">
                <div class="row-title">基本信息</div>
                <div class="row-content view-header">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="销售退货单号:">
                        <span v-cloak>{{form.orderCode}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="关联销售订单编号:">
                       <span v-cloak>{{form.orderCode}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="申请退货时间:">
                       <span v-cloak>{{form.createTime}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="退货审核同意时间:">
                        <span v-cloak>{{form.examTime}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="配送员:">
                        <span v-cloak>{{form.driverName}}</span>
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
                  <!-- <el-input size="small" style="width:190px" class="w180"  placeholder="请输入商品名称检索" v-model.trim="searchKey"></el-input>
                  <el-button type="primary" size="small" @click.stop="clickToSearch" > 搜索 </el-button>
                  <el-button style="margin-left:0px" size="small" @click.stop="resetSearch" > 重置 </el-button> -->
                </div>
                <!-- 表格 -->
                  <el-table :data="form.table" size="small" class="table" max-height="450" style="width: 100%;" highlight-current-row>
                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
                    </el-table-column>
                    <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="baseUnitName" label="基本单位" align="center"></el-table-column>
                    <el-table-column prop="stockName" label="仓库" align="center"></el-table-column>
                    <el-table-column prop="orderQuantity" label="下单数量" align="center"></el-table-column>
                    <el-table-column prop="returnGoodsQuantity" label="申请退货数量" align="center"></el-table-column>
                    <el-table-column prop="acceptQuantity" label="收货称重量" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.whetherCreateStockOrder===0" v-cloak>{{scope.row.acceptQuantity}}</span>
                        <el-form-item v-else label="" label-width="0px" :prop="'table.'+scope.$index+'.acceptQuantity'"  :rules="[{ required: true, validator: rules.validNumber2, trigger: 'change' }]">
                          <el-input size="small" v-model.trim="scope.row.acceptQuantity"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="checkQuantity" label="验收接收量" align="center">
                       <template slot-scope="scope">
                        <span v-if="scope.row.whetherCreateStockOrder===0" v-cloak>{{scope.row.checkQuantity}}</span>
                        <el-form-item v-else label="" label-width="0px" :prop="'table.'+scope.$index+'.checkQuantity'"  :rules="[{ required: true, validator: rules.validNumber2, trigger: 'change' }]">
                          <el-input size="small" v-model.trim="scope.row.checkQuantity"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="checkBy" label="验收人" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.barCode" v-cloak>{{scope.row.checkBy}}</span>
                          <span v-else v-cloak> / </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="barCode" label="商品批次条码" align="center">
                       <template slot-scope="scope">
                        <span v-if="scope.row.barCode" v-cloak>{{scope.row.barCode}}</span>
                        <span v-else v-cloak> / </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="sum" label="操作" align="center">
                      <template slot-scope="scope">
                         <el-button type="text" size="mini" v-if="scope.row.putFlag===0" @click.stop="clickToUpdate(scope.$index,scope.row)">打印标签</el-button>
                         <el-button type="text" size="mini" v-else disabled>打印标签</el-button>
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
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { returnChangeDetail, updateReturnChange } from '@/api/acceptance/index.js'
export default {
  mixins: [addModel],
  components: {},
  data() {
    return {
      currentTitle: null,
      searchKey: null,
      form: {
        id: null,
        code: null,
        orderCode: null,
        createTime: null,
        examTime: null,
        driverName: null,
        customerId: null,
        customerName: null,
        productName: null,
        productId: null,
        baseUnitName: null,
        stockName: null,
        orderQuantity: null,
        returnGoodsQuantity: null,
        acceptQuantity: null,
        acceptBy: null,
        checkQuantity: null,
        checkBy: null,
        barCode: null,
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
    },
    onRefresh() {
      if (this.data.type === 'view') {
        this.fecthDetail()
      }
    },
    fecthDetail() {
      if (!this.data.obj.id) return
      returnChangeDetail({ id: this.data.obj.id, method: 1 }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
        this.form.table = [{ ...this.form }]
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickToUpdate(index, item) {
      let isTrue = true
      this.$refs['form'].validateField(`table.${index}.acceptQuantity`, m => { if (m) isTrue = false })
      this.$refs['form'].validateField(`table.${index}.checkQuantity`, m => { if (m) isTrue = false })
      if (isTrue) {
        this.$confirm('请核实输入数量,打印标签仅限操作一次，是否确定？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = JSON.parse(JSON.stringify(item))
          delete data.table
          updateReturnChange(data).then(res => {
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
    },
    clickToSearch() {
      if (!this.data.obj.id) return
      returnChangeDetail({ id: this.data.obj.id, method: 1 }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
        this.form.table = [{ ...this.form }]
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    resetSearch() {
      if (!this.data.obj.id) return
      returnChangeDetail({ id: this.data.obj.id, method: 1 }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
        this.form.table = [{ ...this.form }]
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
    min-height: 650px;
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
</style>
