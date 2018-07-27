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

			</div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>