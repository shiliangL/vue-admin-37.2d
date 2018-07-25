<!-- 商品分类联选择组件 -->
<template>
    <div class="GoodsCascader">
      <el-cascader 
        v-model="form.goodsDto" 
        size="small" filterable 
        :options="form.options"
        @change="cascaderChange"
        @active-item-change="handleItemChange" 
        :props="form.props" >
      </el-cascader>
    </div>
</template>

<script>
import { fecthGoodsClass } from '@/api/goodsList.js'

export default {
  name: 'GoodsCascader',
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      timer: null,
      form: {
        goodsDto: [],
        options: [],
        props: {
          value: 'value',
          label: 'label',
          children: 'children'
        },
        searchBarOptons: {
          type: [
            { label: '供应商直供', value: 1 },
            { label: '市场自采购', value: 2 }
          ],
          salerList: [],
          supplyType: [],
          supplierList: []
        }
      }
    }
  },
  mounted() {
    this.fecthGoodsClass()
  },
  methods: {
    // 加载供应商类别
    fecthGoodsClass() {
      fecthGoodsClass()
        .then(({ data }) => {
          if (Array.isArray(data) && data.length > 0) {
            const p = []
            const s = []
            for (const item of data) {
              if (item.parentId === '0') {
                p.push({
                  value: item.id,
                  label: item.title,
                  children: []
                })
              } else {
                s.push(item)
              }
            }
            for (const item of s) {
              for (const key of p) {
                if (item.parentId === key.value) {
                  key.children.push({
                    value: item.id,
                    label: item.title
                  })
                }
              }
            }
            this.form.options = p
          } else {
            this.form.options = []
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleItemChange(val) {
      // console.log(val)
    },
    cascaderChange(val) {
      if (val && val.length >= 2) {
        this.$emit('input', val[1])
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val === null) {
          this.form.goodsDto = []
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>