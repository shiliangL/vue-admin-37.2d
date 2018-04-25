<template>
  <div class="page" style="width: 100%">
    <div class="flex-box">
      <div>
        <SearchTree class="SearchTree" @clickSelect="clickSelect"></SearchTree>
      </div>
       <transition name="el-fade-in">
        <div class="content" v-show="isShow">
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
              <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="(item,index) in data.option" :key="index">
                <div class="card-panel">
                  <div class="card-panel-description">
                    <div class="card-panel-text"> {{item.caption}} </div>
                    <div class="card-panel-num"> 
                      <template v-if="item.type !=='DI'||item.type !=='DO'">
                        {{item.value}}  <span> {{item.suffix}} </span> 
                      </template>

                      <span class="on-switch" v-if="item.type ==='DI'||item.type ==='DO'">
                        <span v-if="item.value===1" class="on el-switch is-checked el-switch__core" style="background-color: #409eff;">
                          <span class="el-switch__button" style="transform: translate3d(20px, 0px, 0px);"></span>
                        </span> 
                        <span v-else class="off el-switch is-checked el-switch__core">
                          <span class="el-switch__button" style="transform: translate3d(0px, 0px, 0px);"></span>
                        </span> 
                      </span>

                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
 
<script>
import { SearchTree } from '@/components/indexEx.js'
export default {
  name: 'real_time',
  components: {
    SearchTree
  },
  data() {
    return {
      isShow: false,
      data: {
        'PSN': null,
        'Name': null,
        'Time': null,
        'run': null,
        'mode': null,
        'error': null,
        'alarm': null,
        'option': []
      }
    }
  },
  mounted() {

  },
  methods: {
    clickSelect(item) {
      this.isShow = true
      if (!item) return
      const { data } = this
      data.PSN = item.PSN
      data.Name = item.Name
      data.Time = item.Time
      data.run = item.run
      data.mode = item.mode
      data.error = item.error
      data.alarm = item.alarm
      data.option = item.option
      console.log(item, '选择对象')
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .flex-box {
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

 