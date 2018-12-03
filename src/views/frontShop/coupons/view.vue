<template>
  <!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
    <div class="content-box">
      <!-- 固定顶部操作菜单+位置明示 -->
      <div class="header-bar" slot="title">
        <div class="left">优惠券内容详情</div>
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
                    <span v-cloak>{{form.batchCode}}</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="本批次共发放(张):">
                    <span v-cloak>{{form.number}}</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="本批次未获取还有效:">
                    <span v-cloak>{{form.notAcquiredEffectivelyNumber}}</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="本批次未获取已过期:">
                    <span v-cloak>{{form.notAcquiredNotEffectivelyNumber}}</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="本批次已获取未使用(张):">
                    <span v-cloak>{{form.acquiredNotUsedNumber}}</span>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="本批次已获取已过期(张):">
                    <span v-cloak>{{form.acquiredNotEffectivelyNumberNumber}}</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="优惠券类别:">
                    <span v-cloak v-if="form.type=== 1">满减</span>
                    <span v-cloak v-if="form.type=== 2">折扣</span>
                    <span v-cloak v-if="form.type=== 3">立减</span>
                    <span v-cloak v-if="form.type=== 4">无限制</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="优惠券面值:">
                    <!-- <span v-cloak>{{form.amount}}</span> -->
                    <span v-cloak>{{form.showTitle}}</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="优惠券使用范围:">
                    <span v-cloak v-if="form.rangeFlag=== 1">全品类</span>
                    <span v-cloak v-if="form.rangeFlag=== 2">部分商品</span>
                    <span v-cloak v-if="form.rangeFlag=== 3">单个商品</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="商品名称/商品编码:">无返回</el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="有效期限:">
                    <span
                      v-cloak
                    >{{ form.fixationTime? `获取后${ form.fixationTime}天内` : form.effectiveBegin ? `${form.effectiveBegin} ${form.effectiveEnd}` : '' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="优惠券获取方式:">
                    <!-- <span v-cloak>{{form.createTime}}</span> -->
                    <span v-cloak v-if="form.payMentMethod ===0"> 直接获赠 </span>
                    <span v-cloak v-if="form.payMentMethod ===1"> 手动领取 </span>
                    <span v-cloak v-if="form.payMentMethod ===2"> 手动兑换 </span>
                    <span v-cloak v-if="form.payMentMethod ===3"> 分享赠送 </span>
                    <span v-cloak v-if="form.payMentMethod ===4"> 订单支付后赠送 </span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6" v-if="form.payMentMethod ===1">
                  <el-form-item label="可领取次数:">
                    <span v-cloak>{{form.minimumLimit}}</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="发放时间:">
                    <span v-cloak>{{form.createOn}}</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="8" :lg="6">
                  <el-form-item label="发放人:">
                    <span v-cloak>{{form.createBy}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!--商品信息-->
          <div class="row-item">
            <div class="row-title">商品信息</div>

              <search-bar
                ref="searchBar"
                :data="searchBarData"
                @search="searchAction"
                @reset="resetSearchBar">
              </search-bar>

            <div class="row-content">
              <!-- 表格 -->
              <table-contain :height.sync="table.maxHeight">
                <el-table
                  :data="form.table"
                  slot="table"
                  :size="table.size"
                  :max-height="table.maxHeight"
                  style="width: 100%;"
                  highlight-current-row>

                  <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.$index + 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="code" label="优惠券编号" align="center"></el-table-column>
                  <el-table-column prop="receivePlatform" label="获取平台" align="center">
                    <template slot-scope="scope" align="center">

                    </template>
                  </el-table-column>
                  <el-table-column prop="receiveTime" width="90" label="获取时间" align="center"></el-table-column>
                  <el-table-column prop="loginName" label="客户账号" align="center"></el-table-column>
                  <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
                  <el-table-column prop="categoryName" label="客户类别" align="center"></el-table-column>
                  <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
                  <el-table-column prop="purchasePrice" width="150" label="实际有效期限" align="center">
                    <!-- effectiveBegin --> <!-- effectiveEnd -->
                    <template slot-scope="scope" align="center">
                      <span v-cloak>  {{  scope.row.fixationTime? `获取后${scope.row.fixationTime}天内` : scope.row.effectiveBegin ? `${scope.row.effectiveBegin} ${scope.row.effectiveEnd}`: '' }} </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="usedPlatform" label="使用平台" align="center"></el-table-column>
                  <el-table-column prop="usedTime" width="90" label="使用时间" align="center"></el-table-column>
                  <el-table-column prop="deadline" width="90" label="过期时间" align="center"></el-table-column>
                  <el-table-column prop="status" label="状态" align="center">
                    <!-- 0 未获取还有效 1 未获取已过期 2 已获取未使用 3 已获取已使用 4 已获取已过期 -->
                    <template slot-scope="scope" align="center">
                       <span v-cloak v-if="scope.row.status===0">未获取还有效</span>
                       <span v-cloak v-if="scope.row.status===1">未获取已过期</span>
                       <span v-cloak v-if="scope.row.status===2">已获取未使用</span>
                       <span v-cloak v-if="scope.row.status===3">已获取已使用</span>
                       <span v-cloak v-if="scope.row.status===4">已获取已过期</span>
                    </template>
                  </el-table-column>
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
                  :total="pagination.total"
                ></el-pagination>
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
      searchBarData: [
        [
          {
            type: 'option',
            value: null,
            key: 'status',
            class: 'w140',
            placeholder: '状态',
            options: [
              { label: '未获取还有效', value: 0 },
              { label: '未获取已过期', value: 1 },
              { label: '已获取未使用', value: 2 },
              { label: '已获取已使用', value: 3 },
              { label: '已获取已过期', value: 4 }
            ]
          },
          {
            type: 'input',
            value: null,
            key: 'codes',
            class: 'w160',
            placeholder: '优惠券编号/订单编号'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        []
      ],
      form: {
        id: null,
        title: null,
        batchCode: null,
        number: null,
        notAcquiredEffectivelyNumber: null,
        notAcquiredNotEffectivelyNumber: null,
        acquiredNotUsedNumber: null,
        acquiredUsedNumber: null,
        acquiredNotEffectivelyNumberNumber: null,
        type: null,
        amount: null,
        rangeFlag: null,
        content: null,
        fixationTime: null,
        effectiveBegin: null,
        effectiveEnd: null,
        payMentMethod: null,
        receiveType: null,
        minimumLimit: null,
        createOn: null,
        createBy: null,
        table: []
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
        data.content = data.content ? JSON.parse(data.content) : []
        this.form = Object.assign(this.form, data)
        if (this.form.type === 1) {
          this.form.showTitle = `满${this.form.minimumLimit}减${this.form.amount}元`
        } else if (this.form.type === 2) {
          this.form.showTitle = `${this.form.amount}折`
        } else if (this.form.type === 3) {
          this.form.showTitle = `立减${this.form.amount}元`
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fetchTable() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    searchAction(item) {
      if (!this.propsSonData.id) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        couponId: this.propsSonData.id,
        ...item
      }
      fetchTable(data).then(({ data }) => {
        if (Array.isArray(data.rows)) {
          // for (const item of data.rows) {
          //   if (item.type === 1) {
          //     item.showTitle = `满${item.minimumLimit}减${item.amount}元`
          //   } else if (item.type === 2) {
          //     item.showTitle = `${item.amount}折`
          //   } else if (item.type === 3) {
          //     item.showTitle = `立减${item.amount}元`
          //   }
          // }
          this.form.table = data.rows
        }
        this.pagination.total = data.total || 0
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    resetSearchBar() {
      this.fetchTable()
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

  .carItems {
    .el-form-item {
      margin-bottom: 16px;
    }
  }

  .add-bar {
    display: flex;
    align-items: center;
    .el-button {
      margin-top: -23px;
    }
  }
  .tips {
    padding-top: 10px;
  }
  .tableBox {
    .el-form-item {
      margin: 0;
    }
  }
}
</style>
