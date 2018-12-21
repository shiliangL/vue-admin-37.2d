<template>
  <div class="clearfix AddressSelect">
    <!-- {{form.province}} -->
    	<el-select size="small" :style="{width}" filterable v-model="form.province" value-key="id" @change="selectChange($event,0)">
					<el-option v-for="sub in options.province"
            :key="sub.id"
            :label="sub.title"
            :value="sub">
          </el-option>
			</el-select>
      <!-- {{form.city}} -->
    	<el-select size="small" :style="{width}" filterable v-model="form.city" value-key="id" @change="selectChange($event,1)">
					<el-option v-for="sub in options.city"
            :key="sub.id"
            :label="sub.title"
            :value="sub">
          </el-option>
			</el-select>
      <!-- {{form.area}} -->

    	<el-select size="small" :style="{width}" filterable v-model="form.area" value-key="id" @change="selectChange($event,2)">
					<el-option v-for="sub in options.area"
            :key="sub.id"
            :label="sub.title"
            :value="sub">
          </el-option>
			</el-select>
      <div class="address">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="详细地址不能超30位" maxlength="30"
            size="small" style="width:400px" v-model.trim="form.address" @input="selectChange($event,3)">
          </el-input>
      </div>
  </div>
</template>

<script>
import { fetchTreeByLevel } from '@/api/city.js'
export default {
  name: 'AddressSelect',
  props: {
    value: {
      type: Array
    },
    width: {
      type: String,
      default: '160px'
    },
    ids: {
      type: Array
    },
    backKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      form: {
        type: null,
        province: null,
        city: null,
        area: null,
        address: null
      },
      options: {
        province: [],
        city: [],
        area: []
      }
    }
  },
  mounted() {
    this.fetchProvinces()
    if (this.ids.length) {
      const n = JSON.parse(JSON.stringify(this.ids))
      this.form.province = n[0]
      this.form.city = n[1]
      this.form.area = n[2]
      this.form.address = n[3]
    }
  },
  methods: {
    fetchProvinces() {
      fetchTreeByLevel({ parentId: 0 }).then(({ data }) => {
        this.options.province = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    selectChange(e, t) {
      // 地址需要全部填完才回调参数
      this.form.type = t
      if (this.form.province && this.form.city && this.form.area && this.form.address) {
        this.$emit('change', this.form)
      } else {
        this.$emit('change', null)
      }
    },
    getNames() {
      const provinceObj = this.form.province
      const cityObj = this.form.city
      const areaObj = this.form.area
      const { province, city, area } = this.options
      if (provinceObj && cityObj && areaObj) {
        const data = {}
        if (provinceObj.title) {
          // 修改过了
          data.province = provinceObj
          data.city = cityObj
          data.area = areaObj
          // data.address = `${provinceObj.title}${cityObj.title}${areaObj.title}${this.form.address}`
          data.address = `${this.form.address}`
        } else {
          // 没有修改
          data.address = `${this.form.address}`
          if (Array.isArray(province)) {
            for (let i = 0; i < province.length; i++) {
              const element = province[i]
              if (provinceObj.id === element.id) {
                data.province = element
                break
              }
            }
          }

          if (Array.isArray(city)) {
            for (let i = 0; i < city.length; i++) {
              const element = city[i]
              if (cityObj.id === element.id) {
                data.city = element
                break
              }
            }
          }

          if (Array.isArray(area)) {
            for (let i = 0; i < area.length; i++) {
              const element = area[i]
              if (areaObj.id === element.id) {
                data.area = element
                break
              }
            }
          }
        }
        // const { province, city, area } = this.options
        // console.log(province, city, area, '地址')
        // console.log(provinceObj, cityObj, areaObj, '地址')
        console.log(data, '地址xx')
        this.$emit('change', data)
      }
    }
  },
  watch: {
    ids: {
      handler(n, o) {
        if (n.length) {
          this.form.province = n[0]
          this.form.city = n[1]
          this.form.area = n[2]
          this.form.address = n[3]
        }
      }
    },
    value: {
      handler(n, o) {
        if (n.length) {
          this.form.province = n[0]
          this.form.city = n[1]
          this.form.area = n[2]
          this.form.address = n[3]
        }
      }
    },
    'form.province': {
      handler(n, o) {
        if (n && o && n.id !== o.id) {
          this.form.city = null
          this.form.area = null

          this.options.city = []
          this.options.area = []
          this.form.address = null
          this.$emit('change', null)
        }
        if (n) {
          fetchTreeByLevel({ parentId: n.id }).then(({ data }) => {
            if (Array.isArray(data) && data.length > 0) {
              this.options.city = data
              // this.form.city = data[0]
            } else {
              this.options.city = []
            }
          }).catch(e => {
            this.$message({ type: 'error', message: e.msg })
          })
        }
      }
    },
    'form.city': {
      handler(n, o) {
        if (n && o && n.id !== o.id) {
          this.form.area = null
          this.options.area = []
          this.form.address = null
          this.$emit('change', null)
        }
        if (n) {
          fetchTreeByLevel({ parentId: n.id }).then(({ data }) => {
            if (Array.isArray(data) && data.length > 0) {
              this.options.area = data
              // this.form.area = data[0]
            } else {
              this.options.area = []
            }
          }).catch(e => {
            this.$message({ type: 'error', message: e.msg })
          })
        }
      }
    },
    'form.area': {
      handler(n, o) {
        if (n && o && n.id !== o.id) {
          this.form.address = null
          this.$emit('change', null)
        }
      }
    }
  }
}
</script>

<style lang="scss">
</style>
