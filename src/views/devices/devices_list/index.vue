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
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="psn" label="psn" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <!-- <template slot-scope="scope">
          <el-button plain type="info" size="mini">未定义类型</el-button>
        </template> -->
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="clickEdit(scope.$index, scope.row)">修改名称</el-button>
          <el-button v-if="scope.row.TypeId === 0" type="primary" plain size="mini" @click="clickBind(scope.$index, scope.row)">绑定</el-button>
          <el-button v-else type="danger" plain size="mini" @click="clickUnbindType(scope.$index, scope.row)">解绑</el-button>
          <!-- <el-button type="danger" size="mini" @click="clickDelete(scope.$index, scope.row)">删除</el-button> -->
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
import { fetchList, unbindingtype } from '@/api/devices_list'
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
      fetchList().then(({ Devices }) => {
        if (Array.isArray(Devices) && Devices.length > 0) {
          for (const item of Devices) {
            if (item.TypeId === 0) {
              item.type = '未定义'
            } else {
              item.type = item.TypeId
            }
          }
          this.table.data = Devices
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
    },
    clickUnbindType(index, value) {
      this.$confirm('确定解绑设备吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          DeviceId: value.id.toString()
        }
        unbindingtype(data).then((res) => {
          if (res.result === 'ok') {
            this.fetchList()
            this.$message({ type: 'success', message: '设备解绑成功' })
          } else {
            this.$message({ type: 'error', message: '设备解绑失败' })
          }
        }).catch(() => {
          this.$message({ type: 'error', message: '设备解绑失败' })
        })
      }).catch(() => {})
    }
  }
}
</script>


