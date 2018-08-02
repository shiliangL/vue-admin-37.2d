<template>
  <div class="tab-title-layout">
		<ScrollPane class="nav-scroll-bar" style="height: 30px">
			<ul class="clearfix">
				<li :key="index" v-for="(item, index) in data" :class="curIndex==index?'active' : ''"  @click="clickTabTitle(item,index)">{{item.name}}</li>
			</ul>
		</ScrollPane>
	</div>
</template>

<script>
import { ScrollPane } from '@/components/base.js'

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Number
    }
  },
  name: 'SelectTabs',
  components: {
    ScrollPane
  },
  data() {
    return {
      curIndex: 0
    }
  },
  methods: {
    clickTabTitle(item, index) {
      this.curIndex = index
      this.$emit('callBack', index)
      this.$emit('input', item)
    }
  }
}
</script>

<style scoped lang="scss">
.tab-title-layout {
    width: 100%;
    height: 30px;
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
        height: 30px;
        line-height: 30px;
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