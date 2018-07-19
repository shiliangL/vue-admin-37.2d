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
                  <el-cascader style="320px" v-model="stockDto" size="small"  placeholder="请选择仓库"  filterable :options="options.stock" @active-item-change="handleItemChange" :props="propType" @change="stockChange"></el-cascader>
                  <el-select v-model="storageType" placeholder="请选择类型" size="small" style="width:120px" filterable  @change="stockChange">
                    <el-option v-for="item in options.storageType" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
                  </el-select>
                  <el-button  type="primary" size="small" @click.stop="fecthList" > 搜索 </el-button>
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
                          <el-checkbox v-model="item.isCheck" :label="item.number"></el-checkbox>
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

            </template>
        </div>
      </div>

      <!-- <Loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText" class="Loading"></Loading> -->

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { findMore, createRk } from '@/api/warehouse/goodsIn.js'
import { stockCategory, fecthStockByType, fecthAllCW } from '@/api/warehouse/setting.js'

export default {
  mixins: [addModel],
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
      rules: {},
      loadID: null,
      isShowView: false,
      isShowEditor: false,
      currentTitle: null,
      viewData: null,
      typeIseditor: false,
      options: {
        stock: [],
        storageType: [
          { label: '采购入库', value: 1 },
          { label: '销售退货', value: 2 },
          { label: '销售换货', value: 3 },
          { label: '其他', value: 4 }
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
    this.stockCategory()
    this.fecthAllCW()
    if (this.data.type === 'view') {
      const id = this.data.obj.pk
      if (id) this.loadID = id
    } else if (this.data.type === 'add') {
      console.log('x')
    }
  },
  methods: {
    // 加载仓库类别
    stockCategory() {
      stockCategory().then(({ data }) => {
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
      }).catch(e => {
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
          fecthStockByType({ categoryId: item.value }).then(({ data }) => {
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
          }).catch(e => {
            console.log(e)
          })
        }
      }, 400)
    },
    fecthList() {
      if (!this.stockDto[1]) return
      if (!this.storageType) {
        this.$message({ type: 'warning', message: '请选择入库类型' })
        return
      }
      if (this.storageType === 1) {
        // 选中采购入库
        findMore({ stockId: this.stockDto[1] }).then(({ data }) => {
          if (!this.cwOption) return
          for (const item of data) {
            if (this.cwOption[item.stockId]) {
              item.storageIdsOption = JSON.parse(JSON.stringify(this.cwOption[item.stockId]))
            } else {
              item.storageIdsOption = []
            }
          }
          this.form.stockInDetailList = data
        }).catch(e => {
          console.log(e)
        })
      }
    },
    fecthAllCW() {
      fecthAllCW().then(({ data }) => {
        this.cwOption = data
      }).catch(e => {
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
      this.$refs['stockInDetailList'].validate((valid) => {
        if (valid) {
          this.$confirm('是否确保保存', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.storageType === 1) {
              this.buyIn()
            }
          }).catch(() => {})
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    buyIn() {
      // 采购入库
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
      }
      const data = {
        storageType: 1,
        stockId: this.stockDto[1],
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
.stockInDetailList{
  .item-box{
    max-height: 80px;
    overflow-y: auto;
  }
  .el-form-item{
    margin-bottom: 0;
  }
}
</style>
