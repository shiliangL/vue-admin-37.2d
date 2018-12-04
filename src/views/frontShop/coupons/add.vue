<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> 发放优惠券 </div>
           <div class="right">
              <el-button type="text" size="mini" :loading="saveLoading" @click.stop="submitForm('form')">提交</el-button>
              <el-button type="text" size="mini" @click.stop="close">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
            <template>
              <el-form :model="form" ref="form" style="margin-top: -20px;" :inline="true" label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="16">

                    <div class="carItems">
                      <!-- { label: '立减', value: 3 }, { label: '满减', value: 1 }, { label: '折扣', value: 2 } -->
                      <el-form-item label="优惠券类别:" prop="type" :rules="rules.input">
                        <el-select size="small" v-model="form.type" filterable placeholder="请选择" style="width:180px">
                          <el-option v-for="sub in options.type" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="carItems">


                      <!-- 立减 -->
                      <el-form-item label="优惠券面值:" prop="typeValue3" v-if="form.type===3" :rules="[{trigger: 'change',required: true, validator: rules.validNumberR2}]">
                          <el-input size="small" style="width:180px" placeholder="整数" v-model.trim="form.typeValue3"></el-input> 元
                      </el-form-item>

                      <!-- 满减 -->
                      <div v-if="form.type===1">

                        <span class="el-form-item is-required el-form-item--medium" style="margin-top: 0px;">
                          <label for="title" class="el-form-item__label" style="width: 120px;">优惠券面值:</label>
                        </span>

                        <el-form-item label="满" style="margin-left:-20px;" prop="typeValue11" label-width="35px"
                          :rules="[{trigger: 'change', validator: rules.validNumberReLimit,limitR: form.typeValue12,meg: '满减金额>优惠金额'}]">
                            <el-input size="small" style="width:110px" placeholder="正整数" v-model.trim="form.typeValue11"></el-input>
                        </el-form-item>

                        <el-form-item label="减" style="margin-left:-20px;" prop="typeValue12" label-width="35px"
                          :rules="[{trigger: 'change', validator: rules.validNumberReLimit,limitL:form.typeValue11,meg: '优惠金额<满减金额'}]">
                            <el-input size="small" style="width:110px" placeholder="正整数" v-model.trim="form.typeValue12"></el-input> 元
                        </el-form-item>

                        <el-tooltip placement="top" effect="light">
                          <span slot="content">满减金额必须大于优惠金额</span>
                          <i class="el-icon-warning tips"></i>
                        </el-tooltip>

                      </div>

                      <!-- 折扣 -->
                      <el-form-item label="优惠券面值:" prop="typeValue2" v-if="form.type===2" :rules="[{trigger: 'change', required: true, validator: rules.validNumberDiscount}]">
                          <el-input size="small" style="width:180px" placeholder="0.01~9.99" v-model.trim="form.typeValue2"></el-input> 折
                      </el-form-item>

                    </div>
                    <div class="carItems">

                      <el-form-item label="使用范围:" prop="rangeFlag" :rules="rules.input">
                        <el-select size="small" v-model="form.rangeFlag" filterable placeholder="请选择" style="width:180px" @change="rangeFlagChange">
                          <el-option v-for="sub in options.useType" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                        </el-select>
                      </el-form-item>

                      <!-- 单个商品 -->
                      <template v-if="form.rangeFlag===3">
                        <el-form-item label="选择商品:" label-width="90px"  prop="singleGood.id" :rules="rules.select">

                            <el-input size="small" style="width:160px;display:none" v-model.trim="form.singleGood.id"></el-input>

                            <SearchBox
                              style="width:180px"
                              keyName="title"
                              isGoods
                              nameLabel="商品"
                              codeLabel="类别"
                              tableCode="categoryName"
                              requestUrl="productInfo/listProductInfo"
                              v-model="goodsDTO">
                            </SearchBox>

                        </el-form-item>

                      </template>

                      <!-- 部份品类 -->
                      <template v-if="form.rangeFlag===2">

                        <el-form-item prop="leveFDTO" :rules="rules.select">
                          <el-select class="w160"
                            value-key="id"
                            @change="leveFDTOchange"
                            size="small"
                            v-model="form.leveFDTO"
                            filterable
                            placeholder="一级分类">
                              <el-option v-for="sub in options.categoryOption" :key="sub.id" :label="sub.title" :value="sub"> </el-option>
                          </el-select>
                        </el-form-item>

                        <el-form-item>
                          <el-select class="w160"
                            value-key="id"
                            size="small"
                            v-model="form.leveltDTO"
                            filterable placeholder="二级分类">
                              <el-option v-for="sub in options.levelTowOption" :key="sub.id" :label="sub.title" :value="sub"> </el-option>
                          </el-select>
                        </el-form-item>

                        <el-tooltip placement="top" effect="light">
                          <span slot="content">可以只选一级分类</span>
                          <i class="el-icon-warning tips"></i>
                        </el-tooltip>

                      </template>


                    </div>
                    <div class="carItems">

                      <el-form-item label="有效期限:" prop="timeType" :rules="rules.input">
                         <el-select size="small" v-model="form.timeType" filterable placeholder="请选择" style="width:180px">
                          <el-option v-for="sub in options.useTime" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                        </el-select>
                      </el-form-item>


                      <!-- 时间段 -->
                      <template v-if="form.timeType===1">
                        <el-form-item label="" label-width="35px" prop="datetimerange"  :rules="rules.select">
                          <el-date-picker
                            size="small"
                            style="width:370px"
                            v-model="form.datetimerange"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="-"
                            start-placeholder="下单开始时间"
                            end-placeholder="下单结束时间"
                            :default-time="['00:00:00', '23:59:59']">
                          </el-date-picker>
                        </el-form-item>
                      </template>

                      <!-- 具体时间 -->
                      <template v-if="form.timeType===2">
                        <el-form-item label="" label-width="35px" prop="fixationTime" :rules="[{trigger: 'change', validator: rules.validNumberZZS}]">
                          <el-input size="small" style="width:180px" placeholder="正数" maxlength="2" v-model.trim="form.fixationTime"></el-input>   天内(24小时制)
                        </el-form-item>
                      </template>


                    </div>
                    <div class="carItems">
                      <el-form-item label="发放数量:" prop="number" :rules="rules.input">
                        <el-input size="small" style="width:180px" class="w180" maxlength="4" placeholder="正整数" v-model.trim="form.number"></el-input>
                      </el-form-item>
                    </div>
                    <div class="carItems">
                      <el-form-item label="获取方式:" prop="payMentMethod" :rules="rules.input">
                        <!-- 领取方式 0 直接获赠 1 手动领取 2 手动兑换 3 分享赠送 4 订单支付后赠送 -->
                        <el-select size="small" v-model="form.payMentMethod" filterable placeholder="请选择" style="width:180px">
                          <el-option v-for="sub in options.getType" :disabled="sub.disabled" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                        </el-select>

                      </el-form-item>
                    </div>

                    <div class="carItems flex-box" v-if="form.payMentMethod===1">

                      <el-form-item label="领取次数:" prop="numberTime" :rules="rules.input">
                        <el-select size="small" v-model="form.numberTime" filterable placeholder="请选择" style="width:180px">
                          <el-option v-for="sub in options.TimeAndTime" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="" style="margin-left:10px" prop="numberTimeInput" :rules="rules.input" v-if="form.numberTime===1">
                        <el-input size="small" style="width:180px" class="w180"  placeholder="正整数" v-model.trim="form.numberTimeInput"></el-input> 次
                      </el-form-item>

                    </div>

                    <div class="row-item" v-if="form.payMentMethod===0">
                      <div class="row-title">发放对象(客户):</div>
                      <div class="row-content">

                        <el-form :model="customerForm" ref="customerForm" :inline="true" label-width="120px">
                          <div class="add-bar">

                              <el-form-item label=""  prop="customerId" :rules="rules.input">
                                <el-input size="small" style="width:160px;display:none"
                                  v-model.trim="customerForm.customerId" placeholder="">
                                </el-input>
                                <SearchBox style="width:180px"
                                  keyName="loginNameOrCustomerName"
                                  codeLabel="账号" isCustomer
                                  requestUrl="customer/list"
                                  v-model="customerDTO">
                                </SearchBox>
                              </el-form-item>

                              <el-form-item label=""  prop="number" :rules="[{trigger: 'change', validator: rules.validNumberZZS}]">
                                <el-input
                                  size="small"
                                  placeholder="获取数量(正整数)"
                                  style="width:120px"
                                  v-model.trim="customerForm.number"></el-input>
                              </el-form-item>

                              <el-button type="primary" size="small" @click.stop="addCustomerForm('customerForm')"> 添加 </el-button>
                              <el-button size="small" @click.stop="resetCustomerForm"> 清空选择 </el-button>

                            </div>

                            <div class="tableBox">
                              <el-table :data="customerForm.userCouponDto" size="mini" style="width: 100%;" highlight-current-row>
                                <el-table-column label="序号" width="50" align="center">
                                  <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
                                </el-table-column>
                                <el-table-column prop="loginName" label="客户账号" align="center"></el-table-column>
                                <el-table-column prop="title" label="客户名称" align="center"></el-table-column>
                                <el-table-column prop="categoryName" label="客户类别" align="center"></el-table-column>
                                <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
                                <el-table-column prop="number" label="获取数量(张)" align="center">
                                  <template slot-scope="scope">
                                      <el-form-item label="" style=" margin-top: 0;" label-width="0px" :prop="`userCouponDto.${scope.$index}.number`" :rules="[{trigger: 'change', validator: rules.validNumberZZS}]">
                                        <el-input size="small" class="w110" placeholder="正整数" v-model.trim="scope.row.number"></el-input>
                                      </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="操作">
                                  <template slot-scope="scope" align="center">
                                    <el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
                                  </template>
                                </el-table-column>
                              </el-table>
                              <div class="footer-block">
                                <span class="page" v-cloak> 共 {{customerForm.userCouponDto.length}} 条</span>
                              </div>
                            </div>
                          </el-form>
                      </div>
                    </div>


                  </el-col>
                  <el-col :span="8">
                    <ol>
                      <li>
                        每天发放优惠券批次不限；
                      </li>
                      <li>
                        每一批次最多发放9999张；
                      </li>
                      <li>
                        每一批次直接获赠的方式，需要在发放时选择获取的对象：客户;并根据发放数量合理分配给客户。
                      </li>
                      <li>
                        每一批次手动领取的方式，才有设置其领取的次数；根据条件领完为止。
                      </li>
                    </ol>
                  </el-col>
                </el-row>
              </el-form>
            </template>
            <template></template>
        </div>
      </div>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { SearchBox } from '@/components/base.js'
import { fecthGoodsClass } from '@/api/goodsList.js'
import { createCouPon } from '@/api/frontShop/coupons.js'

export default {
  mixins: [addModel, rules],
  components: {
    SearchBox
  },
  data() {
    return {
      options: {
        categoryOption: [],
        levelTowOption: [],
        type: [
          { label: '立减', value: 3 },
          { label: '满减', value: 1 },
          { label: '折扣', value: 2 }
          // { label: '无限制', value: 4 }
        ],
        useType: [
          { label: '全品类', value: 1 },
          { label: '部份品类', value: 2 },
          { label: '单个商品', value: 3 }
        ],
        useTime: [
          { label: '固定时间段', value: 1 },
          { label: '获取后周期内', value: 2 }
        ],
        getType: [
          { label: '直接获赠', value: 0 },
          { label: '手动领取', value: 1 },
          { label: '手动兑换', disabled: true, value: 2 },
          { label: '分享赠送', disabled: true, value: 3 },
          { label: '订单支付后赠送', disabled: true, value: 4 }
        ],
        TimeAndTime: [
          { label: '自定义次数', value: 1 },
          { label: '不限领完即止', value: 2 }
        ]
      },
      form: {
        type: 3, // 优惠券类别  <!-- { label: '立减', value: 3 }, { label: '满减', value: 1 }, { label: '折扣', value: 2 } -->
        typeValue11: null, // 优惠券面值⤵
        typeValue12: null,
        typeValue3: null,
        typeValue2: null,
        rangeFlag: null, // 优惠券使用范围1：全品类 2：部份品类 3：单个商品 ,
        singleGood: {
          id: null,
          title: null,
          code: null
        },
        payMentMethod: null,
        numberTime: null,
        numberTimeInput: null,

        timeType: null, // 有效期限 - 标识选择时间后台不需要
        datetimerange: null,
        fixationTime: null,
        leveFDTO: null,
        leveltDTO: null,
        number: null,
        userCouponDto: []
      },
      customerDTO: null,
      goodsDTO: null,
      customerForm: {
        number: null,
        customerId: null,
        userCouponDto: []
      }
    }
  },
  mounted() {

  },
  methods: {
    mapToTree(data) {
      const parent = []
      if (Array.isArray(data) && data.length) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index]
          element.children = []
          if (element.parentId === '0') {
            parent.push(element)
            data.splice(index, 1)
          }
        }
        for (let k = 0; k < data.length; k++) {
          const c = data[k]
          for (let i = 0; i < parent.length; i++) {
            const p = parent[i]
            if (c.parentId === p.id) {
              p.children.push(c)
            }
          }
        }
        return parent
      } else {
        return []
      }
    },
    fecthGoodsClass() {
      fecthGoodsClass().then(({ data }) => {
        if (!Array.isArray(data) && !data.length) return
        this.options.categoryOption = this.mapToTree(data)
      }).catch(e => {
        this.$message({ type: 'error', message: '加载分类失败失败' })
      })
    },
    close() {
      this.$emit('close', false)
    },
    rangeFlagChange(e) {
      if (e && e === 2) this.fecthGoodsClass()
    },
    leveFDTOchange(item) {
      if (!item) return
      this.form.leveltDTO = null
      this.options.levelTowOption = []
      this.options.levelTowOption = item.children
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.saveLoading) return
          this.saveLoading = true
          const cpdata = JSON.parse(JSON.stringify(this.form))
          if (cpdata.payMentMethod === 0 && !this.customerForm.userCouponDto.length) {
            this.$message({ type: 'warning', message: '请核选择客户' })
            return
          }
          const result = {
            'amount': null, // 面额，折扣
            'batchCode': null, // 批次号
            'effectiveBegin': null, // 开始时间
            'effectiveEnd': null, // 结束时间
            'fixationTime': null, // 固定时间内 和开始时间 结束时间 二选一
            'id': null,
            'number': null, // 优惠券的数量
            'rangeFlag': null, // 1：全品类 2：部份品类 3：单个商品 ,
            'remark': null, // 备注
            'status': null, // 暂时不定义
            'title': null, // 劵名称
            'type': 2, // 1：平台券，全平台适用 2：机构券，适用于发券机构，不可以跨店此处暂定默认为机构券
            // 定义劵的领取规则
            'limitDto': {
              'minimumLimit': null,
              'type': null // 0：自定义领取,1：不限制领取 领完为止
            },
            // 规则 选择满减 折扣类型
            'ruleDto': {
              'minimumLimit': null, // 仅仅满减的时候使用
              'payMentMethod': null, // 领取方式 0 直接获赠 1 手动领取 2 手动兑换 3 分享赠送 4 订单支付后赠送
              'type': null // 1：满减 2：折扣 3、立减 4 无限制
            },
            // 优惠券的使用范围
            'ruleOptionDto': {
              'content': []
            },
            // 用户TX
            'userCouponDto': [
              // {
              //   'number': 0,
              //   'userId': null
              // }
            ]
          }

          result.number = cpdata.number
          // 满减----类别 1：满减 2：折扣 3、立减 4 无限制
          if (cpdata.type === 1) {
            result.ruleDto.minimumLimit = cpdata.typeValue11
            result.amount = cpdata.typeValue12
          } else if (cpdata.type === 2) {
          // 立减
            result.amount = cpdata.typeValue2
          } else {
            result.amount = cpdata.typeValue3
          }
          result.ruleDto.type = cpdata.type
          // 满减----使用范围 1：全品类 2：部份品类 3：单个商品
          result.rangeFlag = cpdata.rangeFlag
          // 部份品类
          let arr = []
          if (result.rangeFlag === 2) {
            if (cpdata.leveFDTO) {
              arr.push({
                id: cpdata.leveFDTO.id,
                title: cpdata.leveFDTO.title,
                code: null
              })
            }
            if (cpdata.leveltDTO) {
              arr.push({
                id: cpdata.leveltDTO.id,
                title: cpdata.leveltDTO.title,
                code: null
              })
            }
          } else if (result.rangeFlag === 3) {
            // 单个
            arr = [cpdata.singleGood]
          }
          result.ruleOptionDto.content = JSON.stringify(arr)
          // 有效期限---1时间段 2具体时间 cpdata.timeType
          if (cpdata.timeType === 1 && cpdata.datetimerange) {
            result.effectiveBegin = cpdata.datetimerange[0]
            result.effectiveEnd = cpdata.datetimerange[1]
          } else {
            result.fixationTime = cpdata.fixationTime
          }
          // 获取方式--- 0 直接获赠; 1 手动领取; 2 手动兑换 ; 3 分享赠送; 4 订单支付后赠送
          result.ruleDto.payMentMethod = cpdata.payMentMethod
          if (cpdata.payMentMethod === 0) {
            const uses = JSON.parse(JSON.stringify(this.customerForm.userCouponDto))
            let total = 0
            const ids = uses.map((item) => {
              total += (item.number) * 1
              return { 'number': item.number, 'userId': item.userId }
            })
            if (total !== result.number) {
              this.saveLoading = false
              this.$message({ type: 'warning', message: '分配数量之和应该等于发放数量' })
              return
            }
            result.userCouponDto = ids
          } else if (cpdata.payMentMethod === 1) {
            result.limitDto.type = cpdata.numberTime
            if (cpdata.numberTime === 1) {
              result.limitDto.minimumLimit = cpdata.numberTimeInput
            }
          }
          console.log('xxxx')
          createCouPon(result).then(res => {
            this.$emit('close', false)
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
    resetCustomerForm() {
      this.customerDTO = null
      this.number = null
      if (this.$refs['customerForm']) this.$refs['customerForm'].resetFields()
    },
    addCustomerForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const userIds = this.customerForm.userCouponDto.map(item => { return item.userId })
          if (userIds.indexOf(this.customerForm.customerId) !== -1) {
            this.$message({ type: 'warning', message: '请勿重复添加' })
            return
          } else {
            const { customerDTO, customerForm } = this
            this.customerForm.userCouponDto.push({
              userId: customerForm.customerId,
              number: customerForm.number,
              title: customerDTO.title,
              categoryName: customerDTO.categoryName,
              loginName: customerDTO.loginName,
              contacts: customerDTO.contacts
            })
            this.resetCustomerForm()
          }
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    clickToDelete(index, item) {
      const { userCouponDto } = this.customerForm
      if (userCouponDto.length > 1) {
        userCouponDto.splice(index, 1)
      }
    }
  },
  watch: {
    customerDTO: {
      handler(val, oldVal) {
        if (val) {
          this.customerForm.customerId = val.id
        } else {
          this.customerForm.customerId = null
        }
      }
    },
    goodsDTO: {
      handler(val, oldVal) {
        if (val) {
          this.form.singleGood.id = val.id
          this.form.singleGood.code = val.barCode
          this.form.singleGood.title = val.title
        } else {
          this.form.singleGood.id = null
          this.form.singleGood.code = null
          this.form.singleGood.title = null
        }
      }
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

  .carItems{
    .el-form-item{
      margin-bottom: 16px;
    }
  }

  .add-bar{
    display: flex;
    align-items: center;
    .el-button{
      margin-top: -23px;
    }
  }
  .tips{
    padding-top: 10px;
  }
  .tableBox{
    .el-form-item{
      margin: 0;
    }
  }
}
</style>
