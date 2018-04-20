<template>
  <div class="page" style="width: 100%">
    <div class="flex-box">
      <div>
        <SearchTree class="SearchTree" @clickSelect="clickSelect"></SearchTree>
      </div>
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClickTabs">
          <el-tab-pane label="设备配置" name="0"></el-tab-pane>
          <el-tab-pane label="设备测量值" name="1"></el-tab-pane>
        </el-tabs>
        <TableContain :height.sync="table.maxHeight">
          <el-table :data="table.data" :size="table.size" :max-height="table.maxHeight" slot="table" style="width: 100%">
          <el-table-column align="center" label="序号" width="40">
            <template slot-scope="scope">
              <span v-text="scope.$index+1"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="id" label="设备ID"> </el-table-column>
          <el-table-column align="center" prop="psn" label="PSN"> </el-table-column>
          <el-table-column align="center" prop="addr" label="安装地址"> </el-table-column>
          <template v-if="activeName===0">
            <el-table-column align="center" prop="longitude" label="安装经度"> </el-table-column>
            <el-table-column align="center" prop="latitude" label="安装纬度"> </el-table-column>
            <el-table-column align="center" prop="life_cycle" label="生命周期"> </el-table-column>
            <el-table-column align="center" prop="life_start" label="开始时间"> </el-table-column>
            <el-table-column align="center" prop="life_end" label="到期时间"> </el-table-column>
          </template>
          <template v-else>
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
          </template>
          <!-- <el-table-column align="center" prop="address" label="操作">
            <template slot-scope="scope">
            <el-button type="primary" size="mini"> 编辑 </el-button>
            <el-button size="mini" type="success"> 正常 </el-button>
            <el-button size="mini"> 正常 </el-button>
            <el-button size="mini" type="danger"> 故障 </el-button>
          </template>
          </el-table-column> -->
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
    </div>
  </div>
</template>
 
<script>
import listModel from '@/public/listModel.js'
import { fetchShopAssistantInfo } from '@/api/shopInfo'
import { SearchTree } from '@/components/indexEx.js'
export default {
  mixins: [listModel],
  name: 'real_time',
  components: {
    SearchTree
  },
  data() {
    return {
      activeName: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.fetchData()
    }, 2000)
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
      fetchShopAssistantInfo({ page: 0, size: 10 })
        .then(({ data }) => {
          this.table.data = data.content
          this.pagination.total = data.totalElements
        })
        .catch(error => {
          console.log(error)
        })
    },
    clickSelect(item) {
      console.log(item, '选择对象')
    },
    handleClickTabs(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .flex-box {
    .tree {
    }
    .content {
      margin-left: 10px;
      width: 100%;
    }
  }
}
</style>

 