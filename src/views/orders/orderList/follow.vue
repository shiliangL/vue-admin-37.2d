<template>
    <div class="toFollow">
			<el-steps direction="vertical" :active="1" space="60px">
					<el-step v-for="(item,index) in data" :key="index" :title="item.title" icon="el-icon-location" :description="item.desc"></el-step>
				</el-steps>
    </div>
</template>

<script>
export default {
  name: 'toFollow',
  data() {
    return {
      data: [
        { title: '订单已送达，申请换货（APP，客户）', desc: '2018-05-31 12:20:40' },
        { title: '换货申请审核，已同意（后台操作员：利乐）', desc: '2018-05-31 12:22:40' },
        { title: '换货商品送达仓库（配送员：大王）', desc: '2018-05-31 12:20:40' },
        { title: '补换货商品打包，出库（打包员：安乐）', desc: '2018-05-31 12:20:40' },
        { title: '补换货商品，送达客户，换货完成（配送员：大王）', desc: '2018-05-31 12:20:40' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
	.toFollow{
		width: 500px;
		margin: 0 auto;
		text-align: center;
	}
</style>