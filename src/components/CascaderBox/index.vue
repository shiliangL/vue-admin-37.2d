<!-- 采购员供应商级联选择组件 -->
<template>
    <div class="CascaderBox">

      <el-select class="w110" size="small" v-model="form.searchParams.purchaseType" placeholder="采购类型">
        <el-option v-for="sub in form.searchBarOptons.type" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
      </el-select>

      <template v-if="form.searchParams.purchaseType===2">
        <el-select style="180px" size="small" v-model="form.searchParams.buyerId" clearable filterable placeholder="请选择">
          <el-option v-for="sub in form.searchBarOptons.salerList" :key="sub.pk" :label="sub.staffName" :value="sub.pk"></el-option>
        </el-select>
      </template>

      <template v-if="form.searchParams.purchaseType===1">
        <el-cascader style="180px" v-model="supplyDto" size="small" :options="form.options" @active-item-change="handleItemChange" :props="form.props" ></el-cascader>
      </template>

    </div>
</template>

<script>

import {
  fecthSupplierList,
  fecthSalerList,
  fecthByCategoryId
} from '@/api/goodsList.js'

export default {
  name: 'CascaderBox',
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      supplyDto: null,
      timer: null,
      form: {
        searchParams: {
          purchaseType: null,
          buyerId: null,
          supplyId: null,
          supplyDto: null
        },
        options: [

        ],
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
  created() {
    if (this.value && this.value.purchaseType === 1) {
      this.form.searchParams.purchaseType = this.value.purchaseType
      this.supplyDto = [this.value.supplierCategoryId, this.value.buyerId]
    }
  },
  mounted() {
    this.fecthSupplierList()
    this.fecthSalerList()
  },
  methods: {
    clickToAdd() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log('通过验证')
        }
      })
    },
    // 加载供应商类别
    fecthSupplierList() {
      fecthSupplierList()
        .then(({ data }) => {
          if (Array.isArray(data) && data.length > 0) {
            const arr = []
            for (const item of data) {
              arr.push({
                value: item.pk,
                label: item.title,
                children: []
              })
            }
            this.form.options = arr
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    selectSupplyTypeChange(val) {
      if (!val) return
      fecthByCategoryId({ categoryId: val })
        .then(({ data }) => {
          if (Array.isArray(data) && data.length > 0) {
            this.searchBarOptons.supplierList = data
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 加载采购员
    fecthSalerList() {
      fecthSalerList()
        .then(({ data }) => {
          this.form.searchBarOptons.salerList = data
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleItemChange(value) {
      console.log(value)
      const arr = this.form.options
      let item = null
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        if (element.value === value[0]) {
          item = element
          break
        }
      }
      if (!item) return
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        if (item && item.value) {
          fecthByCategoryId({ categoryId: item.value }).then(({ data }) => {
            if (Array.isArray(data) && data.length > 0) {
              const arr = []
              for (const item of data) {
                arr.push({
                  value: item.pk,
                  label: item.title
                })
              }
              item.children = arr
            }
          }).catch(e => {
            console.log(e)
          })
        }
      }, 400)
    },
    resetForm() {
      this.$refs['form'].resetFields()
    }
  },
  watch: {
    'form.searchParams.purchaseType': {
      handler(val) {
        console.log(val)
        if (val === 1) {
          console.log('选择供应商')
          // 选择供应商

          // 清空采购员
          this.form.searchParams.buyerId = null
        } else {
          console.log('选择采购员')
          // 选择采购员

          // 清空供应商
          this.supplyDto = null
          this.form.searchParams.supplyDto = null
        }
      }
    },
    'supplyDto': {
      handler(val) {

      }
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>