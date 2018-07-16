
<template>
    <div class="example">
      <h3>常规表格 tabs切换组件,table列表组件,收搜 Bar组件</h3>
      <search-bar ref="searchBar" :data="searchBarData" @search="searchAction" @reset="resetSearchBar" @command="clickMoreCommand"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 
          <el-table-column prop="categoryName" label="采购计划单号" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="采购计划来源" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="采购计划创建时间" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="采购申请时间" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="采购申请状态" align="center">
            <template slot-scope="scope" align="center">
               <el-tag size="small" v-if="scope.row.goodsStatus ===0">上架</el-tag>
               <el-tag size="small" type="warning" v-if="scope.row.goodsStatus ===1">下架</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="categoryName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="申请人" align="center"></el-table-column>
 
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="click2view(scope.$index,scope.row)">查看</el-button>
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
      
      <div style="height:700px"> 
        <h3>分页检索组件</h3> 
        <BoxToSearch
          multiple
         @change="selectChange"
        :id.sync="brandIds"
        :name.sync="brandNames">
        </BoxToSearch>
        <div>
          选择 {{brandNames}}
        </div>
      </div>

      <div class="page-block">
        {{selectedOptions}}
        <el-cascader
          :options="options2"
          v-model="selectedOptions"
          @active-item-change="handleItemChange"
          :props="props"
          ></el-cascader>
      </div>

			<!-- 弹层 -->
      <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refrehList" @edit="refrehList"></add>
    </div>
</template>

<script>
import Add from './add'
import model from '@/public/listModel.js'
import { BoxToSearch } from '@/components/base.js'
export default {
  name: 'example',
  mixins: [model],
  components: {
    Add,
    BoxToSearch
  },
  data() {
    return {
      brand: null,
      brandIds: null, // 多选
      brandNames: null,

      searchBarData: [
        [
          // 0 代表app 1 微信公众号 2 微信小程序
          { type: 'option', value: null, key: 'orderSource', class: 'w110', placeholder: '计划来源', options: [
            { label: 'App', value: 0 },
            { label: '微信公众号', value: 1 },
            { label: '微信小程序', value: 2 }]
          },
          { type: 'date', value: null, key: 'orderTime', width: '200px', placeholder: '创建时间' },
          { type: 'date', value: null, key: 'orderTime', width: '200px', placeholder: '申请时间' },
          { type: 'input', value: null, key: 'orderNoOrName', class: 'w180', placeholder: '输入采购计划单号检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'button', name: '新增' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ],
      options2: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      },
      selectedOptions: ['浙江', '杭州']
    }
  },
  created() {
    this.table.data = [{}]
    this.tabTitles = [
      { title: '全部', value: 0 },
      { title: '待申请', value: 1 },
      { title: '待审核', value: 2 },
      { title: '已通过', value: 3 },
      { title: '已拒绝', value: 4 }
    ]
  },
  methods: {
    selectChange(value) {
      this.brandNames = value
    },
    tabsCallBack(item) {
      this.$nextTick().then(() => {
        this.$refs['searchBar'].sendSearchParams()
      })
    },
    searchAction(params) {
      this.paramsData = {
        orderNoOrName: params.orderNoOrName,
        orderTime: params.orderTime,
        paymentType: params.paymentType,
        orderSource: params.orderSource
      }
      this.fecthList()
    },
    clickMoreCommand(command) {
      this.$message({ type: 'success', message: command, duration: 0, showClose: true })
    },
    // 数据请求
    fecthList() {
      // const { index, size } = this.pagination
      // const data = {
      //   index,
      //   size,
      //   status: this.curIndex,
      //   ...this.paramsData
      // }
      // orderList(data).then(({ data }) => {
      //   this.table.data = data.rows
      //   this.pagination.total = data.total
      // }).catch(e => {
      //   this.$message({ type: 'error', message: e, duration: 0, showClose: true })
      // })
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
    click2view(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row }})
    },
    click2follow(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'follow', obj: row }})
    },
    refrehList() {

    },
    resetSearchBar() {
      this.curIndex = 0
      this.fecthList()
    },
    handleItemChange(val) {
      console.log('active item:', val)
      setTimeout(_ => {
        if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
          this.options2[0].cities = [{
            label: '南京'
          }]
        } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
          this.options2[1].cities = [{
            label: '杭州'
          }]
        }
      }, 300)
    }
  }
}
</script>

<style scoped lang="scss">
.example{
  background: #fff;
	h3{
		padding: 10px;
		text-align: center;
	}
}
</style>