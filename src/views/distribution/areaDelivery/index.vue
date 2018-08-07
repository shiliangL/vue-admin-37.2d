<!-- 配送区域 -->
<template>
    <div class="areaDelivery">

      <div class="search-bar">
        <div class="left">
          <el-select class="w90'" size="small" v-model="searchBarDate.driveId" clearable filterable placeholder="配送员">
            <el-option v-for="sub in options.driverOption" :key="sub.id" :label="sub.name" :value="sub.id"></el-option>
          </el-select>
        </div>
        <div class="left">
          <SelectCity v-model="cityDTO"></SelectCity>
        </div>
        <div class="left">
          <el-button type="primary" size="small" @click="fecthList"> 搜索 </el-button>
          <el-button size="small"  @click="reset"> 重置 </el-button>
        </div>
        <div class="right">
          <div class="left">
            <el-button size="small" @click="showAdd"> 新增 </el-button>
          </div>
        </div>
      </div>
 
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 
 					<el-table-column prop="title" label="配送区域名称" align="center"></el-table-column>
					<el-table-column prop="summary" label="区域说明" align="center"></el-table-column>
					<el-table-column prop="cityName" label="所在城市" align="center">
             <template slot-scope="scope">
               <span> {{scope.row.provinceName}}{{scope.row.cityName}}</span>
            </template>
          </el-table-column>
					<el-table-column prop="scmDriverStr" label="配送员" align="center"></el-table-column>
					<el-table-column prop="customeCount" label="关联客户数" align="center">
             <template slot-scope="scope">
               <el-button type="text" size="mini" @click.stop="clickToView(scope.$index,scope.row)">{{scope.row.customeCount}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="clickToEditor(scope.$index,scope.row)">编辑</el-button>
							<el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        
        <el-pagination
          slot="footer"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.page"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>

      </table-contain>

      <!-- 弹层区域 -->
      <el-dialog :title="dialogTitle" class="dialogTitle" width="520px" :visible.sync="dialogVisible" append-to-body center @close="resetForm">
          <Add v-if="dialogVisible" @close="resetForm" @add="fecthList" :propsData="propsData"></Add>
      </el-dialog>
      
    </div>
</template>

<script>
import model from '@/public/listModel.js'
import Add from './add'
import { SelectCity } from '@/components/base.js'
import { fetchList, fetchDriverList, deleteRow } from '@/api/distribution/areaDelivery.js'

export default {
  name: 'areaDelivery',
  mixins: [model],
  components: {
    Add,
    SelectCity
  },
  data() {
    return {
      cityDTO: null,
      searchBarDate: {
        title: null,
        driveId: null
      },
      options: {
        driverOption: [],
        provinceOption: [],
        cityOption: []
      },
      propsData: {
        isUpdate: false,
        type: null,
        data: null
      },
      dialogVisible: false,
      dialogTitle: null
    }
  },
  created() {
    this.tabTitles = [
      { title: '验收台', value: 1 },
      { title: '入库台', value: 2 },
      { title: '出库台', value: 3 },
      { title: '分拣台', value: 4 },
      { title: '打包台', value: 5 }
    ]
  },
  mounted() {
    this.fecthList()
    this.fetchOption()
  },
  methods: {
    reset() {
      this.searchBarDate = {
        title: null,
        driveId: null
      }
      this.cityDTO = null
      this.fecthList()
    },
    // 数据请求
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        provinceId: this.cityDTO ? this.cityDTO[0].id : null,
        cityId: this.cityDTO ? this.cityDTO[1].id : null,
        ...this.searchBarDate
      }
      fetchList(data).then(({ data }) => {
        if (Array.isArray(data.rows)) {
          for (const item of data.rows) {
            const arr = []
            for (const key of item.scmDriver) {
              if (key.name) {
                arr.push(key.name)
              }
            }
            item.scmDriverStr = arr.toString()
          }
          this.table.data = data.rows
        }
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fetchOption() {
      // 配送员
      fetchDriverList().then(({ data }) => {
        if (Array.isArray(data.rows)) {
          this.options.driverOption = data.rows
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fecthList()
    },
    handleCurrentChange(value) {
      this.pagination.index = value
      this.fecthList()
    },
    // 弹层操作
    clickToEditor(index, row) {
      this.dialogTitle = '编辑配送区域'
      this.propsData.type = 'add'
      this.dialogVisible = true
      this.propsData.isUpdate = true
      this.propsData.data = row
    },
    // 弹层操作
    clickToView(index, row) {
      if (row.customeCount === 0) return
      this.dialogTitle = '查看关联客户'
      this.propsData.type = 'view'
      this.dialogVisible = true
      this.propsData.isUpdate = true
      this.propsData.data = row
    },
    showAdd() {
      this.dialogTitle = '新增配送区域'
      this.propsData.type = 'add'
      this.propsData.isUpdate = false
      this.dialogVisible = true
    },
    refrehList() {
      this.fecthList()
    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fecthList()
    },
    resetForm() {
      this.dialogVisible = false
    },
    clickToDelete(index, item) {
      this.$confirm('是否需要删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        deleteRow({ id: item.id }).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.fecthList()
        }).catch((e) => {
          this.$message({ type: 'error', message: e.msg
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>