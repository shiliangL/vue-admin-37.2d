<!-- 客户信息 -->
<template>
    <div class="customerClass">

      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

      <div class="search-bar">
        <div class="left">
          <el-select size="small" v-model="searchBarData.categoryId" clearable filterable placeholder="客户类别">
            <el-option v-for="sub in options.categoryOption" :key="sub.pk" :label="sub.title" :value="sub.pk" ></el-option>
          </el-select>
        </div>

        <div class="left">
          <el-select size="small" v-model="searchBarData.staffId" clearable filterable placeholder="客户经理">
            <el-option v-for="sub in options.managerOption" :key="sub.staffId" :label="sub.staffName" :value="sub.staffId" ></el-option>
          </el-select>
        </div>

        <div class="left">
          <el-select size="small" v-model="searchBarData.regionId" clearable filterable placeholder="配送区域">
            <el-option v-for="sub in options.areaOption" :key="sub.id" :label="sub.title" :value="sub.id" ></el-option>
          </el-select>
        </div>

        <div class="left">
          <el-select size="small" v-model="searchBarData.categoryId" clearable filterable placeholder="配送员">
            <el-option v-for="sub in options.categoryOption" :key="sub.pk" :label="sub.title" :value="sub.pk" ></el-option>
          </el-select>
        </div>

        <div class="left">
          <el-select size="small" v-model="searchBarData.categoryId" clearable filterable placeholder="创建渠道">
            <el-option v-for="sub in options.channelOption" :key="sub.label" :label="sub.title" :value="sub.label" ></el-option>
          </el-select>
        </div>

        <div class="left">
            <el-date-picker :style="{width:'140px'}" size="small" v-model="searchBarData.createdOn" value-format="yyyy-MM-dd" type="date"></el-date-picker>
        </div>

        <div class="left">
          <el-input style="width:180px" v-model="searchBarData.orderNo" size="small" @keyup.enter.native="fecthList" placeholder="输入商品名称检索"></el-input>
        </div>

         <div class="left">
            <el-button  type="primary" size="small" @click.stop="fecthList" > 搜索 </el-button>
        </div>

        <div class="left">
            <el-button size="small" @click.stop="resetSearchBar" > 重置 </el-button>
        </div>

        <div class="right">
          <div class="left">
            <el-button size="small" @click="showAdd"> 新增 </el-button>
          </div>
        </div>
      </div>


      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="loginName" label="客户账号" align="center"></el-table-column>
          <el-table-column prop="title" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="客户类别" align="center"></el-table-column>
          <el-table-column prop="managerName" label="客户经理" align="center"></el-table-column>
          <el-table-column prop="regionTitle" label="配送区域" align="center"></el-table-column>
          <el-table-column prop="driverName" label="配送员" align="center"></el-table-column>
          <el-table-column prop="orderResource" label="创建渠道" align="center">
            <template slot-scope="scope" align="center">
              <span v-cloak v-if="scope.row.orderResource ===0"> App </span>
              <span v-cloak v-if="scope.row.orderResource ===1"> 公众号 </span>
              <span v-cloak v-if="scope.row.orderResource ===2"> 小程序 </span>
              <span v-cloak v-if="scope.row.orderResource ===3"> 后台 </span>
            </template>
          </el-table-column>
          <el-table-column prop="createdOn" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="aduitTime" label="审核时间" align="center"></el-table-column>
          <el-table-column prop="aduitName" label="审核人" align="center"></el-table-column>
          <el-table-column prop="accountStatus" label="账号状态" align="center">
             <template slot-scope="scope" align="center">
              <span v-cloak  v-if="scope.row.accountStatus===0"> 禁用 </span>
              <span v-cloak  v-if="scope.row.accountStatus===1"> 启用 </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
             <template slot-scope="scope" align="center">
              <span> {{scope.row.status | filterStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="90">
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
import Add from './add'
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
import { fetchList, fetchOptions } from '@/api/customer/customerClass.js'

export default {
  name: 'buyPlan',
  mixins: [model],
  components: {
    Tabs,
    Add
  },
  data() {
    return {
      curIndex: 0,
      TipsBarData: [],
      searchBarData: {
        categoryId: null,
        staffId: null,
        regionId: null,
        driverId: null,
        createdOn: null,
        orderResource: null
      },
      options: {
        managerOption: [],
        driverOption: [],
        categoryOption: [],
        areaOption: [],
        channelOption: [{ label: 0, title: 'App' }, { label: 1, title: '公众号' }, { label: 2, title: '小程序' }, { label: 3, title: '后台' }]
      }
    }
  },
  filters: {
    filterStatus(status) {
      switch (status) {
        case 0:
          return '未激活'
        case 1:
          return '待审核'
        case 2:
          return '审核拒绝'
        case 3:
          return '审核通过'
        default:
          return ''
      }
    }
  },
  created() {
    this.tabTitles = [
      { title: '全部', value: null },
      { title: '未激活', value: 0 },
      { title: '待审核', value: 2 },
      { title: '审核通过', value: 3 },
      { title: '审核拒绝', value: 4 }
    ]
  },
  mounted() {
    this.table.data = [{}]
    this.fecthList()
    this.fetchOptions()
  },
  methods: {
    fetchOptions() {
      fetchOptions().then(({ data }) => {
        this.options.managerOption = data.staff
        this.options.categoryOption = data.category
        this.options.areaOption = data.relation
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.$nextTick().then(() => {
        this.$refs['searchBar'].sendSearchParams()
      })
    },
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
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        auditStatus: this.curIndex,
        ...this.paramsData
      }
      fetchList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e })
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
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '客户档案详情' }})
    },
    showAdd() {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: {}, title: '新增客户档案' }})
    },
    refrehList() {
      this.fecthList()
    },
    resetSearchBar() {
      this.curIndex = 0
      this.fecthList()
    }
  }
}
</script>

<style scoped>
.buyPlan{
  background: #fff;
}
</style>