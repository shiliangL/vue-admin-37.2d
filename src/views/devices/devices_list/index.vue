<template>
  <div class="page">
      <h1>devices_list</h1>
       <table-contain :height.sync="table.maxHeight">
    <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="品牌编码" align="center"></el-table-column>
      <el-table-column prop="name" label="品牌名称" align="center"></el-table-column>
 
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
         <el-button type="primary" size="mini" @click="clickEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="clickDelete(scope.$index, scope.row)">删除</el-button>
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
      layout="total, sizes, prev, pager, next"
      :total="pagination.total">
    </el-pagination>
  </table-contain> 
  
  </div>
</template>

<script>
import model from '@/public/listModel.js'
export default {
  mixins: [model],
  name: 'devices_list',
  data() {
    return {}
  }
}
</script>

