<template>
 <div class="tab-title-layout">
		<ul class="clearfix">
			<li :key="index" v-for="(item, index) in data" :class="curIndex==index?'active' : ''"  @click="clickTabTitle(item,index)">{{item.title}}</li>
		</ul>
	</div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      curIndex: 0
    }
  },
  methods: {
    clickTabTitle(item, index) {
      this.curIndex = index
      this.$emit('callBack', item)
    }
  }
}
</script>

<style scoped lang="scss">
  .tab-title-layout {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #eaeaea;
    background: #fff;
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
</style>