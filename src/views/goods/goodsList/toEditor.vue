<template>
    <div class="toEditor">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" :inline="true">

		    <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

        <div v-show="ifInfo">
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
                        <el-option size="small" v-for="item in options.categoryTypeOption" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                  
                  <!-- 默认采购员 -->
                  <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="采购类型:" :rules="rules.select">
                      <el-select v-model="form.purchaseType" placeholder="请选择" @change="changePurchaseType" filterable  style="width:180px" disabled>
                        <el-option size="small" v-for="item in options.purchaseType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="供应商类别:" v-if="form.purchaseType===2"  :rules="rules.select" prop="supplyType" filterable>
                      <el-select size="small" style="width:180px" v-model="form.supplyType" placeholder="请选择" @change="supplyTypeChange">
                        <el-option size="small" v-for="item in options.supplierType" :key="item.pk" :label="item.title" :value="item.pk"> </el-option>
                      </el-select> 
                    
                    </el-form-item>

                    <el-form-item label="采购员:" :rules="rules.select" v-else  prop="buyerId">
                      <el-select size="small" style="width:180px" v-model="form.buyerId" placeholder="请选择" filterable>
                        <el-option size="small" v-for="item in options.salerList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                      </el-select>

                    </el-form-item>

                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">

                    <el-form-item label="供应商:" :rules="rules.select"  v-if="form.purchaseType===2" prop="supplyId">
                      <el-select size="small" v-model="form.supplyId" placeholder="请选择" style="width:180px" >
                        <el-option size="small" v-for="item in options.supplierList" :key="item.value" :label="item.title" :value="item.pk"> </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="品牌:">
                      <el-select size="small" style="width:180px" v-model="form.brandId" placeholder="请选择" filterable clearable>
                        <el-option size="small" v-for="item in options.brandOption" :key="item.id" :label="item.title" :value="item.id"> </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="所属仓库:" prop="stockId"  :rules="rules.select">
                      <el-select size="small" style="width:180px" v-model="form.stockId" placeholder="请选择" filterable>
                        <el-option size="small" v-for="item in options.warehouse" :key="item.id" :label="item.title" :value="item.id"> </el-option>
                      </el-select>
                      <el-tooltip content="请认真选择！为防止随意将商品更改仓库，只有新增商品时才能选择所属仓库。供应链部门可在【商品换仓】更改。" placement="top"  effect="light">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="保质期:">
                       <el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.expiry"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="储藏方式:">
                       <el-input size="small" style="width:180px" class="w180"  placeholder="请输入" v-model.trim="form.storage"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
              </div>
          </div>

          <div class="row-item">
            <div class="row-title">上下架设置</div>
            <div class="row-content">
                <el-row>
                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="">
                        <el-radio v-model="form.goodsStatus" label="0">上架出售</el-radio>
                        <el-radio v-model="form.goodsStatus" label="1">下架</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
            </div>
          </div>

          <div class="row-item">
            <div class="row-title">商品图片  <span class="desc">大小≤2MB，支持JPG、PNG、JPEG,最多支持5张图片;建议尺寸800*800px，比例1:1</span></div>
            <div class="row-content">
              <div class="img-items">

                <div style="display:flex; align-items: center">
                  <div v-for="(item,index) in UploadImgArr" :key="index" class="card-imgs el-upload-list__item"> 
                    <img :src="item" class="image">
                    <div class="bottom-img clearfix">
                      <el-button type="text" v-if="index===0" class="left">商品主图</el-button>
                      <el-button @click.stop="setBannerPic(item,index)" type="text" v-else class="left">设为主图</el-button>
                      <el-button @click.stop="delBannerPic(item,index)" type="text" style="color:red" class="right">删除图片</el-button>
                    </div>
                  </div>
                </div>
                <div class="el-upload el-upload--picture-card" style="margin-top: 10px;" v-if="UploadImgArr.length<=4"  @click.stop="innerVisible=true"> <i class="el-icon-plus"></i> </div>
              </div>
            </div>
          </div>

          <div class="row-item">
            <div class="row-title">
              图文详情描述 <el-button type="text" size="small" @click.stop="upDetails"> 点击上传 </el-button> <span class="desc">大小≤2MB，支持JPG、PNG、JPEG,最多支持15张图片,图片宽度480 ~ 620像素、高度小于等于960像素的图片</span>
              <!-- <el-popover placement="right" width="600" trigger="click">  
                <div class="desc">
                  一、基本要求
                  <p>1、商品详情总体要求：图片或文字，图片不超过20张，文字不超过5000字；建议：所有图片都是本商品相关的图片。</p>
                  二、图片大小
                  <p> 1、建议使用宽度480 ~ 620像素、高度小于等于960像素的图片，比例1:2；</p>
                  <p> 2、格式为：JPG\JEPG\GIF\PNG； 举例：可以上传一张宽度为480，高度为960像素，格式为JPG的图片。</p>
                  三、文字要求
                  <p> 1、每次插入文字不能超过500个字，标点、特殊字符按照一个字计算；</p>
                  <p> 2、请手动输入文字，不要复制粘贴网页上的文字，防止出现乱码；</p>
                  <p> 3、以下特殊字符   “<”、“>”、“"”、“'”、“\”  会被替换为空。</p>
                  建议：不要添加太多的文字，这样看起来更清晰。
                </div>
                <el-button slot="reference" style="font-size: 14px;margin-left: 10px;" type="text" size="mini" > 上传说明 </el-button>
              </el-popover> -->
            </div>
            <div class="row-content">
              <!-- <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model.trim="form.details" /> -->
              <!-- <div class="editor_wrap">
                <NqQuillEditor class="NqQuillEditor" v-model="form.details"></NqQuillEditor>
              </div> -->
              <div class="details-content">
                <!-- 隐藏上传组件 -->
                <el-upload
                  style="display:none"
                  ref="el_upDetails"
                  action="http://up-z2.qiniu.com"
                  :data="uploadDatas"
                  list-type="picture"
                  :on-success="handleUpSuccess"
                  :before-upload="beforeUpload"
                  :accept="accept">
                  <el-button size="small" id="upDetails" type="primary">点击上传</el-button>
                </el-upload>

                <div v-for="(item,index) in detailsFileList" :key="index" class="details-item">
                  <label class="handler">
                   <i class="el-icon-close" @click.stop="delDetailsFile(item,index)"> </i>
                  </label>
                  <img :src="item" alt="">
                </div>

              </div>
            </div>
          </div>
        </div>

        <div v-show="isSku">
          <div class="row-item">
              <div class="row-title"> 商品属性 </div>
              <div class="row-content">
                <div class="flex-box">
                  <div>
                     <el-form-item label="基本单位:" prop="baseUnit" :rules="rules.select">
                      <el-select v-model="form.baseUnit" placeholder="请选择" size="small" style="width:120px" filterable @change="selectBaseUnitChange">
                        <el-option v-for="item in options.UnitOpton" :key="item.id" :label="item.title" :value="item.id"> </el-option> 
                      </el-select>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="最近采购单价:" label-width="180px">
											<span v-cloak>{{form.purchasePrice}}</span>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="销售单价:" prop="basePrice" :rules="[{trigger: 'change', required: true,validator: rules.validNumberR2}]">
                      <el-input size="small" style="width:180px" class="w180" placeholder="请输入" v-model.trim="form.basePrice"></el-input>
                    </el-form-item>
                  </div>
                  <!-- <div>
                     <el-form-item label="" style="width:180px">
                      <el-checkbox :disabled="sortFlagType" v-model="form.sortFlag">分拣时按基本单位</el-checkbox> 
                      <el-tooltip content="非标品商品默认分拣时按基本单位" placement="top" effect="light">
                          <i class="el-icon-warning"></i>
                        </el-tooltip>
                    </el-form-item>
                  </div>
                  <div>
                     <el-form-item label=""  style="width:180px">
                      <label class="el-checkbox is-disabled is-checked">
                        <span class="el-checkbox__input is-disabled is-checked">
                          <span class="el-checkbox__inner"></span>
                        </span>
                        <span class="el-checkbox__label">销售汇总时按基本单位</span>
                      </label>
                    </el-form-item>
                  </div> -->
                </div>
                <el-table :data="form.skuList" class="skuListTbale" size="small" :max-height="500" style="width: 100%;" highlight-current-row>
                  <el-table-column label="操作" width="50" align="center">
                    <template slot-scope="scope">
                      <!-- v-if="form.skuList && form.skuList.length>1 && scope.$index"  -->
                      <i class="el-icon-plus" style="cursor: pointer;" @click.stop="clickToAddSkuLis"></i>
                      <i class="el-icon-minus" style="cursor: pointer;" @click.stop="clickToDelSkuLis(scope.$index,scope.$row)"></i>
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

                      <el-form-item label="" label-width="0px" :prop="'skuList.'+scope.$index+'.rate'" :rules="[{trigger: 'change', validator: rules.validNumber}]">
                      =	<el-input style="width:110px" placeholder="正整数" size="small" v-model.trim="scope.row.rate"></el-input> {{scope.row.baseUnitName}}
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

                      <el-form-item label="" label-width="0px" :prop="'skuList.'+scope.$index+'.price'" :rules="[{trigger: 'change', validator: rules.validNumberR2}]">
                        <el-input size="small" class="w110" placeholder="请输入" v-model.trim="scope.row.price"></el-input>
                      </el-form-item>

                    </template>
                  </el-table-column>
    
                  <el-table-column prop="customerPrice" label="客户类别价" align="center">
                    <template slot-scope="scope">
                      <span v-for="(item,index) in scope.row.customerPrice" :key="index">
                        <el-form-item :label="item.title" :prop=" 'skuList.'+scope.$index+'.customerPrice.'+index+'.price' " :rules="[{trigger: 'change', validator: rules.validNumberR2N}]">
                          <el-input size="small" class="w90" v-model.trim="item.price"></el-input>
                        </el-form-item>
                      </span>
                    </template>
                  </el-table-column>

                </el-table>
              </div>
          </div>
  
        </div>

			</el-form>

      <el-dialog width="40%" title="图片上传" :visible.sync="innerVisible" append-to-body>
          <UploadImg @callBack="callBackUploadImg" v-if="innerVisible" @close="innerVisible=false"></UploadImg>
      </el-dialog>

    </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { UploadImg, NqQuillEditor, Tabs } from '@/components/base.js'
import { fecthGoodsClass, fecthUnit, fecthSupplierList, fecthByCategoryId, customerType } from '@/api/goodsList.js'
import { fecthMemberSelect } from '@/api/members.js'
import { packagingList } from '@/api/brand.js'
import { fecthList } from '@/api/warehouse/setting.js'
import { fetchToken } from '@/api/layout.js'

import { mapActions, mapGetters } from 'vuex'
export default {
  mixins: [rules, addModel],
  props: {
    viewData: {
      type: Object
    }
  },
  components: {
    NqQuillEditor,
    UploadImg,
    Tabs
  },
  data() {
    return {
      uploadDatas: {
        token: null
      },
      customerPriceArr: [],
      ifInfo: true,
      isSku: false,
      imgTypes: ['jpeg', 'png', 'jpg'],
      detailsFileList: [],
      UploadImgArr: [],
      innerVisible: false,
      checked: false,
      category: [],
      supplyData: [],
      fileList: [],
      form: {
        'brandId': null,
        'stockId': null,
        'expiry': null,
        'storage': null,
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
        'goodsStatus': '0', // 商品状态, 0 代表上架，1代表下架
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
            'unitName': null, // 销售单位名称
            'customerPrice': [] // 客户类别
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
      rules: {
        validNumber: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^[1-9]\d*$/
          if (!reg.test(value)) {
            return callback(new Error('请输入非零正整数'))
          }
          callback()
        }
      },
      supplyType: null, // 编辑使用
      options: {
        goodClass: [],
        purchaseType: [
          { label: '供应商直供', value: 2 },
          { label: '市场自采购', value: 1 }
        ],
        categoryTypeOption: [
          { label: '标品', value: 0 },
          { label: '非标品', value: 1 }
        ],
        UnitOpton: [],
        supplierList: [],
        supplierType: [],
        salerList: [],
        warehouse: [],
        brandOption: []
      }
      // 文本
    }
  },
  created() {
    this.tabTitles = [
      { title: '商品相关信息', value: 0 },
      { title: 'SKU相关信息', value: 1 }
    ]
    if (this.viewData) {
      this.category = [this.viewData.parentId, this.viewData.info.categoryId]

      this.form = {
        'brandId': this.viewData.info.brandId,
        'stockId': this.viewData.info.stockId,
        'expiry': this.viewData.info.expiry,
        'storage': this.viewData.info.storage,
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
        'goodsStatus': this.viewData.info.goodsStatus + '', // 商品状态, 0 代表上架，1代表下架
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
      // 处理编辑图片展示问题
      if (this.viewData.info.bannerIds) {
        const arr = this.viewData.info.bannerIds.split(',')
        this.UploadImgArr = arr
      }

      if (this.viewData.info.details) {
        const arr = this.viewData.info.details.split(',')
        this.detailsFileList = arr
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

      // const lists = this.viewData.attrList
      // for (const item of lists) {
      //   item.skuTitle = `${item.rate}${item.baseUnitName}/ ${item.unitName}`
      // }
      this.form.skuList = this.viewData.attrList
    }
  },
  mounted() {
    this.fetchToken()
    this.fetchGoodClassList()
    this.fecthUnitList()
    this.fecthSupplierList()
    this.fecthSalerList()
    this.fecthList()
    this.fecthBrandList()
    this.customerType()
  },
  computed: {
    ...mapGetters([
      'baseImgUrl'
    ]),
    accept() {
      const arr = []
      this.imgTypes.forEach(item => {
        arr.push('image/' + item)
      })
      return arr.join(',')
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
    customerType() {
      customerType().then(({ data }) => {
        if (Array.isArray(data)) {
          this.customerPriceArr = data.filter((item) => {
            return item.type !== 0
          }) || []
          if (!this.viewData) {
            for (const item of data) {
              if (item.type !== 0) {
                // 为0 则是普通客户不需要显示
                this.form.skuList[0].customerPrice.push({
                  title: item.title,
                  groupId: item.pk,
                  price: null
                })
              }
            }
          } else {
            for (const item of this.form.skuList) {
              // 客户价格为空
              if (!item.customerPrice.length) {
                for (const itemIn of data) {
                  if (item.type !== 0) {
                    // 为0 则是普通客户不需要显示
                    item.customerPrice.push({
                      title: itemIn.title,
                      groupId: itemIn.pk,
                      price: null
                    })
                  }
                }
              } else {
                // 客户价格不为空 - 比对客户类别
                for (const itemIn of this.customerPriceArr) {
                  const ids = item.customerPrice.map(item => item.groupId)
                  if (!ids.includes(itemIn.pk)) {
                    item.customerPrice.push({
                      title: itemIn.title,
                      groupId: itemIn.pk,
                      price: null
                    })
                  }
                }
              }
            }
          }
        }
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    ...mapActions([
      'VX_SET_QNTOKEN'
    ]),
    tabsCallBack(item) {
      if (item.value === 0) {
        this.ifInfo = true
        this.isSku = false
      } else {
        this.ifInfo = false
        this.isSku = true
      }
    },
    fetchToken() {
      fetchToken().then(({ data }) => {
        this.uploadDatas.token = data.token
      }).catch(e => {
        this.$message({ type: 'error', message: '图片上传参数获取失败,请重新打开页面' })
      })
    },
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
      fecthMemberSelect({ staffType: 2 }).then(({ data }) => {
        this.options.salerList = data
      }).catch(e => {
        console.log(e)
      })
    },
    // 加载仓库
    fecthList() {
      fecthList().then(({ data }) => {
        this.options.warehouse = data
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    // 加载品牌
    fecthBrandList() {
      packagingList().then(({ data }) => {
        this.options.brandOption = data.rows
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    },
    clickToAddSkuLis() {
      const data = {
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
        'unitName': null, // 销售单位名称
        'customerPrice': [] // 客户类别
      }
      if (Array.isArray(this.customerPriceArr)) {
        for (const itemIn of this.customerPriceArr) {
          data.customerPrice.push({
            title: itemIn.title,
            groupId: itemIn.pk,
            price: null
          })
        }
      }
      this.form.skuList.push(data)
    },
    clickToDelSkuLis(index, row) {
      if (this.form.skuList.length === 1) {
        this.$message({ type: 'warning', message: '商品SKU不能全部删除' })
        return
      }
      this.form.skuList.splice(index, 1)
      // if (this.$refs['form']) this.$refs['form'].resetFields()
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
          if (this.UploadImgArr.length > 0) {
            this.form.bannerIds = this.UploadImgArr.map(item => {
              return item
            }).toString()
            this.form.goodsImage = this.UploadImgArr[0]
          } else {
            this.$message({ type: 'warning', message: '至少上传一张图片' })
            return
          }

          const lists = this.form.skuList
          for (const item of lists) {
            item.skuTitle = `${item.rate}${item.baseUnitName}/ ${item.unitName}`
          }

          this.form.sortFlag = this.form.sortFlag ? 0 : 1 // // 0是 1 不是
          this.form.details = this.detailsFileList.toString()
          const result = JSON.parse(JSON.stringify(this.form))
          for (const item of result.skuList) {
            const arr = []
            for (const itemIn of item.customerPrice) {
              if (itemIn.price) {
                arr.push({ groupId: itemIn.groupId, price: itemIn.price })
              }
            }
            delete item.customerPrice
            item.customerPrice = arr
          }
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
    },
    callBackUploadImg(data) {
      if (!data) return
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (this.UploadImgArr.length < 5) {
          this.UploadImgArr.push(`${this.baseImgUrl}${item.url}`)
        } else {
          this.$message({ type: 'error', message: '图片不能大于5张' })
          break
        }
      }
    },
    delBannerPic(item, index) {
      this.UploadImgArr.splice(index, 1)
    },
    setBannerPic(item, index) {
      if (this.UploadImgArr.length >= 2) {
        this.UploadImgArr.splice(0, 1, ...this.UploadImgArr.splice(index, 1, this.UploadImgArr[0]))
      }
    },
    upDetails() {
      const upDetails = document.getElementById('upDetails')
      upDetails.click()
    },
    handleUpSuccess(res, file) {
      if (res && res.code === '0') {
        if (res.data && res.data.key) {
          this.detailsFileList.push(`${this.baseImgUrl}${res.data.key}`)
          this.$message({ type: 'success', message: '上传成功' })
          this.$refs['el_upDetails'].clearFiles() // 插入成功后清除input的内容
        }
      } else {
        this.$message({ type: 'error', message: '图片上传失败' })
      }
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message({ type: 'warning', message: '上传图片大小不能超过 2MB!' })
      }
      return isLt2M
    },
    delDetailsFile(item, index) {
      this.detailsFileList.splice(index, 1)
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

	.basicInfo{
		.el-form-item{
			width: 330px;
			height: 40px;
			margin-bottom: 10px;
		}
	}
 
  .img-items{
    display: flex;
  }
  .card-imgs{
    margin-right: 10px;
    width: 148px;
    overflow: hidden;
    img{
      width: 148px;
      height: 148px;
      border: 1px solid #c0ccda;
      overflow: hidden;
    }
  }
  .bottom-img{
    padding: 0 5px;
  }
  .skuListTbale{
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .NqQuillEditor{
    width: 750px;
    .ql-container {
      height: 480px;
    }
  }
  .details-content{
    padding: 10px;
    width: 480px;
    max-height: 500px;
    overflow-y: auto;
    overflow-x:hidden;
    // border-radius: 6px;
    // border: 1px dashed #c0ccda;
  }
  .details-item{
    position: relative;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .handler{
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    right: -17px;
    top: -7px;
    width: 50px;
    height: 30px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    transition: all 0.28s;
    i{
      font-size: 14px;
      font-weight: bold;
      position: absolute;
      right: 16px;
      top: 12px;
      transform: rotate(30deg);
       &:hover{
         color: #fff;
        transform: rotate(-30deg);
      }
    }
  }
</style>