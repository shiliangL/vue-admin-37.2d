<template>
  <div class="clearfix AddressSelect">
    	<el-select size="small" :style="{width}" filterable v-model="form.province" value-key="id" @change="selectChange($event,0)">
					<el-option v-for="sub in options.province" 
            :key="sub.id" 
            :label="sub.title" 
            :value="sub">
          </el-option>
			</el-select>
    	<el-select size="small" :style="{width}" filterable v-model="form.city" value-key="id" @change="selectChange($event,1)">
					<el-option v-for="sub in options.city" 
            :key="sub.id" 
            :label="sub.title" 
            :value="sub">
          </el-option>
			</el-select>
    	<el-select size="small" :style="{width}" filterable v-model="form.area" value-key="id" @change="selectChange($event,2)">
					<el-option v-for="sub in options.area" 
            :key="sub.id" 
            :label="sub.title" 
            :value="sub">
          </el-option>
			</el-select>
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
        province: null,
        city: null,
        area: null
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
      const data = JSON.parse(JSON.stringify(this.form))
      data.type = t
      this.$emit('change', data)
    }
  },
  watch: {
    ids: {
      handler(n, o) {
        if (n) {
          this.form.province = n[0]
          this.form.city = n[1]
          this.form.area = n[2]
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
    }
  }
}
</script>

<style lang="scss">
</style>