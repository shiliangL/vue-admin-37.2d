<!-- 商品列表 -->
<template>
    <div class="goodsList">

      <search-bar ref="searchBar" :data="searchBarData" @search="searchAction" @add="showAdd()" @reset="resetSearchBar" @command="clickMoreCommand"></search-bar>
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="goodsImage" label="商品图片" align="center">
             <template slot-scope="scope">
               <img :src="`${baseImgUrl}${scope.row.goodsImage}`">
            </template>
          </el-table-column>
          <el-table-column prop="categoryName" label="商品分类" align="center"></el-table-column>
          <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="baseUnitId" label="单位" align="center"></el-table-column>
          <el-table-column prop="sellingPrice" label="市场价" align="center"></el-table-column>
          <el-table-column prop="aliasTitle" label="别名" align="center"></el-table-column>
          <el-table-column prop="purchaseType" label="采购类型" align="center">
             <template slot-scope="scope" align="center">
               <span v-if="scope.row.purchaseType ===1">供货</span>
               <span v-if="scope.row.purchaseType ===2">自采</span>
               <span v-if="scope.row.purchaseType ===3">未指定</span>
            </template>
          </el-table-column>
          <el-table-column prop="customerName" label="采购员/供应商" align="center"></el-table-column>

          <el-table-column prop="goodsStatus" label="状态" align="center">
            <template slot-scope="scope" align="center">
               <el-tag size="small" v-if="scope.row.goodsStatus ===0">上架</el-tag>
               <el-tag size="small" type="warning" v-if="scope.row.goodsStatus ===1">下架</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="mini" @click.stop="click2view(scope.$index,scope.row)">详情</el-button>
              <el-button type="text" v-if="scope.row.goodsStatus ===0" size="mini" @click.stop="clickToUpOrDown(scope.$index, scope.row)">下架</el-button>
              <el-button type="text" v-if="scope.row.goodsStatus ===1" size="mini" @click.stop="clickToUpOrDown(scope.$index, scope.row)">上架</el-button>
              <el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
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

      <!-- 弹层 -->
      <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refrehList" @edit="refrehList"></add>
    </div>
</template>

<script>
import Add from './add'
import model from '@/public/listModel.js'
import { list, fecthGoodsClass, deletepProduct, productsDown, productsUp } from '@/api/goodsList.js'
import { mapGetters } from 'vuex'

export default {
  name: 'goodsList',
  mixins: [model],
  components: {
    Add
  },
  data() {
    return {
      curIndex: 0,
      tabTitles: [
        { title: '全部', value: '' },
        { title: '待付款', value: 6 },
        { title: '待发货', value: 0 },
        { title: '待收货', value: 1 },
        { title: '退/换货', value: 2 },
        { title: '已取消', value: 4 },
        { title: '已关闭', value: 5 }
      ],
      options: {
        goodsClass: []
      },
      searchBarData: [
        [
          { type: 'option', value: null, key: 'categoryId', class: 'w110', placeholder: '一级分类', options: [
            // { label: '水产冻货', value: 0 },
            // { label: '调料干货', value: 1 },
            // { label: '米面粮油', value: 2 }
          ]
          },
          //   商品状态, 0 上架，1 下架
          { type: 'option', value: null, key: 'goodsStatus', class: 'w110', placeholder: '全部状态', options: [
            { label: '上架', value: 0 },
            { label: '下架', value: 1 }]
          },
          //   1：供货，2：自采，3：未指定
          { type: 'option', value: null, key: 'purchaseType', class: 'w110', placeholder: '采购类型', options: [
            { label: '供应商直供', value: 1 },
            { label: '市场自采购', value: 2 }
          ]
          },
          { type: 'input', value: null, key: 'title', class: 'w180', placeholder: '输入订单编号／客户名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ],
      searchParams: {
        title: null,
        categoryId: null,
        purchaseType: null,
        goodsStatus: null
      }
    }
  },
  created() {
  },
  mounted() {
    this.fecthList()
    this.fecthGoodsClass()
  },
  computed: {
    ...mapGetters([
      'baseImgUrl'
    ])
  },
  methods: {
    searchAction(params) {
      console.log(params, 'xx')
      this.searchParams = {
        title: params.title,
        categoryId: params.categoryId,
        purchaseType: params.purchaseType,
        goodsStatus: params.goodsStatus
      }
      this.fecthList()
    },
    clickMoreCommand(command) {
      this.$message({ type: 'success', message: command, duration: 0, showClose: true })
    },
    // 数据请求
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        ...this.searchParams
      }
      list(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
      }).catch(e => {
        this.$message({ type: 'error', message: '列表加载失败', duration: 0, showClose: true })
      })
    },
    fecthGoodsClass() {
      fecthGoodsClass().then(({ data }) => {
        if (!Array.isArray(data) && data.length <= 0) return
        const result = []
        for (const item of data) {
          if (item.parentId === '0') {
            result.push({
              label: item.title,
              value: item.title
            })
          }
        }
        this.searchBarData[0][0].options = result
      }).catch(e => {
        this.$message({ type: 'error', message: '加载分类失败失败' })
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
    click2view(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row }})
    },
    click2follow(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'follow', obj: row }})
    },
    showAdd(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: row }})
    },
    refrehList() {
      this.fecthList()
    },
    resetSearchBar() {
      console.log('重置')
    },
    clickToUpOrDown(index, item) {
      const msg = item.goodsStatus === 0 ? '是否确定下架操作？' : '是否确定上架操作？'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        if (item.goodsStatus === 0) {
          productsDown({ ids: item.id }).then(res => {
            this.$message({ type: 'success', message: `${res.msg}` })
            this.fecthList()
          }).catch(() => {
            this.$message({ type: 'error', message: '操作失败' })
          })
        } else {
          productsUp({ ids: item.id }).then(res => {
            this.$message({ type: 'success', message: `${res.msg}` })
            this.fecthList()
          }).catch(() => {
            this.$message({ type: 'error', message: '操作失败' })
          })
        }
      }).catch(() => {})
    },
    clickToDelete(index, item) {
      this.$confirm('是否确定删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        deletepProduct({ ids: item.id }).then(res => {
          this.$message({ type: 'success', message: `${res.msg}` })
          this.fecthList()
        }).catch(() => {
          this.$message({ type: 'error', message: '删除失败' })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.goodsList {
  width: 100%;
  height: 100%;
  .content {
    padding: 20px;
  }
}
</style>