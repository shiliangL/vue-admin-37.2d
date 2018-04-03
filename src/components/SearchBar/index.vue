<template>
  <div class="SearchBar">
      <template v-if="data && data.length > 0">
      <div class="left" v-for="(item, index) in data[0]" :key="index">
        <template v-if="item.type === 'option'">
          <el-select :class="item.class?item.class:'w90'" size="small" v-model="item.value" clearable filterable :placeholder="item.placeholder">
            <el-option v-for="sub in item.options" :key="sub.value" :label="sub.label" :value="sub.value" :class="item.class"></el-option>
          </el-select>
        </template>
        <template v-else-if="item.type === 'input'">
          <el-input :class="item.class" v-model="item.value" size="small" @keyup.enter.native="sendSearchParams" :placeholder="item.placeholder"></el-input>
        </template>
        <template v-else-if="item.type === 'search'">
          <el-button type="primary" size="small" @click="sendSearchParams" circle>{{item.name}}</el-button>
        </template>
        <template v-else-if="item.type === 'reset'">
          <el-button size="small" @click="clickReset">{{item.name}}</el-button>
        </template>
      </div>
      <template v-esle-if="data.length > 1">
        <div class="right">
          <div class="left" v-for="(item, index) in data[1]" :key="index">
            <template v-if="item.type === 'add'">
              <el-button size="small" @click="clickAdd">{{item.name}}</el-button>
            </template>
            <template v-else-if="item.type === 'more'">
              <el-dropdown trigger="click" @command="clickCommand">
                <el-button size="small">更多菜单<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="label in item.labels" :key="label" :command="label">{{label}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  created() {
    // console.log(this.value)
  },
  methods: {

  }
}
</script>

<style lang="scss">
  
</style>
