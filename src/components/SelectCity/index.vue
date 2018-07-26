<template>
    <div class="clearfix"> 
			<div class="left">
				<el-cascader size="small" class="CascaderBox" :options="options.cascaderOption" v-model="cascaderDTO" @change="handleChange" clearable filterable> </el-cascader>
			</div>
    </div>
</template>

<script>
import { fetchCityList } from '@/api/city.js'

export default {
  name: 'SelectCity',
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      tempData: [],
      cascaderDTO: [],
      options: {
        cascaderOption: []
      }
    }
  },
  mounted() {
    console.log(this.isBackId)
    this.fetchList()
  },
  methods: {
    fetchList() {
      fetchCityList().then(({ data }) => {
        if (Array.isArray(data)) {
          this.tempData = JSON.parse(JSON.stringify(data))
          const attributes = {
            id: 'id',
            parentId: 'parentId',
            name: 'areaName',
            rootId: '0'
          }
          const treeData = this.toTreeData(data, attributes)
          this.options.cascaderOption = treeData
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    toTreeData(data, attributes) {
      const resData = data
      const tree = []

      for (let i = 0; i < resData.length; i++) {
        if (resData[i].parentId === attributes.rootId) {
          const obj = {
            value: resData[i][attributes.id],
            label: resData[i][attributes.name],
            children: []
          }
          tree.push(obj)
          resData.splice(i, 1)
          i--
        }
      }
      run(tree)

      function run(chiArr) {
        if (resData.length !== 0) {
          for (let i = 0; i < chiArr.length; i++) {
            for (let j = 0; j < resData.length; j++) {
              if (chiArr[i].value === resData[j][attributes.parentId]) {
                const obj = {
                  value: resData[j][attributes.id],
                  label: resData[j][attributes.name],
                  children: null
                }
                chiArr[i].children.push(obj)
                resData.splice(j, 1)
                j--
              }
            }
            // run(chiArr[i].children)
          }
        }
      }

      return tree
    },
    handleChange(val) {
      if (val) {
        const data = []
        for (const item of this.tempData) {
          if (item.id === val[0]) {
            data[0] = {
              name: item.areaName,
              id: item.id
            }
          }
          if (item.id === val[1]) {
            data[1] = {
              name: item.areaName,
              id: item.id
            }
          }
        }
        this.$emit('input', data)
      } else {
        this.$emit('input', null)
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val === null || val.length === 0) {
          this.cascaderDTO = []
        } else {
          this.cascaderDTO = [val[0].id, val[1].id]
        }
      }
    }
  }
}
</script>

<style lang="scss">

</style>