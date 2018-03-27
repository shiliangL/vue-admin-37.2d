<template>
  <div class="page" style="width: 100%">
      <!-- 顶部搜索区域 -->
      <div class="top">
        <div class="left">
          <el-input size="medium" style="width: 200px;" placeholder="请输入内容" class="filter-item" v-model="code2name"></el-input>
          <el-select size="medium" clearable style="width: 90px" class="filter-item" v-model="code2name">
            <el-option size="medium" label="未签" value="no"></el-option>
            <el-option label="已签" value="yes"></el-option>
            <el-option label="解除" value="unwound"></el-option>
            <el-option label="终止" value="stop"></el-option>
          </el-select>
          <el-select  size="medium" clearable class="filter-item" style="width: 130px" v-model="code2name">
            <el-option label="未签" value="no"></el-option>
            <el-option label="已签" value="yes"></el-option>
            <el-option label="解除" value="unwound"></el-option>
            <el-option label="终止" value="stop"></el-option>
          </el-select>
          <el-select size="medium" clearable style="width: 140px" class="filter-item" v-model="code2name">
            <el-option label="未签" value="no"></el-option>
              <el-option label="已签" value="yes"></el-option>
              <el-option label="解除" value="unwound"></el-option>
              <el-option label="终止" value="stop"></el-option>
          </el-select>
          <el-button class="filter-item" size="medium" type="primary" icon="el-icon-search"> 搜索 </el-button>
          <el-button class="filter-item" size="medium" type="primary"> 重置 </el-button>
        </div>
        <div class="rigt">
          <el-button class="filter-item" size="medium" type="primary" @click="openDialog"> 新增 </el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="tableData" style="width: 100%">
        <el-table border :data="tableData" style="width: 100%">
        <el-table-column align="center" prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column align="center" prop="address" label="地址"> </el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <template slot-scope="scope">
          <el-button type="primary" size="mini"> 编辑 </el-button>
          <el-button size="mini" type="success"> 正常 </el-button>
          <el-button size="mini"> 正常 </el-button>
          <el-button size="mini" type="danger"> 故障 </el-button>
        </template>
        </el-table-column>
      </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next"
          :total="400">
        </el-pagination>
      </div>

      <!-- 弹层 -->
      <el-dialog :visible.sync="dialogVisible" title="新增" size="tiny"  @close="closeDialog" @open="openDialog">
        <add-view v-if="addViewVisible" ref="addView" @close="closeDialog" @onRefresh="onRefresh"></add-view>
      </el-dialog>

      <!-- loading 加载 -->
      <!-- {{multiselectValue}} -->
      <!-- <multiselect v-model="multiselectValue" :options="options"></multiselect> -->
      <loading v-model="loading"></loading>
  </div>
</template>
 
<script>
import addView from './addview/addview.vue'
export default {
  name: 'record_query',
  components: {
    addView
  },
  data() {
    return {
      multiselectValue: null,
      options: ['list', 'of', 'options'],
      dialogVisible: false,
      addViewVisible: false,
      loading: true,
      code2name: null,
      currentPage: 2,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {
    // 弹层操作
    openDialog() {
      this.dialogVisible = true
      this.addViewVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
      this.addViewVisible = false
    },
    onRefresh() {
      console.log('刷新页面')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>