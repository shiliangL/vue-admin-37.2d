<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules"  style="padding-left: 60px;">
				<el-form-item label="商品名称:" label-width="100px" prop="contentId" :rules="rules.select">
					<el-input size="small" style="width:180px;display: none;"  v-model.trim="form.contentId"></el-input>
					<SearchBox style="width:180px" keyName="title" isGoods nameLabel="商品" codeLabel="类别" tableCode="categoryName" requestUrl="productInfo/listProductInfo" v-model="dataDTO"></SearchBox>
				</el-form-item>
				<el-form-item label="商品规格:" label-width="100px" prop="contentId" :rules="rules.select">
          <el-select size="small" v-model="form.skuId" filterable placeholder="选择规格">
            <el-option v-for="sub in skuOption" :key="sub.id" :label="sub.skuTitle" :value="sub.id"></el-option>
          </el-select>
				</el-form-item>
			</el-form>
			<div class="footer-block" v-if="!isViewPage">
				<el-button size="small" @click.stop="close">取 消</el-button>
				<el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
			</div>
    </div>
</template>

<script>
import rules from '@/public/rules.js'
import addModel from '@/public/addModel.js'
import { SearchBox } from '@/components/base.js'
import { createRow } from '@/api/frontShop/banner.js'
import { fetchSkuList } from '@/api/orders.js'

export default {
  mixins: [rules, addModel],
  components: {
    SearchBox
  },
  data() {
    return {
      isViewPage: false,
      saveLoading: false,
      isUpdate: false,
      dataDTO: false,
      dataSKU: null,
      form: {
        'contentId': null, // 商品 id
        'productName': null,
        'id': null,
        'method': 2, // 1：banner，2：商品推荐，3：热门 ,
        'orderIndex': 1,
        'status': '1',
        'summary': null,
        'type': 2, // 1：机构，2：商品，3：用户 ,
        'url': null
      },
      skuOption: []
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.saveLoading = true
              if (!this.propsSonData.isUpdate) {
                const data = JSON.parse(JSON.stringify(this.form))
                createRow(data).then(res => {
                  this.saveLoading = false
                  this.$emit('add')
                  this.close()
                  this.$message({ type: 'success', message: `${res.msg}!` })
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
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    fetchSkuList(id) {
      if (!id) return
      fetchSkuList({ id: id }).then(({ data }) => {
        if (Array.isArray(data)) {
          this.skuOption = data
        }
      }).catch(e => {
        this.$message({ type: 'error', message: '获取商品规格失败' })
      })
    }
  },
  watch: {
    dataDTO: {
      handler(n, o) {
        if (n && o && n.id !== o.id) {
          this.form.skuId = null
          this.skuOption = []
        }
        if (n) {
          this.form.contentId = n.id
          this.form.productName = n.title
          this.form.url = n.goodsImage
          setTimeout(() => {
            this.fetchSkuList(n.id)
          }, 400)
        } else {
          this.skuOption = []
          this.form.url = null
          this.form.contentId = null
          this.form.productName = null
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form{
	.el-form-item {
    margin-bottom: 14px;
	}
}
</style>