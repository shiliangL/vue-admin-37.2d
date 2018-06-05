<!-- 订单列表 -->
<template>
    <div class="orderList">
			 <div class="tab-title-layout">
				<ul class="clearfix">
					<li :key="index" v-for="(item, index) in tabTitles" :class="curIndex==index?'active' : ''"  @click="clickTabTitle(index)">{{item}}</li>
				</ul>
  		</div>
      <search-bar :data="searchBarData" @search="searchAction" @add="showAdd()" @command="clickMoreCommand"></search-bar>
    </div>
</template>

<script>

import model from '@/public/listModel.js'
export default {
  name: 'orderList',
  mixins: [model],
  data() {
    return {
      curIndex: 0,
      tabTitles: [
        '全部',
        '待付款',
        '待发货',
        '待收货',
        '退/换货',
        '已取消',
        '已关闭'
      ],
      searchBarData: [
        [
          { type: 'option', value: null, key: 'status', placeholder: '订单来源', options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }]
          },
          { type: 'option', value: null, key: 'status', placeholder: '支付类型', options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }]
          },
          { type: 'date', value: null, key: 'buyDate', placeholder: '下单日期' },
          { type: 'input', value: null, key: 'nameOrCode', placeholder: '输入订单编号／客户名称检索', class: 'w130' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'button', name: '导出' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ]
    }
  },
  methods: {
    clickTabTitle(index) {
      this.curIndex = index
    },
    searchAction(params) {
      console.log(params)
    },
    clickMoreCommand(command) {
      this.$message({ type: 'success', message: command, duration: 0, showClose: true })
    }
  }
}
</script>

<style scoped lang="scss">
.orderList {
  width: 100%;
  height: 100%;
  .content {
    padding: 20px;
  }
  .tab-title-layout {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #eaeaea;
    ul {
      width: 100%;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 20px;
    }
    li {
      cursor: pointer;
      list-style: none;
      float: left;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      margin-right: 20px;
      padding-right: 20px;
      color: #333333;
      font-size: 14px;
    }
    .active {
			color: #1cbc9c;
      border-bottom: 2px solid #1cbc9c;
    }
  }
}
</style>