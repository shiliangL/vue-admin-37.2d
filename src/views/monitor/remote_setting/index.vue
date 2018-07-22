 <template>
  <div class="page" style="width: 100%">
    <div class="flex-box">
      <div>
        <SearchTree clitkType="set" class="SearchTree" @clickSelect="clickSelect" v-model="SetupConfig"></SearchTree>
      </div>
      <div class="content" v-if="SetupConfig">
        <div class="mc-titel">
           <!-- 顶部搜索区域 -->
          <div class="search-bar clearfix">
            <div class="left" style="display: flex;align-items: center;">
               <div>
                <h4>{{SetupConfig.name}}（ {{SetupConfig.psn}} ）</h4>
              </div>
              <div>
                <span>状态: </span>
                <el-tag  size="mini" type="gray" v-if="SetupConfig.online==0">离线</el-tag>
                <el-tag  size="mini" v-if="SetupConfig.online==1">在线</el-tag>
                <el-tag  size="mini" type="warning" v-if="SetupConfig.online==2">警告</el-tag>
                <el-tag  size="mini" type="danger" v-if="SetupConfig.online==3">故障</el-tag>
              </div>
            </div>
            <div class="right">
              <template v-if="SetupConfig.run!==1">
                <el-button type="primary" plain size="small" > 开机 </el-button>
              </template>
              <template v-else>
                <el-button type="danger" size="small"> 关机 </el-button>
              </template>
              <!-- <el-button type="primary" plain size="small" > 读取 </el-button>
              <el-button type="primary" size="small" > 保存 </el-button> -->
            </div>
          </div>
        </div>
        <div class="mc-icon">
          <el-form ref="form" :model="form" label-width="180px" size="small" class="form">
            <el-row :gutter="40">
              <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col clearfix" v-for="(item,index) in SetupConfig.option" :key="index">
                 <div v-if="item.type ==='D'"> <h4> {{item.caption}}: {{item.value }}/{{item.suffix}}</h4> </div>
                 <div v-else> <h4> {{item.caption}}: {{item.value }} </h4> </div>
              </el-col>
            </el-row>  
 
            <!-- <el-form-item label="采样间隔/秒">
              <el-input class="w180" type="number" v-model.trim="form.name"></el-input>
            </el-form-item>
            
            <el-form-item label="温度报警使能">
              <el-select class="w180"  v-model="form.name" placeholder="请选择活动区域">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="湿度报警使能">
              <el-select class="w180"  v-model="form.name" placeholder="请选择活动区域">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="距离报警使能">
              <el-select class="w180" v-model="form.name" placeholder="请选择活动区域">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item> -->

          </el-form>
 
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
// import { fetchShopAssistantInfo } from '@/api/shopInfo'
import { SearchTree } from '@/components/indexEx.js'
export default {
  name: 'remote_setting',
  components: {
    SearchTree
  },
  data() {
    return {
      SetupConfig: null,
      form: {
        name: null
      }
    }
  },
  mounted() {

  },
  methods: {
    onRefresh() {
      console.log('刷新页面')
    },
    fetchData() {
      // fetchShopAssistantInfo({ page: 0, size: 10 })
      //   .then(({ data }) => {
      //     this.table.data = data.content
      //     this.pagination.total = data.totalElements
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
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
      min-width: 500px;
      width: 98%;
      border: 1px solid #d1dbe5;
      border-radius: 8px;
      padding: 10px;
      background:#fff;
      .search-bar{
        border-bottom: 1px solid #d1dbe5;
      }
    }
    .form{
      padding: 20px;
    }
  }
}
</style>

 