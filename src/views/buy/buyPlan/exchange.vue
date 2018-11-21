
<template>
    <div class="buyexchange">
      <!-- 搜索 
        :clearable="false"
        销售换货商品汇总
      -->
      <div class="search-bar">
        <div class="left" style="line-height: 44px;">
          送货日期:
        </div>
        <div class="left">
          <el-date-picker :style="{width:'140px'}"
            :clearable="false"
            size="small"
            v-model="searchBarData.sendTime" 
            value-format="yyyy-MM-dd" 
            type="date" placeholder="送货时间">
            </el-date-picker>
        </div>


        <!-- <div class="left">
          <el-select class="w110" size="small" v-model="searchBarData.purchaseStatus" clearable filterable placeholder="采购计划状态">
            <el-option v-for="sub in options.purchaseType" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
          </el-select>
        </div> -->

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
          <el-input style="width:180px" v-model="searchBarData.goodName" size="small" @keyup.enter.native="fecthList" placeholder="输入商品名称检索"></el-input>
        </div>
         <div class="left">
            <el-button  type="primary" size="small" @click.stop="fecthList" > 搜索 </el-button>
        </div>
        <div class="left">
              <el-button size="small" @click.stop="reset" > 重置 </el-button>
          </div>
        <div class="right">
          <div class="left">
              <el-button size="small" @click.stop="reset" > 刷新 </el-button>
          </div>
          <div class="left">
            <el-button size="small" type="primary" @click.stop="clickToCreate" > 生成采购计划 </el-button>
          </div>
        </div>
      </div>

			<!-- 提示 -->
			<div class="tipsNum">
        <span class="Num-iteml" v-cloak>商品共计: <span>{{tableData.length}}</span>  </span>
        <span class="Num-itemr" v-cloak>未生成采购计划商品: <span style="color:red">{{unfinishedTotal}}</span>  </span>
			</div>
			<!-- 表格 -->
			<el-table :data="tableData" size="small" ref="multipleTable" max-height="450" style="width: 100%;" 
        highlight-current-row
        @selection-change="selectionChange">

      <el-table-column width="50" type="selection" align="center" :selectable="checkSelectable"></el-table-column>

				<el-table-column label="序号" width="50" align="center">
					<template slot-scope="scope">
						<span>{{scope.$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="categoryName" label="商品分类" align="center"></el-table-column>
				<el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
				<el-table-column prop="baseUnitName" label="基本单位" align="center"></el-table-column>
				<el-table-column prop="orderQuantity" label="原下单数量" align="center"></el-table-column>
				<el-table-column prop="goodsPrchase" label="已生成数量" align="center"></el-table-column>
				<el-table-column prop="goodsNotPrchase" label="未生成数量" align="center"></el-table-column>
				<el-table-column label="采购员" align="center">
        	<template slot-scope="scope">
						<span>{{scope.row.supplyName || scope.row.purchaseName}}</span>
					</template>
        </el-table-column>
			</el-table>

      <div class="footer-block">
				<span class="page" v-cloak> 共 {{tableData.length}} 条</span>
			</div>

    </div>
</template>

<script>
import { CascaderBox } from '@/components/base.js'
import { fetchExchangeAll, saveList } from '@/api/buy/buyPlan.js'
import { fecthGoodsClass } from '@/api/goodsList.js'

export default {
  name: 'buyexchange',
  components: {
    CascaderBox
  },
  data() {
    return {
      tableData: [],
      CascaderBoxDTO: null,
      searchBarData: {
        sendTime: null,
        categoryId: null,
        purchaseStatus: null,
        buyerOrSupplyId: null,
        goodName: null
      },
      searchBarOptons: {
        categoryOption: [],
        levelTowOption: []
      },
      levelFirst: '',
      levelFecond: '',
      options: {},
      selectArray: null
    }
  },
  created() {
    this.options.purchaseType = [
      { value: 0, label: '未生成' },
      { value: 1, label: '已生成' }
    ]
  },
  computed: {
    unfinishedTotal() {
      let total = 0
      this.tableData.map(item => {
        if (item.goodsNotPrchase > 0) {
          total += 1
        }
      })
      return total
    }
  },
  mounted() {
    const date = new Date()
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    const ymd = date.getFullYear() + '-' + month + '-' + day
    this.searchBarData.sendTime = ymd

    this.fecthList()
    this.fecthGoodsClass()
  },
  methods: {
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
    // 数据请求
    fecthList() {
      if (this.CascaderBoxDTO) {
        this.searchBarData.buyerOrSupplyId = this.CascaderBoxDTO.supplyOrBuyerId
      }
      this.levelFecond ? this.searchBarData.categoryId = this.levelFecond : this.searchBarData.categoryId = this.levelFirst
      const params = {
        ...this.searchBarData
      }
      fetchExchangeAll(params).then(({ data }) => {
        if (Array.isArray(data)) {
          for (const item of data) {
            if (item.orderCancelQuantity == null) item.orderCancelQuantity = 0
            if (item.purchaseStatus === null) item.purchaseStatus = 1
          }
          this.tableData = data

          setTimeout(() => {
            for (const item of this.tableData) {
              this.$refs['multipleTable'].toggleRowSelection(item, true)
            }
          }, 200)
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    checkSelectable(row) {
      return row.goodsNotPrchase > 0
    },
    reset() {
      const date = new Date()
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      const ymd = date.getFullYear() + '-' + month + '-' + day

      this.levelFirst = null
      this.levelFecond = null

      this.searchBarData.sendTime = ymd
      this.CascaderBoxDTO = null
      this.searchBarData.purchaseStatus = null
      this.searchBarData.buyerOrSupplyId = null
      this.searchBarData.goodName = null
      this.fecthList()
    },
    refrehList() {

    },
    clickToCreate() {
      if (!this.selectArray || this.selectArray.length === 0) {
        this.$message({ type: 'warning', message: '数据不能为空' })
        return
      }
      const arr = []
      for (const item of this.selectArray) {
        if (item.goodsNotPrchase > 0) {
          if (item.supplyId) {
            item.purchaseType = 2
            item.personnelId = item.supplyId
            item.personnelName = item.supplyName
          } else {
            item.purchaseType = 1
            item.personnelId = item.purchaseId
            item.personnelName = item.purchaseName
          }
          const data = {
            orderDetailIdList: item.orderDetailIds ? item.orderDetailIds.split(',') : null,
            // planQuantity: item.orderQuantity,
            planQuantity: item.goodsNotPrchase,
            productId: item.productId,
            supplierInfoList: [
              {
                purchaseType: item.purchaseType,
                quantity: item.orderQuantity,
                personnelId: item.personnelId,
                personnelName: item.personnelName
              }
            ]
          }
          arr.push(data)
        }
      }
      if (arr.length <= 0) {
        this.$message({ type: 'warning', message: '请勾选有效数据' })
        return
      }
      this.$confirm('是否需要将勾选数据生成采购计划?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        saveList(arr).then(res => {
          this.$message({ type: 'success', message: `${res.msg}!` })
          this.$emit('close')
        }).catch((e) => {
          this.$message({ type: 'error', message: e.msg })
        })
      }).catch(() => {})
    },
    selectionChange(item) {
      this.selectArray = item
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
 .tipsNum{
    padding-bottom: 10px;
    padding-left: 10px;
    font-weight: 50;
    font-size: 14px;
    .Num-itemr{
      margin-left: 10px;
    }
    .Num-itemr{
      span{
        color:#1cbc9c;
      }
    }
 }
</style>