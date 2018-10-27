<!-- 销售配送 -->
<template>
    <div id="salesDelivery-1">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

			<search-bar :data="searchBarDate" @search="searchAction" @reset="fetchList"  @add="showAdd"></search-bar>
      <!-- 表格 -->
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
					<el-table-column prop="status" label="配送状态" align="center">
            <template slot-scope="scope" align="center">
               <span v-if="scope.row.status===0"> 待配送 </span>
               <span v-if="scope.row.status===1"> 配送中 </span>
               <span v-if="scope.row.status===2"> 已送达 </span>
               <span v-if="scope.row.status===3"> 退换货 </span>
               <span v-if="scope.row.status===4"> 已收货 </span>
            </template>
          </el-table-column>
 
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope" align="center">
              <!-- <el-button type="text" size="mini" @click.stop="clickToPrint(scope.$index,scope.row)">打印</el-button> -->
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

      <!-- <table id="salesDelivery" border="1" style="border-collapse:collapse;border:solid 1px;" bordercolor="#000000">
        <thead>
          <tr>
            <th>序号</th>
            <th>商品名称</th>
            <th>规格</th>
            <th>价格</th>
            <th>下单数量</th>
            <th>实际数量</th>
            <th>下单金额</th>
            <th>实际金额</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in  10"  :key="index">
            <td>{{ index + 1 }}</td>
            <td>商品名称</td>
            <td>规格</td>
            <td>价格</td>
            <td>下单数量</td>
            <td>实际数量</td>
            <td>下单金额</td>
            <td>实际金额</td>
          </tr>
        </tbody>
      </table> -->
 

    </div>
</template>

<script>
import Add from './add'
import model from '@/public/listModel.js'
import { Tabs, SearchBar } from '@/components/base.js'
import {
  fetchList,
  fecthListRegion,
  fecthListListDrive
} from '@/api/distribution/salesDelivery.js'
import printOrder from '../component/print.js'

export default {
  name: 'salesDelivery',
  mixins: [model, printOrder],
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
      ]
    }
  },
  created() {
    this.tabTitles = [
      { title: '销售订单', value: 0 },
      { title: '销售换货', value: 1 }
    ]
  },
  mounted() {
    this.fetchList()
    this.fecthOption()
  },
  methods: {
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fetchList()
    },
    // 数据请求
    fetchList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        type: this.curIndex
      }
      fetchList(data)
        .then(({ data }) => {
          this.table.data = data.rows
          this.pagination.total = data.total
        })
        .catch(e => {
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
      fetchList(data)
        .then(({ data }) => {
          this.table.data = data.rows
          this.pagination.total = data.total
        })
        .catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fetchList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fetchList()
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
          title:
                        this.curIndex === 0
                          ? '销售订单配送详情'
                          : '销售换货配送详情'
        }
      })
    },
    showAdd() {
      this.$setKeyValue(this.add, {
        visiable: true,
        data: { type: 'add', obj: {}, title: '新增配送派单' }
      })
    },
    clickToPrint(index, row) {
      // console.log(row)
      // this.printGoods()
    },
    refrehList() {
      this.fetchList()
    }
  }
}
</script>

<style scoped lang="scss">
</style>