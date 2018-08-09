<!-- 验收台 -->
<template>
    <div class="acceptanceIndex">
			<Tabs :data="tabTitles" isBackIndex @callBack="tabsCallBack"></Tabs>
			<inView v-if="curIndex ===0"></inView>
			<returnView v-if="curIndex ===1"></returnView>
			<changeView v-if="curIndex ===2"></changeView>
    </div>
</template>

<script>
import inView from './inView'
import returnView from './returnView'
import changeView from './changeView'
import { Tabs } from '@/components/base.js'

export default {
  name: 'acceptanceIndex',
  components: {
    Tabs,
    inView,
    returnView,
    changeView
  },
  data() {
    return {
      curIndex: 0
    }
  },
  created() {
    this.tabTitles = [
      { title: '采购入库', value: 1 },
      { title: '销售退货', value: 2 },
      { title: '销售换货', value: 3 }
    ]
  },
  methods: {
    tabsCallBack(index) {
      this.curIndex = index
    }
  }
}
</script>