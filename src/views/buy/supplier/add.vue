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
          <el-form v-if="data.type === 'check'" :model="form" ref="form" class="viewForm" label-width="130px" :inline="true">

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
                    <el-form-item label="联系人电话:" prop="mobile" :rules="rules.input">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.mobile" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.mobile}}</span>
                    </el-form-item>
                  </el-col>                   
                </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="地址:" prop="addressArrt" :rules="rules.input">

                      <AddressSelect width="130px" :ids="idsArr" v-if="isUpdate" @change="selectAddress"/>
                      <el-input v-if="isUpdate" size="small" style="width:160px;display:none"  v-model.trim="form.addressArrt" placeholder=""></el-input>

                      <el-input  v-if="isUpdate" 
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}" 
                        placeholder="不能超30位数" maxlength="30"
                        size="small" style="width:400px" v-model.trim="form.address"></el-input>

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

            <div class="row-item">
              <div class="row-title">资金账户信息</div>
              <div class="row-content">
                <el-row>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="开户银行:" prop="companyBank" :rules="rules.input">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.companyBank" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.companyBank}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="银行卡号:" prop="bankNo" :rules="rules.input">
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
            </div>

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
                  <el-col :sm="10" :md="8" :lg="8">
                    <el-form-item label="营业执照图:">
                      <el-input v-if="isUpdate" size="small" style="width:160px"  v-model.trim="form.businessLicensePicUrl" placeholder=""></el-input>
                      <span v-else v-cloak>{{form.businessLicensePicUrl}}</span>
                    </el-form-item>
                  </el-col>
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
                        <el-tag size="mini" type="danger" v-cloak v-if="form.status===0"> 禁用 </el-tag>
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
            <h3>测试</h3>
          </div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { fecthDetail, createRow, updateRow } from '@/api/buy/supplier.js'
import { AddressSelect } from '@/components/base.js'

export default {
  mixins: [addModel, rules],
  components: {
    AddressSelect
  },
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
      idsArr: []
    }
  },
  created() {
    this.$setKeyValue(this.dialog, { visiable: true })
    this.statusOption = [
      { label: 1, text: '启用' },
      { label: 0, text: '禁用' }
    ]
  },
  mounted() {
    console.log(this.data.type === 'check')
    this.currentTitle = this.data.title || ''
    this.isUpdate = this.data.type === 'add' || this.data.type === 'editor'
    if (this.data.type === 'view' || this.data.type === 'editor') {
      this.fetchDetail()
    } else {
      console.log('x')
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
          { id: this.form.areaId, title: this.form.areaName }
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
        if (item.province && item.city && item.area) {
          this.form.addressArrt = `${item.province.title}/${item.city.title}/${item.area.title}`
          this.form.provinceId = item.province.id
          this.form.cityId = item.city.id
          this.form.areaId = item.area.id
        }
      } else {
        this.form.addressArrt = null
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && !this.saveLoading) {
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
        if (valid && !this.saveLoading) {
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
