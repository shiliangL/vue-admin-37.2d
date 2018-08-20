<template>
<!-- 全屏固定表头弹层组件 -->
<!-- :title="dialog.title" -->
  <div>
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog" :show-close="false" :fullscreen="true" :modal-append-to-body="false" :modal="false">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> 订单详情 </div>
           <div class="right">
              <el-button v-if="isAllowToShow" type="text" size="mini" @click="clickToEdit">编辑</el-button>
              <template v-if="isEditStatus">
                <el-button type="text" size="mini" @click="validateForm">保存</el-button>
                <el-button type="text" size="mini" @click="disMiss">取消</el-button>
              </template>
              <el-button v-if="data.type==='add'" type="text" size="mini" @click="validateAddForm">保存</el-button>
              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">

          <template v-if="isShowView">
            <toView :isAllowToShow.sync="isAllowToShow" :loadID="loadID"></toView>
          </template>

          <template v-if="isShowEditor">
            <toEditor ref="toEditor"  @callBack="callBackToSubmit" :loadID="loadID"></toEditor>
          </template>

          <template v-if="data.type==='add'">
            <el-form :model="Addform" :rules="rules" ref="Addform" label-width="120px" :inline="true">
              <!--基本信息-->
              <div class="row-item">
                  <div class="row-title">基本信息</div>
                  <div class="row-content basicInfo">
                    <el-row>
                      <el-col :xs="24" :sm="10" :md="8" :lg="6">
                        <el-form-item label="客户名称:" prop="customerName" :rules="rules.select">
                          <SearchBox style="width:180px" keyName="loginNameOrCustomerName" codeLabel="账号" isCustomer requestUrl="customer/list" v-model="customerDTO"></SearchBox>
				                  <el-input size="small" style="width:180px;display: none;" v-model.trim="Addform.customerName" placeholder="不能超过8位数" maxlength="8"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="10" :md="8" :lg="6">
                        <el-form-item label="客户账户:">
				                  <el-input size="small" style="width:180px"  v-model.trim="Addform.mobile" readonly placeholder="选择客户关联"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="10" :md="8" :lg="6">
                        <el-form-item label="支付类型:">
                          <el-select size="small" v-model="Addform.paymentType" filterable placeholder="支付方式">
                            <el-option v-for="sub in payOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :xs="24" :sm="10" :md="8" :lg="6">
                        <el-form-item label="要求送达日期:" prop="shopTime.sendDate" :rules="rules.select">
                          	<el-date-picker :style="{width:'180px'}" size="small" 
                              v-model="Addform.shopTime.sendDate" 
                              value-format="yyyy-MM-dd" type="date" 
                              placeholder="要求送达日期"></el-date-picker>
                        </el-form-item>
                              <!-- :picker-options="pickerOptions" -->
                      </el-col>
                      <el-col :xs="24" :sm="10" :md="8" :lg="6">
                          <div style="width:410px">
                            <el-form-item label="要求送达时间:" prop="shopTime.beginTime" :rules="rules.select">
                              <el-time-select size="small" style="width:100px" v-model="Addform.shopTime.beginTime" :picker-options="{ start: '00:00', step: '00:30', end: '24:00',maxTime: Addform.shopTime.endTime }"> </el-time-select>
                            </el-form-item>

                            <el-form-item label="" prop="shopTime.endTime" :rules="rules.select" label-width="0">
                              <el-time-select size="small" style="width:100px" v-model="Addform.shopTime.endTime" :picker-options="{ start: '00:00', step: '00:30', end: '24:00', minTime: Addform.shopTime.beginTime}"> </el-time-select>
                            </el-form-item>
                          </div>
                        </el-col>

      
                    </el-row>
                  </div>
              </div>

              <!--收货信息-->
              <div class="row-item">
                <div class="row-title"> 收货信息 </div>
                <div class="row-content info">
                  <el-table :data="defaultAddress" class="saleDtails" size="small" style="width: 100%;" highlight-current-row>
                    <el-table-column prop="contacts" label="收货人" align="center"></el-table-column>
                    <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="address" label="收货地址" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button type="text" size="mini" @click.stop="clickToChange(scope.$index, scope.row)">更改</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
  

              <!--商品信息-->
              <div class="row-item">
                <div class="row-title">商品信息</div>
                <div class="row-content">
                  <div class="add-bar">
                     <el-form-item label="商品:" label-width="50px">
                        <SearchBox style="width:180px" keyName="title" isGoods nameLabel="商品" codeLabel="类别" tableCode="categoryName" requestUrl="productInfo/listProductInfo" v-model="addGood.goodsDTO"></SearchBox>
                     </el-form-item>
                      <el-form-item label="规格:" label-width="50px">
                        <el-select size="small" v-model="addGood.sku" filterable placeholder="选择规格">
                          <el-option v-for="sub in skuOption" :key="sub.id" :label="sub.skuTitle" :value="sub.id"></el-option>
                        </el-select>
                     </el-form-item>
                     <el-form-item label="数量:" label-width="50px">
				                <el-input size="small" style="width:180px"  v-model.trim="addGood.number"></el-input>
                     </el-form-item>
                    <el-button  type="primary" size="small" @click.stop="clickToAdd" > 添加 </el-button>
                  </div>

                  <el-table :data="Addform.saleDtails" class="saleDtails" size="small" :max-height="500" style="width: 100%;" highlight-current-row>
                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
                    </el-table-column>
                    <el-table-column prop="goodsImage" label="商品图片" align="center">
                      <template slot-scope="scope">
                        <div class="picBox"> <img :src="`${scope.row.goodsImage}`"> </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="productName" label="名称" align="center"></el-table-column>
                    <el-table-column prop="skuName" label="规格" align="center"></el-table-column>
                    <el-table-column prop="skuPrice" label="价格" align="center"></el-table-column>
                    <el-table-column prop="orderQuantity" label="下单数量" align="center">
                      <template slot-scope="scope">
                        <el-form-item label="" label-width="0px"  :prop="'saleDtails.'+scope.$index+'.orderQuantity'" :rules="[{trigger: 'change', validator: rules.validNumberR2}]">
                          <el-input size="small" class="w110" @change="changeNumber(scope.row)" placeholder="请输入" v-model.trim="scope.row.orderQuantity"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalPrice" label="下单金额" align="center"></el-table-column>
                    <el-table-column prop="exchanage" label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                      
                  </el-table>
      
                </div>
              </div>
              
              <!-- 订单备注 -->
              <div class="row-item">
                <div class="row-title">订单备注:</div>
                    <div class="row-content">
                      <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="请输入内容" v-model.trim="Addform.remark" />
                    </div>
              </div>

            </el-form>

          </template>
          <!-- <template v-if="this.data.type === 'follow'">
            <toFollow></toFollow>
          </template> -->

          <!-- 弹层区域 -->
          <el-dialog title="选择地址" class="dialogTitle" width="720px" :visible.sync="dialogVisible" append-to-body center @close="dialogArry=[]">
            <div v-if="dialogVisible">
              <el-table :data="dialogArry" max-height="250" class="saleDtails" size="small" style="width: 100%;"  @row-click="clickTableRow"  highlight-current-row>
                  <el-table-column align="center" label="默认地址">
                    <template slot-scope="scope" align="center">
                      <label class="el-checkbox is-checked" v-if="scope.row.status===1">
                        <span class="el-checkbox__input is-checked">
                          <span class="el-checkbox__inner"></span>
                        </span>
                      </label>
                    </template>
                  </el-table-column>
                  <el-table-column prop="contacts" label="收货人" align="center"></el-table-column>
                  <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
                  <el-table-column prop="address" label="收货地址" align="center" width="260"></el-table-column>
                </el-table>
              <div class="footer-block">
                <el-button size="small" @click.stop="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click.stop="clickToConfirm"> 确定 </el-button>
              </div>
            </div>
          </el-dialog>
          
        </div>
      </div>
 
    </el-dialog>
  </div>
</template>

<script>
import rules from '@/public/rules.js'
import addModel from '@/public/addModel.js'
import toView from './toView'
import toEditor from './toEditor'
import { orderDetailUpdate, fetchSkuList, orderAdd } from '@/api/orders.js'
import { fetchCustomersAddress } from '@/api/customer/customerClass.js'
import { SearchBox } from '@/components/base.js'

export default {
  mixins: [addModel, rules],
  components: {
    toView,
    SearchBox,
    toEditor
  },
  data() {
    return {
      temAddress: [],
      dialogArry: [],
      customerDTO: null,
      dialogVisible: false,
      Addform: {
        'address': null,
        'contacts': null,
        'customerId': null,
        'customerName': null,
        'mobile': null,
        'offerAmount': 0,
        'orderSource': 3,
        'orderSum': 0,
        'paymentType': 0,
        'phone': null,
        'remark': null,
        'saleDtails': [],
        'shopTime': {
          'beginTime': null,
          'endTime': null,
          'remark': null,
          'sendDate': null,
          'status': 0,
          'title': null
        }
      },
      payOption: [
        { label: '货到付款', value: 0 }
        // { label: '在线支付', value: 1}
      ],
      skuOption: [],
      addGood: {
        goodsDTO: null,
        sku: null,
        number: null
      },
      rules: {
        validNumberR2: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        }
      },
      pickerOptions: {
        disabledDate(time) {
          const data = new Date()
          return time.getTime() < (data.getTime() + 3600 * 1000 * 24) - 8.64e7
        }
      },
      loadID: null,
      isShowView: false,
      isShowEditor: false,
      isEditStatus: false,
      isAllowToShow: false // 是否显示编辑
    }
  },
  created() {
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    if (this.data.type === 'view') {
      if (!this.data.obj.id) return
      this.isShowView = true
      this.isShowEditor = false
      this.loadID = this.data.obj.id
    }
  },
  computed: {
    defaultAddress() {
      return this.temAddress.filter(item => {
        return item.status === 1
      })
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    clickToEdit() {
      this.isEditStatus = true
      this.isShowView = false
      this.isShowEditor = true
      this.isAllowToShow = false
    },
    disMiss() {
      this.isEditStatus = false
      this.isShowView = true
      this.isShowEditor = false
    },
    validateForm() {
      if (this.$refs['toEditor']) {
        this.$refs['toEditor'].validateForm()
      }
    },
    fetchCustomersAddress(id) {
      if (!id) return
      fetchCustomersAddress({ customerId: id }).then(({ data }) => {
        if (Array.isArray(data.rows)) {
          this.temAddress = data.rows
        }
      }).catch(e => {
        this.$message({ type: 'error', message: '获取客户地址失败' })
      })
    },
    fetchSkuList(id) {
      if (!id) return
      fetchSkuList({ id: id }).then(({ data }) => {
        if (Array.isArray(data)) {
          this.skuOption = data
        }
      }).catch(e => {
        this.$message({ type: 'error', message: '获取商品规格失败' })
      })
    },
    clickToDelete(index, item) {
      if (this.Addform.saleDtails.length > 1) {
        this.Addform.saleDtails.splice(index, 1)
      }
    },
    clickToChange() {
      this.dialogVisible = true
      this.dialogArry = JSON.parse(JSON.stringify(this.temAddress))
    },
    clickTableRow(item) {
      for (const key of this.dialogArry) {
        key.status = 0
      }
      item.status = 1
    },
    clickToConfirm() {
      this.dialogVisible = false
      this.temAddress = JSON.parse(JSON.stringify(this.dialogArry))
      this.dialogArry = []
    },
    validateAddForm() {
      this.$refs['Addform'].validate((valid) => {
        if (valid) {
          if (this.defaultAddress.length === 0) {
            this.$message({ type: 'warning', message: '订单默认地址不能为空' })
            return
          }
          if (this.Addform.saleDtails.length === 0) {
            this.$message({ type: 'warning', message: '商品信息不能为空' })
            return
          }
          const data = JSON.parse(JSON.stringify(this.Addform))
          data.address = this.defaultAddress[0].address
          data.contacts = this.defaultAddress[0].contacts
          data.mobile = this.defaultAddress[0].mobile
          for (const item of data.saleDtails) {
            data.orderSum += (item.totalPrice) * 1
            delete item.goodsImage
            delete item.totalPrice
          }
          orderAdd(data).then(res => {
            if (res.code === '0') {
              this.$message({ type: 'success', message: res.msg })
              this.dialog.visiable = false
              this.$emit('add')
            }
          }).catch(e => {
            this.$message({ type: 'error', message: '新增失败' })
          })
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    callBackToSubmit(data) {
      if (data) {
        const upDate = {
          'address': data.scmOrder.address,
          'contacts': data.scmOrder.contacts,
          'customerId': data.scmOrder.customerId,
          'customerName': data.scmOrder.customerName,
          'id': data.scmOrder.pk,
          'mobile': data.scmOrder.mobile,
          'offerAmount': data.scmOrder.offerAmount,
          'orderNo': data.scmOrder.orderNo,
          'orderSource': data.scmOrder.orderSource,
          'orderSum': data.scmOrder.orderSum,
          'paymentType': data.scmOrder.paymentType,
          'phone': data.scmOrder.phone,
          'remark': data.scmOrder.remark,
          'sendTime': {
            'beginTime': data.sendTime.beginTime,
            'endTime': data.sendTime.endTime,
            'id': data.sendTime.pk,
            'remark': data.sendTime.remark,
            'status': data.sendTime.status,
            'title': data.sendTime.title
          },
          'status': data.scmOrder.title
        }

        const arr = []
        for (const item of data.saleDtails) {
          arr.push({
            'giftFlag': item.giftFlag,
            'id': item.id,
            'orderId': item.orderId,
            'orderQuantity': item.orderQuantity,
            'productId': item.productId,
            'productName': item.productName,
            'productPrice': item.productPrice,
            'remark': item.remark,
            'skuId': item.skuId,
            'skuName': item.skuId,
            'sum': item.sum
          })
        }
        upDate.saleDtails = arr
        orderDetailUpdate(upDate).then(res => {
          if (res.code === '0') {
            this.$message({ type: 'success', message: res.msg })
            this.dialog.visiable = false
            this.$emit('add')
          }
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      }
    },
    success() {
      this.$message({ type: 'success', message: this.dialog.title + '成功' })
      this.closeDialog()
      if (this.data.type === 'add') {
        this.$emit('add')
      } else {
        this.$emit('edit')
      }
    },
    error(data) {
      this.$message({ type: 'error', message: data.message })
      this.$setKeyValue(this.button, { loading: false, text: '确定' })
    },
    clickToAdd() {
      if (!this.addGood.goodsDTO || !this.addGood.number || !this.addGood.sku) {
        this.$message({ type: 'warning', message: '条件不足,请完善' })
        return
      }
      const reg = /^[1-9]\d*$/
      if (!reg.test(this.addGood.number)) {
        this.$message({ type: 'warning', message: '数量为不为0的正整数' })
        return
      }
      const productIds = this.Addform.saleDtails.map(item => {
        return item.productId
      })
      const skuNames = this.Addform.saleDtails.map(item => {
        return item.skuId
      })
      if (productIds.indexOf(this.addGood.goodsDTO.id) !== -1 && skuNames.indexOf(this.addGood.sku) !== -1) {
        this.$message({ type: 'warning', message: '请勿重复添加' })
        return
      } else {
        const skuObj = this.skuOption.filter(item => {
          return item.id === this.addGood.sku
        })
        if (skuObj.length === 0) return
        this.Addform.saleDtails.push(
          {
            'orderQuantity': this.addGood.number,
            'productId': this.addGood.goodsDTO.id,
            'goodsImage': this.addGood.goodsDTO.goodsImage,
            'productName': this.addGood.goodsDTO.title,
            'totalPrice': (skuObj[0].price * 1) * (this.addGood.number * 1),
            'skuId': skuObj[0].id,
            'skuName': skuObj[0].skuTitle,
            'skuPrice': skuObj[0].price
          }
        )
      }
      this.$setKeyValue(this.addGood, { goodsDTO: null, sku: null, number: null })
    },
    changeNumber(item) {
      if (!isNaN(item.orderQuantity)) {
        item.totalPrice = item.orderQuantity * item.skuPrice
      } else {
        item.totalPrice = 0
      }
    }
  },
  watch: {
    customerDTO: {
      handler(val) {
        if (val) {
          this.Addform.customerId = val.id
          this.Addform.customerName = val.title
          this.Addform.mobile = val.loginName
          setTimeout(() => {
            this.fetchCustomersAddress(val.id)
          }, 400)
        } else {
          this.Addform.customerId = null
          this.Addform.customerName = null
          this.Addform.mobile = null
          this.temAddress = []
        }
      }
    },
    'addGood.goodsDTO': {
      handler(n, o) {
        if (n && o && n.id !== o.id) {
          this.addGood.sku = null
          this.skuOption = []
        }
        if (n) {
          setTimeout(() => {
            this.fetchSkuList(n.id)
          }, 400)
        } else {
          this.addGood.sku = null
          this.skuOption = []
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__wrapper{
  transform: translateZ(0);
  min-height: 100%;
  min-height: 700px;
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
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.23);
  }
}
.Loading{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
  }
  .basicInfo{
    .el-form-item{
      margin-bottom: 12px;
    }
  }
  .saleDtails{
    .el-form-item{
      margin-bottom: 0px;
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
</style>
