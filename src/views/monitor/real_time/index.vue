<template>
  <div class="page" style="width: 100%">
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
        <el-button class="filter-item" size="medium" type="primary"> 新增 </el-button>
        </div>
      </div>

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
  </div>
</template>
 
<script>
export default {
  name: 'record_query',
  data() {
    return {
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
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>