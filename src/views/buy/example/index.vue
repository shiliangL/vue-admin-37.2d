<template>
	<div class="index">
		<search-bar :data="searchBarDataTwo" @add="showAdd"></search-bar>
		<!-- 弹层 -->
		<add v-if="add.visiable" :visiable.sync="add.visiable" :data="add.data"></add>
	</div>
</template>

<script>
import model from '@/public/listModel.js'
import Add from './add'
export default {
  mixins: [model],
  components: {
    Add
  },
  data() {
    return {
      searchBarDataTwo: [
        [
          {
            type: 'option',
            value: null,
            key: 'stockId',
            class: 'w150',
            placeholder: '仓库',
            options: []
          },
          {
            type: 'input',
            value: null,
            key: 'number',
            class: 'w180',
            placeholder: '输入仓位名称检索'
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [{ type: 'add', name: '新增' }]
      ]
    }
  },
  methods: {
    showAdd() {
      const title = this.curIndex === 0 ? '新增仓库' : '新增仓位'
      const tab = this.curIndex === 0 ? 'sectionOne' : 'sectionTwo'
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: {}, isEditor: false, title: title, tab: tab }})
    }
  }
}
</script>

<style scoped>
.index{
	position: relative;
  min-height: 100%;
  min-width: 100%;
}
</style>