<!-- 订单列表 -->
<template>
    <div class="orderList">
			 <div class="tab-title-layout">
				<ul class="clearfix">
					<li :key="index" v-for="(item, index) in tabTitles" :class="curIndex==index?'active' : ''"  @click="clickTabTitle(index)">{{item}}</li>
				</ul>
  		</div>
      <search-bar :data="searchBarData" @search="searchAction" @add="showAdd()" @command="clickMoreCommand"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="makeOrderTime" label="下单日期" align="center"></el-table-column>
          <el-table-column prop="status" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="shopName" label="订单来源" align="center"></el-table-column>
          <el-table-column prop="purchaseCount" label="支付类型" align="center"></el-table-column>
          <el-table-column prop="purchaseMoney" label="订单状态" align="center"></el-table-column>
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
          layout="total, sizes, prev, pager, next"
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
export default {
  name: 'orderList',
  mixins: [model],
  components: {
    Add
  },
  data() {
    return {
      curIndex: 0,
      tabTitles: [
        '全部',
        '待付款',
        '待发货',
        '待收货',
        '退/换货',
        '已取消',
        '已关闭'
      ],
      searchBarData: [
        [
          { type: 'option', value: null, key: 'status', class: 'w110', placeholder: '订单来源', options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }]
          },
          { type: 'option', value: null, key: 'status', class: 'w110', placeholder: '支付类型', options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }]
          },
          { type: 'date', value: null, key: 'buyDate', class: 'w180', placeholder: '下单日期' },
          { type: 'input', value: null, key: 'nameOrCode', class: 'w180', placeholder: '输入订单编号／客户名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'button', name: '导出' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ]
    }
  },
  created() {
    console.log(this)
  },
  mounted() {
    this.fecthList()
  },
  methods: {
    clickTabTitle(index) {
      this.curIndex = index
    },
    searchAction(params) {
      console.log(params)
    },
    clickMoreCommand(command) {
      this.$message({ type: 'success', message: command, duration: 0, showClose: true })
    },
    // 数据请求
    fecthList() {
      console.log('请求数据')
    },
    // 分页操作区域
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    // 弹层操作
    click2view(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row }})
    },
    click2follow(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'follow', obj: row }})
    },
    refrehList() {

    }

  }
}
</script>

<style scoped lang="scss">
.orderList {
  width: 100%;
  height: 100%;
  .content {
    padding: 20px;
  }
  .tab-title-layout {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #eaeaea;
    ul {
      width: 100%;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 20px;
    }
    li {
      cursor: pointer;
      list-style: none;
      float: left;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      margin-right: 20px;
      padding-right: 20px;
      color: #333333;
      font-size: 14px;
    }
    .active {
			color: #1cbc9c;
      border-bottom: 2px solid #1cbc9c;
    }
  }
}
</style>