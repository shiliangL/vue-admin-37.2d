<template>
	<div class="multipleTable">
		<div class="search-Box">
			<el-input class="w180" size="small"  placeholder="输入关键字检索" icon="search"  v-model="search"></el-input> 
			<el-button type="primary" size="small" @click="click2search"> 搜索 </el-button>
			<el-button size="small"> 重置 </el-button>
		</div>
		<el-table :data="tableData" style="width: 100%" size="mini"    
			ref="multipleTable"
			highlight-current-row
			@row-click="clickTableRow"
			@selection-change="selectOneAndMore"
			@select-all="selectAll">
			<el-table-column align="center" type="selection" width="30"> </el-table-column>
			<el-table-column align="center" prop="date" label="日期"></el-table-column>
			<el-table-column align="center" prop="name" label="姓名"> </el-table-column>
		</el-table>

		<!-- <div style="text-align: center;margin: 6px;">
				<el-button size="small" type="primary" @click="clickSave"> 确定 </el-button>
				<el-button size="small">取 消</el-button>
		</div> -->
	</div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'multipleTable',
  props: {
    url: {
      type: String,
      default: 'rtusapi/devices/getdevnogroup' // 未分组设备
    }
  },
  data() {
    return {
      search: '', // 搜索
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '章小米', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '李小东', address: '上海市普陀区金沙江路 1519 弄' }
      ],
      selectArray: []
    }
  },
  created() {

  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList(query) {
      request({
        url: this.url,
        method: 'get',
        params: query
      }).then(res => {
        console.log(res)
      })
    },
    click2search() {
      const { search } = this
      if (search) {
        const data = this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
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
    clickSave() {

    }
  }
}
</script>

<style scoped lang="scss">
 .multipleTable{
	 width:350px;
	 background:#fff;
 }
</style>