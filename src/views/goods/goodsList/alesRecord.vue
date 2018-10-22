<!-- 查看销售记录 -->
<template>
 	<el-form :model="form"  ref="form" label-width="120px" :inline="true">

    <div class="row-item">
        <div class="row-title">基本信息</div>
        <div class="row-content basicInfo">
          <el-row>

            <el-col :xs="24" :sm="10" :md="8" :lg="6">
              <el-form-item label="商品名称:">
                <span v-cloak>{{form.categoryName}}</span>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="10" :md="8" :lg="6">
              <el-form-item label="基本单位:">
              </el-form-item>
            </el-col>
            
            <el-col :xs="24" :sm="10" :md="8" :lg="6">
              <el-form-item label="仓库:">
                <span v-cloak>{{form.title}}</span>
              </el-form-item>
            </el-col>

          </el-row>
        </div>
    </div>

    <div class="row-item">
      <div class="row-title">详细信息</div>
      <div class="row-content">
        <el-row :gutter="30">
          <el-col :span="12">
              <search-bar :data="searchBarData" @search="searchAction" @reset="reset"></search-bar>
              <!-- 表格 -->
              <table-contain  :height.sync="table.maxHeight">
                <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
                  <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.$index + 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="title" label="采购时间" align="center"></el-table-column>
                  <el-table-column prop="remark" label="采购单价" align="center"></el-table-column>
                  <el-table-column prop="createdTime" label="关联采购订单编号" align="center"></el-table-column>
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

          </el-col>
          <el-col :span="12">

              <search-bar :data="searchBarData" @search="searchAction" @reset="reset"></search-bar>
              <!-- 表格 -->
              <table-contain  :height.sync="table.maxHeight">
                <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
                  <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.$index + 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="title" label="销售调价时间" align="center"></el-table-column>
                  <el-table-column prop="remark" label="销售单价" align="center"></el-table-column>
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
          </el-col>
        </el-row>
      </div>
    </div>

	</el-form>
</template>

<script>
// fetchHistoryPrice
import model from '@/public/listModel.js'
import { fetchHistoryPrice } from '@/api/goodsList.js'

export default {
  name: 'alesRecord',
  props: {
    loadID: {
      type: String
    }
  },
  mixins: [model],
  data() {
    return {
      searchBarData: [
        [
          {
            type: 'date',
            value: '',
            key: 'title',
            class: 'w180',
            placeholder: '年/月/日'
          },
          {
            type: 'input',
            value: null,
            key: 'title',
            class: 'w180',
            placeholder: '输入名称检索'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        []
      ],
      form: {

      }
    }
  },
  mounted() {
    this.fetchHistoryPrice()
  },
  methods: {
    fetchHistoryPrice() {
      if (!this.loadID) return
      fetchHistoryPrice({ id: this.loadID }).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
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
    searchAction() {},
    reset() {}
  }
}
</script>

<style scoped>

</style>