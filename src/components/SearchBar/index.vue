<template>
  <div id="SearchBar" class="search-bar">
    <div class="left" style="line-height: 40px;">
      <slot name="title"></slot>
    </div>
    <template v-if="data && data.length > 0">
      <div class="left" v-for="(item, index) in data[0]" :key="index">
        <template v-if="item.type === 'date'">
          <el-date-picker :clearable="isDateClear"
            :style="{width: item.width ? item.width :'140px'}" size="small"
            v-model="item.value" value-format="yyyy-MM-dd" type="date" :placeholder="item.placeholder"></el-date-picker>
        </template>
        <template v-if="item.type === 'datetimerange'">
          <el-date-picker v-model="item.value" size="small" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="-" start-placeholder="下单开始时间" end-placeholder="下单结束时间" :default-time="['23:00:00', '22:59:59']" :placeholder="item.placeholder"> </el-date-picker>
          <!-- <el-date-picker :style="{width:'140px'}" size="small" v-model="item.value" value-format="yyyy-MM-dd" type="date" :placeholder="item.placeholder"></el-date-picker> -->
        </template>
        <template v-if="item.type === 'goodsCategory'">
          <el-select :class="item.class?item.class:'w110'" size="small" v-model="categoryIdA" clearable filterable placeholder="一级分类" @change="selectChange" value-key="id">
            <el-option v-for="sub in options.goodsCategoryA" :key="sub.id" :label="sub.title" :value="sub" :class="item.class"></el-option>
          </el-select>
          <el-select :class="item.class?item.class:'w110'" v-if="categoryIdA" size="small" v-model="categoryIdB" clearable filterable placeholder="二级分类" value-key="id">
            <el-option v-for="sub in options.goodsCategoryB" :key="sub.id" :label="sub.title" :value="sub" :class="item.class"></el-option>
          </el-select>
        </template>
        <template v-else-if="item.type === 'datetime'">
          <el-date-picker :style="{width:'200px'}" size="small" v-model="item.value" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="item.placeholder"></el-date-picker>
        </template>
        <template v-else-if="item.type === 'option'">
          <el-select :class="item.class?item.class:'w90'" size="small" v-model="item.value" clearable filterable :placeholder="item.placeholder">
            <el-option v-for="sub in item.options" :key="sub.value" :label="sub.label" :value="sub.value" :class="item.class"></el-option>
          </el-select>
        </template>
        <template v-else-if="item.type === 'input'">
          <el-input :style="item.width? item.width : 'width:180px'" clearable v-model.trim="item.value" size="small" @keyup.enter.native="sendSearchParams" :placeholder="item.placeholder"></el-input>
        </template>
        <template v-if="item.type === 'multiple-date'">
          <el-date-picker :clearable="!item.isClearable" v-model="item.value" value-format="yyyy-MM-dd" type="daterange" size="small" range-separator="至" :start-placeholder="item.placeholder1" :end-placeholder="item.placeholder2"></el-date-picker>
        </template>
        <template v-else-if="item.type === 'search'">
          <el-button type="primary" size="small" @click="sendSearchParams">{{item.name}}</el-button>
        </template>
        <template v-else-if="item.type === 'reset'">
          <el-button size="small" @click="clickReset">{{item.name}}</el-button>
        </template>

      </div>

      <template v-esle-if="data.length > 1">
        <div class="right" v-show="rightVisible">
          <div class="left" v-for="(item, index) in data[1]" :key="index">
            <template v-if="item.type === 'add'">
              <el-button type="primary" size="small" @click="clickAdd">{{item.name}}</el-button>
            </template>
            <template v-if="item.type === 'button'">
              <el-button :style="item.style ? item.style : null" size="small" @click="clickBtn(item)">{{item.name}}</el-button>
            </template>
            <template v-else-if="item.type === 'more'">
              <el-dropdown trigger="click" @command="clickCommand">
                <el-button size="small">{{item.name || '更多菜单'}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="label in item.labels" :key="label" :command="label">{{label}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </div>
        </div>
      </template>
    </template>
    <slot></slot>
  </div>
</template>

<script>
import { fecthGoodsClass } from '@/api/goodsList.js'
import { listToTrees } from '@/utils/listToTrees.js'

export default {
  name: 'SearchBar',
  props: {
    data: {
      type: Array,
      default: []
    },
    isDateClear: { // 日期是否可以清除 默认可以
      type: Boolean,
      default: true
    },
    goodsCategory: { // 是否加载商品分类
      type: String,
      default: ''
    },
    rightVisible: { // 是否需要显示右边区域按钮 默认显示
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      categoryIdA: null,
      categoryIdB: null,
      options: {
        goodsCategoryA: [],
        goodsCategoryB: []
      }
    }
  },
  mounted() {
    const { fetchGoodsClass, goodsCategory } = this
    if (goodsCategory) fetchGoodsClass()
  },
  methods: {
    fetchGoodsClass() {
      fecthGoodsClass().then(({ data }) => {
        if (!Array.isArray(data) && data.length <= 0) return
        this.options.goodsCategoryA = listToTrees(data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickReset() {
      this.categoryIdA = null
      this.categoryIdB = null
      this.options.goodsCategoryB = []
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0]
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item['type'] === 'search') {
            break
          } else {
            item['value'] = null
          }
        }
      }
      this.$emit('reset')
    },
    selectChange(item) {
      this.categoryIdB = null
      this.options.goodsCategoryB = []
      if (item) {
        this.options.goodsCategoryB = item.children
      } else {
        this.options.goodsCategoryB = []
      }
    },
    sendSearchParams() {
      const { goodsCategory, categoryIdA, categoryIdB } = this
      const params = {}
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0]
        const commonlyTypes = ['input', 'select', 'option', 'date', 'datetime', 'datetimerange']
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (commonlyTypes.indexOf(item['type']) !== -1) {
            params[item['key']] = item.value
          } else if (item['type'] === 'multiple-date') {
            if (item.value != null) {
              params[item['key1']] = item.value[0]
              params[item['key2']] = item.value[1]
            } else {
              params[item['key1']] = null
              params[item['key2']] = null
            }
          } else if (item['type'] === 'search') {
            break
          }
        }
        if (goodsCategory) {
          params[goodsCategory] = categoryIdB ? categoryIdB.id : (categoryIdA ? categoryIdA.id : null)
        }
      }
      this.$emit('search', params)
    },
    clickAdd() {
      this.$emit('add')
    },
    clickBtn(item) {
      const params = {}
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0]
        const commonlyTypes = ['input', 'select', 'option', 'date', 'datetime', 'datetimerange']
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (commonlyTypes.indexOf(item['type']) !== -1) {
            params[item['key']] = item.value
          } else if (item['type'] === 'multiple-date') {
            if (item.value != null) {
              params[item['key1']] = item.value[0]
              params[item['key2']] = item.value[1]
            } else {
              params[item['key1']] = null
              params[item['key2']] = null
            }
          } else if (item['type'] === 'search') {
            break
          }
        }
      }
      this.$emit('clickBtn', params)
    },
    clickCommand(command) {
      this.$emit('command', command)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  div.left {
    margin-left: 5px;
  }
</style>
