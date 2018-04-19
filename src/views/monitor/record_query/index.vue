 



<template>
  <div class="page">
    <div class="search-bar">
      <div class="left">
        <el-input size="small" placeholder="名称检索" v-model.trim="codeOrname" style="width:140px"></el-input>
        <el-button type="primary" size="small" @click="clickSearch"> 搜索 </el-button>
        <el-button size="small" @click="reset"> 重置 </el-button>
      </div>
      <div class="right">
        <el-button size="small" type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出 </el-button>
      </div>
    </div>
      <!-- 表格 设备信息表-->
      <TableContain :height.sync="table.maxHeight">
        <el-table :data="table.data" :size="table.size" :max-height="table.maxHeight" slot="table" style="width: 100%"
        v-loading.body="listLoading" element-loading-text="拼命加载中" highlight-current-row @selection-change="handleSelectionChange"
        ref="multipleTable">
        <el-table-column type="selection" align="center" width="40"></el-table-column>
        <el-table-column align="center" label="序号" width="40">
          <template slot-scope="scope">
            <span v-text="scope.$index+1"></span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="设备ID"> </el-table-column>
        <el-table-column align="center" prop="psn" label="PSN"> </el-table-column>
        <el-table-column align="center" prop="addr" label="安装地址"> </el-table-column>
        <el-table-column align="center" prop="longitude" label="安装经度"> </el-table-column>
        <el-table-column align="center" prop="latitude" label="安装纬度"> </el-table-column>
        <el-table-column align="center" prop="life_cycle" label="生命周期"> </el-table-column>
        <el-table-column align="center" prop="life_start" label="开始时间"> </el-table-column>
        <el-table-column align="center" prop="life_end" label="到期时间"> </el-table-column>
        <el-table-column align="center" prop="iccid" label="ICCID号"> </el-table-column>
        <el-table-column align="center" prop="iccid" label="IMEI/ICCID码"> </el-table-column>
        <el-table-column align="center" prop="repair_status" label="维修状态">
          <template slot-scope="scope">
            <el-tag  size="mini" v-if="scope.row.repair_status ===0" type="success">正常</el-tag>
            <el-tag  size="mini" v-if="scope.row.repair_status ===1" type="gray">报修中</el-tag>
            <el-tag  size="mini" v-if="scope.row.repair_status ===2" type="gray">修理中</el-tag>
            <el-tag  size="mini" v-if="scope.row.repair_status ===3" type="gray">已修好待验证</el-tag>
            <el-tag  size="mini" v-if="scope.row.repair_status ===4" type="danger">已报废</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="expected_lifecycle" label="期望续期/天"> </el-table-column>
        <el-table-column align="center" prop="renewal_ct" label="已续期次数"> </el-table-column>
      </el-table>
        <!-- 分页 -->
        <el-pagination
          slot="page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.page"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next"
          :total="pagination.total">
        </el-pagination>
      </TableContain>

  </div>
</template>

<script>
import { fetchShopAssistantInfo } from '@/api/shopInfo'
import listModel from '@/public/listModel.js'

export default {
  name: 'record_query',
  mixins: [listModel],
  data() {
    return {
      listLoading: true,
      codeOrname: null,
      multipleSelection: [],
      downloadLoading: false
    }
  },
  created() {
    this.filename = '设备历史记录导出'
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    onRefresh() {
      console.log('刷新页面')
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      fetchShopAssistantInfo({ page: 0, size: 10 }).then(({ data }) => {
        this.listLoading = false
        this.table.data = data.content
        this.pagination.total = data.totalElements
      }).catch((error) => {
        console.log(error)
      })
    },
    reset() {

    },
    clickSearch() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/utils/Export2Excel').then(excel => {
          const tHeader = ['Id', 'Title', '安装地址', 'Readings', 'Date']
          const filterVal = ['id', 'title', 'addr', 'pageviews', 'display_time']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({ message: '请选择导出单据', type: 'warning' })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
