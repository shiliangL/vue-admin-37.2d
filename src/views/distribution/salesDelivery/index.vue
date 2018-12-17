<!-- 销售配送 -->
<template>
    <div class="salesDeliveryA">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

			<search-bar :data="searchBarDate" @search="searchAction" @add="showAdd" ref="searchBar" @reset="resetFetchList"></search-bar>

      <table-contain  :height.sync="table.maxHeight" :key="curIndex">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>

					<el-table-column prop="serialNumber" label="销售配送单号" align="center"></el-table-column>
					<el-table-column prop="driverName" label="配送员" align="center"></el-table-column>
					<el-table-column prop="orderNo" :label="curIndex===0?'销售订单编号':'销售换货单号'" align="center"></el-table-column>
					<el-table-column prop="customerTitle" label="客户名称" align="center"></el-table-column>
					<el-table-column prop="title" label="配送区域" align="center"></el-table-column>
					<el-table-column prop="createOn" :label="curIndex===0?'下单时间':'申请换货时间'" align="center"></el-table-column>
					<el-table-column prop="stockName" label="仓库" align="center"></el-table-column>
					<el-table-column prop="shipCreateOn" label="配送单创建时间" align="center"></el-table-column>
					<el-table-column prop="status" label="配送状态" align="center">
            <template slot-scope="scope" align="center">
               <span v-if="scope.row.status===0"> 待配送 </span>
               <span v-if="scope.row.status===1"> 配送中 </span>
               <span v-if="scope.row.status===2"> 已送达 </span>
               <span v-if="scope.row.status===3"> 退换货 </span>
               <span v-if="scope.row.status===4"> 已收货 </span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <el-button type="text" @click.stop="clickToMap(scope.$index,scope.row)"> 线路 </el-button>
              <el-button type="text" v-if="scope.row.isPackage===0 && curIndex==0" size="mini" @click.stop="clickToPrint(scope.$index,scope.row)">打印</el-button>
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">查看</el-button>
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
      <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refrehList" @edit="refrehList"></add>

      <div id="salesDelivery" v-if="PrintData.customerTitle" style="font-size: 12px;width:100%;text-align:center;">

        <table id="table1" style="width:100%;margin-bottom: 6px;">
           <thead>
              <tr>
                <th width="10%" style="font-weight: 400;font-size: 14px"> 厨满满商城销售订单商品清单 </th>
              </tr>
           </thead>
        </table>

        <table id="table2" style="width:100%">
          <tbody>
              <tr>
              <td align="left" style="font-weight: normal;">客户名称: <span style="font-weight: 400;"> {{PrintData.customerTitle}} </span></td>
              <td align="left" style="font-weight: normal;">销售订单编号:{{PrintData.orderNo}} </td>
              <td align="left" style="font-weight: normal;">下单时间:{{PrintData.orderDate}}</td>
              </tr>
              <tr>
              <td align="left" style="font-weight: normal;">要求送达日期: {{PrintData.sendDate}} </td>
              <td align="left" style="font-weight: normal;">要求送达时间:{{PrintData.beginTime}} - {{PrintData.endTime}} </td>
              <td align="left" style="font-weight: normal;">配送员:{{PrintData.driverName}}</td>
              </tr>
              <tr>
                <td align="left" style="font-weight: normal;">销售配送单: {{PrintData.serialNumber}}</td>
                <td align="left" style="font-weight: normal;">收货人: {{PrintData.contactsName}}</td>
                <td align="left" style="font-weight: normal;">联系电话:{{PrintData.mobile}}</td>
              </tr>
              <tr>
              <td align="left" style="font-weight: normal;">地址: {{PrintData.address}}</td>
              </tr>
           </tbody>

        </table>

        <table id="table3" style="width:100%">
          <thead>
            <tr style="font-weight: normal;">
              <th width="50px" style="font-weight: normal;" align="center">序号</th>
              <th width="" style="font-weight: normal;" align="center">商品名称</th>
              <th width="" style="font-weight: normal;" align="center">规格</th>
              <th width="" style="font-weight: normal;" align="center">价格</th>
              <th width="" style="font-weight: normal;" align="center">下单数量</th>
              <th width="" style="font-weight: normal;" align="center">实际数量</th>
              <th width="" style="font-weight: normal;" align="center">下单金额</th>
              <th width="" style="font-weight: normal;" align="center">实际金额</th>
              <th width="" style="font-weight: normal;" align="center">备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in  PrintData.saleDtails"  :key="index">
              <td align="center">{{ index + 1 }}</td>
              <td align="center">{{item.productName}}</td>
              <td align="center">{{item.skuName}}</td>
              <td align="center">{{item.price}}</td>
              <td align="center">{{item.orderQuantity}}</td>
              <td align="center">{{item.finalQuantity}}</td>

              <td align="center">{{item.orderQuantityPrice}}</td>
              <td align="center">{{item.sumPrice}}</td>
              <td align="center"> </td>
            </tr>
          </tbody>
        </table>

        <table id="table4" style="width:100%">
           <tbody>
              <tr>
                <th width="25%" align="left" style="font-weight: normal;">下单总额:{{PrintData.totalOrderQuantityPrice}}</th>
                <th width="25%" align="left" style="font-weight: normal;">实际总额(不含退/货):{{PrintData.totalSumPric}}</th>
                <th width="25%" align="left" style="font-weight: normal;">
                  <!-- 优惠金额:{{PrintData.activityPreferences}} -->
                </th>
                <th width="25%" align="left" style="font-weight: normal;">
                  <!-- 应付金额(不含退/换货):{{PrintData.amountPay}} -->
                </th>
              </tr>
              <tr>
                <th width="25%" align="left" style="font-weight: normal;height: 26px;">备注说明:</th>
                <th width="25%"></th>
                <th width="25%"></th>
                <th width="25%"></th>
              </tr>
              <tr>
                <th width="25%" align="left" style="font-weight: normal;"></th>
                <th width="25%" align="left" style="font-weight: normal;"></th>
                <th width="25%" align="left" style="font-weight: normal;"></th>
                <th width="25%" align="left" style="font-weight: normal;">客户签字:</th>
              </tr>
              <tr>
                <th width="25%" align="left" style="font-weight: normal;"></th>
                <th width="25%" align="left" style="font-weight: normal;"></th>
                <th width="25%" align="left" style="font-weight: normal;"></th>
                <th width="25%" align="left" style="font-weight: normal;"></th>
              </tr>
           </tbody>
        </table>
      </div>

    </div>
</template>

<script>
import 'print-js'
import Add from './add'
import model from '@/public/listModel.js'
import { Tabs, SearchBar } from '@/components/base.js'
import {
  fetchList,
  fecthPrint,
  fecthListRegion,
  fecthListListDrive
} from '@/api/distribution/salesDelivery.js'
import Util from '@/utils'

// import printOrder from '../component/print.js'

export default {
  name: 'salesDelivery',
  mixins: [model],
  components: {
    Add,
    Tabs,
    SearchBar
  },
  data() {
    return {
      curIndex: 0,
      tabTitles: [],
      searchBarDate: [
        [
          {
            type: 'date',
            value: null,
            key: 'createOn',
            width: '200px',
            placeholder: '配送创建日期'
          },
          {
            type: 'option',
            value: null,
            key: 'regionId',
            class: 'w150',
            placeholder: '配送区域',
            options: []
          },
          {
            type: 'option',
            value: null,
            key: 'driverName',
            class: 'w150',
            placeholder: '配送员',
            options: []
          },
          {
            type: 'option',
            value: null,
            key: 'status',
            class: 'w150',
            placeholder: '配送状态',
            options: [
              { label: '待配送', value: 0 },
              { label: '配送中', value: 1 },
              { label: '已送达', value: 2 },
              { label: '退换货', value: 3 },
              { label: '已收货', value: 4 }
            ]
          },
          {
            type: 'input',
            value: null,
            key: 'orderNoOrCumstorName',
            class: 'w180',
            placeholder: '输入单号/客户名检索'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [{ type: 'add', name: '新增配送派单' }]
      ],
      PrintData: {
        customerTitle: null,
        orderNo: null,
        orderDate: null,
        serialNumber: null,
        driverName: null,
        contactsName: null,
        mobile: null,
        address: null,
        sendDate: null,
        beginTime: null,
        endTime: null,

        totalOrderQuantityPrice: null,
        totalSumPric: null,
        activityPreferences: null,
        amountPay: null,
        saleDtails: []
      }
    }
  },
  created() {
    this.tabTitles = [
      { title: '销售订单', value: 0 },
      { title: '销售换货', value: 1 }
    ]
  },
  mounted() {
    const util = new Util()
    this.searchBarDate[0][0].value = util.getToday()
    if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    this.fecthOption()
  },
  methods: {
    tabsCallBack(item) {
      this.curIndex = item.value
      this.searchBarDate[0][3].value = null
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
      if (item.value) {
        this.searchBarDate[0][3].options = [
          { label: '待配送', value: 0 },
          { label: '配送中', value: 1 },
          { label: '已送达', value: 2 },
          { label: '已收货', value: 4 }
        ]
      } else {
        this.searchBarDate[0][3].options = [
          { label: '待配送', value: 0 },
          { label: '配送中', value: 1 },
          { label: '已送达', value: 2 },
          { label: '退换货', value: 3 },
          { label: '已收货', value: 4 }
        ]
      }
    },
    // 数据请求
    fetchList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        type: this.curIndex
      }
      fetchList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthOption() {
      fecthListRegion()
        .then(({ data }) => {
          if (Array.isArray(data)) {
            for (const item of data) {
              item.label = item.title
              item.value = item.pk
            }
            this.searchBarDate[0][1].options = data
          }
        })
        .catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      // 配送员
      fecthListListDrive()
        .then(({ data }) => {
          if (Array.isArray(data)) {
            for (const item of data) {
              item.label = item.name
              item.value = item.id
            }
            this.searchBarDate[0][2].options = data
          }
        })
        .catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
    },
    searchAction(item) {
      if (!item) return
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        type: this.curIndex,
        ...item
      }
      fetchList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    resetFetchList() {
      const util = new Util()
      this.searchBarDate[0][0].value = util.getToday()
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
    // 弹层操作
    clickToEditor(index, row) {
      // 点击查看
      row.flag = this.curIndex
      this.$setKeyValue(this.add, {
        visiable: true,
        data: {
          type: 'view',
          obj: row,
          title: this.curIndex === 0 ? '销售订单配送详情' : '销售换货配送详情'
        }
      })
    },
    clickToMap(index, row) {
      row.flag = this.curIndex
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'map', obj: row, title: '配送路线地图' }})
    },
    showAdd() {
      this.$setKeyValue(this.add, {
        visiable: true,
        data: { type: 'add', obj: {}, title: '新增配送派单' }
      })
    },
    clickToPrint(index, row) {
      if (!row.id) return
      // this.$message({ type: 'info', message: '请耐心等待,获取打印数据中....', showClose: true })
      fecthPrint({ id: row.id, type: 0 }).then(({ data }) => {
        this.PrintData = Object.assign(this.PrintData, data)
        if (data.isPackage === 0) {
          // this.printBarCode([1, 3, 3])
          this.$nextTick().then(() => {
            if (window.printJS) {
              window.printJS({
                printable: 'salesDelivery',
                type: 'html',
                targetStyles: ['*']
              })
            }
          })
        } else {
          this.$message({ type: 'warning', message: '该订单未打包完成,无法打印订单明细' })
          return
        }
      })
    },
    refrehList() {
      if (this.$refs['searchBar']) this.$refs['searchBar'].sendSearchParams()
    }
  }
}
</script>

<style scoped lang="scss">
.salesDeliveryA{
  position: relative;
  #salesDelivery{
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
}
</style>
