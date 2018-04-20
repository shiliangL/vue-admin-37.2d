<template>
  <div class="page" style="width: 100%">
    <div class="flex-box">
      <div>
        <SearchTree class="SearchTree" @clickSelect="clickSelect"></SearchTree>
      </div>
      <div class="content">
        <div class="mc-titel">
          <el-row :gutter="40">
            <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
              <div> <h4 style="color: #409eff;">{{data.Name}}（PSN码:{{data.PSN}}）</h4> </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
              <div> <h4>系统: {{data.run===1?'正常':'停机'}}</h4> </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
              <div> <h4>模式: {{data.mode}}</h4> </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
              <div> <h4>采集时间: {{data.Time}}</h4> </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
              <div> <h4>告警: {{data.alarm}}</h4> </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
              <div> <h4>故障: {{data.error}}</h4> </div>
            </el-col>
          </el-row>    
        </div>
        <div class="mc-icon">
           <el-row class="panel-group" :gutter="40">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="item in data.Value" :key="item">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-people">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">New Visits</div>
                  <div class="card-panel-num"> {{item}} </div>
                </div>
              </div>
            </el-col>
           </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { fetchShopAssistantInfo } from '@/api/shopInfo'
import { SearchTree } from '@/components/indexEx.js'
export default {
  name: 'real_time',
  components: {
    SearchTree
  },
  data() {
    return {
      data: {
        'PSN': 18010001,
        'Name': '设备1#',
        'Time': '2018-4-19 15:51:28',
        'run': 1,
        'mode': '制冷模式',
        'error': '故障！故障码:xx',
        'alarm': '报警！报警码:xx',
        'Value': [
          23.4,
          67,
          1,
          0
        ],
        'result': 'ok',
        'msg': '获取测量值成功!(暂时为假数据)'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.fetchData()
    }, 2000)
  },
  methods: {
    onRefresh() {
      console.log('刷新页面')
    },
    fetchData() {
      fetchShopAssistantInfo({ page: 0, size: 10 })
        .then(({ data }) => {
          this.table.data = data.content
          this.pagination.total = data.totalElements
        })
        .catch(error => {
          console.log(error)
        })
    },
    clickSelect(item) {
      console.log(item, '选择对象')
    },
    handleClickTabs(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .flex-box {
    .tree {
    }
    .content {
      margin-left: 10px;
      width: 98%;
      .flex-box {
        justify-content: space-around;
      }
    }
  }
}
</style>

 