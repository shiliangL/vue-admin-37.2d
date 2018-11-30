<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> 优惠券内容详情 </div>
           <div class="right">
              <el-button type="text" size="mini" :loading="saveLoading" @click.stop="refresh">刷新</el-button>
              <el-button type="text" size="mini" @click.stop="close">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
          <el-form :model="form" ref="form" :inline="true" class="formNoMargin">

            <!--基本信息-->
            <div class="row-item">
                <div class="row-title">基本信息</div>
                <div class="row-content info">
                  <el-row>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="优惠券发放批次号:">
                        <!-- <span v-cloak>{{form.orderRequestNo}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="本批次共发放(张):">
                       <!-- <span v-cloak>{{form.applicationDate}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="本批次未获取还有效:">
                       <!-- <span v-cloak>{{form.purchaserName}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="本批次未获取已过期:">
                        <!-- <span v-cloak>{{form.auditStaffName}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="本批次已获取未使用(张):">
                        <!-- <span v-cloak>{{form.orderNo}}</span> -->
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="本批次已获取已过期(张):">
                        <!-- <span v-cloak>{{form.createTime}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="优惠券类别:">
                        <!-- <span v-cloak>{{form.createTime}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="优惠券面值:">
                        <!-- <span v-cloak>{{form.createTime}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="优惠券使用范围:">
                        <!-- <span v-cloak>{{form.createTime}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="商品名称/商品编码:">
                        <!-- <span v-cloak>{{form.createTime}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="有效期限:">
                        <!-- <span v-cloak>{{form.createTime}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="优惠券获取方式:">
                        <!-- <span v-cloak>{{form.createTime}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="可领取次数:">
                        <!-- <span v-cloak>{{form.createTime}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="发放时间:">
                        <!-- <span v-cloak>{{form.createTime}}</span> -->
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="发放人:">
                        <!-- <span v-cloak>{{form.createTime}}</span> -->
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
            </div>

            <!--商品信息-->
            <div class="row-item">
              <div class="row-title">商品信息</div>

                <div class="search-bar">

                </div>

              <div class="row-content">
                <!-- 表格 -->
                <table-contain  :height.sync="table.maxHeight">
                  <el-table :data="form.table" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="code" label="优惠券编号" align="center"></el-table-column>
                    <el-table-column prop="receivePlatform" label="获取平台" align="center"></el-table-column>
                    <el-table-column prop="receiveTime" width="90" label="获取时间" align="center"></el-table-column>
                    <el-table-column prop="loginName" label="客户账号" align="center"></el-table-column>
                    <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
                    <el-table-column prop="categoryName" label="客户类别" align="center"></el-table-column>
                    <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
                    <el-table-column prop="purchasePrice" width="150" label="实际有效期限" align="center">
                      <!-- effectiveBegin -->
                      <!-- effectiveEnd -->
                    </el-table-column>
                    <el-table-column prop="usedPlatform" label="使用平台" align="center"></el-table-column>
                    <el-table-column prop="usedTime" width="90" label="使用时间" align="center"></el-table-column>
                    <el-table-column prop="deadline" width="90" label="过期时间" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" align="center"></el-table-column>
                    <el-table-column prop="orderNo" label="使用销售订单编号" align="center"></el-table-column>
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


              </div>
            </div>
	        </el-form>
        </div>
      </div>
  </div>
</template>

<script>
import { fetchTable, fetchHeader } from '@/api/frontShop/coupons.js'
import addModel from '@/public/addModel.js'
import model from '@/public/listModel.js'

export default {
  mixins: [addModel, model],
  data() {
    return {
      options: {
        states: [
          { label: '未获取还有效', value: 0 },
          { label: '未获取已过期', value: 1 },
          { label: '已获取未使用', value: 2 },
          { label: '已获取已使用', value: 3 },
          { label: '已获取已过期', value: 4 }
        ]
      },
      form: {
        'id': '338890ae970647cc897d36b3451f04d9',
        'title': null,
        'batchCode': 'Q201843572527707008',
        'number': 21,
        'notAcquiredEffectivelyNumber': 19,
        'notAcquiredNotEffectivelyNumber': 0,
        'acquiredNotUsedNumber': 2,
        'acquiredUsedNumber': 0,
        'acquiredNotEffectivelyNumberNumber': 0,
        'type': 3,
        'amount': 21,
        'rangeFlag': 2,
        'content': null,
        'fixationTime': null,
        'effectiveBegin': null,
        'effectiveEnd': null,
        'payMentMethod': 0,
        'receiveType': null,
        'minimumLimit': null,
        'createOn': '2018-11-30 18:08:48',
        'createBy': '童毅',
        'table': []
      }
    }
  },
  mounted() {
    console.log(this.propsSonData)
    this.fetchHeader()
    this.fetchTable()
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    refresh() {
      this.fetchHeader()
      this.fetchTable()
    },
    fetchHeader() {
      if (!this.propsSonData.id) return
      fetchHeader({ id: this.propsSonData.id }).then(({ data }) => {

      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fetchTable() {
      // couponId
      if (!this.propsSonData.id) return
      fetchTable({ couponId: this.propsSonData.id }).then(({ data }) => {
        if (Array.isArray(data.rows)) {
          for (const item of data.rows) {
            if (item.type === 1) {
              item.showTitle = `满${item.minimumLimit}减${item.amount}元`
            } else if (item.type === 2) {
              item.showTitle = `${item.amount}折`
            } else if (item.type === 3) {
              item.showTitle = `立减${item.amount}元`
            }
          }
          this.form.table = data.rows
        }
        this.pagination.total = data.total || 0
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fetchTable()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fetchTable()
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
