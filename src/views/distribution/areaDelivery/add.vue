<template>
  <div>
    <template v-if="this.propsData.type === 'add'">
      <el-form :model="form" ref="form" class="form" :rules="rules" :inline="true" style="text-align: center;">
        <el-form-item label="配送区域:" label-width="100px" prop="title" :rules="rules.input">
          <el-input size="small" style="width:180px" v-model.trim="form.title" placeholder="长度小于10字" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="区域说明:" label-width="100px">
          <el-input type="textarea"  style="width:180px" :autosize="{ minRows: 2, maxRows: 4}" size="small" v-model.trim="form.summary" placeholder="小于50字" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="所在城市:" label-width="100px" prop="cityId" :rules="rules.select">
          <SelectCity style="width:180px" v-model="cityDTO"></SelectCity>
          <el-input size="small" style="width:180px;display: none;" v-model.trim="form.cityId"></el-input>
        </el-form-item> 
        <el-form-item label="配送员:" label-width="100px">
          <el-select size="small" v-model="driveDTO" clearable filterable placeholder="配送员" style="width:130px">
            <el-option v-for="sub in options.driverOption" :key="sub.id" :label="sub.name" :value="sub.id"></el-option>
          </el-select>
          <el-button size="small" type="primary" @click.stop="clickToAdd"> 添加 </el-button>
        </el-form-item>
        <div class="box">
          <el-tag style="margin-left: 4px;" close="tag-box" size="small" v-for="(item,index) in form.scmDriver" :key="index" closable @close="handleClose(item,index)"> {{item.name}} </el-tag>
        </div>
      </el-form>
      <div class="footer-block">
        <el-button size="small" @click.stop="close">取 消</el-button>
        <el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
      </div>
    </template>

    <template v-if="this.propsData.type === 'view'">
      <div class="topTips">
        配送区域: {{propsData.data.title}}; 关联客户数: {{pagination.total}}
      </div>
      <table-contain  :height.sync="table.maxHeight">
        <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;" highlight-current-row>

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
 
 					<el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
					<el-table-column prop="loginName" label="客户账号" align="center"></el-table-column>

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
    </template>
  </div>
</template>

<script>
import rules from '@/public/rules.js'
import model from '@/public/listModel.js'
import { SelectCity } from '@/components/base.js'
import { fetchDriverList, createRow, fetchDetail, updateRow, fetchViewList } from '@/api/distribution/areaDelivery.js'

export default {
  mixins: [rules, model],
  components: {
    SelectCity
  },
  props: {
    propsData: {
      tyle: Object
    }
  },
  data() {
    return {
      driveDTO: null,
      saveLoading: false,
      isUpdate: false,
      cityDTO: null,
      form: {
        'cityId': null,
        'cityName': null,
        'provinceId': null,
        'provinceName': null,
        'remark': null,
        'scmDriver': [],
        'summary': null,
        'title': null
      },
      options: {
        driverOption: []
      }
    }
  },
  mounted() {
    if (this.propsData.type === 'add') {
      this.fetchOption()
      if (this.propsData.isUpdate) {
        fetchDetail({ id: this.propsData.data.id }).then(({ data }) => {
          this.form = Object.assign(this.form, data)
          const provinceId = data.provinceId.toString()
          const cityId = data.cityId.toString()
          this.cityDTO = [{ id: provinceId, name: this.form.provinceName }, { id: cityId, name: this.form.cityName }]
        }).catch(e => {
          this.$message({ type: 'error', message: e.msg })
        })
      }
    }
    if (this.propsData.type === 'view') {
      this.fecthList()
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    clickToAdd() {
      if (!this.driveDTO) {
        this.$message({ type: 'warning', message: '请选择一个配送员' })
        return
      }
      for (const item of this.form.scmDriver) {
        if (item.driverId === this.driveDTO) {
          this.$message({ type: 'warning', message: '请勿重复添加' })
          return
        }
      }
      const obj = this.$arrayAttrGetObj(this.options.driverOption, 'id', this.driveDTO)
      this.form.scmDriver.push({
        driverId: this.driveDTO,
        name: obj.name
      })
      this.driveDTO = null
    },
    fetchOption() {
      fetchDriverList().then(({ data }) => {
        if (Array.isArray(data.rows)) {
          this.options.driverOption = data.rows
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleClose(item, index) {
      this.form.scmDriver.splice(index, 1)
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true
          if (this.propsData.isUpdate) {
            updateRow(this.form).then(res => {
              this.saveLoading = false
              this.$emit('add')
              this.close()
            }).catch(e => {
              this.saveLoading = false
              this.$message({ type: 'error', message: e.msg })
            })
          } else {
            createRow(this.form).then(res => {
              this.saveLoading = false
              this.$emit('add')
              this.close()
            }).catch(e => {
              this.saveLoading = false
              this.$message({ type: 'error', message: e.msg })
            })
          }
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    fecthList() {
      const { index, size } = this.pagination
      const data = {
        index,
        size,
        id: this.propsData.data.id
      }
      fetchViewList(data).then(({ data }) => {
        if (Array.isArray(data.rows)) {
          this.table.data = data.rows
        }
        this.pagination.total = data.total
      }).catch(e => {
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
    }
  },
  watch: {
    cityDTO: {
      handler(val) {
        if (val && val.length) {
          this.form.provinceId = val[0].id
          this.form.provinceName = val[0].name
          this.form.cityId = val[1].id
          this.form.cityName = val[1].name
        } else {
          this.form.provinceId = null
          this.form.provinceName = null
          this.form.cityId = null
          this.form.cityName = null
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form{
 .box{
    text-align: left;
    width: 80%;
    min-height: 60px;
    border-radius: 4px;
    padding: 5px 5px;
    border: 1px solid #d9d9d9;
    margin: 0 auto;
 }
}
.topTips{
  color: rgba(0, 0, 0, 0.8);
  font-size: 13px;
  margin-bottom: 10px;
}
</style>