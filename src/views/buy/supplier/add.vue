<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <el-dialog :visible.sync="dialog.visiable" @close="closeDialog"  :fullscreen="true" :modal-append-to-body="false"  :close-on-press-escape="true">
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
          <template>
            <el-form :model="form" ref="form" class="viewForm" label-width="130px" :inline="true">

              <div class="row-item">
                <div class="row-title">基本信息</div>
                <div class="row-content">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="供应商账号:">
                        <span v-cloak>{{form.orderNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="供应商名称:">
                        <span v-cloak>{{form.orderDate}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="别名:">
                        <span v-cloak>{{form.customerTitle}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="简称:">
                        <span v-cloak>{{form.loginName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="联系人:">
                         
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="联系人电话:">
                        
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="地址:">
                          <span v-cloak>{{form.sendDate}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="简要说明:">
                          
                      </el-form-item>
                    </el-col>
                    
                  </el-row>
                </div>
              </div>

              <div class="row-item">
                <div class="row-title">资金账户信息</div>
                <div class="row-content">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="开户银行:">
                        <span v-cloak>{{form.contactsName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="银行卡号:">
                        <span v-cloak>{{form.mobile}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="应付金额:" label-width="130px">
                        <span v-if="form.receiverFlag===0"> 当面签收 </span>
                        <span v-if="form.receiverFlag===1"> 拍照签收 </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="应收金额:">
                        <span v-if="form.receiverFlag===1"> 拍照签收 </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <div class="row-item">
                <div class="row-title">工商信息</div>
                <div class="row-content">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="工商注册名:">
                        <span v-cloak>{{form.contactsName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="法人:">
                        <span v-cloak>{{form.mobile}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="税号:" label-width="130px">
                        <span v-if="form.receiverFlag===0"> 当面签收 </span>
                        <span v-if="form.receiverFlag===1"> 拍照签收 </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="注册地址:">
                        <span v-if="form.receiverFlag===1"> 拍照签收 </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="营业执照号:">
                        <span v-if="form.receiverFlag===1"> 拍照签收 </span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="营业执照图:">
                        <span v-if="form.receiverFlag===1"> 拍照签收 </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <div class="row-item">
                <div class="row-title">账号状态设置</div>
                <div class="row-content">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="">
                        <!-- <span v-if="!isAddView"> 
                          <span v-if="form.patUser.status===1"> 启用 </span>
                          <span v-else> 禁用 </span>
                        </span>
                        <el-radio v-else v-model="form.patUser.status" :label="item.label" v-for="item in accountOption" :key="item.label">
                          <span v-cloak> {{item.text}} </span>
                        </el-radio> -->
                      </el-form-item>
                    </el-col>
                  </el-row>
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
import addModel from '@/public/addModel.js'
import { fetchDetail } from '@/api/distribution/salesDelivery.js'
export default {
  mixins: [addModel],
  components: {
  },
  data() {
    return {
      form: {
        'id': null,
        'orderId': null,
        'orderNo': null,
        'orderDate': null,
        'customerId': null,
        'customerTitle': null,
        'loginName': null,
        'orderSource': null,
        'paymentType': null,
        'beginTime': null,
        'endTime': null,
        'sendDate': null,
        'serialNumber': null,
        'driverId': null,
        'driverName': null,
        'factTime': null,
        'contactsName': null,
        'phone': null,
        'status': null,
        'mobile': null,
        'address': null,
        'receiver': null,
        'receiverFlag': null,
        'photos': null,
        'type': null
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
      this.fetchDetail()
    } else {
      this.fecthStockList()
      this.fecthRegionList()
      const date = new Date()
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      const day = date.getDate() + 1 > 9 ? date.getDate() : '0' + date.getDate()
      const ymd = date.getFullYear() + '-' + month + '-' + day
      this.today = ymd
    }
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
    },
    fetchDetail() {
      if (!this.data.obj.id) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        type: this.data.obj.type,
        id: this.data.obj.id
      }
      fetchDetail(data).then(({ data }) => {
        if (!data) return
        this.form = Object.assign(this.form, data)
        this.table.data = data.saleDtails.rows
        this.pagination.total = data.saleDtails.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    onRefresh() {
      if (this.data.type === 'view') {
        this.fetchDetail()
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
 
</style>
