<!-- 库存核查 -->
<template>
    <div class="auditInventory">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>
			<listView v-if="curIndex===0"></listView>
			<recordLists v-if="curIndex===1"></recordLists>
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
import listView from './listView'
import recordLists from './recordLists'

export default {
  name: 'auditInventory',
  mixins: [model],
  components: {
    Tabs,
    listView,
    recordLists
  },
  data() {
    return {
      curIndex: 0
    }
  },
  created() {
    this.tabTitles = [
      { title: '待核查', value: 0 },
      { title: '已核查', value: 1 }
    ]
  },
  methods: {
    tabsCallBack(item) {
      this.curIndex = item.value
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>