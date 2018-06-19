<template>
    <div class="toEditor">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" :inline="true">

				<div class="row-item">
						<div class="row-title">基本信息</div>
						<div class="row-content basicInfo">
							<el-row>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品分类:" prop="categoryId" :rules="rules.input">
										<el-cascader size="small" clearable  style="width:180px" class="w180" 
										placeholder="请选择" expand-trigger="hover" filterable :options="options.goodClass" v-model="category" @change="selectCategory"> </el-cascader>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品名称:" prop="title" :rules="rules.input">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品子名称:">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.subTitle"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品别名:">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.aliasTitle"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="简称:">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.shortTitle"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="简称字母:">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.shortCode"></el-input>
									</el-form-item>
								</el-col>
								<!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品品牌:">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="所属仓库:" :rules="rules.input">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="所在仓位:" :rules="rules.input">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
									</el-form-item>
								</el-col> -->
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="采购类型:" :rules="rules.input">
										<el-select v-model="form.purchaseType" placeholder="请选择" @change="changePurchaseType">
											<el-option size="small" style="width:180px" v-for="item in options.purchaseType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">

									<el-form-item label="供应商:" :rules="rules.input" v-if="form.purchaseType===1"  prop="supplyId">

                    <el-select size="small" style="width:180px" v-model="form.supplyId" placeholder="请选择">
											<el-option size="small" style="width:180px" v-for="item in options.supplierList" :key="item.pk" :label="item.title" :value="item.pk"> </el-option>
										</el-select>

										<!-- <el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.supplyId"></el-input> -->
									</el-form-item>

									<el-form-item label="采购员:" :rules="rules.input" v-else  prop="buyerId">

                    <el-select size="small" style="width:180px" v-model="form.buyerId" placeholder="请选择">
											<el-option size="small" style="width:180px" v-for="item in options.salerList" :key="item.pk" :label="item.title" :value="item.pk"> </el-option>
										</el-select>

										<!-- <el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.buyerId"></el-input> -->
									</el-form-item>

								</el-col>
								<!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="产地">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="生产日期:">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="保质期:">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="储存方式:">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
									</el-form-item>
								</el-col> -->
								<!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="标签:">
										<el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.title"></el-input>
									</el-form-item>
								</el-col> -->
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="简要介绍:">
										<el-input size="small" type="textarea" style="width:180px" class="w180"  placeholder="小于50字" v-model.trim="form.summary"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
				</div>
				<div class="row-item">
					<div class="row-title">商品图片 <span class="desc">大小≤6MB，支持JPG、PNG、JPEG,最多支持5张图片</span></div>
					<div class="row-content">
						<el-row>
								<div class="bannerImg">
									<el-upload
										ref="upload"
										:limit="5"
										list-type="picture-card"
										class="avatar-uploader"
										:data="uploadDatas"
									 	action="http://up-z2.qiniu.com"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">
										<i class="el-icon-plus avatar-uploader-icon"></i>
										<!-- <div slot="tip">
											设为主图
										</div> -->
									</el-upload>
								</div>
						</el-row>
					</div>
				</div>
				<div class="row-item">
					<div class="row-title">商品售价</div>
					<div class="row-content">
						<el-table :data="form.skuList" class="skuListTbale" size="small" :max-height="500" style="width: 100%;" highlight-current-row>

							<el-table-column label="操作" width="50" align="center">
								<template slot-scope="scope">
									<i class="el-icon-plus" style="cursor: pointer;" @click.stop="clickToAddSkuLis"></i>
									<i class="el-icon-minus" v-if="form.skuList && form.skuList.length>1 && scope.$index" style="cursor: pointer;" @click.stop="clickToDelSkuLis(scope.$index,scope.$row)"></i>
								</template>
							</el-table-column>
							<el-table-column label="序号" width="50" align="center">
								<template slot-scope="scope">
									<span>{{scope.$index + 1}}</span>
								</template>
							</el-table-column>

							<el-table-column prop="orderNo" label="规格" align="center">
								<template slot-scope="scope">

									<el-select style="width:110px;padding-top: 2px;" v-model="scope.row.baseUnitId" placeholder="请选择" size="small" filterable @change="selectChangeUnit($event,scope.row)">
										<el-option v-for="item in options.UnitOpton" :key="item.id" :label="item.title" :value="item.id"> </el-option> 
									</el-select>

									<el-form-item label="" label-width="0px">
										<el-input style="width:110px" disabled size="small" v-model.trim="scope.row.skuTitle"></el-input>
									</el-form-item>


								</template>
								<!-- <div>分拣时按基础单位</div> -->
							</el-table-column>
							<el-table-column prop="productName" label="规格备注" align="center">
								<template slot-scope="scope">
									<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容" v-model.trim="scope.row.summary" />
								</template>
							</el-table-column>
							<el-table-column prop="customerName" label="最近一次采购" align="center"> </el-table-column>
							<!-- <el-table-column prop="price" label="市场公开售价" align="center">
								<template slot-scope="scope">

									<el-form-item label="" label-width="0px">
										<el-input size="small" class="w110"  placeholder="请输入" v-model.trim="scope.row.sellingPrice"></el-input>
									</el-form-item>

								</template>
							</el-table-column> -->
							<el-table-column prop="price" label="市场价格(全国)" align="center">
								<template slot-scope="scope">

									<el-form-item label="" label-width="0px">
										<el-input size="small" class="w110" type="number" placeholder="请输入" v-model.trim="scope.row.price"></el-input>
									</el-form-item>

								</template>
							</el-table-column>
							<!-- <el-table-column prop="purchaseCount" label="客户类型价" align="center" width="400">

								<template slot-scope="scope">

									<div>
										<span class="label">中小餐饮</span>
										<el-form-item label="" label-width="0px">
											<el-input size="small" class="w110"  placeholder="请输入" v-model.trim="form.title"></el-input>
										</el-form-item>
									</div>
									<div>

									</div>

								</template>

							</el-table-column> -->
						</el-table>
					</div>
				</div>
				<div class="row-item">
					<div class="row-title">图文详情描述</div>
					<div class="row-content">
						<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model.trim="form.summary" />
					</div>
				</div>
			</el-form>
    </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { fecthGoodsClass, fecthUnit, fecthSwitchUnit, fecthSupplierList, fecthSalerList } from '@/api/goodsList.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'toEditor',
  mixins: [rules, addModel],
  data() {
    return {
      category: [],
      form: {
        'aliasTitle': null, // 货品别名
        'bannerIds': null,
        'barCode': null,
        'buyerId': null, // 采购员 id
        'categoryId': null, // 类型 id
        'categoryName': null, // 类型名称
        'details': null, // 详细介绍 这里的详情，是否类似淘宝 图片详情 二进制数据
        'goodsImage': null,
        'goodsImageId': null, // 图片Url
        'goodsStatus': 0, // 商品状态, 0 代表上架，1代表下架
        'itemNumber': null, // 货号
        'productDetail': [ // 货品详细信息表
          {
            'test': null
          }
        ],
        'purchasePrice': null, // 进价
        'purchaseType': 1, // 采购类型 1：供货，2：自采，3：未指定
        'sellingPrice': 1000, // 公开售价 --
        'shortCode': null, // 简称字母 ,
        'shortTitle': null, // 简称
        'skuList': [ // 商品SKU 生成商品 定义多个SKU 每个SKU 对应一个属性 多个销售地区
          {
            'areaIds': [
              {
                'areaId': 0,
                'productId': 'string',
                'purchasePrice': 0,
                'sellingPrice': 0,
                'skuId': 'string',
                'stockQuantity': 0
              }
            ],
            'baseUnitId': null, // 基本单位id
            'baseUnitName': null, // 基本单位id
            'price': 1998, // 价格 ,
            'productId': null, // 货品ID
            'quantity': 0, // 数量
            'rate': null, // 转换率
            'skuTitle': null, // SKU名称
            'summary': null, // 规格备注
            'unitId': null, // 销售单位id
            'unitName': null // 销售单位名称
          }
        ],
        'specificationId': null, // 规格ID
        'stockQuantity': 0, // 库存
        'subTitle': null, // 子名称
        'summary': null, // 简要介绍
        'supplyId': null, // 供应商Id
        'tags': null, // 标签
        'title': null // 名称
      },
      options: {
        goodClass: [],
        purchaseType: [
          { label: '供应商直供', value: 1 },
          { label: '市场自采购', value: 2 }
        ],
        UnitOpton: [],
        supplierList: [],
        salerList: []
      }
    }
  },
  mounted() {
    this.fetchGoodClassList()
    this.fecthUnitList()
    this.fecthSupplierList()
    this.fecthSalerList()
    if (!this.qNtoken) {
      this.VX_SET_QNTOKEN()
    }
  },
  computed: {
    ...mapGetters([
      'qNtoken'
    ]),
    uploadDatas() {
      if (this.qNtoken) {
        return {
          token: this.qNtoken
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'VX_SET_QNTOKEN'
    ]),
    // 加载商品大类
    fetchGoodClassList() {
      fecthGoodsClass().then(({ data }) => {
        if (!Array.isArray(data) && data.length <= 0) return
        const result = []
        this.tempGoodClass = data // 临时存储
        for (const item of data) {
          if (item.parentId === '0') {
            result.push({
              children: [],
              label: item.title,
              value: item.id
            })
          }
        }
        for (const item of this.tempGoodClass) {
          if (item.parentId !== '0') {
            for (const parent of result) {
              if (item.parentId === parent.value) {
                parent.children.push({
                  label: item.title,
                  value: item.id
                })
              }
            }
          }
        }
        this.options.goodClass = result
      }).catch(e => {
        this.$message({ type: 'error', message: '加载分类失败失败' })
      })
    },
    // 加载基本单位
    fecthUnitList() {
      fecthUnit().then(({ data }) => {
        this.options.UnitOpton = data
      }).catch(e => {
        console.log(e)
      })
    },
    // 加载供应商
    fecthSupplierList() {
      fecthSupplierList().then(({ data }) => {
        this.options.supplierList = data
      }).catch(e => {
        console.log(e)
      })
    },
    // 加载采购员
    fecthSalerList() {
      fecthSalerList().then(({ data }) => {
        this.options.salerList = data
      }).catch(e => {
        console.log(e)
      })
    },
    handleAvatarSuccess(res, fileList) {
      if (res.code === '0') {
        this.$message.success(res.msg)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log(file, '查看')
    },
    clickToAddSkuLis() {
      this.form.skuList.push({
        'areaIds': [
          {
            'areaId': 0,
            'productId': 'string',
            'purchasePrice': 0,
            'sellingPrice': 0,
            'skuId': 'string',
            'stockQuantity': 0
          }
        ],
        'baseUnitId': null, // 基本单位id
        'baseUnitName': null, // 基本单位id
        'price': 1998, // 价格 ,
        'productId': null, // 货品ID
        'quantity': 0, // 数量
        'rate': null, // 转换率
        'skuTitle': null, // SKU名称
        'summary': null, // 规格备注
        'unitId': null, // 销售单位id
        'unitName': null // 销售单位名称
      })
    },
    clickToDelSkuLis(index, row) {
      this.form.skuList.splice(index, 1)
    },
    selectCategory(value) {
      if (Array.isArray(value) && value.length > 0) {
        this.form.categoryId = value[value.length - 1]
        if (Array.isArray(this.tempGoodClass) && this.tempGoodClass.length > 0) {
          for (const item of this.tempGoodClass) {
            if (this.form.categoryId === item.id) {
              this.form.categoryName = item.title
            }
          }
        }
        console.log(this.form.categoryName)
      } else {
        this.form.categoryId = null
        this.form.categoryName = null
      }
    },
    changePurchaseType(value) {
      if (value === 1) {
        this.form.buyerId = null
      } else {
        this.form.supplyId = null
      }
    },
    selectChangeUnit(value, item) {
      item.skuTitle = null
      if (!value) return
      fecthSwitchUnit({ sourceId: value }).then(res => {
        console.log(res)
        if (res.code === '0' && res.data) {
          item.rate = res.data.rate
          item.skuTitle = `${res.data.rate}/${res.data.targetName}`
        }
      }).catch(e => {
        console.log(e)
      })
    },
    validateForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.$refs['upload']) {
            const uploadFiles = this.$refs['upload'].uploadFiles
            const imgs = []
            if (Array.isArray(uploadFiles) && uploadFiles.length > 0) {
              for (const item of uploadFiles) {
                if (item.response && item.response.code === '0') {
                  imgs.push(item.response.data.id)
                }
              }
            }
            if (imgs.length > 0) {
              this.form.goodsImage = imgs[0]
            }
            this.form.bannerIds = imgs.toString()
          }
          this.$emit('callBack', this.form)
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    TESET() {
      console.log(this.$refs['upload'])
    }
  }
}
</script>

<style scoped lang="scss">
  .row-item {
    padding: 24px 0;
    .row-title {
      border-left: 2px solid #1cbc9c;
      padding-left: 8px;
      .desc{
        font-size: 12px;
        padding-left: 16px;
        color: rgb(128, 132, 143);
      }
    }
    .row-content {
      padding: 10px;
      .label{
        color: #696767;
        font-size: 14px;
        font-weight: 600;
      }
    }
    .el-col{
      padding: 5px 0;
    }
    .tips{
      padding: 10px 0;
		}

		// .bannerImg {
		// 	margin: 10px 0;
		// 	border: 1px dashed #d9d9d9;
		// 	width: 90px;
		// 	height: 90px;
		// 	border-radius: 6px;
		// 	cursor: pointer;
		// 	position: relative;
		// 	overflow: hidden;
		// }
		// .avatar-uploader .el-upload:hover {
		// 	border-color: #409EFF;
		// }
		// .avatar-uploader-icon {
		// 	font-size: 28px;
		// 	color: #8c939d;
		// 	width: 90px;
		// 	height: 90px;
		// 	line-height: 90px;
		// 	text-align: center;
		// }
		// .avatar {
		// 	width: 90px;
		// 	height: 90px;
		// 	display: block;
		// }
	}
	.basicInfo{
		.el-form-item{
			width: 330px;
			height: 40px;
			margin-bottom: 6px;
		}
	}
	.el-form-item{
		margin-bottom: 0;
	}
	.textarea{
		margin-top: 10px;
		margin-left: 10px;
	}
</style>