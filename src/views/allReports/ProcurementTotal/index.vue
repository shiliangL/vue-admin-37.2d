<template>
  <div class="ProcurementTotal">
    <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>
    <component :is="'tabView'+curIndex" />
  </div>
</template>

<script>
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
import tabView1 from './tabView1'
import tabView2 from './tabView2'
import tabView3 from './tabView3'
import tabView4 from './tabView4'

export default {
  name: 'ProcurementTotal',
  mixins: [model],
  components: {
    Tabs,
    tabView1,
    tabView2,
    tabView3,
    tabView4
  },
  data() {
    return {
      curIndex: 1
    }
  },
  created() {
    this.tabTitles = [
      { title: '时间维度', value: 1 },
      { title: '商品维度', value: 2 },
      { title: '采购员维度', value: 3 },
      { title: '供应商维度', value: 4 }
    ]
  },
  methods: {
    tabsCallBack(item) {
      this.curIndex = item.value
    }
  }
}
</script>

<style scoped>

</style>
