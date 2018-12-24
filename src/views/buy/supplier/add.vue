<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog"  :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
              <el-button type="text" v-if="data.type === 'view'" size="mini" @click.stop="onRefresh">刷新</el-button>
              <el-button type="text" v-if="data.type === 'editor'" :loading="saveLoading" size="mini" @click.stop="submitUpdateForm('form')">更新</el-button>
              <el-button type="text" v-if="data.type === 'add'" :loading="saveLoading" size="mini" @click.stop="submitForm('form')">保存</el-button>
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
          <el-form v-if="data.type !== 'check'" :model="form" ref="form" class="viewForm" label-width="130px" :inline="true">

            <div class="row-item">
              <div class="row-title">基本信息</div>
              <div class="row-content">
                <el-row>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="供应商账号:" prop="loginName" :rules="rules.input" v-if="data.type === 'add'">
                      <el-input v-if="isUpdate" size="small" maxlength="11" style="width:160px" :disabled="data.type === 'editor'" v-model.trim="form.loginName" placeholder="名称/手机"></el-input>
                      <span v-else v-cloak>{{form.loginName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="供应商名称:" prop="staffName" :rules="rules.input">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.staffName" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.staffName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="别名:">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.aliasTitle" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.aliasTitle}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="简称:">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.shortTitle" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.shortTitle}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="联系人:" prop="contacts" :rules="rules.input">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.contacts" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.contacts}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="手机号:" prop="mobile" :rules="[{trigger: 'change', required:true, validator: rules.validPhone}]">
                      <el-input v-if="isUpdate" size="small" style="width:160px" maxlength="11"  v-model.trim="form.mobile" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.mobile}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="座机:" prop="telphone" :rules="[{trigger: 'change', validator: rules.validTelphone}]">
                      <el-input v-if="isUpdate" size="small" style="width:160px" v-model.trim="form.telphone" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.telphone}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="地址:" prop="addressArrt" :rules="rules.input">
                      <AddressSelect width="130px" :ids="idsArr" v-if="isUpdate" @change="selectAddress"/>
                      <el-input v-if="isUpdate" size="small" style="width:160px;display:none"  v-model.trim="form.addressArrt" placeholder=""></el-input>

                      <!-- <el-input  v-if="isUpdate"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="不能超30位数" maxlength="30"
                        size="small" style="width:400px" v-model.trim="form.address"></el-input> -->

                      <span v-else v-cloak> {{form.provinceName}} {{form.cityName}}  {{form.areaName}} {{form.address}}</span>
                    </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="简要说明:">
                      <el-input size="small" v-if="isUpdate"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 3}"
                      v-model.trim="form.summary"
                      style="width:400px" placeholder="不能超30位数" maxlength="30"></el-input>
                      <span v-else v-cloak>{{form.summary}}</span>
                    </el-form-item>
                    </el-col>
                  </el-row>
              </div>
            </div>

            <!-- <div class="row-item">
              <div class="row-title">资金账户信息</div>
              <div class="row-content">
                <el-row>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="开户银行:" prop="companyBank" :rules="[{trigger: 'change', validator: rules.validNumberZh}]">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.companyBank" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.companyBank}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="银行卡号:" prop="bankNo" :rules="[{trigger: 'change', validator: rules.validNumberCar}]">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.bankNo" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.bankNo}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="应付金额:" label-width="130px">
                      <span>{{form.mustGather}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="应收金额:">
                      <span>{{form.payGather}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div> -->

            <div class="row-item">
              <div class="row-title">工商信息</div>
              <div class="row-content">
                <el-row>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="工商注册名:">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.companyName" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.companyName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="法人:">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.legalPerson" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.legalPerson}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="税号:" label-width="130px">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.creditCode" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.creditCode}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="注册地址:">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.companyAddress" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.companyAddress}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="营业执照号:">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.licenseNumber" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.licenseNumber}}</span>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="营业执照图:">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.businessLicensePicUrl" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.businessLicensePicUrl}}</span>
                    </el-form-item>
                  </el-col> -->
                </el-row>
              </div>
            </div>

            <div class="row-item">
              <div class="row-title">账号状态设置</div>
              <div class="row-content">
                <el-row>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="账号状态:">

                      <span v-if="!isUpdate">
                        <el-tag v-cloak size="mini" v-if="form.status ===1"> 启用 </el-tag>
                        <el-tag size="mini" type="danger" v-cloak v-if="form.status===2"> 禁用 </el-tag>
                      </span>

                      <el-radio v-else v-model="form.status" :label="item.label" v-for="item in statusOption" :key="item.label">
                        <span v-cloak> {{item.text}} </span>
                      </el-radio>

                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>

          </el-form>

          <div v-else>
            <div class="buyOrders">

              <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

              <div class="search-bar">
                <div class="left">
                  <el-date-picker :style="{width:'140px'}"
                    size="small"
                    v-model="searchBarData.createTime"
                    value-format="yyyy-MM-dd"
                    type="date" placeholder="订单创建时间">
                    </el-date-picker>
                </div>

                <div class="left">
                  <CascaderBox v-model="CascaderBoxDTO"></CascaderBox>
                </div>

                <div class="left">
                  <el-input style="width:180px" v-model="searchBarData.orderNo" size="small" @keyup.enter.native="fecthList" placeholder="采购订单编号"></el-input>
                </div>

                <div class="left">
                    <el-button  type="primary" size="small" @click.stop="fecthList" > 搜索 </el-button>
                </div>

                <div class="left">
                    <el-button size="small" @click.stop="reset" > 重置 </el-button>
                </div>

                <div class="right">
                  <div class="left">
                    <el-button v-if="supplierName" type="primary" size="small"> 供应商名称:  {{ supplierName }} </el-button>
                  </div>
                </div>
              </div>

              <!-- 表格 -->
              <table-contain  :height.sync="table.maxHeight">
                <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

                  <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.$index + 1}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column prop="orderNo" label="采购订单编号" align="center"></el-table-column>
                  <el-table-column prop="createdOn" label="采购订单创建时间" align="center"></el-table-column>
                  <el-table-column prop="personnelName" label="负责采购员" align="center"></el-table-column>
                  <el-table-column prop="auditStatus" label="采购订单状态" align="center">
                    <template slot-scope="scope" align="center">
                      <span v-cloak> {{scope.row.procurementStatus | filterStatus }} </span>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" align="center" width="180">
                    <template slot-scope="scope" align="center">
                      <el-button type="text" size="mini" @click.stop="click2view(scope.$index,scope.row)">查看</el-button>
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

              <!-- 弹层 -->
              <el-dialog title="供应商相关采购订单详情"
                :visible.sync="dialogVisible"
                append-to-body center
                :fullscreen="true"
                :modal-append-to-body="false"
                :close-on-press-escape="true">
                <AddDetail v-if="dialogVisible" :propsSonData="propsParentData"> </AddDetail>
              </el-dialog>

            </div>
          </div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import model from '@/public/listModel.js'
import rules from '@/public/rules.js'
import { fecthDetail, createRow, updateRow, fetchPurchaseOrderInfo } from '@/api/buy/supplier.js'
import { AddressSelect, Tabs, CascaderBox } from '@/components/base.js'
import AddDetail from './AddDetail'

export default {
  mixins: [addModel, rules, model],
  components: { AddressSelect, Tabs, CascaderBox, AddDetail },
  data() {
    return {
      form: {
        'address': null,
        'addressArrt': null, // 验证
        'aliasTitle': null,
        'areaId': null,
        'bankNo': null,
        'businessLicensePicUrl': null,
        'cityId': null,
        'companyAddress': null,
        'companyBank': null,
        'companyName': null,
        'contacts': null,
        'creditCode': null,
        'legalPerson': null,
        'licenseNumber': null,
        'loginName': null,
        'mobile': null,
        'provinceId': null,
        'shortTitle': null,
        'staffName': null,
        'status': 1,
        'summary': null,
        'telphone': null,
        'payGather': 0,
        'mustGather': 0
      },
      supplierName: null,
      idsArr: [],
      curIndex: 0,
      CascaderBoxDTO: null,
      TipsBarData: [],
      searchBarData: {
        createTime: null,
        orderNo: null,
        purchaseType: null,
        personnelId: null
      }
    }
  },
  created() {
    this.$setKeyValue(this.dialog, { visiable: true })
    this.statusOption = [
      { label: 1, text: '启用' },
      { label: 2, text: '禁用' }
    ]
    if (this.data.type === 'check') {
      this.tabTitles = [
        { title: '全部', value: null },
        { title: '待采购', value: 1 },
        { title: '采购中', value: 2 },
        { title: '已采购', value: 3 }
      // { title: '已收货', value: 4 }
      ]
    }
  },
  mounted() {
    this.currentTitle = this.data.title || ''
    this.supplierName = this.data.name || ''
    this.isUpdate = this.data.type === 'add' || this.data.type === 'editor'
    if (this.data.type === 'view' || this.data.type === 'editor') {
      this.fetchDetail()
    }
    if (this.data.type === 'check') {
      this.fecthList()
    }
  },
  filters: {
    filterStatus(status) {
      switch (status) {
        case 0:
          return '全部'
        case 1:
          return '待采购'
        case 2:
          return '采购中'
        case 3:
          return '已采购'
        // case 4:
        //   return '已入库'
        default:
          return ''
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    fetchDetail() {
      if (!this.data.obj.operatorId) return
      const data = {
        operatorId: this.data.obj.operatorId
      }
      fecthDetail(data).then(({ data }) => {
        this.form = Object.assign(this.form, data)
        this.form.addressArrt = '编辑'
        this.idsArr = [
          { id: this.form.provinceId, title: this.form.provinceName },
          { id: this.form.cityId, title: this.form.cityName },
          { id: this.form.areaId, title: this.form.areaName },
          this.form.address
        ]
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    onRefresh() {
      if (this.data.type === 'view') {
        this.fetchDetail()
      }
    },
    selectAddress(item) {
      if (item) {
        if (item.province && item.city && item.area && item.address) {
          this.form.addressArrt = `${item.province.title}/${item.city.title}/${item.area.title}`
          this.form.provinceId = item.province.id
          this.form.cityId = item.city.id
          this.form.areaId = item.area.id
          this.form.address = item.address
        }
      } else {
        this.form.addressArrt = null
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.saveLoading) return
          this.saveLoading = true
          const data = JSON.parse(JSON.stringify(this.form))
          delete data.addressArrt
          delete data.payGather
          delete data.mustGather
          createRow(data).then(res => {
            this.$emit('add')
            this.closeDialog()
            this.$message({ type: 'success', message: `${res.msg}!` })
          }).catch(e => {
            this.saveLoading = false
            this.$message({ type: 'error', message: e.msg })
          })
        } else {
          this.saveLoading = false
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    submitUpdateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.saveLoading) return
          this.saveLoading = true
          const data = JSON.parse(JSON.stringify(this.form))
          delete data.addressArrt
          delete data.payGather
          delete data.mustGather
          delete data.loginName
          delete data.provinceName
          delete data.cityName
          delete data.areaName

          updateRow(data).then(res => {
            this.$emit('add')
            this.closeDialog()
            this.$message({ type: 'success', message: `${res.msg}!` })
          }).catch(e => {
            this.saveLoading = false
            this.$message({ type: 'error', message: e.msg })
          })
        } else {
          this.saveLoading = false
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    // 查看供应商关联采购订单
    fecthList() {
      if (!this.data.obj.operatorId) return
      if (this.CascaderBoxDTO) {
        this.searchBarData.purchaseType = this.CascaderBoxDTO.purchaseType
        this.searchBarData.personnelId = this.CascaderBoxDTO.supplyOrBuyerId
      }
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        supplierInfoId: this.data.obj.operatorId,
        procurementStatus: this.curIndex,
        ...this.searchBarData
      }
      fetchPurchaseOrderInfo(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fecthList()
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fecthList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fecthList()
    },
    reset() {
      this.CascaderBoxDTO = null
      this.searchBarData = {
        createTime: null,
        orderNo: null,
        purchaseType: null,
        personnelId: null
      }
      this.fecthList()
    },
    click2view(index, item) {
      this.dialogVisible = true
      item.operatorId = this.data.obj.operatorId
      this.propsParentData = item
    }
  }
}
</script>

<style scoped lang="scss">
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

  .box-card{
    position: relative;
    .tips{
      position: absolute;
      left: 20px;
      top:10px;
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

  .el-form-item{
    margin-bottom: 18px;
  }

</style>

