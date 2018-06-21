<template>
    <div class="toEditor">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" :inline="true">

				<div class="row-item">
						<div class="row-title">基本信息</div>
						<div class="row-content basicInfo">
							<el-row>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品分类:" prop="categoryId" :rules="rules.select">
                      <el-cascader
                        size="small" 
                        clearable  
                        style="width:180px" 
                        placeholder="请选择" 
                        expand-trigger="hover" 
                        filterable 
                        :options="options.goodClass" 
                        v-model="category" 
                        @change="selectCategory"> 
                      </el-cascader>
									</el-form-item>
								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品类型:" prop="type" :rules="rules.select">
                    <el-select size="small" style="width:180px" v-model="form.type" placeholder="请选择">
											<el-option size="small" style="width:180px" v-for="item in options.categoryTypeOption" :key="item.value" :label="item.label" :value="item.value"> </el-option>
										</el-select> 
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

									<el-form-item label="采购类型:" :rules="rules.select">
										<el-select v-model="form.purchaseType" placeholder="请选择" @change="changePurchaseType" filterable>
											<el-option size="small" style="width:180px" v-for="item in options.purchaseType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">

									<el-form-item label="供应商类别:" v-if="form.purchaseType===1"  :rules="rules.select" prop="supplyType" filterable>
                    <el-select size="small" style="width:180px" v-model="form.supplyType" placeholder="请选择" @change="supplyTypeChange">
											<el-option size="small" style="width:180px" v-for="item in options.supplierType" :key="item.pk" :label="item.title" :value="item.pk"> </el-option>
										</el-select> 
                   
									</el-form-item>

									<el-form-item label="采购员:" :rules="rules.select" v-else  prop="buyerId">
                    <el-select size="small" style="width:180px" v-model="form.buyerId" placeholder="请选择" filterable>
											<el-option size="small" style="width:180px" v-for="item in options.salerList" :key="item.pk" :label="item.staffName" :value="item.pk"> </el-option>
										</el-select>

									</el-form-item>

								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">

									<el-form-item label="供应商:" :rules="rules.select"  v-if="form.purchaseType===1" prop="supplyId">
										<el-select v-model="form.supplyId" placeholder="请选择">
											<el-option size="small" style="width:180px" v-for="item in options.supplierList" :key="item.value" :label="item.title" :value="item.pk"> </el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="简要介绍:">
										<el-input size="small" type="textarea" style="width:180px" class="w180"  placeholder="小于50字" v-model.trim="form.summary"></el-input>
									</el-form-item>
								</el-col> -->
							</el-row>
						</div>
				</div>
        
				<div class="row-item">
						<div class="row-title"> 商品价格 </div>
						<div class="row-content basicInfo">
							<el-row>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="基本单位:" prop="baseUnit" :rules="rules.select">
                    <el-select v-model="form.baseUnit" placeholder="请选择" size="small" style="width:180px" filterable @change="selectBaseUnitChange">
                      <el-option v-for="item in options.UnitOpton" :key="item.id" :label="item.title" :value="item.id"> </el-option> 
                    </el-select>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="最近一次采购价:">
										<!-- <el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.subTitle"></el-input> -->
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="基本单位价格:" prop="basePrice" :rules="rules.input">
										<el-input size="small" style="width:180px" class="w180" type="number"  placeholder="请输入" v-model.trim="form.basePrice"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="">
										 <el-checkbox :disabled="sortFlagType" v-model="form.sortFlag">分拣时按基本单位</el-checkbox> 
                     <el-tooltip content="非标品商品默认分拣时按基本单位" placement="top" effect="light">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
									</el-form-item>
								</el-col>
 
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="">
                    <label class="el-checkbox is-disabled is-checked">
                      <span class="el-checkbox__input is-disabled is-checked">
                        <span class="el-checkbox__inner"></span>
                      </span>
                      <span class="el-checkbox__label">销售汇总时按基本单位</span>
                    </label>
									</el-form-item>
								</el-col>
 
							</el-row>
						</div>
				</div>

				<div class="row-item">
					<div class="row-title">商品规格</div>
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

	                <el-form-item label="" label-width="0px" :prop="'skuList.'+scope.$index+'.unitId'" :rules="rules.select">
                    <el-select style="width:110px;padding-top: 2px;" v-model="scope.row.unitId" placeholder="请选择" size="small" filterable @change="selectChangeUnit($event,scope.row)">
                      <el-option v-for="item in options.UnitOpton" :key="item.id" :label="item.title" :value="item.id"> </el-option> 
                    </el-select>
	                </el-form-item>

									<el-form-item label="" label-width="0px" :prop="'skuList.'+scope.$index+'.rate'" :rules="rules.input">
									=	<el-input style="width:110px" type="number" placeholder="正整数" size="small" v-model.trim="scope.row.rate"></el-input> {{scope.row.baseUnitName}}
									</el-form-item>

								</template>
							</el-table-column>
							<el-table-column prop="productName" label="规格备注" align="center">
								<template slot-scope="scope">
									<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="小于10字" v-model.trim="scope.row.summary" />
								</template>
							</el-table-column>
 
							<el-table-column prop="price" label="市场价格(全国)" align="center">
								<template slot-scope="scope">

									<el-form-item label="" label-width="0px" :prop="'skuList.'+scope.$index+'.price'" :rules="rules.input">
										<el-input size="small" class="w110" type="number" placeholder="请输入" v-model.trim="scope.row.price"></el-input>
									</el-form-item>

								</template>
							</el-table-column>
 
						</el-table>
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
                    :multiple="true"
                    :file-list="fileList"
										list-type="picture-card"
										class="avatar-uploader"
										:data="uploadDatas"
									 	action="http://up-z2.qiniu.com"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
									</el-upload>
								</div>
						</el-row>
					</div>
				</div>

				<div class="row-item">
					<div class="row-title">图文详情描述</div>
					<div class="row-content">
						<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model.trim="form.details" />
					</div>
				</div>
			</el-form>
    </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { fecthGoodsClass, fecthUnit, fecthSupplierList, fecthSalerList, fecthByCategoryId } from '@/api/goodsList.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'toEditor',
  mixins: [rules, addModel],
  props: {
    viewData: {
      type: Object
    }
  },
  data() {
    return {
      checked: false,
      category: [],
      supplyData: [],
      fileList: [],
      form: {
        'baseUnit': null, // 基本单位id
        'basePrice': null, // 基本单位价格
        'baseUnitName': null, // 基本单位id
        'aliasTitle': null, // 货品别名
        'bannerIds': null,
        'barCode': null,
        'categoryId': null, // 类型 id
        'categoryName': null, // 类型名称
        'details': null, // 详细介绍 这里的详情，是否类似淘宝 图片详情 二进制数据
        'goodsImage': null, // 主图xxx
        'goodsStatus': 0, // 商品状态, 0 代表上架，1代表下架
        'itemNumber': null, // 货号
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
            'price': null, // 价格 ,
            'productId': null, // 货品ID
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

        'buyerId': null, // 采购员 id
        'supplyId': null, // 供应商Id
        'supplyType': null, // 供应商类别

        'tags': null, // 标签
        'title': null, // 名称
        'type': 1,
        'sortFlag': 1 // 分拣时按基本单 0是true 1 不是fale,
      },
      supplyType: null, // 编辑使用
      options: {
        goodClass: [],
        purchaseType: [
          { label: '供应商直供', value: 1 },
          { label: '市场自采购', value: 2 }
        ],
        categoryTypeOption: [
          { label: '标品', value: 0 },
          { label: '非标品', value: 1 }
        ],
        UnitOpton: [],
        supplierList: [],
        supplierType: [],
        salerList: []
      }
    }
  },
  created() {
    if (this.viewData) {
      this.category = [this.viewData.parentId, this.viewData.info.categoryId]
      // 处理编辑图片展示问题
      if (this.viewData.info.bannerIds) {
        const list = []
        const arr = this.viewData.info.bannerIds.split(',')
        for (const item of arr) {
          list.push({ url: `${item}` })
        }
        this.fileList = list
      }
      this.form = {
        'id': this.viewData.info.pk,
        'basePrice': this.viewData.info.basePrice, // 基本单位价格
        'baseUnit': this.viewData.info.baseUnit, // 基本单位id
        'baseUnitName': this.viewData.info.baseUnitName, // 基本单位
        'aliasTitle': this.viewData.info.aliasTitle, // 货品别名
        'bannerIds': this.viewData.info.bannerIds, // 图片列表
        'barCode': this.viewData.info.barCode,
        'categoryId': this.viewData.info.categoryId, // 类型 id
        'categoryName': this.viewData.info.categoryName, // 类型名称
        'details': this.viewData.info.details, // 详细介绍 这里的详情，是否类似淘宝 图片详情 二进制数据
        'goodsImage': this.viewData.info.goodsImage, // 主图
        'goodsStatus': this.viewData.info.goodsStatus, // 商品状态, 0 代表上架，1代表下架
        'itemNumber': this.viewData.info.itemNumber, // 货号
        'purchasePrice': this.viewData.info.purchasePrice, // 进价
        'purchaseType': this.viewData.info.purchaseType, // 采购类型 1：供货，2：自采，3：未指定
        'sellingPrice': this.viewData.info.sellingPrice, // 公开售价 --
        'shortCode': this.viewData.info.shortCode, // 简称字母 ,
        'shortTitle': this.viewData.info.shortTitle, // 简称
        'specificationId': this.viewData.info.specificationId, // 规格ID
        'stockQuantity': this.viewData.info.stockQuantity, // 库存
        'subTitle': this.viewData.info.subTitle, // 子名称
        'summary': this.viewData.info.summary, // 简要介绍

        'supplyId': null, // 供应商Id
        'buyerId': null, // 采购员 id
        'supplyType': null, // 供应商类别 这三个注意了

        'tags': this.viewData.info.tags, // 标签
        'title': this.viewData.info.title, // 名称
        'type': this.viewData.info.type,
        'sortFlag': this.viewData.info.sortFlag // 分拣时按基本单 0是 1 不是 ,
      }

      if (this.viewData.supplier && this.viewData.supplier.categoryId) {
        this.form.supplyType = this.viewData.supplier.categoryId
        this.form.supplyId = this.viewData.supplier.supplierId
        this.form.supplyTempId = this.viewData.supplier.id // 中间表 id
      }
      if (this.viewData.buyer) {
        this.form.buyerId = this.viewData.buyer.buyerId
        this.form.buyerTempId = this.viewData.buyer.id // 中间表 id
      }
      this.form.skuList = this.viewData.attrList
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
      'qNtoken',
      'baseImgUrl'
    ]),
    uploadDatas() {
      if (this.qNtoken) {
        return {
          token: this.qNtoken
        }
      }
    },
    sortFlagType() {
      if (this.form.type === 1) {
        this.form.sortFlag = true
        return true
      } else {
        this.form.sortFlag = false
        return false
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
        if (Array.isArray(data) && data.length > 0) {
          this.options.UnitOpton = data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 加载供应商类别
    fecthSupplierList() {
      fecthSupplierList().then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          this.options.supplierType = data
        }
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
      // const isJPG = file.type === 'image/png'
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
        'baseUnitId': this.form.baseUnit, // 基本单位id
        'baseUnitName': this.form.baseUnitName, // 基本单位id
        'price': null, // 价格 ,
        'productId': null, // 货品ID
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
        const title = []
        this.form.categoryId = value[value.length - 1]
        if (Array.isArray(this.tempGoodClass) && this.tempGoodClass.length > 0) {
          for (const item of this.tempGoodClass) {
            if (value[0] === item.id) {
              title[0] = item.title
            }
            if (this.form.categoryId === item.id) {
              title[1] = item.title
            }
          }
        }
        this.form.categoryName = title.join('/')
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
    supplyTypeChange() {
      // this.options.supplierList = []
    },
    selectChangeUnit(value, item) {
      const result = this.$arrayAttrGetObj(this.options.UnitOpton, 'id', value)
      if (result) {
        item.unitName = result.title
      }
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
                  imgs.push(`${this.baseImgUrl}${item.response.data.key}`)
                }
                if (!item.response && item.url) imgs.push(item.url)
              }
            }
            if (imgs.length > 0) {
              this.form.goodsImage = imgs[0]
            }
            const lists = this.form.skuList
            for (const item of lists) {
              item.skuTitle = `${item.rate}${item.baseUnitName}/ ${item.unitName}`
            }
            this.form.bannerIds = imgs.toString()
            this.form.sortFlag = this.form.sortFlag ? 0 : 1 // // 0是 1 不是
          }
          const result = this.$copy(this.form)
          delete result.supplyType
          this.$emit('callBack', result)
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    },
    selectBaseUnitChange(val) {
      if (val) {
        const options = this.options.UnitOpton
        let value = null
        for (const item of options) {
          if (item.id === val) {
            value = item
            this.form.baseUnitName = item.title
          }
        }
        for (const item of this.form.skuList) {
          item.baseUnitId = value.id
          item.baseUnitName = value.title
        }
      }
    }
  },
  watch: {
    'form.supplyType': {
      handler(val, oldVal) {
        if (!val) return
        if (val && oldVal) {
          this.form.supplyId = null
          this.options.supplierList = []
        }
        fecthByCategoryId({ categoryId: val }).then(({ data }) => {
          if (Array.isArray(data) && data.length > 0) {
            this.options.supplierList = data
          }
        }).catch(e => {
          console.log(e)
        })
      }
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