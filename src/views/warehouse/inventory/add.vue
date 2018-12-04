<!-- 查看商品出/入库数量明细 -->
<template>
      <div class="content-box">
        <div class="header-bar" slot="title">
           <div class="left"> 查看商品出/入库数量明细 </div>
           <div class="right">
              <el-button type="text" size="mini" @click.stop="refresh">刷新</el-button>
              <el-button type="text" size="mini" @click.stop="close">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
          <el-form :model="form" ref="form" label-width="120px" :inline="true">
            <div class="row-item">
                <div class="row-title" style="margin-left: 25px;">基本信息</div>
                <div class="row-content basicInfo">
                  <el-row>

                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="商品名称:">
                        <span v-if="propsSonData.title" v-cloak>{{propsSonData.title}}</span>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="基本单位:">
                        <span v-if="propsSonData.basicUnit" v-cloak>{{propsSonData.basicUnit}}</span>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="10" :md="8" :lg="6">
                      <el-form-item label="仓库:">
                        <span v-if="propsSonData.stockInfoName" v-cloak>{{propsSonData.stockInfoName}}</span>
                      </el-form-item>
                    </el-col>

                  </el-row>
                </div>
            </div>

            <div class="row-item" style="margin-top: -30px;">
              <div class="row-content">
                <el-row :gutter="30" style="margin:0">

                  <el-col :span="12">
                      <div class="row-title">出库明细</div>
                      <search-bar :data="searchBarData" ref="searchBarLeft" @search="searchAction" @reset="reset"></search-bar>
                      <!-- 表格 -->
                      <table-contain  :height.sync="table.maxHeight">
                        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
                          <el-table-column label="序号" width="50" align="center">
                            <template slot-scope="scope">
                              <span>{{scope.$index + 1}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="outageTime" label="出库时间" align="center"></el-table-column>
                          <el-table-column prop="outQuantity" label="出库数量(基本单位)" align="center"></el-table-column>
                          <el-table-column label="出库类型" align="center">
                             <template slot-scope="scope">
                                <span v-cloak v-if="scope.row.storehouseType==1">销售订单</span>
                                <span v-cloak v-if="scope.row.storehouseType==2">销售退货</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="outOrderNo" label="关联出库单号" align="center"></el-table-column>
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

                  </el-col>

                  <el-col :span="12">
                      <div class="row-title">入库明细</div>
                      <search-bar :data="searchBarDataH" ref="searchBarRight" @search="searchActionH" @reset="resetH"></search-bar>
                      <!-- 表格 -->
                      <table-contain  :height.sync="table.maxHeight">
                        <el-table :data="form.rightTable" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
                          <el-table-column label="序号" width="50" align="center">
                            <template slot-scope="scope">
                              <span>{{scope.$index + 1}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="warehouseTime" label="入库时间" align="center"></el-table-column>
                          <el-table-column prop="quantity" label="入库数量(基本单位)" align="center"></el-table-column>
                          <el-table-column label="入库类型" align="center">
                             <template slot-scope="scope">
                                <span v-if="scope.row.storageType === 1"> 采购订单 </span>
                                <span v-if="scope.row.storageType === 2"> 销售退货 </span>
                                <span v-if="scope.row.storageType === 3"> 销售换货 </span>
                                <span v-if="scope.row.storageType === 4"> 其他 </span>
                                <span v-if="scope.row.storageType === 5"> 采购退换货 </span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="inOrderNo" label="关联入库单号" align="center"></el-table-column>
                        </el-table>

                        <el-pagination
                          slot="footer"
                          @size-change="handleSizeChangeH"
                          @current-change="handleCurrentChangeH"
                          :current-page="paginationH.page"
                          :page-sizes="paginationH.pageSizes"
                          :page-size="paginationH.size"
                          layout="total, sizes, prev, pager, next"
                          :total="paginationH.total">
                        </el-pagination>

                      </table-contain>
                  </el-col>

                </el-row>
              </div>
            </div>

          </el-form>
        </div>
      </div>

</template>

<script>
import model from '@/public/listModel.js'
import addModel from '@/public/addModel.js'
import { fecthOutReList } from '@/api/warehouse/goodsOut.js'
import { fecthListInfo } from '@/api/warehouse/goodsIn.js'

export default {
  name: 'alesRecord',
  mixins: [model, addModel],
  data() {
    return {
      searchBarData: [
        [
          {
            type: 'date',
            value: '',
            key: 'outageTime',
            class: 'w180',
            placeholder: '出库日期'
          },
          { type: 'option', value: null, key: 'storehouseType', class: 'w150', placeholder: '出库类别', options: [
            { label: '销售订单', value: 1 },
            { label: '销售换货', value: 2 }
          ] },
          {
            type: 'input',
            value: null,
            key: 'inputContent',
            class: 'w180',
            placeholder: '出库单号检索'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        []
      ],
      searchBarDataH: [
        [
          {
            type: 'date',
            value: '',
            key: 'warehouseTime',
            class: 'w180',
            placeholder: '入库日期'
          },
          { type: 'option', value: null, key: 'storageType', class: 'w150', placeholder: '入库类别', options: [
            { label: '采购订单', value: 1 },
            { label: '销售退货', value: 2 },
            { label: '销售换货', value: 3 },
            { label: '采购退换货', value: 5 },
            { label: '其他', value: 4 }
          ] },
          {
            type: 'input',
            value: null,
            key: 'inputContent',
            class: 'w180',
            placeholder: '入库单号检索'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        []
      ],
      form: {
        rightTable: []
      },
      paginationH: {
        pageSizes: [10, 20, 50, 100], // 默认分页可选择的每页显示的页数
        size: 10, // 分页每页默认显示10条
        index: 1, // 当前默认第一页
        total: 0 // 总条数
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      if (this.$refs['searchBarLeft']) this.$refs['searchBarLeft'].sendSearchParams()
      if (this.$refs['searchBarRight']) this.$refs['searchBarRight'].sendSearchParams()
    })
  },
  methods: {
    close() {
      this.$emit('close')
    },
    searchAction(item) {
      if (!this.propsSonData.id) return
      fecthOutReList({ productId: this.propsSonData.id, ...item }).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    handleSizeChange(value) {
      this.pagination.size = value
      if (this.$refs['searchBarRight']) this.$refs['searchBarRight'].sendSearchParams()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      if (this.$refs['searchBarRight']) this.$refs['searchBarRight'].sendSearchParams()
    },

    searchActionH(item) {
      if (!this.propsSonData.id) return
      fecthListInfo({ productId: this.propsSonData.id, ...item }).then(({ data }) => {
        this.form.rightTable = data.rows
        this.paginationH.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    handleSizeChangeH(value) {
      this.paginationH.size = value
      if (this.$refs['searchBarLeft']) this.$refs['searchBarLeft'].sendSearchParams()
    },
    handleCurrentChangeH(value) {
      this.paginationH.index = value
      if (this.$refs['searchBarLeft']) this.$refs['searchBarLeft'].sendSearchParams()
    },

    refresh() {
      if (this.$refs['searchBarLeft']) this.$refs['searchBarLeft'].clickReset()
      if (this.$refs['searchBarRight']) this.$refs['searchBarRight'].clickReset()
    },
    reset() {
      if (this.$refs['searchBarLeft']) this.$refs['searchBarLeft'].sendSearchParams()
    },
    resetH() {
      if (this.$refs['searchBarRight']) this.$refs['searchBarRight'].sendSearchParams()
    }
  }
}
</script>

<style scoped lang="scss">
.content-box {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .header-bar {
    .left{
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
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.23);
  }

  .content-bar{
    margin-top: 50px;
  }
}
</style>
