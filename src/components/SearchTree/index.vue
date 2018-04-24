<template>
    <div class="SearchTree">
      <div class="search">
          <el-select v-model="group" placeholder="设备组" size="mini" class="w160" clearable filterable @change="select2fetchGroupsConfig">
            <el-option v-for="item in groupOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-input class="w160" size="mini" placeholder="设备名称检索" v-model.trim="codeOrname"></el-input>
          <el-button type="primary" size="mini" @click="filterSeach"> 搜索 </el-button>
          <el-button style="margin:0px" size="mini" @click="reset"> 重置 </el-button>
      </div>
      <div class="tree">
        <el-table :data="tableData" size="mini" :max-height="430" style="width: 100%"
        v-loading.body="listLoading" element-loading-text="拼命加载中" highlight-current-row @row-click="clickLoadDetails">
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
import { fetchGroups, fetchGroupsConfig, fetchmMeasureValue, fetchGroupDev } from '@/api/monitor'
export default {
  name: 'SearchTree',
  components: {
    ScrollBar
  },
  data() {
    return {
      tableData: [],
      listLoading: false,
      group: null,
      groupOptions: [],
      config: {
        caption: null,
        suffix: null,
        type: null,
        visible: null
      },
      codeOrname: null
    }
  },
  mounted() {
    this.fetchGroupData()
  },
  created() {
    this.hasConfig = false
  },
  methods: {
    fetchGroupData() {
      fetchGroups({ page: 0, size: 10, codeOrname: this.codeOrname }).then(data => {
        this.groupOptions = data.groups
      }).catch(error => {
        console.log(error)
      })
    },
    select2fetchGroupsConfig(id) {
      // 选择组的时候加载配置信息
      if (!id) return
      fetchGroupsConfig({ GroupID: id }).then(data => {
        const result = data.MeasureConfig
        if (!result) return
        const { config } = this
        config.caption = result.caption.split(',')
        config.suffix = result.suffix.split(',')
        config.type = result.type.split(',')
        config.visible = result.visible
      }).catch(error => {
        console.log(error)
      })

      // 加载组下设备
      this.listLoading = true
      fetchGroupDev({ GroupID: id }).then(data => {
        this.tableData = data.Devices
      }).catch(error => {
        console.log(error)
      })
      this.listLoading = false
    },
    clickLoadDetails(data) {
      // 加载组下具体设备 fetchmMeasureValue
      fetchmMeasureValue({ PSN: data.id }).then(res => {
        const reslutData = res
        const data = res.Value.slice(0, this.config.visible)
        const option = []
        const { config } = this
        data.forEach((item, index) => {
          option.push({
            caption: config.caption[index],
            suffix: config.suffix[index],
            type: config.type[index],
            visible: config.visible,
            value: item
          })
        })
        reslutData.option = option
        this.$emit('clickSelect', reslutData)
      }).catch(error => {
        console.log(error)
      })
    },
    filterSeach() {
      const { codeOrname, tableData } = this
      if (!codeOrname) return
      tableData.filter(item => {
        return item.name === codeOrname
      })
      console.log(tableData)
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
  .tree {
    // margin-top: 8px;
    // background: #fff;
    // min-height: 330px;
    // overflow: hidden;
  }
}
</style>