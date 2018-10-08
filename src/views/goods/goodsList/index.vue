<!-- 商品列表 -->
<template>
    <div class="goodsList">
      <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

      <div class="search-bar">
        <div class="left">
          <el-select class="w110" size="small" v-model="levelFirst" clearable filterable placeholder="一级分类">
            <el-option v-for="sub in searchBarOptons.categoryOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
          </el-select>
        </div>

        <div class="left" v-if="searchBarOptons.levelTowOption.length"> 
          <el-select class="w110" size="small" v-model="levelFecond" clearable filterable placeholder="二级分类">
            <el-option v-for="sub in searchBarOptons.levelTowOption" :key="sub.id" :label="sub.title" :value="sub.id"></el-option>
          </el-select>
        </div>

        <div class="left">
          <CascaderBox v-model="CascaderBoxDTO"></CascaderBox>
        </div>

        <div class="left">
          <el-input style="width:180px" v-model="searchParams.title" size="small" @keyup.enter.native="clickToSearch" placeholder="输入商品名称检索"></el-input>
        </div>
         <div class="left">
            <el-button  type="primary" size="small" @click.stop="clickToSearch" > 搜索 </el-button>
        </div>
        <div class="left">
            <el-button size="small" @click.stop="reset" > 重置 </el-button>
        </div>
        <div class="right">
          <div class="left">
            <el-button size="small" @click.stop="showAdd" > 新增 </el-button>
            <el-button size="small" @click.stop="exportFile" :loading="exportLoading" > 导出Excel </el-button>
          </div>
           <el-dropdown class="right" trigger="click" @command="clickCommand">
              <el-button size="small"> 批量操作 <i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="label in options.moreOptins" :key="label" :command="label">{{label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
      </div>
 
      <!-- 表格 -->
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row
          ref="multipleTable"
          @row-click="clickTableRow"
          @selection-change="selectOneAndMore"
          @select-all="selectAll">

          <el-table-column type="selection" width="40"></el-table-column>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="goodsImage" label="商品图片" align="center">
             <template slot-scope="scope">
               <div class="picBox"> <img :src="`${scope.row.goodsImage}`"> </div>
            </template>
          </el-table-column>
          <el-table-column prop="categoryName" label="商品分类" align="center"></el-table-column>
          <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="baseUnitName" label="基本单位" align="center"></el-table-column>
          <el-table-column prop="basePrice" label="基本单位价格" align="center"></el-table-column>
          <el-table-column prop="purchaseType" label="采购类型" align="center">
             <template slot-scope="scope" align="center">
               <span v-if="scope.row.purchaseType ===2">供应商直供</span>
               <span v-if="scope.row.purchaseType ===1">市场自采</span>
            </template>
          </el-table-column>
          <el-table-column prop="titleName" label="采购员/供应商" align="center"></el-table-column>
          <el-table-column prop="upperGoodsTime" label="上架时间" width="90" align="center">
             <template slot-scope="scope" align="center">
               <span v-if="curIndex ===0">{{scope.row.upperGoodsTime}}</span>
               <span v-else> - </span>
            </template>
          </el-table-column>
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
              <el-button type="text" v-if="scope.row.goodsStatus !==0" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
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
import { Tabs, CascaderBox } from '@/components/base.js'
import { fecthList, fecthGoodsClass, deletepProduct, productsDown, productsUp } from '@/api/goodsList.js'
import { mapGetters } from 'vuex'
export default {
  name: 'goodsList',
  mixins: [model],
  components: {
    Add,
    Tabs,
    CascaderBox
  },
  data() {
    return {
      exportLoading: false,
      curIndex: 0,
      options: {
        moreOptins: ['批量上架', '批量下架', '批量删除'],
        goodsClass: []
      },
      CascaderBoxDTO: null,
      supplyType: '', // 过渡变量供应商类别
      searchParams: {
        title: null,
        categoryId: null,
        purchaseType: null,
        supplyId: null,
        buyerId: null
      },
      searchBarOptons: {
        categoryOption: [],
        levelTowOption: [],
        purchaseTypeOption: [
          { label: '供应商直供', value: 1 },
          { label: '市场自采购', value: 2 }
        ],
        supplierList: [],
        supplyTypeOption: [],
        salerList: []
      },
      levelFirst: '',
      levelFecond: '',
      selectArray: [],
      levelTypeOption: [],
      brandIds: null,
      brandNames: null
    }
  },
  created() {
    this.tabTitles = [
      { title: '上架', value: 0 },
      { title: '下架', value: 1 }]
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
    reset() {
      this.CascaderBoxDTO = null
      this.levelFirst = null
      this.levelFecond = null
      this.searchParams = {
        title: null,
        categoryId: null,
        purchaseType: null,
        supplyId: null,
        buyerId: null
      }
      this.fecthList()
    },
    tabsCallBack(item) {
      this.curIndex = item.value
      this.fecthList()
    },
    clickToSearch() {
      if (this.levelFecond) {
        this.searchParams.categoryId = this.levelFecond
      } else {
        this.searchParams.categoryId = this.levelFirst
      }
      this.fecthList()
    },
    // 数据请求
    fecthList() {
      if (this.CascaderBoxDTO) {
        this.searchParams.purchaseType = this.CascaderBoxDTO.purchaseType
        if (this.CascaderBoxDTO.purchaseType === 0) {
          this.searchParams.buyerId = this.CascaderBoxDTO.purchaseType
        } else {
          this.searchParams.supplyId = this.CascaderBoxDTO.supplyOrBuyerId
        }
      }
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        goodsStatus: this.curIndex,
        ...this.searchParams
      }
      fecthList(data).then(({ data }) => {
        if (Array.isArray(data.rows)) {
          for (const item of data.rows) {
            // if (item.mixPrice && item.maxPrice) {
            //   item.titlePrace = `¥${item.mixPrice}  ~  ${item.maxPrice}`
            // } else {
            //   item.titlePrace = `¥${item.maxPrice}`
            // }
            if (item.purchaseType === 2) {
              item.titleName = item.supplierName
            } else {
              item.titleName = item.buyerName
            }
          }
          this.table.data = data.rows
        }
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
              value: item.id
            })
          }
        }
        this.levelTypeOption = data
        this.searchBarOptons.categoryOption = result
      }).catch(e => {
        this.$message({ type: 'error', message: '加载分类失败失败' })
      })
    },
    exportFile() {
      this.exportLoading = true
      if (!this.exportLoading) return
      let url = 'cmm/productInfo/exportFile?'
      if (this.levelFecond) {
        this.searchParams.categoryId = this.levelFecond
      } else {
        this.searchParams.categoryId = this.levelFirst
      }
      if (this.CascaderBoxDTO) {
        this.searchParams.purchaseType = this.CascaderBoxDTO.purchaseType
        if (this.CascaderBoxDTO.purchaseType === 0) {
          this.searchParams.buyerId = this.CascaderBoxDTO.purchaseType
        } else {
          this.searchParams.supplyId = this.CascaderBoxDTO.supplyOrBuyerId
        }
      }
      const data = {
        goodsStatus: this.curIndex,
        ...this.searchParams
      }
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key]
          if (element) {
            url += `${key}=${element}&`
          }
        }
      }
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.href = url
      a.target = '_blank'
      a.click()
      setTimeout(() => {
        document.body.removeChild(a)
      }, 100)
      this.exportLoading = false
      this.$message({ type: 'success', message: '数据导出成功' })
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
    },
    clickTableRow(row) {
      if (this.table.data.length > 0) {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    },
    selectOneAndMore(selectArray) {
      if (selectArray.length > 0) {
        this.selectArray = selectArray
      } else {
        this.selectArray = []
      }
    },
    selectAll(selectArray) {
      if (selectArray.length > 0) {
        this.selectArray = selectArray
      } else {
        this.selectArray = []
      }
    },
    clickCommand(command) {
      //   商品状态, 0 上架，1 下架 goodsStatus
      if (Array.isArray(this.selectArray) && this.selectArray.length === 0) {
        this.$message({ type: 'warning', message: '请选择商品' })
        return
      }
      switch (command) {
        case '批量上架': {
          const ids = []
          for (const item of this.selectArray) {
            if (item.goodsStatus === 1) {
              ids.push(item.id)
            }
          }
          if (ids.length === 0) return
          productsUp({ ids: ids.toString() }).then(res => {
            this.$message({ type: 'success', message: `${res.msg}` })
            this.selectArray = []
            this.fecthList()
          }).catch(() => {
            this.$message({ type: 'error', message: '操作失败' })
          })
          break
        }
        case '批量下架': {
          const ids = []
          for (const item of this.selectArray) {
            if (item.goodsStatus === 0) {
              ids.push(item.id)
            }
          }
          if (ids.length === 0) return
          productsDown({ ids: ids.toString() }).then(res => {
            this.$message({ type: 'success', message: `${res.msg}` })
            this.selectArray = []
            this.fecthList()
          }).catch(() => {
            this.$message({ type: 'error', message: '操作失败' })
          })
          break
        }
        case '批量删除': {
          const ids = []
          for (const item of this.selectArray) {
            if (item.goodsStatus === 1) {
              ids.push(item.id)
            }
          }
          if (ids.length === 0) return
          deletepProduct({ ids: ids.toString() }).then(res => {
            this.selectArray = []
            this.$message({ type: 'success', message: `${res.msg}` })
            this.fecthList()
          }).catch(() => {
            this.$message({ type: 'error', message: '删除失败' })
          })
          break
        }
        default:
          break
      }
    }
  },
  watch: {
    levelFirst: {
      handler(val, old) {
        if (val) {
          const arr = []
          for (const item of this.levelTypeOption) {
            if (val === item.parentId) {
              arr.push(item)
            }
          }
          this.searchBarOptons.levelTowOption = arr
        } else {
          this.levelFecond = ''
          this.searchBarOptons.levelTowOption = []
        }
        if (val && old) {
          this.levelFecond = ''
        }
      }
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
  .picBox{
    width: 120px;
    height: 40px;
    text-align: center;
    display: inline-block;
    overflow: hidden;
    img{
      height: 100%;
    }
  }
}
</style>