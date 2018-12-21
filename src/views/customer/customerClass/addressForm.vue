<template>
  <div class="addressForm">
    <div class="row-item">
      <div class="row-title">收货信息</div>
      <div class="row-content">
        <div class="add-bar clearfix">
          <el-button class="right"  type="primary" size="small" @click.stop="clickToAdd" v-show="isAddView"> 添加 </el-button>
        </div>

        <el-table :data="tableData" slot="table" size="small" style="width: 100%;" highlight-current-row>
          <el-table-column prop="createdOn" label="是否默认" align="center">
            <template slot-scope="scope" align="center">
              <el-tag size="small" v-if="scope.row.status===1"> 是 </el-tag>
              <el-tag size="small" type="info" v-else> 否 </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="contacts" label="收货人" align="center"></el-table-column>
          <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
          <el-table-column prop="address" label="收货地址" align="center"></el-table-column>
          <el-table-column align="center" label="操作"  v-if="isAddView">
            <template slot-scope="scope" align="center">
              <template v-if="scope.row.type===0">
                <el-tooltip content=" 您可以到'基本信息'的地址中维护' " placement="top" effect="light">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </template>
              <template v-else>
                <el-button type="text" size="mini" @click.stop="clickToSet(scope.$index,scope.row)">设置为默认</el-button>
                <el-button type="text" size="mini" @click.stop="clickToEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>

        <div class="footer-block">
					<span class="page" v-cloak> 共 {{tableData.length}} 条</span>
				</div>

      </div>
    </div>

    <!-- 弹层区域 -->
    <el-dialog title="新增地址" class="dialogTitle" width="560px" :visible.sync="dialogVisible" append-to-body center @close="reset">
      <div v-if="dialogVisible">
        <el-form :model="addressForm" ref="addressForm" class="form" :rules="rules" :inline="true">
          <div class="flex-box">
            <el-form-item label="收货人:" prop="contacts" :rules="rules.input">
              <el-input size="small" style="width:160px"  v-model.trim="addressForm.contacts" placeholder="不能超10位数" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="mobile" :rules="[{trigger: 'change', required:true, validator: rules.validPhone}]">
              <el-input size="small" style="width:160px"  v-model.trim="addressForm.mobile" placeholder="不能超11位数" maxlength="11"></el-input>
            </el-form-item>
          </div>
            <el-form-item label="地址:" label-width="67px" prop="addressArrt" :rules="rules.input">
              <el-input size="small" v-model.trim="addressForm.addressArrt" style="width:180px;display: none;"></el-input>
              <AddressSelect width="130px" ref="AddressSelect" :ids="idsArr" @change="selectAddress"/>
            </el-form-item>
        </el-form>
        <div class="footer-block">
          <el-button size="small" @click.stop="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click.stop="clickToConfirm"> 确定 </el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import rules from '@/public/rules.js'
import { AddressSelect } from '@/components/base.js'

export default {
  name: 'addressForm',
  props: {
    data: {
      type: Array
    },
    isAddView: {
      type: Boolean
    }
  },
  mixins: [rules],
  components: {
    AddressSelect
  },
  data() {
    return {
      isChange: 0,
      dialogVisible: false,
      tableData: [],
      idsArr: [],
      addressForm: {
        addressArrt: null,
        contacts: null,
        mobile: null,
        addessIds: null,
        address: null,
        status: 0,
        type: 0
      }
    }
  },
  mounted() {},
  methods: {
    clickToAdd() {
      this.dialogVisible = true
      this.isUpdate = false
      this.isUpdateIndex = null
    },
    clickToSet(index, item) {
      if (item.status === 1) return
      for (const key of this.tableData) {
        key.status = 0
      }
      item.status = 1
    },
    clickToEdit(index, item) {
      this.dialogVisible = true
      this.isUpdate = true
      this.isUpdateIndex = index
      // 定位点击
      item.isClick = 1
      this.addressForm = Object.assign(this.addressForm, item)

      this.addressForm.addressArrt = item.address
      const SSQ = this.addressForm.addessIds.split(',') || []
      const address = this.addressForm.address.split(',') || []
      if (SSQ.length && address.length) {
        this.idsArr = [
          { id: SSQ[0] },
          { id: SSQ[1] },
          { id: SSQ[2] },
          address[address.length - 1]
        ]
      }
    },
    clickToDelete(index, item) {
      if (item.type === 0) {
        this.$message({ type: 'warning', message: '该地址无法删除,您可以到"个人信息中维护" ' })
        return
      }
      if (this.tableData.length === 1) {
        this.$message({ type: 'warning', message: '收货地址不能为空' })
        return
      }
      this.tableData.splice(index, 1)
      if (this.tableData.length === 1) {
        this.tableData[0].status = 1
      }
    },
    selectAddress(item) {
      this.isChange = 1
      if (item) {
        if (item.province && item.city && item.area && item.address) {
          this.addressForm.addessIds = `${item.province.id},${item.city.id},${item.area.id}`
          this.addressForm.address = item.province.title ? `${item.province.title}${item.city.title}${item.area.title}${item.address}` : `${item.address}`
          this.addressForm.addressArrt = `验证通过`
        } else {
          this.addressForm.addressArrt = null
        }
      } else {
        this.addressForm.addressArrt = null
      }
    },
    clickToConfirm() {
      this.$refs['addressForm'].validate((valid) => {
        if (valid) {
          if (!this.isChange) {
            this.dialogVisible = false
            return
          }
          this.$refs['AddressSelect'].getNames()
          const { tableData } = this
          const addressFormcp = JSON.parse(JSON.stringify(this.addressForm))
          if (this.isUpdate) {
            if (Array.isArray(tableData) && tableData.length > 0) {
              for (const item of tableData) {
                if (item.isClick) {
                  item.contacts = addressFormcp.contacts
                  item.mobile = addressFormcp.mobile
                  item.address = addressFormcp.address
                  item.addessIds = addressFormcp.addessIds

                  delete item.isClick
                }
              }
            }
          } else {
            if (this.tableData.length === 0) { addressFormcp.status = 1 }
            this.tableData.push({
              addressArrt: null,
              contacts: addressFormcp.contacts,
              mobile: addressFormcp.mobile,
              addessIds: addressFormcp.addessIds,
              address: addressFormcp.address,
              status: addressFormcp.status,
              type: 1
            })
          }
          this.dialogVisible = false
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    reset() {
      this.isChange = 0
      this.idsArr = []
      this.isUpdate = false
      this.isUpdateIndex = null
      this.addressForm = {
        addressArrt: null,
        contacts: null,
        mobile: null,
        addessIds: null,
        address: null,
        status: 0,
        type: 0 }
    },
    validateForm() {
      const data = JSON.parse(JSON.stringify(this.tableData))
      for (const item of data) {
        if (item.hasOwnProperty('addressArrt')) {
          delete item.addressArrt
        }
      }
      this.$emit('update:isPass', true)
      this.$emit('callBack', data)
    }
  },
  watch: {
    data: {
      handler(item) {
        if (item) this.tableData = item
      }
    }
  }
}
</script>

<style scoped>
</style>
