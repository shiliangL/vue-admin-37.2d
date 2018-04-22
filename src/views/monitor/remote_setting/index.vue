 <template>
  <div class="page" style="width: 100%">
    <div class="flex-box">
      <div>
        <SearchTree class="SearchTree" @clickSelect="clickSelect"></SearchTree>
      </div>
      <div class="content">
        <div class="mc-titel">
           <!-- 顶部搜索区域 -->
          <div class="search-bar">
            <div class="left" style="display: flex;align-items: center;">
               <div>
                <h4>设备名称（PSN码）</h4>
              </div>
              <div>
                <h4>状态: 正常</h4>
              </div>
            </div>
            <div class="right">
              <el-button type="danger" size="small"> 关机 </el-button>
              <el-button type="primary" plain size="small" > 读取 </el-button>
              <el-button type="primary" size="small" > 保存 </el-button>
            </div>
          </div>
        </div>
        <div class="mc-icon">
          <el-form ref="form" :model="form" label-width="180px" size="small" :inline="true">
            
            <el-form-item label="采样间隔/秒">
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
            </el-form-item>

          </el-form>
 
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { fetchShopAssistantInfo } from '@/api/shopInfo'
import { SearchTree } from '@/components/indexEx.js'
export default {
  name: 'remote_setting',
  components: {
    SearchTree
  },
  data() {
    return {
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
      min-width: 500px;
      width: 98%;
    }
  }
}
</style>

 