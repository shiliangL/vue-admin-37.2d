<template>
    <div>
				<el-form :model="form" :rules="rules" ref="form" label-width="130px" :inline="true">
        <!--基本信息-->
		    <div class="row-item">
						<div class="row-title">账户基本信息</div>
						<div class="row-content basicInfo">
					     <el-row>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户账号:" prop="mobile"  :rules="rules.input">
										<el-input v-if="isAddView" size="small" style="width:180px" class="w180"  placeholder="仅限中国大陆手机号" v-model.trim="form.mobile"></el-input>
										<span v-else v-cloak> {{ form.mobile }} </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户名称:" prop="title"  :rules="rules.input">
										<el-input v-if="isAddView" size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
										<span v-else v-cloak> {{ form.title }} </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="联系人:" prop="dto.contacts"  :rules="rules.input">
										<el-input v-if="isAddView" size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.dto.contacts"></el-input>
										<span v-else v-cloak> {{ form.dto.contacts }} </span>
									</el-form-item>
								</el-col>

								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户经理:" prop="staffId" :rules="rules.select">
										
										<el-select  v-if="isAddView" size="small" style="width:180px" v-model="form.staffId" placeholder="请选择" @change="selectManager" clearable filterable>
											<el-option size="small" style="width:180px" v-for="item in options.managerOption" :key="item.staffId" :label="item.staffName" :value="item.staffId"> </el-option>
										</el-select> 
										<span v-else v-cloak> {{ form.managerName }} </span>

									</el-form-item>
								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">

									<el-form-item label="客户经理手机:">
										<el-input v-if="isAddView" size="small" readonly style="width:180px" class="w180"  placeholder="请选择" v-model.trim="form.managerPhone"></el-input>
										<span v-else v-cloak> {{ form.managerPhone }} </span>
									</el-form-item>

								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="配送区域:" prop="regionId" :rules="rules.select">
									<!-- regionId (string, optional): 区域Id ,
									regionName (string, optional), -->
										<el-select v-if="isAddView" size="small" style="width:180px" v-model="form.regionId" placeholder="请选择" clearable filterable>
											<el-option size="small" v-for="item in options.areaOption" :key="item.id" :label="item.title" :value="item.id"> </el-option>
										</el-select> 
										<span v-else v-cloak> {{ form.regionName }} </span>
									</el-form-item>
								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="配送员:" prop="driverId" :rules="rules.select">
										<!-- driverId (string, optional): 配送员Id ,
										driverName (string, optional): 配送员Id , -->
										<el-select  v-if="isAddView"  size="small" style="width:180px" v-model="form.driverId" placeholder="请选择">
											<el-option size="small" style="width:180px" v-for="item in options.driverOption" :key="item.driverId" :label="item.name" :value="item.driverId"> </el-option>
										</el-select> 
										<span v-else v-cloak> {{ form.driverName }} </span>

									</el-form-item>
								</el-col>


								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户类别:" prop="categoryId" :rules="rules.select">
										<!-- "categoryId": "string",
										"categoryName": "string", -->
										<el-select v-if="isAddView" size="small" style="width:180px" v-model="form.categoryId" placeholder="请选择">
											<el-option size="small" style="width:180px" v-for="item in options.categoryOption" :key="item.pk" :label="item.title" :value="item.pk"> </el-option>
										</el-select> 
										<span v-else v-cloak> {{ form.categoryName }} </span>

									</el-form-item>
								</el-col>
 
								<!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户头像:" prop="portraitId">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.patUser.portraitId"></el-input>
									</el-form-item>
								</el-col> -->
 
              </el-row>
						</div>
				</div>

   			<!--第三方账号绑定-->
		    <div class="row-item">
						<div class="row-title">第三方账号绑定</div>
						<div class="row-content">
					     <el-row>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="QQ账号:">
                    <span v-cloak> {{form.patUser.qqNumber}} </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="微信账号:">
                    <span v-cloak> {{form.patUser.wechat}} </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="新浪微博账号:">
                    <span v-cloak> {{form.patUser.weibo}} </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="支付宝账号:">
                    <span v-cloak> {{form.patUser.alipay}} </span>
									</el-form-item>
								</el-col>
              </el-row>
						</div>
				</div>

				<!--账号状态设置-->
		    <div class="row-item">
						<div class="row-title">账号状态设置</div>
						<div class="row-content">
					     <el-row>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label=" 账号状态设置:">
										<el-radio v-model="form.patUser.status" :label="item.label" v-for="item in accountOption" :key="item.label">
											<span v-cloak> {{item.text}} </span>
										</el-radio>
									</el-form-item>
								</el-col>
              </el-row>
						</div>
				</div>

			</el-form>
    </div>
</template>

<script>
import rules from '@/public/rules.js'
import { fetchOptions, fecthDetail } from '@/api/customer/customerClass.js'
export default {
  mixins: [rules],
  props: {
    data: {
      type: Object
    },
    isAddView: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        patUser: {
          status: 1,
          alipay: null,
          qqNumber: null,
          wechat: null,
          weibo: null,
          portraitId: null
        },
        dto: {
          contacts: null
        },
        regionId: null,
        title: null,
        mobile: null,
        managerId: null,
        driverId: null,
        managerPhone: null,
        categoryId: null,
        orderResource: 3,
        status: 1
      },
      options: {
        managerOption: [],
        driverOption: [],
        categoryOption: [],
        areaOption: []
      }
    }
  },
  created() {
    this.accountOption = [
      { label: 1, text: '启用' },
      { label: 0, text: '禁用' }
    ]
  },
  mounted() {
    this.fetchOptions()
  },
  methods: {
    fetchOptions() {
      fetchOptions().then(({ data }) => {
        this.options.managerOption = data.staff
        this.options.categoryOption = data.category
        this.options.areaOption = data.relation
        if (this.data.type === 'view') {
          this.fecthDetail()
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    fecthDetail() {
      if (!this.data.obj.id) return
      fecthDetail({ id: this.data.obj.id }).then(({ data }) => {
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: '详情加载失败' })
      })
    },
    selectManager(val) {
      if (val) {
        const obj = this.$arrayAttrGetObj(this.options.managerOption, 'staffId', val)
        this.form.managerPhone = obj.phone
      } else {
        this.form.managerPhone = null
      }
    },
    validateForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('update:isPass', true)
          if (this.data.type === 'add') this.$emit('callBack', this.form)
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          this.$emit('update:isPass', false)
          return
        }
      })
    }
  },
  watch: {
    'form.regionId': {
      handler(val, old) {
        if (val && old) {
          this.form.driverId = null
          this.options.driverOption = []
        }
        if (val) {
          const obj = this.$arrayAttrGetObj(this.options.areaOption, 'id', val)
          if (obj) this.options.driverOption = obj.scmDriver
        } else {
          this.form.driverId = null
          this.options.driverOption = []
        }
      },
      deep: true
    },
    form: {
      handler(val) {
        if (val) {
          this.$emit('input', val)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
.basicInfo,
.table {
    .el-form-item {
        margin-bottom: 18px;
    }
}
.AddTableList {
    margin-bottom: 10px;
}
.pages {
    text-align: center;
    padding: 20px;
}
.msg {
    margin-top: 10px;
}
</style>