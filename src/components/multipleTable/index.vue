<template>
	<div class="multipleTable">
		<div class="search-Box" v-if="isSearch">
			<el-input class="w180" size="small"  placeholder="输入关键字检索" icon="search"  v-model="search"></el-input> 
			<el-button type="primary" size="small" @click="click2search"> 搜索 </el-button>
			<el-button size="small"> 重置 </el-button>
		</div>
		<el-table :data="tableData" style="width: 100%" size="mini"
      v-loading="loading"
			ref="multipleTable"
      max-height="300"
			highlight-current-row
			@row-click="clickTableRow"
			@selection-change="selectOneAndMore"
			@select-all="selectAll">
			<el-table-column align="center" type="selection" width="30" v-if="!isHander"> </el-table-column>
			<el-table-column align="center" prop="psn" label="psn"></el-table-column>
			<el-table-column align="center" prop="name" label="名称"> </el-table-column>
      <el-table-column label="操作" align="center" width="90" v-if="isHander">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="clickEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button type="danger" size="mini" @click="clickDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
		</el-table>

		<!-- <div style="text-align: center;margin: 6px;">
				<el-button size="small" type="primary" @click="clickSave"> 确定 </el-button>
				<el-button size="small">取 消</el-button>
		</div> -->
	</div>
</template>

<script>
// isHander 显示操作说明是查看
import request from '@/utils/request'
import { rmdevfromgroup } from '@/api/devices_group'
export default {
  name: 'multipleTable',
  inheritAttrs: false,
  props: {
    url: {
      type: String,
      default: 'rtusapi/devices/getdevnogroup' // 未分组设备
    },
    isSearch: {
      type: Boolean,
      default: true
    },
    isHander: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      search: '', // 搜索
      tableData: [],
      selectArray: []
    }
  },
  created() {
    this.GroupID = this.$attrs.GroupID
    setTimeout(() => {
      console.log('xxx')
      this.$emit('input', 'well done!')
    }, 2000)
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.loading = true
      const url = this.isHander ? 'rtusapi/devices/getdevbygroup' : this.url
      const query = this.isHander ? { GroupID: this.$attrs.GroupID } : ''
      request({
        url: url,
        method: 'get',
        params: query
      }).then(({ Devices }) => {
        this.loading = false
        this.tableData = Devices
      })
    },
    click2search() {
      const { search } = this
      if (search) {
        const data = this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
        this.tableData = data
      }
    },
    clickTableRow(row) {
      if (this.tableData.length > 0) {
        this.$refs['multipleTable'].toggleRowSelection(row)
      }
    },
    selectOneAndMore(selectArray) {
      if (selectArray.length > 0) {
        this.selectArray = selectArray
      } else {
        this.selectArray = []
      }
    },
    selectAll(selectArray) {
      if (selectArray.length > 0) {
        this.selectArray = selectArray
      } else {
        this.selectArray = []
      }
    },
    clickEmit() {
      this.$emit('input', this.selectArray)
    },
    clickDelete(index, rowData) {
      this.$confirm('是否需要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            GroupId: this.$attrs.GroupID.toString(),
            DeviceId: rowData.id.toString()
          }
          rmdevfromgroup(data)
            .then(() => {
              this.$message({ type: 'success', message: '删除成功!' })
              this.fetchList()
            })
            .catch(() => {
              this.$message({ type: 'error', message: '删除失败!' })
            })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.multipleTable {
  background: #fff;
}
</style>