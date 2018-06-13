<!-- 商品列表 -->
<template>
    <div class="goodsList">

      <search-bar ref="searchBar" :data="searchBarData" @search="searchAction" @add="showAdd()" @reset="resetSearchBar" @command="clickMoreCommand"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="商品图片" align="center"></el-table-column>
          <el-table-column prop="createdOn" label="商品分类" align="center"></el-table-column>
          <el-table-column prop="customerName" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="customerName" label="单位" align="center"></el-table-column>
          <el-table-column prop="customerName" label="市场价" align="center"></el-table-column>
          <el-table-column prop="customerName" label="别名" align="center"></el-table-column>
          <el-table-column prop="customerName" label="采购类型" align="center"></el-table-column>
          <el-table-column prop="customerName" label="采购员/供应商" align="center"></el-table-column>

          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope" align="center">
              {{ scope.row.status | filterStatus}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="click2view(scope.$index,scope.row)">订单查看</el-button>
              <el-button type="text" size="mini" @click.stop="click2follow(scope.$index, scope.row)">订单跟踪</el-button>
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
    </div>
</template>

<script>
import Add from './add'
import model from '@/public/listModel.js'
import { orderList } from '@/api/orders.js'
export default {
  name: 'goodsList',
  mixins: [model],
  components: {
    Add
  },
  data() {
    return {
      curIndex: 0,
      tabTitles: [
        { title: '全部', value: '' },
        { title: '待付款', value: 6 },
        { title: '待发货', value: 0 },
        { title: '待收货', value: 1 },
        { title: '退/换货', value: 2 },
        { title: '已取消', value: 4 },
        { title: '已关闭', value: 5 }
      ],
      searchBarData: [
        [
          { type: 'option', value: null, key: 'orderSource', class: 'w110', placeholder: '分类', options: [
            { label: 'App', value: 0 },
            { label: '微信公众号', value: 1 },
            { label: '微信小程序', value: 2 }]
          },
          //   商品状态, 0 上架，1 下架
          { type: 'option', value: null, key: 'goodsStatus', class: 'w110', placeholder: '全部状态', options: [
            { label: '上架', value: 0 },
            { label: '下架', value: 1 }]
          },
          //   1：供货，2：自采，3：未指定
          { type: 'option', value: null, key: 'purchaseType', class: 'w110', placeholder: '采购类型', options: [
            { label: '供应商直供', value: 1 },
            { label: '市场自采购', value: 2 },
            { label: '未指定', value: 3 }]
          },
          { type: 'input', value: null, key: 'title', class: 'w180', placeholder: '输入订单编号／客户名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ]
    }
  },
  created() {

  },
  mounted() {
    this.fecthList()
  },
  filters: {
    // <!-- status;//状态  0 待发货  1 待收货  2 退换货  3 已完成  4已取消 5 已关闭  6 待付款 -->
    filterStatus(status) {
      switch (status) {
        case 0:
          return '待发货'
        case 1:
          return '待收货'
        case 2:
          return '退换货'
        case 3:
          return '已完成'
        case 4:
          return '已取消'
        case 5:
          return '已关闭'
        case 6:
          return '待付款'
        default:
          return ''
      }
    }
  },
  methods: {
    searchAction(params) {
      console.log(params, 'xx')
      this.paramsData = {
        status: this.curIndex,
        orderNoOrName: params.orderNoOrName || '',
        sendTime: params.sendTime || ''
      }
      this.fecthList()
    },
    clickMoreCommand(command) {
      this.$message({ type: 'success', message: command, duration: 0, showClose: true })
    },
    // 数据请求
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        status: this.curIndex,
        ...this.paramsData
      }
      orderList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: '列表加载失败', duration: 0, showClose: true })
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fecthList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fecthList()
    },
    // 弹层操作
    click2view(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row }})
    },
    click2follow(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'follow', obj: row }})
    },
    showAdd(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: row }})
    },
    refrehList() {

    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.$nextTick().then(() => {
        this.$refs['searchBar'].sendSearchParams()
      })
    },
    resetSearchBar() {
      this.curIndex = 0
    }

  }
}
</script>

<style scoped lang="scss">
.goodsList {
  width: 100%;
  height: 100%;
  .content {
    padding: 20px;
  }
}
</style>