<template>
    <div class="toView">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" :inline="true">
        <!--基本信息-->
		    <div class="row-item">
						<div class="row-title">基本信息</div>
						<div class="row-content basicInfo">
							<el-row>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品分类:" prop="categoryId" :rules="rules.select">
                      <span v-cloak>{{form.categoryName}}</span>
									</el-form-item>
								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品类型:" prop="type" :rules="rules.select">
                     <span v-if="form.type===0"> 标品 </span>
                     <span v-if="form.type===1"> 非标品 </span>
									</el-form-item>
								</el-col>
                
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品名称:" prop="title" :rules="rules.input">
                    <span v-cloak>{{form.title}}</span>
									</el-form-item>
								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品子名称:">
                     <span v-cloak>{{form.subTitle}}</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="商品别名:">
                    <span v-cloak>{{form.aliasTitle}}</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="简称:">
                    <span v-cloak>{{form.shortTitle}}</span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="简称字母:">
                    <span v-cloak>{{form.shortCode}}</span>
									</el-form-item>
								</el-col>
		 
								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="采购类型:" :rules="rules.select">
									   <span v-if="form.purchaseType===1"> 供应商直供 </span>
                     <span v-if="form.purchaseType===2"> 市场自采 </span>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="10" :md="8" :lg="6">

									<el-form-item label="供应商类别:" v-if="form.purchaseType===1"  :rules="rules.select">
                    <span v-cloak>{{form.supplier.categoryName}}</span>
									</el-form-item>

									<el-form-item label="采购员:" :rules="rules.select" v-else  prop="buyerId">
                    <span v-cloak>{{form.buyer.buyerName}}</span>
									</el-form-item>

								</el-col>

								<el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="供应商:" :rules="rules.select"  v-if="form.purchaseType===1" prop="supplyId">
                    <span v-cloak>{{form.supplier.supplierName}}</span>
									</el-form-item>
								</el-col>
								<!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
									<el-form-item label="简要介绍:">
                    <span v-cloak>{{form.summary}}</span>
									</el-form-item>
								</el-col> -->
							</el-row>
						</div>
				</div>
        <!--商品属性-->
        <div class="row-item">
          <div class="row-title"> 商品价格 </div>
          <div class="row-content basicInfo">
            <el-row>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="基本单位:" prop="baseUnit" :rules="rules.select">
                 <span v-cloak>{{form.baseUnitName}}</span>
								</el-form-item>
              </el-col>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="最近一次采购价:">
                  
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="基本单位价格:" prop="basePrice" :rules="rules.input">
                   <span v-cloak>{{form.basePrice}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="10" :md="8" :lg="6">
                <el-form-item label="">
                    <el-checkbox disabled v-model="form.sortFlag">分拣时按基本单位</el-checkbox>

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
					<div class="row-title">商品售价</div>
					<div class="row-content">
						<el-table :data="form.skuList" class="skuListTbale" size="small" :max-height="500" style="width: 100%;" highlight-current-row>
 
							<el-table-column label="序号" width="50" align="center">
								<template slot-scope="scope">
									<span>{{scope.$index + 1}}</span>
								</template>
							</el-table-column>

							<el-table-column prop="orderNo" label="规格" align="center">
								<template slot-scope="scope">
                  <span>  {{scope.row.rate}}   {{scope.row.baseUnitName}} / {{scope.row.unitName}} </span>
								</template>
							</el-table-column>
							<el-table-column prop="productName" label="规格备注" align="center">
								<template slot-scope="scope">
                  <span v-cloak>{{scope.row.summary}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="price" label="市场价格(全国)" align="center">
							 	<template slot-scope="scope">
                  <span v-cloak>{{scope.row.price}}</span>
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
                <div class="avatar-uploader">
                  <ul class="el-upload-list el-upload-list--picture-card">
                    <li class="el-upload-list__item" v-for="(item,index) in fileList" :key="index">
                      <img :src="`${item.url}`" class="el-upload-list__item-thumbnail" alt="商品图片">
                    </li>
                  </ul>
                </div>
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
import { mapGetters } from 'vuex'
import rules from '@/public/rules.js'
export default {
  mixins: [rules],
  name: 'toView',
  props: {
    viewData: {
      type: Object
    }
  },
  data() {
    return {
      textarea: null,
      fileList: [],
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
      }
    }
  },
  created() {
    if (this.viewData) {
      this.form = {
        type: this.viewData.info.type, // 基本单位id
        baseUnit: this.viewData.info.baseUnit, // 基本单位id
        baseUnitName: this.viewData.info.baseUnitName, // 基本单位id
        aliasTitle: this.viewData.info.aliasTitle, // 货品别名
        bannerIds: this.viewData.info.bannerIds,
        barCode: this.viewData.info.barCode,
        basePrice: this.viewData.info.basePrice,
        buyerId: this.viewData.info.buyerId, // 采购员 id
        categoryId: this.viewData.info.categoryId, // 类型 id
        categoryName: this.viewData.info.categoryName, // 类型名称
        details: this.viewData.info.details, // 详细介绍 这里的详情，是否类似淘宝 图片详情 二进制数据
        goodsImage: this.viewData.info.goodsImage,
        goodsImageId: this.viewData.info.goodsImageId, // 图片Url
        goodsStatus: 0, // 商品状态, 0 代表上架，1代表下架
        itemNumber: this.viewData.info.itemNumber, // 货号
        // productDetail: [], // 货品详细信息表,
        purchasePrice: this.viewData.info.purchasePrice, // 进价
        purchaseType: this.viewData.info.purchaseType, // 采购类型 1：供货，2：自采，3：未指定
        sellingPrice: this.viewData.info.sellingPrice, // 公开售价 --
        shortCode: this.viewData.info.shortCode, // 简称字母 ,
        shortTitle: this.viewData.info.shortTitle, // 简称
        specificationId: this.viewData.info.specificationId, // 规格ID
        stockQuantity: this.viewData.info.stockQuantity, // 库存
        subTitle: this.viewData.info.subTitle, // 子名称
        summary: this.viewData.info.summary, // 简要介绍
        supplyId: this.viewData.info.supplyId, // 供应商Id
        tags: this.viewData.info.tags, // 标签
        sortFlag: this.viewData.info.sortFlag, // 分拣时按基本单位
        title: this.viewData.info.title // 名称
      }
      if (this.viewData.supplier) {
        this.form.supplier = {
          // productId: this.viewData.supplier.productId,
          // id: this.viewData.supplier.id,
          supplierId: this.viewData.supplier.supplierId,
          supplierName: this.viewData.supplier.supplierName,
          categoryId: this.viewData.supplier.categoryId,
          categoryName: this.viewData.supplier.categoryName
        }
      } else if (this.viewData.buyer) {
        this.form.buyer = {
          // id: this.form.buyer.id,
          // productId: this.form.buyer.productId,
          buyerId: this.viewData.buyer.buyerId,
          buyerName: this.viewData.buyer.buyerName
        }
      }
      if (this.form.type === 1) {
        this.form.sortFlag = true
      } else {
        this.form.sortFlag = false
      }
      // 处理sku
      this.form.skuList = this.viewData.attrList
      // 处理编辑图片展示问题
      if (this.viewData.info.bannerIds) {
        const list = []
        const arr = this.viewData.info.bannerIds.split(',')
        for (const item of arr) {
          list.push({ url: `${item}` })
        }
        this.fileList = list
      }
    }
  },
  computed: {
    ...mapGetters([
      'baseImgUrl'
    ])
  },
  watch: {

  }
}
</script>

<style scoped lang="scss">
  .row-item {
    padding: 4px 0;
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
  .basicInfo {
    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>