<!-- 采购计划 -->
<template>
    <div class="coupons">
      <!-- <span class="topTitle">优惠券</span> -->

      <cupCars :data="TipsBarData" @callBack="TipsBarCallBack"></cupCars>

      <search-bar ref="searchBar" :data="searchBarData" @search="searchAction"  @add="showAdd"  @clickBtn="showDes" @reset="resetSearchBar"></search-bar>

      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="batchCode" label="发放批次号" align="center"></el-table-column>
          <el-table-column prop="rangeFlag" label="优惠券类别" align="center">
            <template slot-scope="scope" align="center">
              <span v-cloak v-if="scope.row.type ===1"> 满减 </span>
              <span v-cloak v-if="scope.row.type ===2"> 折扣 </span>
              <span v-cloak v-if="scope.row.type ===3"> 立减 </span>
              <span v-cloak v-if="scope.row.type ===4"> 无限制 </span>
            </template>
          </el-table-column>
          <el-table-column  label="使用范围" align="center">
            <template slot-scope="scope" align="center">
              <span v-cloak v-if="scope.row.rangeFlag ===1"> 全品类 </span>
              <span v-cloak v-if="scope.row.rangeFlag ===2"> 部份品类 </span>
              <span v-cloak v-if="scope.row.rangeFlag ===3"> 单个商品 </span>
            </template>
          </el-table-column>
          <el-table-column label="获取方式" align="center">
            <template slot-scope="scope" align="center">
              <span v-cloak v-if="scope.row.payMentMethod ===0"> 直接获赠 </span>
              <span v-cloak v-if="scope.row.payMentMethod ===1"> 手动领取 </span>
              <span v-cloak v-if="scope.row.payMentMethod ===2"> 手动兑换 </span>
              <span v-cloak v-if="scope.row.payMentMethod ===3"> 分享赠送 </span>
              <span v-cloak v-if="scope.row.payMentMethod ===4"> 订单支付后赠送 </span>
            </template>
          </el-table-column>
          <el-table-column prop="showTitle" label="优惠券面值" align="center"></el-table-column>
          <el-table-column prop="number" label="发放数量(张)" align="center"></el-table-column>
          <el-table-column prop="purchaserName" width="150" label="有效期限" align="center">
            <template slot-scope="scope" align="center">
              <span v-cloak>  {{  scope.row.fixationTime? `获取后${scope.row.fixationTime}天内` : scope.row.effectiveBegin ? `${scope.row.effectiveBegin} ${scope.row.effectiveEnd}`: '' }} </span>
            </template>
          </el-table-column>
          <el-table-column prop="createOn" width="90" label="发放时间" align="center"></el-table-column>
          <el-table-column prop="createBy" label="发放人" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
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
      <el-dialog title="优惠券使用说明" :visible.sync="dialogVisible" :width="dialogAdd|| dialogviewPage? '': '420px'"
        append-to-body center @close="closeDialog"  :fullscreen="dialogAdd|| dialogviewPage? true: false" :modal-append-to-body="false"  :close-on-press-escape="true">
        <div v-if="dialogVisible">
          <Add v-if="dialogAdd" @close="dialogVisible=false" :propsSonData="propsParentData"></Add>
          <instructions v-if="dialogInstructions" @close="dialogVisible=false"></instructions>
          <viewPage v-if="dialogviewPage" @close="dialogVisible=false" :propsSonData="propsParentData"></viewPage>
        </div>
      </el-dialog>

    </div>
</template>

<script>
import cupCars from './cupCars'
import Add from './add'
import instructions from './instructions'
import viewPage from './view'
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
import { fetchList, fetchCardList } from '@/api/frontShop/coupons.js'

export default {
  name: 'coupons',
  mixins: [model],
  components: {
    instructions,
    cupCars,
    viewPage,
    Tabs,
    Add
  },
  data() {
    return {
      curIndex: 0,
      dialogviewPage: false,
      dialogAdd: false,
      dialogInstructions: false,

      TipsBarData: [
        { title: '共发放优惠券', number: 1024, unit: '张' },
        { title: '已获取未使用', number: 1024, unit: '张' },
        { title: '已获取已使用', number: 1024, unit: '张' },
        { title: '已获取已过期', number: 1024, unit: '张' },
        { title: '未获取还有效', number: 1024, unit: '张' },
        { title: '未获取已过期', number: 1024, unit: '张' }
      ],
      searchBarData: [
        [
          { type: 'date', value: null, key: 'createOn', width: '200px', placeholder: '发放时间' },
          { type: 'option', value: null, key: 'type', class: 'w110', placeholder: '优惠券类别', options: [
            { label: '满减', value: 1 },
            { label: '折扣', value: 2 },
            { label: '立减', value: 3 },
            { label: '无限制', value: 4 }
          ]
          },
          { type: 'option', value: null, key: 'rangeFlag', class: 'w110', placeholder: '使用范围', options: [
            { label: '全品类', value: 1 },
            { label: '部份品类', value: 2 },
            { label: '单个商品', value: 3 }
          ]
          },
          { type: 'option', value: null, key: 'payMentMethod', class: 'w110', placeholder: '获取方式', options: [
            { label: '直接获赠', value: 0 },
            { label: '手动领取', value: 1 },
            { label: '手动兑换', value: 2 },
            { label: '分享赠送', value: 3 },
            { label: '订单支付后赠送', value: 4 }
          ]
          },
          { type: 'input', value: null, key: 'batchCode', class: 'w180', placeholder: '优惠券批次号检索' },
          { type: 'input', value: null, key: 'code', class: 'w180', placeholder: '优惠券编号、销售订单号' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'button', name: '使用说明' },
          { type: 'add', name: '发放优惠券' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ]
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    searchAction(params) {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        ...params
      }
      fetchList(data).then(({ data }) => {
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
          this.table.data = data.rows
        }
        this.pagination.total = data.total || 0
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      this.fecthTipsBar()
    },
    fecthTipsBar() {
      fetchCardList().then(({ data }) => {
        if (!data) return
        // number (integer, optional): 共发放(张) 0
        // acquiredNotUsedNumber (integer, optional): 已获取未使用(张)  1,
        // acquiredUsedNumber (integer, optional): 已获取已使用(张)(张) 2,
        // acquiredNotEffectivelyNumberNumber (integer, optional): 已获取已过期(张) 3,
        // notAcquiredEffectivelyNumber (integer, optional): 未获取还有效 4,
        // notAcquiredNotEffectivelyNumber (integer, optional): 未获取已过期 5,
        this.TipsBarData[0].number = data.number
        this.TipsBarData[1].number = data.acquiredNotUsedNumber
        this.TipsBarData[2].number = data.acquiredUsedNumber
        this.TipsBarData[3].number = data.acquiredNotEffectivelyNumberNumber
        this.TipsBarData[4].number = data.notAcquiredEffectivelyNumber
        this.TipsBarData[5].number = data.notAcquiredNotEffectivelyNumber
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 数据请求
    fetchList() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    },
    closeDialog() {
      this.fetchList()
      this.propsParentData = null
      this.dialogviewPage = false
      this.dialogAdd = false
      this.dialogInstructions = false
    },
    showDes() {
      this.dialogVisible = true
      this.dialogviewPage = false
      this.dialogAdd = false
      this.dialogInstructions = true
    },
    showAdd() {
      this.dialogVisible = true
      this.dialogviewPage = false
      this.dialogAdd = true
      this.dialogInstructions = false
    },
    click2view(index, item) {
      this.dialogVisible = true
      this.dialogviewPage = true
      this.dialogAdd = false
      this.dialogInstructions = false
      this.propsParentData = item
    },
    TipsBarCallBack(value) {

    },
    resetSearchBar() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    }
  }
}
</script>

<style scoped lang="scss">
.buyPlan{
  background: #fff;
  .topTitle{
    border-left: 2px solid #1cbc9c;
    display: inline-block;
    padding-left: 10px;
    padding-top: 10px;
    font-size: 16px;
    font-weight: 400;
    color: #666666;
  }
}
</style>
