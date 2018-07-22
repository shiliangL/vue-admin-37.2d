<template>
    <div class="SearchTree">
      <div class="search">
          <el-select v-model="group" placeholder="设备组" size="mini" class="w160" filterable @change="select2fetchGroupsConfig">
            <el-option v-for="item in groupOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </div>
      <div class="tree">
        <el-table :data="tableData" size="mini" :max-height="430" style="width: 100%"
          v-loading.body="listLoading" element-loading-text="拼命加载中" 
          highlight-current-row @row-click="clickTableRow">
          <el-table-column align="left" label="设备名称">
             <template slot-scope="scope">
              <span> {{scope.row.name}} ({{scope.row.psn}})</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="状态" width="50">
            <template slot-scope="scope">
              <el-tag  size="mini" v-if="scope.row.online==0">离线</el-tag>
              <el-tag  size="mini" v-if="scope.row.online==1">在线</el-tag>
              <el-tag  size="mini" v-if="scope.row.online==2">警告</el-tag>
              <el-tag  size="mini" v-if="scope.row.online==3">故障</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import { ScrollBar } from '@/components/indexEx.js'
import {
  fetchGroups,
  fetchGetConfig,
  fetchmMeasureValue,
  fetchGroupDev } from '@/api/monitor'
export default {
  components: {
    ScrollBar
  },
  props: {
    value: {
      type: Object
    },
    clitkType: {
      type: String // 'get' 'set'
    }
  },
  data() {
    return {
      clitkPsn: null, // 点击缓存对象
      tableData: [],
      listLoading: false,
      isLoading: false,
      group: null,
      groupOptions: [],
      config: null, // 监测数据对象
      SetupConfig: null, // 控制数据对象
      codeOrname: null,
      fechTime: 5000, // 监控时间间隔
      timer: null
    }
  },
  mounted() {
    this.fetchGroupData()
  },
  created() {
    this.isDefault = true // 默认加载第一项
  },
  methods: {
    // 组
    fetchGroupData() {
      fetchGroups({ page: 0, size: 10, codeOrname: this.codeOrname }).then(({ groups }) => {
        if (Array.isArray(groups) && groups.length > 0) {
          this.groupOptions = groups
          this.group = groups[0].id
          this.fetchProductStatus(this.group)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 组下的设备+状态
    fetchProductStatus(id) {
      fetchGroupDev({ GroupId: id }).then(data => {
        if (JSON.stringify(data.list) !== '{}') {
          const tableData = []
          const result = JSON.parse(data.list)
          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              const item = result[key]
              if (!item) return
              if (Array.isArray(item)) {
                tableData.push({
                  name: item[1],
                  psn: item[0],
                  online: item[2],
                  key: key
                })
              }
            }
          }
          this.tableData = tableData
          if (Array.isArray(tableData) && tableData.length > 1 && this.isDefault) {
            this.clickTableRow(tableData[0])
          }
          // isDefault
        } else {
          this.tableData = []
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loadMeasureValue(psn) {
      this.isLoading = true
      fetchmMeasureValue({ PSN: psn }).then(res => {
        this.isLoading = false
        const reslutData = res
        const data = res.Value.slice(0, this.config.visible)
        const option = []
        const { config } = this
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((item, index) => {
            const value = config.type[index] === 'DO' || config.type[index] === 'DI' ? item ? '开' : '关' : item
            option.push({
              caption: config.caption[index],
              suffix: config.suffix[index],
              type: config.type[index],
              visible: config.visible,
              value: value
            })
          })
          reslutData.option = option
          this.$emit('input', reslutData)
        } else {
          this.$emit('input', null)
        }
      }).catch(error => {
        this.isLoading = false
        console.log(error)
      })
    },
    select2fetchGroupsConfig(id) {
      // 选择组改变的时候
      if (!id) return
      if (this.isLoading) return
      this.fetchProductStatus(id)
      // this.loadGetConfig(id)
    },
    loadGetConfig(id) {
      // 加载检测配置
      fetchGetConfig({ GroupID: id }).then(({ MeasureConfig }) => {
        if (MeasureConfig) {
          this.config = {
            caption: MeasureConfig.caption.split(','),
            suffix: MeasureConfig.suffix.split(','),
            type: MeasureConfig.type.split(','),
            visible: MeasureConfig.visible
          }
          console.log(this.config, '配置')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    clickTableRow(data) {
      this.isDefault = false
      // clearInterval(this.timerValue)
      this.clitkPsn = data.psn
      if (this.isLoading) return
      this.loadMeasureValue(data.psn)
    },
    reset() {
      this.codeOrname = null
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.timerValue)
  },
  watch: {
    // group: {
    //   handler(newValue, oldValue) {
    //     if (newValue && oldValue) {
    //       this.tableData = []
    //     }
    //     if (!newValue) {
    //       clearInterval(this.timer)
    //       clearInterval(this.timerValue)
    //       this.$emit('input', null)
    //     } else {
    //       this.select2fetchGroupsConfig(newValue)
    //     }
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
.SearchTree {
  min-width: 220px;
  width: 220px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #d1dbe5;
  background:#fff;
}
</style>