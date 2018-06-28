<template>
    <div>
      <!-- 搜索 -->
			<search-bar ref="searchBar" :data="searchBarData" @search="searchAction"  @add="showAdd"  @reset="resetSearchBar" @command="clickMoreCommand"></search-bar>
			<!-- 提示 -->
			<div class="tipsNum">
				商品共计：10      未生成采购计划商品：2
			</div>
			<!-- 表格 -->
			<el-table :data="table.data" :size="table.size" max-height="450" style="width: 100%;" highlight-current-row>

				<el-table-column label="序号" width="50" align="center">
					<template slot-scope="scope">
						<span>{{scope.$index + 1}}</span>
					</template>
				</el-table-column>

				<el-table-column prop="orderNo" label="采购计划单号" align="center"></el-table-column>
				<el-table-column prop="sourceType" label="采购计划来源" align="center">
					<template slot-scope="scope" align="center">
						<span v-cloak v-if="scope.row.sourceType ===1"> 销售订单 </span>
						<span v-cloak v-if="scope.row.sourceType ===2"> 后台新增 </span>
					</template>
				</el-table-column>
				<el-table-column prop="createdOn" label="采购计划创建时间" align="center"></el-table-column>
				<el-table-column prop="applicationDate" label="采购申请时间" align="center"></el-table-column>
				<el-table-column prop="createdName" label="创建人" align="center"></el-table-column>
				<el-table-column prop="purchaserName" label="申请人" align="center"></el-table-column>

				<el-table-column label="操作" align="center" width="180">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="mini" @click.stop="click2view(scope.$index,scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>

    </div>
</template>

<script>
    export default {
      name: 'addcheck'
    }
</script>

<script>
import model from '@/public/listModel.js'
// import { fecthList, fecthTipsBar } from '@/api/buy/buyPlan.js'
export default {
  name: 'addcheck',
  mixins: [model],
  data() {
    return {
      curIndex: 0,
      TipsBarData: [],
      searchBarData: [
        [
          { type: 'date', value: null, key: 'generationTime', width: '200px', placeholder: '送货时间' },
          { type: 'date', value: null, key: 'applicationDate', width: '200px', placeholder: '申请时间' },
          { type: 'input', value: null, key: 'orderNo', class: 'w180', placeholder: '输入采购计划单号检索' },
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
  mounted() {
    this.table.data = [{}]
  },
  methods: {
    searchAction(params) {
      this.paramsData = {
        auditStatus: params.auditStatus,
        sourceType: params.sourceType,
        generationTime: params.generationTime,
        applicationDate: params.applicationDate,
        orderNo: params.orderNo
      }
      this.fecthList()
    },
    clickMoreCommand(command) {
      this.$message({ type: 'success', message: command, duration: 0, showClose: true })
    },
    // 数据请求
    fecthList() {
      // this.fecthTipsBar()
      // const { index, size } = this.pagination
      // const data = {
      //   index,
      //   size,
      //   auditStatus: this.curIndex,
      //   ...this.paramsData
      // }
      // fecthList(data).then(({ data }) => {
      //   this.table.data = data.rows
      //   this.pagination.total = data.total
      // }).catch(e => {
      //   this.$message({ type: 'error', message: e })
      // })
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
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '采购计划详情' }})
    },
    click2follow(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'follow', obj: row }})
    },
    showAdd() {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: {}, title: '新增采购计划（后台新增可预采购商品）' }})
    },
    TipsBarCallBack(value) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'check', obj: {}, title: '销售订单采购计划' }})
    },
    refrehList() {

    },
    resetSearchBar() {
      this.curIndex = 0
      this.fecthList()
    }
  }
}
</script>

<style scoped>
.tipsNum{
	padding: 10px;
}
</style>