
<!-- 运营设置 -->
<template>
    <div class="operatSetting">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>
			<settng v-if="curIndex===0"></settng>
			<other v-if="curIndex===1"></other>
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
import settng from './settngView'
import other from './otherView'

export default {
  name: 'operatSetting',
  mixins: [model],
  components: {
    Tabs,
    settng,
    other
  },
  data() {
    return {
      curIndex: 0
    }
  },
  created() {
    this.tabTitles = [
      { title: '业务设置', value: 0 }
      // { title: '其他', value: 1 }
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
