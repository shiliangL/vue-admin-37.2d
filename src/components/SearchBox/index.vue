<template>
    <div class="searchBox w180">
      {{searchBoxValue}}
       <el-select filterable remote clearable
        @focus="fetchData"
				@change="selectChange"
        :loading="loading"
        v-model.trim="searchBoxValue"
        placeholder="请输入关键词检索"
        :remote-method="remoteMethod">
        <el-option v-for="item in searchBoxOptions" :key="item.id" :label="item.name" :value="item.id">
          <div>
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
          </div>
        </el-option>
      </el-select>
    </div>

</template>

<script>
import { fecthSearch } from '@/api'
export default {
  name: 'SearchBox',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      searchBoxValue: null,
      searchBoxOptions: []
    }
  },
  methods: {
    fetchData() {
      fecthSearch(this.url, { nameOrCode: null }).then(({ data }) => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    },
    remoteMethod(query) {
      console.log(query)
      setTimeout(() => {
        if (!this.loading) {
          console.log('fetchData')
        }
      }, 400)
    },
    selectChange() {
      this.$emit('selectChange', this.searchBoxValue)
    }
  }
}
</script>

<style scoped>

</style>