<template>
  <div class="page">

    <search-bar :data="searchBarData" @search="searchAction" @reset="reset" @add="showAdd()" ></search-bar>
    <table-contain :height.sync="table.maxHeight">
    <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="t_role_id" label="角色" align="center">

      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="clickEdit(scope.$index, scope.row)">变更角色</el-button>
          <el-button type="danger" plain size="mini" @click="clickBind(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div slot="page"></div>
    <!-- <el-pagination
      slot="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next"
      :total="pagination.total">
    </el-pagination> -->
  </table-contain> 
    <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="fetchList(1)" @edit="fetchList"></add>
  </div>
</template>

<script>
import model from '@/public/listModel.js'
import { fetchMemberList } from '@/api/company/index.js'
import Add from './add'
export default {
  mixins: [model],
  name: 'devices_list',
  components: {
    Add
  },
  data() {
    return {
      searchBarData: [
        [
          {
            type: 'input',
            value: null,
            key: 'name',
            placeholder: '请输入'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [{ type: 'add', name: '新增' }]
      ]
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      fetchMemberList().then(({ UserList }) => {
        if (Array.isArray(UserList)) {
          this.table.data = UserList
        }
      })
    },
    searchAction(params) {
      this.fetchList(params)
    },
    reset() {

    },
    showAdd() {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: null }})
    },
    handleCurrentChange() {

    },
    clickEdit(index, data) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'edit', obj: data }})
    },
    clickBind(index, data) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'bind', obj: data }})
    },
    clickDelete(index, data) {
      this.$confirm('是否需要删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      })
    }
  }
}
</script>


