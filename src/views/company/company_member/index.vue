<template>
  <div class="page company_list" style="width: 100%">
      <!-- 顶部搜索区域 -->
      <div class="search-bar">
        <div class="left">
          <el-input size="small" placeholder="名称检索" v-model.trim="codeOrname" style="width:140px"></el-input>
          <el-button type="primary" size="small" @click="clickSearch"> 搜索 </el-button>
          <el-button size="small" @click="reset"> 重置 </el-button>
        </div>
        <div class="right">
          <!-- <el-button size="small" type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出 </el-button> -->
        </div>
      </div>

      <!-- 表格 -->
      <TableContain :height.sync="table.maxHeight">
        <el-table :data="table.data" :size="table.size" :max-height="table.maxHeight" slot="table" style="width: 100%">
        <el-table-column align="center" label="序号" width="40">
          <template slot-scope="scope">
             <span v-text="scope.$index+1"></span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="企业ID"> </el-table-column>
        <el-table-column align="center" prop="name" label="企业名称"> </el-table-column>
        <el-table-column align="center" prop="addr" label="地址"> </el-table-column>
        <el-table-column align="center" prop="number" label="营业执照"> </el-table-column>
        <el-table-column align="center" prop="introduction" label="企业介绍"> </el-table-column>
        <el-table-column align="center" prop="logo_pic_path" label="企业LOGO"> </el-table-column>
        <el-table-column align="center" prop="certification" label="实名状态">
          <template slot-scope="scope">
            <el-tag  size="mini" v-if="scope.row.certification ===0" type="gray">未认证</el-tag>
            <el-tag  size="mini" v-if="scope.row.certification ===1" type="gray">提交认证</el-tag>
            <el-tag  size="mini" v-if="scope.row.certification ===2" type="success">已认证</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="企业状态">
          <template slot-scope="scope">
            <el-tag  size="mini" v-if="scope.row.status ===0" type="danger">已失效</el-tag>
            <el-tag  size="mini" v-if="scope.row.status ===1" type="success">正常使用中</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="title_en" label="系统显示使能">
          <template slot-scope="scope">
            <el-tag  size="mini" v-if="scope.row.title_en ===0" type="danger">不显示</el-tag>
            <el-tag  size="mini" v-if="scope.row.title_en ===1" type="success">显示</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作" width="210">
          <template slot-scope="scope">
          <el-button type="primary" size="mini"> 编辑 </el-button>
          <el-button size="mini" type="success"> 正常 </el-button>
          <el-button size="mini"> 正常 </el-button>
          <el-button size="mini" type="danger"> 故障 </el-button>
        </template>
        </el-table-column>
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
import listModel from '@/public/listModel.js'
import { fetchShopAssistantInfo } from '@/api/shopInfo'
export default {
  mixins: [listModel],
  name: 'company_member',
  components: {

  },
  data() {
    return {
      downloadLoading: false,
      codeOrname: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.fetchData()
    }, 20)
  },
  methods: {
    reset() {

    },
    clickSearch() {

    },
    onRefresh() {
      console.log('刷新页面')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    fetchData() {
      const params = {
        ...this.searchParams,
        page: this.pagination.page - 1,
        size: this.pagination.size
      }
      fetchShopAssistantInfo(params).then(({ data }) => {
        this.table.data = data.content
        this.pagination.total = data.totalElements
      }).catch((error) => {
        console.log(error)
      })
    },
    handleDownload() {

    }
  }
}
</script>