<!-- 打包台 -->
<template>
    <div class="packaging">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>
      <search-bar :data="searchBarData" @search="searchAction"  @reset="resetSearchBar"></search-bar>
      <!-- 表格 -->
      <table-contain :height.sync="table.maxHeight">
        <el-table :data="table.data" v-loading="tableLoading" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope"> <span>{{scope.$index + 1}}</span> </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="销售订单编号" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="distributionArea" label="配送区域" align="center"></el-table-column>
          <el-table-column prop="stockName" label="仓库" align="center"></el-table-column>
          <el-table-column prop="createdTime" label="出库单创建时间" align="center"></el-table-column>
          <el-table-column prop="completionTime" label="打包完成时间" align="center"></el-table-column>
          <el-table-column prop="finishStatus" label="扫描状态" align="center">
              <template slot-scope="scope"> 
                <!-- 订单明细是否完全被扫描完成 -->
                <el-tag size="mini" type="success" v-if="scope.row.finishStatus===1">完成</el-tag>
                <el-tag size="mini" type="danger" v-if="scope.row.finishStatus===0">未完成</el-tag>
              </template>
          </el-table-column>
          <el-table-column prop="finishStatus" label="打印状态" align="center">
              <template slot-scope="scope"> 
                <!-- 订单生成条码之后完成状态 -->
                <el-tag size="mini" type="success" v-if="scope.row.barCodeStatus===1">已打印</el-tag>
                <el-tag size="mini" type="warning" v-if="scope.row.barCodeStatus===0">未打印</el-tag>
              </template>
          </el-table-column> 
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope" align="center">
              <template v-if="scope.row.finishStatus===1">
                <el-button type="text" size="mini" v-if="!scope.row.barCode" style="color: #c0c4cc;" @click.stop="clickToCreateTip(scope.$index,scope.row)">打印标签</el-button>
                <el-button type="text" size="mini" v-else @click.stop="clickToCreateTip(scope.$index,scope.row)">打印标签</el-button>
              </template>
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

      <!-- 弹层 -->
      <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refrehList" @edit="refrehList"></add>
      
    </div>
</template>

<script>
import Add from './add'
import model from '@/public/listModel.js'
import { Tabs } from '@/components/base.js'
import { fecthList } from '@/api/packaging/index.js'
import { packageScavenging, outUpdateQuantity, fecthHeaderDetail } from '@/api/packaging/index.js'
import { printWeb } from '../Print/print.js'
const loginKey = JSON.parse(sessionStorage.getItem('loginKey'))

export default {
  name: 'packaging',
  mixins: [model],
  components: {
    Tabs,
    Add
  },
  data() {
    return {
      code: '',
      lastTime: null,
      nextTime: null,
      lastCode: null,
      nextCode: null,

      todayTime: '',
      curIndex: 1,
      searchBarData: [
        [
          { type: 'date', value: null, key: 'createdTime', width: '200px', placeholder: '创建时间' },
          { type: 'option', value: null, key: 'stockId', class: 'w150', placeholder: '仓库', options: [] },
          { type: 'option', value: null, key: 'tableId', class: 'w150', placeholder: '打包台', options: [] },
          { type: 'option', value: null, key: 'packerId', class: 'w150', placeholder: '打包员', options: [] },
          { type: 'input', value: null, key: 'inputContent', class: 'w180', placeholder: '输入销售订单编号/客户名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          // { type: 'add', name: '新增' }
          // { type: 'more', labels: ['导入', '上传图片'] }
        ]
      ]
    }
  },
  created() {
    this.tabTitles = [
      { title: '销售订单', value: 1 },
      { title: '销售换货', value: 2 }
    ]
  },
  mounted() {
    window.addEventListener('keydown', this.onkeydown)

    const date = new Date()
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    const ymd = date.getFullYear() + '-' + month + '-' + day
    this.todayTime = ymd
    this.searchBarData[0][0].value = ymd
    this.fecthList()
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onkeydown)
  },
  methods: {
    onkeydown(e) {
      if (!e.which) {
        this.$message({ type: 'error', message: '浏览器不支持该扫描枪，请使用谷歌浏览器,QQ浏览器' })
        return
      }
      this.nextCode = e.which
      this.nextTime = new Date().getTime()
      if (this.lastCode != null && this.lastTime != null && this.nextTime - this.lastTime <= 40) {
        this.code += String.fromCharCode(this.lastCode)
      } else if (this.lastCode != null && this.lastTime != null && this.nextTime - this.lastTime > 100) {
        this.code = ''
      }
      this.lastCode = this.nextCode
      this.lastTime = this.nextTime
      if (e.which === 13) {
        this.packageScavenging(this.code)
      }
    },
    clickToCreateTip(index, row) {
      // 打印标签先生成在 打印
      if (row.barCode) {
        this.clickToPrintDD(index, row)
      } else {
        if (!loginKey) {
          this.$message({ type: 'error', message: '工作台参数错误,F5刷新页面或者新登录' })
          return
        }
        const data = { 'packageInfoId': row.id, 'tableId': loginKey.id }
        outUpdateQuantity(data).then(res => {
          this.fecthList()
          this.clickToPrintDD(index, row)
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      }
    },
    clickToPrintDD(index, row) {
      if (!row.id) return
      fecthHeaderDetail({ id: row.id }).then(({ data }) => {
        setTimeout(() => {
          const LODOP = printWeb.getCLodop()
          if (!LODOP) {
            this.$message({ type: 'error', message: '打印插件未安装' })
            return
          }

          LODOP.PRINT_INITA(6, -6, 1000, 1000, '打包条码')
          LODOP.SET_PRINT_PAGESIZE(0, 1000, 1000, 'CreateCustomPage')
          LODOP.ADD_PRINT_TEXT(8, 10, 130, 26, '【打包条码:')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(8, 138, 240, 26, data.barCode + '】')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(34, 10, 110, 26, '客户名称:')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(34, 118, 260, 26, data.customerName)
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(60, 118, 260, 26, data.distributionArea || '无')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(60, 10, 110, 26, '配送区域:')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(112, 10, 110, 26, '下单时间:')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(86, 118, 260, 26, data.orderNo)
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(86, 10, 110, 26, '订单编号:')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(112, 118, 260, 26, data.createdTime)
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(138, 10, 110, 26, '送达日期:')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(138, 118, 260, 26, data.sendDate)
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(164, 10, 110, 26, '送达时间:')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(164, 118, 260, 26, data.sendTime)
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(190, 10, 110, 26, '收货人:')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
          LODOP.ADD_PRINT_TEXT(190, 118, 260, 26, data.contacts)
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 14)
          LODOP.ADD_PRINT_BARCODE('74.08mm', '6.09mm', '110.07mm', '20.11mm', '128A', data.barCode)
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
          LODOP.ADD_PRINT_TEXT(216, 10, 110, 26, '收货地址:')
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 14)
          LODOP.ADD_PRINT_TEXT(216, 118, 260, 60, data.address)
          LODOP.SET_PRINT_STYLEA(0, 'FontSize', 14)

          // LODOP.PREVIEW()
          // LODOP.PRINT_DESIGN()
          // LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 0, 0, '')
          LODOP.PRINT()// 直接打印
        }, 400)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    packageScavenging(barCode) {
      if (!barCode) return
      packageScavenging({ barCode }).then(({ data }) => {
        this.$message({ type: 'success', message: '扫描成功' })
        this.fecthList()
        this.code = ''
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
        this.code = ''
      })
    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fecthList()
    },
    // 数据请求
    fecthList() {
      this.tableLoading = true
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        createdTime: this.searchBarData[0][0].value,
        storehouseType: this.curIndex
      }
      fecthList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.$message({ type: 'error', message: e.msg })
      })
    },
    searchAction(item) {
      this.tableLoading = true
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        ...item,
        storehouseType: this.curIndex
      }
      fecthList(data).then(({ data }) => {
        this.table.data = data.rows
        this.pagination.total = data.total
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.$message({ type: 'error', message: e.msg })
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
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'view', obj: row, title: '订单打包详细信息' }})
    },
    refrehList() {
      this.fecthList()
    },
    resetSearchBar() {
      this.searchBarData[0][0].value = this.todayTime
      this.fecthList()
    }
  }
}
</script>

<style scoped>
 
</style>