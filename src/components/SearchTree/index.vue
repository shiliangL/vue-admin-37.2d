<template>
    <div class="SearchTree">
      <div class="search">
          <el-select v-model="group" placeholder="设备组" size="mini" class="w160">
            <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-input class="w160" size="mini" placeholder="设备名称检索" v-model.trim="codeOrname"></el-input>
          <el-button type="primary" size="mini" @click="clickSearch"> 搜索 </el-button>
          <el-button style="margin:0px" size="mini" @click="reset"> 重置 </el-button>
      </div>
      <div class="tree" v-show="true">
        <el-table :data="tableData" size="mini" :max-height="280" style="width: 100%"
        v-loading.body="listLoading" element-loading-text="拼命加载中" highlight-current-row @selection-change="clickLoadDetails">
          <el-table-column align="center" label="序号" width="40">
            <template slot-scope="scope">
              <span v-text="scope.$index+1"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="名称"> </el-table-column>
          <el-table-column align="center" prop="status" label="状态"> 
            <template slot-scope="scope">
              <el-tag size="mini" :type="scope.row.status===1?'success':'danger'">{{scope.row.status===1? '在线':'离线'}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import { ScrollBar } from '@/components/indexEx.js'
export default {
  name: 'SearchTree',
  components: {
    ScrollBar
  },
  data() {
    return {
      tableData: [{ name: '1号设备', id: 999000001, status: 1 }, { name: '2号设备', id: 999000002, status: 0 }],
      listLoading: false,
      group: null,
      groupOptions: [],
      codeOrname: null
    }
  },
  methods: {
    clickLoadDetails(data) {
      this.$emit('clickSelect', data)
    },
    clickSearch() {
      const { codeOrname } = this
      this.$refs['tree'].filter(codeOrname)
    },
    reset() {
      this.codeOrname = null
    }
  }
}
</script>

<style scoped lang="scss">
.SearchTree {
  min-width: 480px;
  width: 480px;
  padding: 8px;
  border-radius: 8px;
  // box-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
  border: 1px solid #d1dbe5;
  .scroll-container {
    min-height:280px;
    height:280px;
    background-color: #fff;
  }
  .tree {
    margin-top: 8px;
    background: #fff;
    min-height:330px;
    overflow: hidden;
  }
  .custom-tree-node {
    font-size: 14px;
    flex: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding-right: 10px;
  }
}
</style>