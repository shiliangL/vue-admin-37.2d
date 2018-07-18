<!-- 商品入库 -->
<template>
    <div class="goodsInRe">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>
			<storageIn v-if="curIndex===0"></storageIn>
			<storageRe v-if="curIndex===1"></storageRe>
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import { Tabs, CascaderBox, SearchBar } from '@/components/base.js'
import storageIn from './storageIn'
import storageRe from './storageRe'

export default {
  name: 'goodsInRe',
  mixins: [model],
  components: {
    Tabs,
    SearchBar,
    CascaderBox,
    storageIn,
    storageRe
  },
  data() {
    return {
      curIndex: 0
    }
  },
  created() {
    this.tabTitles = [
      { title: '入库单', value: 0 },
      { title: '入库记录', value: 1 }
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