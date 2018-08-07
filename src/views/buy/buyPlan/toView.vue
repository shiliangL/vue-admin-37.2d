<template>
    <div>
				<el-form :model="form" :rules="rules" ref="form" label-width="130px" :inline="true">
        <!--基本信息-->
		    <div class="row-item">
						<div class="row-title">基本信息</div>
						<div class="row-content basicInfo">
					     <el-row>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="采购计划单号:">
                      <span v-cloak>{{form.header.orderNo}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="采购计划来源:">
										<span v-cloak v-if="form.header.sourceType ===1">销售订单</span>
										<span v-cloak v-if="form.header.sourceType ===2">后台新增</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="采购计划创建时间:">
                      <span v-cloak>{{form.header.createdOn}}</span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="创建人:">
                      <span v-cloak>{{form.header.createdName}}</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="采购申请时间:">
                      <span v-cloak>{{form.header.auditDate}}</span>
									</el-form-item>
								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="申请人:" prop="categoryId">
                      <span v-cloak>{{form.header.auditStaffName}}</span>
									</el-form-item>
								</el-col>
 
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="采购审核时间:" prop="categoryId">
                      <span v-cloak>{{form.header.auditStaffName}}</span>
									</el-form-item>
								</el-col>
 
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="审核人:" prop="categoryId">
                      <span v-cloak>{{form.header.auditStaffName}}</span>
									</el-form-item>
								</el-col>
 
              </el-row>
						</div>
				</div>

  			<!--商品信息-->
				<div class="row-item">
					<div class="row-title">商品信息</div>
					<div class="row-content">

							<!-- 添加区域 -->
						<div class="AddTableList">
          			<el-input style="width:180px" v-model.trim="searchParam" size="small" placeholder="输入商品名称检索"></el-input>
							  <!-- <el-button  type="primary" size="small"> 搜索 </el-button>  @keyup.enter.native="sendSearchParam"  -->
						</div>

						<el-table :data="tableSearch" class="table" size="small" :max-height="500" style="width: 100%;" highlight-current-row>
 
							<el-table-column label="序号" width="50" align="center">
								<template slot-scope="scope">
									<span>{{scope.$index + 1}}</span>
								</template>
							</el-table-column>

							<el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
							<el-table-column prop="basicUnitName" label="基本单位" align="center"></el-table-column>
							<el-table-column prop="availableQuantity" label="可用库存量" align="center"></el-table-column>
							<el-table-column prop="planQuantity" label="计划采购量" align="center"></el-table-column>
							<el-table-column prop="applyQuantity" v-if="this.showType" label="申请采购量" align="center">
									<template slot-scope="scope">
                    <div class="w110 el-input el-input--small" @click.stop="clickToChange(scope.$index, scope.row)" style="width:110px">
                      <div class="el-input__inner" v-cloak> {{scope.row.applyQuantity}} </div>
                    </div>
									</template>
							</el-table-column>
							<el-table-column v-else prop="applyQuantity" label="申请采购量" align="center"></el-table-column>

							<el-table-column v-if="this.showType" label="采购员/供应商" align="center">
									<template slot-scope="scope">
                    <el-popover placement="top" width="200" trigger="hover">
                      <div v-for="(item,index) in scope.row.supplierInfoList" :key="index">
                        <span>{{item.personnelName}}</span> : <span>{{item.quantity}}</span>;
                      </div>
                      <span  slot="reference" v-cloak> {{scope.row.personnelNamesStr}} </span>
                    </el-popover>
                    <el-button type="text" size="mini" @click.stop="clickToChange(scope.$index, scope.row)">更改</el-button>
									</template>
							</el-table-column>
              
              <el-table-column v-else label="采购员/供应商" align="center">
                	<template slot-scope="scope">
                   <el-popover placement="top" width="200" trigger="hover">
                     <div v-for="(item,index) in scope.row.supplierInfoList" :key="index">
                        <span>{{item.personnelName}}</span> : <span>{{item.quantity}}</span>;
                      </div>
                      <el-button type="text" size="mini" slot="reference"> {{scope.row.personnelNamesStr}}  </el-button>
                    </el-popover>
									</template>
              </el-table-column>

						</el-table>

						<div class="pages">
							<span v-cloak> 共 {{this.form.table.length}} 条</span>
						</div>
 
					</div>
				</div>

  			<el-dialog width="700px" title="更改采购员/供应商" :visible.sync="innerVisible" append-to-body center :modal="false">
          <toViewDialog v-model="dialogData" @edit="refrehList" @callBack="toViewDialogCallBack" v-if="innerVisible"  @close="innerVisible = false"></toViewDialog>
        </el-dialog>


			</el-form>
    </div>
</template>

<script>
import { headerDetail, bodyDetail } from '@/api/buy/buyPlan.js'
import toViewDialog from './toViewDialog'

import rules from '@/public/rules.js'
export default {
  mixins: [rules],
  components: {
    toViewDialog
  },
  data() {
    return {
      showType: null, // 待审核的时候需要显示编辑页面
      searchParam: null,
      innerVisible: false,
      curIndex: false,
      dialogData: null,
      form: {
        header: {
          'pk': null,
          'createdBy': null,
          'createdOn': null,
          'updatedBy': null,
          'updatedOn': null,
          'deletedFlag': null,
          'orderNo': null,
          'purchaserId': null,
          'sourceType': 2,
          'applicationDate': null,
          'auditStatus': 1,
          'createdName': null,
          'purchaserName': null,
          'auditDate': null,
          'auditStaffName': null
        },
        table: []
      }
    }
  },
  mounted() {
    if (this.$attrs.loadID) {
      this.fecthDetail()
    }
  },
  computed: {
    tableSearch: function() {
      const search = this.searchParam
      if (search) {
        return this.form.table.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.form.table
    }
  },
  methods: {
    fecthDetail() {
      if (!this.$attrs.loadID) return
      headerDetail({ id: this.$attrs.loadID }).then(({ data }) => {
        this.form.header = Object.assign(this.form.header, data)
        this.showType = data.auditStatus === 1 // 待审核的时候需要显示编辑页面
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
      this.fetchBody()
    },
    fetchBody() {
      if (!this.$attrs.loadID) return
      bodyDetail({ requestId: this.$attrs.loadID }).then(({ data }) => {
        if (Array.isArray(data)) {
          for (const item of data) {
            const str = item.personnelNames.split(',')
            if (str.length > 1) {
              item.personnelNamesStr = str[0] + '...'
            } else if (str.length === 1) {
              item.personnelNamesStr = str[0]
            } else {
              item.personnelNamesStr = ''
            }
          }
        }
        this.form.table = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    refrehList() {
      this.fetchBody()
    },
    sendSearchParam() {

    },
    clickToChange(index, item) {
      this.innerVisible = true
      this.curIndex = index
      this.dialogData = item
    },
    toViewDialogCallBack(item) {
      this.form.table[this.curIndex].supplierInfoList = item.table
      this.form.table[this.curIndex].applyQuantity = item.applyQuantity
    },
    // 触发校验 处理参数
    validateForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('callBack', this.form.table)
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.basicInfo,.table{
	.el-form-item{
		margin-bottom: 0;
	}
}
.AddTableList{
	margin-bottom: 10px;
}
.pages{
	text-align: center;
	padding: 20px;
}
.msg{
  margin-top: 10px;
}
</style>