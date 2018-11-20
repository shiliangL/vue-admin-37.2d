<template>
    <div>
			<div>
				<!-- 备注 -->
				<el-input size="small" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="form.remark" style="width:180px" type="textarea" placeholder="不能超30位数" maxlength="30"></el-input>
				<!-- 下拉 -->
				<el-select size="small" v-model="form.stockId" filterable placeholder="选择仓库">
					<el-option v-for="sub in stockOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
				</el-select>
				<!-- 输入 -->
				<el-input size="small" style="width:180px"  v-model.trim="form.title" placeholder="不能超过5位数" maxlength="5"></el-input>
				<!-- 日期 -->
      	<el-date-picker :style="{width:'140px'}" size="small" v-model="value" value-format="yyyy-MM-dd" type="date" :placeholder="item.placeholder"></el-date-picker>
				<!-- 分页 -->
				<div class="footer-block">
					<span class="page" v-cloak> 共 {{tableOne.length}} 条</span>
				</div>
					
        <el-table-column prop="remark" width="200" show-overflow-tooltip label="备注" align="center"></el-table-column>
			<!-- 搜索 -->
			 <div class="search">
					<el-input size="small" style="width:190px" class="w180"  placeholder="请输入商品名称检索" v-model.trim="viewSearch"></el-input>
					<el-button  type="primary" size="small" @click.stop="clickToSearch" > 搜索 </el-button>
					<el-button  size="small" @click.stop="resetSearch" > 重置 </el-button>
			</div>
			</div>
    </div>
</template>

<script>
export default {
  methods: {
    cp() {
      const data = JSON.parse(JSON.stringify())
      console.log(data)
    },
    // 模糊搜索
    tableLeftData() {
      const search = this.search.value
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.tableData_L.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.tableData_L
    }
  }
}
</script>

<style scoped>
</style>