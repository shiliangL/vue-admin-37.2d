<template>
  <div class="settngView">

    <div class="settingForm">
      <el-form :model="settingForm" :rules="rules" ref="settingForm" label-width="120px" :inline="true">
        <div class="row-item">
            <div class="row-title">
              <span>
                销售订单规则
              </span>
              <span>
                <el-button  size="small" @click.stop="fetchSetting"> 刷新 </el-button>
                <template v-if="!isUpdate">
                  <el-button type="primary" size="small" @click.stop="isUpdate=true"> 修改 </el-button>
                </template>
                <template v-else>
                  <el-button type="primary" size="small" @click.stop="submitSettingForm"> 保存 </el-button>
                  <el-button size="small"  @click.stop="dissMiss"> 取消 </el-button>
                </template>
              </span>
              </div>
            <div class="row-content">
              <el-row>

                <el-col :xs="24" :sm="10" :md="8" :lg="8">
                  <el-form-item label="起订模式:">
                    <el-select v-if="isUpdate" size="small" v-model="settingForm.orderModel"  placeholder="请选择" style="width:160px">
                      <el-option v-for="sub in options.orderModel" :key="sub.value" :label="sub.title" :value="sub.value"></el-option>
                    </el-select>
                    <span v-else v-cloak>
                      <span v-if="settingForm.orderModel===0"> 首单 </span>
                      <span v-if="settingForm.orderModel===1"> 每单 </span>
                    </span>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="10" :md="8" :lg="8">
                  <el-form-item  label="起订价格:" prop="rule" :rules="[{trigger: 'change', required:true, validator: rules.validNumberR2}]">
				            <el-input v-if="isUpdate" size="small" style="width:160px" v-model.trim="settingForm.rule" placeholder="不能超过5位数"></el-input>
                    <template v-else v-cloak> {{ settingForm.rule }} </template>
                    元
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="10" :md="8" :lg="8">

                  <el-form-item label="开始下单:" prop="title">
                  	<el-time-picker :style="{width:'160px'}"
                      v-if="isUpdate"
                      size="small"
                      :clearable="false"
                      placeholder="开始下单"
                      v-model="settingForm.orderBeginTime"
                      value-format="HH:mm:ss"
                      type="date">
                    </el-time-picker>

                  <span v-else v-cloak> {{ settingForm.orderBeginTime }} </span>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="10" :md="8" :lg="8">

                  <el-form-item label="截止下单:">
                    <el-time-picker :style="{width:'160px'}"
                      size="small"
                      v-if="isUpdate"
                      :clearable="false"
                      placeholder="截止下单"
                      v-model="settingForm.orderEndTime"
                      value-format="HH:mm:ss"
                      type="date">
                    </el-time-picker>
                    <span v-else v-cloak> {{ settingForm.orderEndTime }} </span>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="10" :md="8" :lg="8">
                  <el-form-item label="送达日期:">
                    <el-select size="small"  v-if="isUpdate" v-model="settingForm.shipSendDate"  placeholder="请选择" style="width:160px">
                      <el-option v-for="sub in options.shipSendDate" :key="sub.value" :label="sub.title" :value="sub.value"></el-option>
                    </el-select>

                    <span v-else v-cloak>
                      <span v-if="settingForm.shipSendDate===0"> 次日送货 </span>
                      <span v-if="settingForm.shipSendDate===1"> 日期送货 </span>
                    </span>

                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="10" :md="8" :lg="8">
                  <div>
                    	<el-form-item label="送达时间:" prop="shipBeginTime" :rules="rules.input">
												<el-time-select style="width:99px" size="small"
                          v-if="isUpdate"
                          v-model="settingForm.shipBeginTime"
                          :picker-options="{ start: '00:00', step: '00:30', end: '24:00',maxTime: settingForm.shipEndTime }">
                        </el-time-select>
                        <span v-else v-cloak>{{settingForm.shipBeginTime}} - </span>

											</el-form-item>

											<el-form-item label="" prop="shipEndTime" :rules="rules.input" label-width="0">
												<el-time-select style="width:99px" size="small"
                          v-if="isUpdate"
                          v-model="settingForm.shipEndTime"
                          :picker-options="{ start: '00:00', step: '00:30', end: '24:00', minTime: settingForm.shipBeginTime}">
                        </el-time-select>
                        <span v-else v-cloak>{{settingForm.shipEndTime}}</span>
											</el-form-item>

                  </div>
                </el-col>

                <el-col :xs="24" :sm="10" :md="8" :lg="8">
                  <el-form-item label="修改订单:">
                    <span v-if="settingForm.orderBeginTime">
                      下单当天 {{ settingForm.orderBeginTime }} 前
                    </span>
                    <!-- <span v-cloak>{{form.brandName}}</span> -->
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="10" :md="8" :lg="8">
                  <el-form-item label="取消订单:">
                    <span v-if="settingForm.orderEndTime">
                      下单当天 {{ settingForm.orderEndTime }} 前
                    </span>
                    <!-- <span v-cloak>{{form.expiry}}</span> -->
                  </el-form-item>
                </el-col>

              </el-row>
            </div>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>

import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { fetchSetting, updateSetting } from '@/api/frontShop/operatSetting.js'

export default {
  name: 'settngView',
  mixins: [rules, addModel],
  data() {
    return {
      options: {
        orderModel: [
          { title: '首单', value: 0 }
          // { title: '每单', value: 1 },
          // { title: '无', value: 2 }
        ],
        shipSendDate: [
          { title: '次日送货', value: 0 }
          // { title: '日期送货', value: 1 }
        ]
      },
      settingForm: {
        'orderModel': 0, // : 0 代表首单 1 代表每单 ,
        'rule': null,
        'orderBeginTime': null,
        'orderEndTime': null,
        'shipSendDate': 0, // 0 代表次日送货 1 代表选择日期送货
        'shipBeginTime': '', // 送货开始时间
        'shipEndTime': '', // 送货结束时间
        'payType': null,
        'wxPay': null,
        'aliPay': null
      }
    }
  },
  mounted() {
    this.fetchSetting()
  },
  methods: {
    dissMiss() {
      this.fetchSetting()
      this.isUpdate = false
    },
    fetchSetting() {
      fetchSetting().then(({ data }) => {
        this.settingForm = Object.assign(this.settingForm, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    submitSettingForm() {
      this.$refs['settingForm'].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.settingForm))
          updateSetting(data).then(res => {
            this.isUpdate = false
            this.fetchSetting()
            this.$message({ type: 'success', message: `${res.msg}!` })
          }).catch(e => {
            this.$message({ type: 'error', message: e.msg })
          })
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .settngView{
    background: #ffffff;

    .row-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    }
  }
</style>
