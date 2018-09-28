<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal-append-to-body="false" :modal="false">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
              <el-button type="text" size="mini" v-if="!form.barCode" @click.stop="clickToUpdate">生成标签</el-button>
              <el-button type="text" size="mini" v-else @click.stop="clickToPrint">打印标签</el-button>
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
                      <el-form-item label="出库单创建时间:">
                        <span v-cloak>{{form.orderRequestNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="出库类型:">
                        <span v-if="form.storehouseType===1"> 销售订单 </span>
                        <span v-if="form.storehouseType===2"> 销售换货 </span>
                        <span v-if="form.storehouseType===3"> 其他 </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="仓库:">
                       <span v-cloak>{{form.stockName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="销售订单编号:">
                       <span v-cloak>{{form.orderNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="客户名称:">
                       <span v-cloak>{{form.customerName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="配送区域:">
                       <span v-cloak>{{form.distributionArea}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="打包台:">
                        <span v-if="form.tableName" v-cloak>{{form.tableName}}</span>
                        <span v-else v-cloak> / </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="打包员:">
                        <span v-if="form.packerName" v-cloak>{{form.packerName}}</span>
                        <span v-else v-cloak> / </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="订单打包条码:">
                        <span v-if="form.barCode" v-cloak>{{form.barCode}}</span>
                        <span v-else v-cloak> / </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="订单打包完成时间:">
                        <span v-if="form.completionTime" v-cloak>{{form.completionTime}}</span>
                        <span v-else v-cloak> / </span>
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
                  <el-table :data="form.table" size="small" max-height="450" style="width: 100%;" highlight-current-row>
                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
                    </el-table-column>
                    <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="specification" label="规格" align="center"></el-table-column>
                    <el-table-column prop="basicUnitName" label="基本单位" align="center"></el-table-column>
                    <el-table-column prop="orderQuantity" label="下单数量" align="center"></el-table-column>
                    <el-table-column prop="sortingQuantity" label="分拣数量" align="center"></el-table-column>
                    <el-table-column prop="barCode" label="商品分拣条码" align="center"></el-table-column>
                    <el-table-column prop="sortingTime" label="分拣时间" align="center"></el-table-column>
                    <el-table-column prop="scavengingTime" label="投框扫码时间" align="center"></el-table-column>
                    <el-table-column prop="operator" label="投框操作人" align="center"></el-table-column>
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
      <PrintLabel :isSorting="false" v-if="dialogVisible" @close="closeAdd" :propsSonData="propsParentData"></PrintLabel>
    </el-dialog>

  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { fecthHeaderDetail, fecthBodyDetail, outUpdateQuantity, packageScavenging } from '@/api/packaging/index.js'
const loginKey = JSON.parse(sessionStorage.getItem('loginKey'))

export default {
  mixins: [addModel],
  components: {
  },
  data() {
    return {
      code: '',
      lastTime: null,
      nextTime: null,
      lastCode: null,
      nextCode: null,

      currentTitle: null,
      searchKey: null,
      form: {
        'id': null,
        'createdTime': null,
        'storehouseType': null,
        'orderNo': null,
        'customerName': null,
        'distributionArea': null,
        'stockName': null,
        'tableName': null,
        'packerName': null,
        'barCode': null,
        'completionTime': null,
        table: []
      }
    }
  },
  created() {
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    window.addEventListener('keydown', this.onkeydown)
    this.currentTitle = this.data.title || ''
    if (this.data.type === 'view') {
      this.fecthDetail()
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onkeydown)
  },
  methods: {
    onkeydown(e) {
      if (!e.which) {
        this.$message({ type: 'error', message: '浏览器不支持该扫描枪，请使用谷歌浏览器,QQ浏览器' })
        return
      }
      this.nextCode = e.which
      this.nextTime = new Date().getTime()
      if (this.lastCode != null && this.lastTime != null && this.nextTime - this.lastTime <= 40) {
        this.code += String.fromCharCode(this.lastCode)
      } else if (this.lastCode != null && this.lastTime != null && this.nextTime - this.lastTime > 100) {
        this.code = ''
      }
      this.lastCode = this.nextCode
      this.lastTime = this.nextTime
      if (e.which === 13) {
        const scanningArr = []
        for (const item of this.form.table) {
          scanningArr.push(item.barCode)
          if (item.barCode === this.code && !item.scavengingTime) {
            this.packageScavenging(item.barCode)
          }
        }
        if (!scanningArr.includes(this.code)) {
          this.$message({ type: 'warning', message: '该订单无此扫描单号请核实' })
        }
        this.code = ''
      }
    },
    packageScavenging(barCode) {
      packageScavenging({ barCode }).then(({ data }) => {
        this.$message({ type: 'success', message: '扫描成功' })
        this.clickToSearch()
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
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
      fecthHeaderDetail({ id: this.data.obj.id }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      fecthBodyDetail({ packageId: this.data.obj.id }).then(({ data }) => {
        this.form.table = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickToSearch() {
      if (!this.data.obj.id) return

      fecthHeaderDetail({ id: this.data.obj.id }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })

      fecthBodyDetail({ packageId: this.data.obj.id, inputContent: this.searchKey }).then(({ data }) => {
        this.form.table = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    resetSearch() {
      this.searchKey = null
      this.clickToSearch()
    },
    clickToUpdate() {
      if (!loginKey) {
        this.$message({ type: 'error', message: '工作台参数错误,请重刷新页面或者新登录' })
        return
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$confirm('是否确定生成标签?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const data = {
              'packageInfoId': this.data.obj.id,
              'tableId': loginKey.id
            }
            outUpdateQuantity(data).then(res => {
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
    closeAdd() {
      this.dialogVisible = false
      this.propsParentData = null
    },
    clickToPrint() {
      this.dialogVisible = true
      this.propsParentData = this.form
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
