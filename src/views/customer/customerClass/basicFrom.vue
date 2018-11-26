<template>
    <div>
				<el-form :model="form" :rules="rules" ref="form" label-width="130px" :inline="true">
        <!--基本信息-->
		    <div class="row-item">
						<div class="row-title">账户基本信息</div>
						<div class="row-content">
					     <el-row>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户账号:" prop="mobile" :rules="[{trigger: 'change', required:true, validator: rules.validPhone}]">
										<el-input v-if="isAddView" size="small" style="width:180px" class="w180"  placeholder="仅限中国大陆手机号" v-model.trim="form.mobile" maxlength="11"></el-input>
										<span v-else v-cloak> {{ form.mobile }} </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户名称:" prop="title"  :rules="rules.input">
										<el-input v-if="isAddView" size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title" maxlength="11"></el-input>
										<span v-else v-cloak> {{ form.title }} </span>
									</el-form-item>
								</el-col>
								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="联系人:" prop="contacts"  :rules="rules.input">
										<el-input v-if="isAddView" size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.contacts" maxlength="11"></el-input>
										<span v-else v-cloak> {{ form.contacts }} </span>
									</el-form-item>
								</el-col>

								 <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户经理:" prop="staffId" :rules="rules.select">

										<el-select  v-if="isAddView" size="small" style="width:180px" v-model="managerDTO" placeholder="请选择" @change="selectManager" filterable value-key="staffId">
											<el-option size="small" style="width:180px" v-for="item in options.managerOption" :key="item.staffId" :label="item.staffName" :value="item"> </el-option>
										</el-select>
										<el-input v-if="isAddView" size="small" style="width:180px;display: none;" placeholder="验证使用" v-model.trim="form.staffId"></el-input>

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
									<!-- regionId (string, optional): 区域Id , regionName (string, optional), -->
										<el-select v-if="isAddView" size="small" style="width:180px" v-model="form.regionId" placeholder="请选择" clearable filterable>
											<el-option size="small" v-for="item in options.areaOption" :key="item.id" :label="item.title" :value="item.id"> </el-option>
										</el-select>
										<span v-else v-cloak> {{ form.regionName }} </span>
									</el-form-item>
								</el-col>


								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户类别:" prop="categoryId" :rules="rules.select">
										<!-- "categoryId": "string", "categoryName": "string", -->
										<el-select v-if="isAddView" size="small" style="width:180px" v-model="form.categoryId" placeholder="请选择">
											<el-option size="small" style="width:180px" v-for="item in options.categoryOption" :key="item.pk" :label="item.title" :value="item.pk"> </el-option>
										</el-select>
										<span v-else v-cloak> {{ form.categoryName }} </span>

									</el-form-item>
								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="客户头像:" prop="portraitId">
                    <div class="portraitId el-upload el-upload--picture-card" v-if="form.patUser.portraitId">
                      <img :src="form.patUser.portraitId" alt="">
                    </div>
                    <span v-else v-cloak> 暂无 </span>
									</el-form-item>
								</el-col>

              </el-row>

               <el-row>
                 <el-form-item label="客户地址:" prop="addressArrt"  :rules="rules.input">
                   <template v-if="isAddView">
                    <el-input size="small" v-model.trim="form.addressArrt" style="width:180px;display: none;"></el-input>
										<AddressSelect width="130px" :ids="idsArr" @change="selectAddress"/>
                   </template>
                   <template v-else>
                     <span v-cloak> {{ form.shopAddressEntity.address }} </span>
                   </template>
									</el-form-item>
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
                    <span v-if="!isAddView">
                      <el-tag v-cloak size="mini" v-if="form.patUser.status ===1"> 启用 </el-tag>
                      <el-tag size="mini" type="danger" v-else> 禁用 </el-tag>
                    </span>
										<el-radio v-else v-model="form.patUser.status" :label="item.label" v-for="item in accountOption" :key="item.label">
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
import { fetchOptions } from '@/api/customer/customerClass.js'
import { AddressSelect } from '@/components/base.js'

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
  components: {
    AddressSelect
  },
  data() {
    return {
      managerDTO: null,
      form: {
        addressArrt: null,
        patUser: {
          status: 1,
          alipay: null,
          qqNumber: null,
          wechat: null,
          weibo: null,
          portraitId: null
        },
        shopAddressEntity: {
          addessIds: null,
          address: null,
          contacts: null,
          mobile: null,
          phone: null,
          status: 0,
          type: 1
        },
        contacts: null,
        regionId: null,
        title: null,
        mobile: null,
        managerId: null,
        driverId: null,
        staffId: null,
        managerPhone: null,
        categoryId: null,
        orderResource: 3
        // status: 1
      },
      options: {
        managerOption: [],
        driverOption: [],
        categoryOption: [],
        areaOption: []
      },
      idsArr: []
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
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    selectManager(item) {
      console.log(item)
      if (item) {
        this.form.staffId = item.staffId
        this.form.managerPhone = item.phone
      } else {
        this.form.staffId = null
        this.form.managerPhone = null
      }
    },
    validateForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('update:isPass', true)
          const data = JSON.parse(JSON.stringify(this.form))
          delete data.addressArrt
          this.$emit('callBack', data)
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          this.$emit('update:isPass', false)
          return
        }
      })
    },
    selectAddress(item) {
      if (item) {
        if (item.province && item.city && item.area && item.address) {
          this.form.addressArrt = `验证通过`
          this.form.shopAddressEntity.addessIds = `${item.province.id},${item.city.id},${item.area.id}`
          this.form.shopAddressEntity.address = `${item.province.title},${item.city.title},${item.area.title},${item.address}`
        }
      } else {
        this.form.addressArrt = null
      }
    }
  },
  watch: {
    data: {
      handler(item) {
        if (item) {
          if (item.id) item.contacts = item.dto.contacts
          this.managerDTO = {
            staffId: item.staffId,
            staffName: item.managerName
          }
          const { shopAddressEntity } = item
          if (shopAddressEntity) {
            const SSQ = shopAddressEntity.addessIds.split(',')
            const address = shopAddressEntity.address.split(',')

            if (SSQ.length && address.length) {
              this.idsArr = [
                { id: SSQ[0], title: address[0] },
                { id: SSQ[1], title: address[1] },
                { id: SSQ[2], title: address[2] },
                address[address.length - 1]
              ]
            }
            this.form.addressArrt = shopAddressEntity.address
          } else {
            item.shopAddressEntity = Object.assign({}, this.form.shopAddressEntity)
          }
          this.form = Object.assign(this.form, item)
        }
      }
    },
    isAddView: {
      handler(item) {
        console.log(item)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
