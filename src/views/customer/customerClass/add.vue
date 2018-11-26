<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog"  :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> {{currentTitle}} </div>
           <div class="right">
             <template v-if="this.data.type === 'add'">
                <el-button type="text" size="mini" :loading="saveLoading" @click.stop="validateForm">新增</el-button>
             </template>
              <template v-if="this.data.type === 'view' && this.data.obj.status ===1">
                <el-button v-if="!isAudit" type="text" size="mini" @click.stop="clickToAudit">审核</el-button>
                <template v-if="isAudit">
                  <el-button type="text" size="mini" @click.stop="validateNoPassForm">拒绝-未对接APP数据参数</el-button>
                  <el-button type="text" size="mini" @click.stop="validatePassForm">同意-未对接APP数据参数</el-button>
                </template>
             </template>

              <template v-if="this.data.type === 'view' && this.data.obj.status ===3">
                <el-button v-if="!isEditor" type="text" size="mini" @click.stop="clickToEditor">编辑</el-button>
                <template v-if="isEditor">
                  <el-button type="text" size="mini" @click.stop="validateEditorForm">保存</el-button>
                </template>
              </template>

              <el-button type="text" size="mini" @click.stop="dialog.visiable = false">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
		      <Tabs :data="tabTitles" @callBack="tabsCallBack" isBackIndex></Tabs>

           <div v-show="curIndex===0">
             <basicFrom ref="basicFrom" :isPass.sync="isPassBasic" :isAddView="isAddView" :data="basicObj" @callBack="basicFromCallBack"></basicFrom>
           </div>

          <div v-show="curIndex===1">
            <moneyPlan ref="moneyPlan" :isPass.sync="isPassMoneyPlan" :isAddView="isAddView" :data="moneyObj" @callBack="moneyPlanCallBack"></moneyPlan>
          </div>

           <div v-show="curIndex===2">
             <addressForm ref="addressForm" :isPass.sync="isPassAddress" :isAddView="isAddView" :data="addressArrt" @callBack="addressCallBack"></addressForm>
           </div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import { Tabs } from '@/components/base.js'
import { create, update, fecthDetail } from '@/api/customer/customerClass.js'
import basicFrom from './basicFrom'
import moneyPlan from './moneyPlan'
import addressForm from './addressForm'

export default {
  mixins: [addModel],
  components: {
    Tabs,
    moneyPlan,
    basicFrom,
    addressForm
  },
  data() {
    return {
      basicObj: null,
      moneyObj: null,
      addressArrt: null,

      isAddView: false,
      isEditor: false,
      isAudit: false,
      isUpdate: false,
      isUpdateIndex: null,
      curIndex: 0,
      isPassBasic: false, // 验证是否通过
      isPassMoneyPlan: false, // 验证是否通过
      isPassAddress: false // 验证是否通过
    }
  },
  created() {
    this.tabTitles = [
      { title: '基本信息', value: 0 },
      { title: '账户资金与账期', value: 1 },
      { title: '收货信息', value: 2 }
    ]
    const title = this.data.type === 'view' ? '查看' : '跟踪'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    this.currentTitle = this.data.title || ''
    if (this.data.type === 'view') {
      this.fecthDetail()
      this.isAddView = false
    }
    if (this.data.type === 'add') {
      this.isAddView = true
    }
  },
  methods: {
    clickToAudit() {
      this.isAudit = true
      this.isEditor = false
      this.isAddView = true
    },
    clickToEditor() {
      this.isAudit = false
      this.isEditor = true
      this.isAddView = true
    },
    closeDialog() {
      this.$emit('input', false)
    },
    onRefresh() {
      if (this.data.type === 'view') this.fecthDetail()
    },
    validateForm() {
      // if (!this.saveLoading) {
      // this.saveLoading = true
      if (this.$refs['basicFrom']) { this.$refs['basicFrom'].validateForm() }
      if (this.$refs['addressForm']) { this.$refs['addressForm'].validateForm() }
      if (this.$refs['moneyPlan']) { this.$refs['moneyPlan'].validateForm() }

      const { isPassBasic, isPassMoneyPlan, isPassAddress, basicObj, moneyObj, addressArrt } = this
      if (!isPassBasic || !isPassMoneyPlan || !isPassAddress) return
      const params = {
        'shopAddress': null,
        'shopAddressEntity': { // 客户地址
          'addessIds': basicObj.shopAddressEntity.addessIds,
          'address': basicObj.shopAddressEntity.address,
          'contacts': basicObj.contacts,
          'mobile': basicObj.mobile,
          'phone': null,
          'status': 1,
          'type': 0
        },
        'dto': {
          'address': null,
          'businessLicensePicId': null,
          'contacts': basicObj.contacts,
          'detailsId': null,
          'licenseNumber': null,
          'mobile': null,
          'phone': null
        },
        'shortCode': null, // 简称字母
        'shortTitle': null, // 简称
        'status': 0, // 0 代表未激活 1 代表 待审核 2 代表审核未通过 3 代表审核通过 新增请忽视这个字段 做审核的时候用
        'summary': null, // 简要介绍
        'tags': null, // 标签
        'aliasTitle': null, // 别名
        'companyAddress': null, // 公司注册地址
        'companyName': null, // 公司注册名称
        'details': null, // 详细介绍
        'creditCode': null,
        'legalPerson': null, // 法人
        'paymentMethod': 0, // 付款方式
        // --------
        'title': basicObj.title, // 客户名称
        'staffId': basicObj.staffId, // 客户经理
        'driverId': null, // 配送员
        'driverName': null, // 配送员
        'regionId': basicObj.regionId, // 地区
        'regionName': 'string', // 地区
        'managerId': null, // 客户和客户经理对应的中间表主键 一般新增时候 不用管它 对应表
        'managerName': null,
        'managerPhone': 'string', // 客户经理的手机号码
        'mobile': basicObj.mobile,
        'categoryId': basicObj.categoryId, // 客户类别
        'categoryName': null,
        'orderResource': 3, // 客户来源 0 代表app 1 代表公众号 2 代表小程序 3 代表后台 ,
        'patUser': {
          'alipay': null,
          'mobile': null,
          'portraitId': null,
          'pwd': null,
          'qqNumber': null,
          'relationId': null,
          'status': basicObj.patUser.status,
          'userId': null,
          'wechat': null,
          'weibo': null
        },
        // 账户资金与账期
        'balance': 0,
        'credence': 0,
        'payGather': 0,
        'mustGather': 0,
        'companyBank': moneyObj.companyBank,
        'bankNo': moneyObj.bankNo,
        'scmCustomerPaymentPeriodInfoDto': {
          'amount': moneyObj.amount,
          'limitTime': moneyObj.limitTime,
          'limitType': moneyObj.limitType
        },
        // 地址
        'address': addressArrt
      }
      create(params).then(res => {
        if (res.code === '0') {
          this.$message({ type: 'success', message: res.msg })
          this.dialog.visiable = false
          this.$emit('add')
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthDetail() {
      if (!this.data.obj.id) return
      fecthDetail({ id: this.data.obj.id }).then(({ data }) => {
        this.addressArrt = data.address || []

        this.moneyObj = data.scmCustomerPaymentPeriodInfoDto
        this.moneyObj.balance = data.balance || 0
        this.moneyObj.credence = data.credence || 0
        this.moneyObj.mustGather = data.mustGather || 0
        this.moneyObj.payGather = data.payGather || 0
        this.moneyObj.companyBank = data.companyBank
        this.moneyObj.bankNo = data.bankNo

        const result = JSON.parse(JSON.stringify(data))
        delete result.address
        delete result.scmCustomerPaymentPeriodInfoDto
        delete result.balance
        delete result.credence
        delete result.mustGather
        delete result.payGather
        delete result.companyBank
        delete result.bankNo

        this.basicObj = result

        // {
        //   addressArrt: null,
        //   patUser: data.patUser,
        //   shopAddressEntity: {
        //     addessIds: null,
        //     address: null,
        //     contacts: null,
        //     mobile: null,
        //     phone: null,
        //     status: 0,
        //     type: 1
        //   },
        //   contacts: null,
        //   regionId: null,
        //   title: null,
        //   mobile: null,
        //   managerId: null,
        //   driverId: null,
        //   managerPhone: null,
        //   categoryId: null,
        //   orderResource: 3
        //   // status: 1
        // }
      }).catch(e => {
        this.$message({ type: 'error', message: '详情加载失败' })
      })
    },
    // 基本信息验证完成回调
    basicFromCallBack(item) {
      this.item = item ? this.basicObj = item : this.basicObj = null
    },
    // 账期验证完成回调
    moneyPlanCallBack(item) {
      this.moneyObj = item ? this.moneyObj = item : this.moneyObj = null
    },
    // 地址参数回调
    addressCallBack(item) {
      this.addressArrt = item ? this.addressArrt = item : this.addressArrt = null
    },
    tabsCallBack(index) {
      this.curIndex = index
    },
    validateNoPassForm() {
      if (this.$refs['basicFrom']) this.$refs['basicFrom'].validateForm()
      if (!this.isPass) return
      this.$confirm('确定要拒绝该客户提交的资料信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.basicObj) return
        this.basicObj.status = 2
        update(this.basicObj).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.dialog.visiable = false
          this.$emit('add')
        }).catch(() => {
          this.$message({ type: 'error', message: '操作失败' })
        })
      }).catch(() => {})
    },
    validatePassForm() {
      if (this.$refs['basicFrom']) this.$refs['basicFrom'].validateForm()
      if (!this.isPass) return
      this.$confirm('是否确定通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.basicObj) return
        this.basicObj.status = 3
        update(this.basicObj).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.dialog.visiable = false
          this.$emit('add')
        }).catch(() => {
          this.$message({ type: 'error', message: '操作失败' })
        })
      }).catch(() => {})
    },
    validateEditorForm() {
      if (this.$refs['basicFrom']) { this.$refs['basicFrom'].validateForm() }
      if (this.$refs['addressForm']) { this.$refs['addressForm'].validateForm() }
      if (this.$refs['moneyPlan']) { this.$refs['moneyPlan'].validateForm() }

      const { isPassBasic, isPassMoneyPlan, isPassAddress, basicObj, moneyObj, addressArrt } = this
      if (!isPassBasic || !isPassMoneyPlan || !isPassAddress) return

      const cpbasicObj = JSON.parse(JSON.stringify(basicObj))
      delete cpbasicObj.contacts

      cpbasicObj.balance = moneyObj.balance || 0
      cpbasicObj.credence = moneyObj.credence || 0
      cpbasicObj.mustGather = moneyObj.mustGather || 0
      cpbasicObj.payGather = moneyObj.payGather || 0
      cpbasicObj.companyBank = moneyObj.companyBank
      cpbasicObj.bankNo = moneyObj.bankNo

      const item = JSON.parse(JSON.stringify(moneyObj))
      delete item.balance
      delete item.credence
      delete item.mustGather
      delete item.payGather
      delete item.companyBank
      delete item.bankNo

      cpbasicObj.scmCustomerPaymentPeriodInfoDto = {
        ...item
      }
      cpbasicObj.address = addressArrt

      update(cpbasicObj).then(res => {
        this.$message({ type: 'success', message: `${res.msg}!` })
        this.dialog.visiable = false
        this.$emit('add')
      }).catch(() => {
        this.$message({ type: 'error', message: '操作失败' })
      })
    }
  }
}
</script>

<style scoped lang="scss">

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
