<!-- 验收台-采购入库 -->
<template>
    <div class="inView">

      <div class="search-bar">
        <div class="left">
          <el-date-picker :style="{width:'140px'}" 
            size="small"
            v-model="searchBarData.createTime"
            :clearable="false"
            value-format="yyyy-MM-dd" 
            type="date" placeholder="订单创建时间">
            </el-date-picker>
        </div>

        <div class="left">
          <CascaderBox v-model="CascaderBoxDTO"></CascaderBox>
        </div>

        <div class="left">
          <el-input style="width:180px" v-model="searchBarData.orderNo" size="small" @keyup.enter.native="fecthList" placeholder="输入订单编号检索"></el-input>
        </div>

         <div class="left">
            <el-button  type="primary" size="small" @click.stop="fecthList" > 搜索 </el-button>
        </div>

        <div class="left">
            <el-button size="small" @click.stop="reset" > 重置 </el-button>
        </div>

        <div class="right">
          <div class="left">
            <!-- <el-button size="small"> 导出Excel </el-button> -->
          </div>
        </div>
      </div>

      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" v-loading="tableLoading" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="采购订单编号" align="center"></el-table-column>
          <el-table-column prop="createdOn" label="采购订单创建时间" align="center"></el-table-column>
          <el-table-column prop="sourceType" label="采购类型" align="center">
            <template slot-scope="scope" align="center">
              <span v-cloak v-if="scope.row.purchaseType ===2"> 供应商直供 </span>
              <span v-cloak v-if="scope.row.purchaseType ===1"> 市场自采 </span>
            </template>
          </el-table-column>
          <el-table-column prop="personnelName" label="采购员/供应商" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="180">
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
      <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refrehList" @edit="refrehList"></add>
      
    </div>
</template>

<script>
import Add from './inViewAdd'
import model from '@/public/listModel.js'
import { Tabs, CascaderBox } from '@/components/base.js'
import { fecthList } from '@/api/buy/buyOrders.js'
export default {
  name: 'buyPlan',
  mixins: [model],
  components: {
    Tabs,
    Add,
    CascaderBox
  },
  data() {
    return {
      todayTime: '',
      curIndex: 0,
      CascaderBoxDTO: null,
      TipsBarData: [],
      searchBarData: {
        createTime: null,
        orderNo: null,
        purchaseType: null,
        personnelId: null
      }
    }
  },
  created() {
    this.tabTitles = [
      { title: '全部', value: null },
      { title: '待采购', value: 1 },
      { title: '采购中', value: 2 },
      { title: '待收货', value: 3 },
      { title: '已收货', value: 4 }
    ]
  },
  mounted() {
    const date = new Date()
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    const ymd = date.getFullYear() + '-' + month + '-' + day
    this.todayTime = ymd
    this.searchBarData.createTime = ymd
    this.fecthList()
  },
  methods: {
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fecthList()
    },
    clickMoreCommand(command) {
      this.$message({ type: 'success', message: command, duration: 0, showClose: true })
    },
    // 数据请求
    fecthList() {
      this.tableLoading = true
      if (this.CascaderBoxDTO) {
        this.searchBarData.purchaseType = this.CascaderBoxDTO.purchaseType
        this.searchBarData.personnelId = this.CascaderBoxDTO.supplyOrBuyerId
      }
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        ...this.searchBarData
      }
      fecthList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.$message({ type: 'error', message: e.msg })
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
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '查看采购入库详情' }})
    },
    refrehList() {
      this.fecthList()
    },
    reset() {
      this.CascaderBoxDTO = null
      this.searchBarData = {
        createTime: null,
        orderNo: null,
        purchaseType: null,
        personnelId: null
      }
      this.searchBarData.createTime = this.todayTime
      this.fecthList()
    }
  }
}
</script>

<style scoped>
 
</style>