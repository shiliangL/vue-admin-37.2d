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
              <el-button type="text" size="mini" @click.stop="clickToSet(scope.$index,scope.row)">设置为默认</el-button>
              <el-button type="text" size="mini" @click.stop="clickToEdit(scope.$index,scope.row)">编辑</el-button>
              <el-button type="text" style="color:red" size="mini" @click.stop="clickToDelete(scope.$index, scope.row)">删除</el-button>
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
            <el-form-item label="手机号:" prop="mobile" :rules="rules.input">
              <el-input size="small" style="width:160px"  v-model.trim="addressForm.mobile" placeholder="不能超11位数" maxlength="11"></el-input>
            </el-form-item>
          </div>
            <el-form-item label="地址:" label-width="67px" prop="addressArrt" :rules="rules.input">
              <el-input size="small" v-model.trim="addressForm.addressArrt" style="width:180px;display: none;"></el-input>
              <AddressSelect width="130px" @change="selectAddress"/>
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
      dialogVisible: false,
      tableData: [],
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
      debugger
      this.addressForm = Object.assign(this.addressForm, item)
    },
    clickToDelete(index, item) {
      this.tableData.splice(index, 1)
      if (this.tableData.length === 1) {
        this.tableData[0].status = 1
      }
    },
    selectAddress(item) {
      if (item) {
        if (item.province && item.city && item.area && item.address) {
          this.addressForm.addressArrt = `验证通过`
          this.addressForm.addessIds = `${item.province.id},${item.city.id},${item.area.id}`
          this.addressForm.address = `${item.province.title},${item.city.title},${item.area.title},${item.address}`
        }
      } else {
        this.addressForm.addressArrt = null
      }
    },
    clickToConfirm() {
      this.$refs['addressForm'].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.addressForm))
          if (this.isUpdate) {
            this.tableData[this.isUpdateIndex].contacts = data.contacts
            this.tableData[this.isUpdateIndex].mobile = data.mobile
            this.tableData[this.isUpdateIndex].address = data.address
          } else {
            if (this.tableData.length === 0) { data.status = 1 }
            this.tableData.push(data)
          }
          this.dialogVisible = false
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    reset() {
      this.isUpdate = false
      this.isUpdateIndex = null
      this.$setKeyValue(this.addressForm, {
        addressArrt: null,
        contacts: null,
        mobile: null,
        addessIds: null,
        address: null,
        status: 0,
        type: 0 })
    },
    validateForm() {
      const data = JSON.parse(JSON.stringify(this.tableData))
      for (const item of data) {
        delete item.addressArrt
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