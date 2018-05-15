<template>
    <div class="SearchTree">
      <div class="search">
          <el-select v-model="group" placeholder="设备组" size="mini" class="w160" filterable @change="select2fetchGroupsConfig">
            <el-option v-for="item in groupOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <!-- <el-input class="w160" size="mini" placeholder="设备名称检索" v-model.trim="codeOrname" disabled></el-input> -->
          <!-- <el-button type="primary" size="mini" @click="filterSeach"> 搜索 </el-button>
          <el-button style="margin:0px" size="mini" @click="reset"> 重置 </el-button> -->
      </div>
      <div class="tree">
        <el-table :data="tableData" size="mini" :max-height="430" style="width: 100%"
        v-loading.body="listLoading" element-loading-text="拼命加载中" highlight-current-row @row-click="clickTableRow">
          <el-table-column align="center" label="设备名称">
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
  fetchSetConfig,
  fetchgSetUpvalue,
  fetchGroupDev } from '@/api/monitor'
export default {
  name: 'SearchTree',
  components: {
    ScrollBar
  },
  props: {
    value: {
      type: Object
    },
    clitkType: {
      type: String, // 'get' 'set'
      required: true
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
      fechTime: 10000 // 监控时间间隔
    }
  },
  mounted() {
    this.fetchGroupData()
  },
  created() {
    this.isDefault = true // 默认加载第一项
  },
  methods: {
    fetchGroupData() {
      fetchGroups({ page: 0, size: 10, codeOrname: this.codeOrname }).then(({ groups }) => {
        if (Array.isArray(groups) && groups.length > 0) {
          this.groupOptions = groups
          this.group = groups[0].id
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 定时刷新组下设备状态
    setIntervalfetchStatus(id) {
      if (!id) return
      if (!this.timer) {
        this.fetchProductStatus(id)
      }
      this.timer = setInterval(() => {
        this.fetchProductStatus(id)
      }, this.fechTime)
    },
    // 加载组下的设备+状态
    fetchProductStatus(id) {
      console.log('监控状态')
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
                  name: item[0],
                  psn: item[1],
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
    // 定时刷新组下设备的值,需要选中具体设备
    setIntervalfetchValue(psn) {
      if (!psn) return
      if (!this.timerValue) {
        this.loadMeasureValue(psn)
      }
      this.timerValue = setInterval(() => {
        this.loadMeasureValue(psn)
      }, this.fechTime)
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
    loadSetMeasureValue(value) {
      fetchgSetUpvalue({ PSN: value.psn }).then(data => {
        if (data.result === 'ok') {
          if (!this.SetupConfig) return
          const reslutData = data
          const option = []
          const result = data.value.slice(0, this.SetupConfig.visible)
          const { SetupConfig } = this
          if (Array.isArray(result) && result.length > 0) {
            result.forEach((item, index) => {
              const value = SetupConfig.type[index] !== 'D' ? SetupConfig.type[index].O[item - 1] : item
              option.push({
                caption: SetupConfig.caption[index],
                suffix: SetupConfig.suffix[index],
                max: SetupConfig.max[index],
                min: SetupConfig.min[index],
                type: SetupConfig.type[index],
                value: value
              })
            })
            reslutData.option = option
            const val = Object.assign({}, value, reslutData)
            this.$emit('input', val)
          } else {
            this.$emit('input', null)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    select2fetchGroupsConfig(id) {
      // 选择组改变的时候
      if (!id) return
      if (this.isLoading) return
      if (this.clitkType === 'get') {
        this.loadGetConfig(id)
      } else {
        this.loadSetConfig(id)
      }
      // 加载组下设备 5秒刷新
      this.setIntervalfetchStatus(id)
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
    loadSetConfig(id) {
      // 加载控制配置
      fetchSetConfig({ GroupID: id }).then(({ SetupConfig }) => {
        if (SetupConfig) {
          this.SetupConfig = {
            caption: SetupConfig.caption.split(','),
            suffix: SetupConfig.suffix.split(','),
            max: SetupConfig.max.split(','),
            min: SetupConfig.min.split(','),
            visible: SetupConfig.visible,
            CtrlEnable: SetupConfig.CtrlEnable,
            modify: SetupConfig.modify,
            type: JSON.parse(SetupConfig.type).list
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    clickTableRow(data) {
      this.isDefault = false
      // clearInterval(this.timer)
      clearInterval(this.timerValue)
      // 点击选择 row 时候
      this.clitkPsn = data.psn
      if (this.clitkType === 'get') {
        if (this.isLoading) return
        this.setIntervalfetchValue(data.psn)
      } else {
        // 加载组下设备设置值
        this.loadSetMeasureValue(data)
      }
    },
    filterSeach() {
      const { codeOrname, tableData } = this
      if (!codeOrname) return
      tableData.filter(item => {
        return item.name === codeOrname
      })
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
    group: {
      handler(newValue, oldValue) {
        if (newValue && oldValue) {
          this.tableData = []
        }
        if (!newValue) {
          clearInterval(this.timer)
          clearInterval(this.timerValue)
          this.$emit('input', null)
        } else {
          this.select2fetchGroupsConfig(newValue)
        }
      }
    }
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