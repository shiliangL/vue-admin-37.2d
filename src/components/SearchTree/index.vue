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
        v-loading.body="listLoading" element-loading-text="拼命加载中" highlight-current-row @row-click="clickTableRow">
          <el-table-column align="center" label="序号" width="40">
            <template slot-scope="scope">
              <span v-text="scope.$index+1"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="名称">
             <template slot-scope="scope">
              <span> {{scope.row.name}} ( PSN:{{scope.row.psn}})</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="状态"> 
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
  fetchMeasureConfig,
  fetchmMeasureValue,
  fetchGroupConfig,
  // fetchgSetUpvalue,
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
      SetupConfig: {

      },
      codeOrname: null
    }
  },
  mounted() {
    this.fetchGroupData()
  },
  created() {
    // this.SetupConfig = {
    //   CtrlEnable: null,
    //   caption: null,
    //   max: null,
    //   min: null,
    //   modify: null,
    //   suffix: null,
    //   type: null,
    //   visible: null
    // }
  },
  methods: {
    fetchGroupData() {
      fetchGroups({ page: 0, size: 10, codeOrname: this.codeOrname }).then(data => {
        this.groupOptions = data.groups
      }).catch(error => {
        console.log(error)
      })
    },
    // 定时刷新设备状态
    setIntervalFetch(id) {
      const fechTime = 5000
      if (!id) return
      if (!this.timer) {
        this.fetchProductStatus(id)
      }
      this.timer = setInterval(() => {
        this.fetchProductStatus(id)
      }, fechTime)
    },
    // 加载组下的设备+状态
    fetchProductStatus(id) {
      fetchGroupDev({ GroupId: id }).then(data => {
        if (JSON.stringify(data.list) !== '{}') {
          const tableData = []
          const result = JSON.parse(data.list)
          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              const item = result[key]
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
        } else {
          this.tableData = []
        }
      }).catch(error => {
        console.log(error)
      })
    },
    select2fetchGroupsConfig(id) {
      // 选择组改变的时候
      if (!id) return
      if (this.clitkType === 'get') {
        this.loadGetConfig(id)
      } else {
        console.log('控制')
      }
      // 加载组下设备 5秒刷新
      this.setIntervalFetch(id)
      console.log('异步')
    },
    loadGetConfig(id) {
      // 加载检测配置
      fetchMeasureConfig({ GroupID: id }).then(res => {
        console.log(res, 'sb')
        // debugger
        // const result = data.MeasureConfig
        // console.log(result, 'xxxxxxx')
        // if (!result) return
        // const { config } = this
        // config.caption = result.caption.split(',')
        // config.suffix = result.suffix.split(',')
        // config.type = result.type.split(',')
        // config.visible = result.visible
        // console.log(config, '配置')
      }).catch(error => {
        console.log(error)
      })
    },
    loadSetConfig(id) {
      // 加载控制配置
      fetchGroupConfig({ GroupID: id }).then(data => {
        console.log(data)
        if (data.result === 'ok' && data.SetupConfig) {
          this.$emit('input', data.SetupConfig)
        }
        // const result = data.SetupConfig
        // if (!result) return
        // const { SetupConfig } = this
        // SetupConfig.caption = result.caption.split(',')
        // SetupConfig.suffix = result.suffix.split(',')
        // SetupConfig.max = result.max.split(',')
        // SetupConfig.min = result.min.split(',')
        // SetupConfig.visible = result.visible
        // SetupConfig.CtrlEnable = result.CtrlEnable
        // SetupConfig.modify = result.modify
        // SetupConfig.type = JSON.parse(result.type).list
      }).catch(error => {
        console.log(error)
      })
    },
    clickTableRow(data) {
      // 加载组下具体设备 fetchmMeasureValue
      if (this.clitkType === 'get') {
        fetchmMeasureValue({ PSN: data.psn }).then(res => {
          const reslutData = res
          const data = res.Value.slice(0, this.config.visible)
          const option = []
          const { config } = this
          debugger
          if (Array.isArray(data) && data.length > 0) {
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
          } else {
            this.$emit('clickSelect', null)
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        // 加载组下设备设置值
        this.$emit('clickSelect', data)
        // fetchgSetUpvalue({ PSN: data.psn }).then(res => {
        //   const data = res.value.slice(0, this.SetupConfig.visible)
        //   const option = []
        //   const { SetupConfig } = this
        //   if (Array.isArray(data) && data.length > 0) {
        //     data.forEach((item, index) => {
        //       option.push({
        //         caption: SetupConfig.caption[index],
        //         suffix: SetupConfig.suffix[index],
        //         max: SetupConfig.max[index],
        //         min: SetupConfig.min[index],
        //         visible: SetupConfig.visible,
        //         value: item
        //       })
        //     })
        //     SetupConfig.option = option
        //     this.$emit('clickSelect', SetupConfig)
        //   } else {
        //     this.$emit('clickSelect', null)
        //   }
        // }).catch(error => {
        //   console.log(error)
        // })
      }
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
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  watch: {
    group: {
      handler(val) {
        this.tableData = []
        if (!val) {
          clearInterval(this.timer)
        }
      }
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