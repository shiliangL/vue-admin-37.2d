<template>
    <div class="toView">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" :inline="true">

		    <Tabs :data="tabTitles" @callBack="tabsCallBack"></Tabs>

        <div v-show="ifInfo">
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
                    	<span v-if="form.purchaseType===2"> 供应商直供 </span>
                     	<span v-if="form.purchaseType===1"> 市场自采 </span>
                    </el-form-item>
                  </el-col> -->

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">

                    <el-form-item label="供应商类别:" v-if="form.purchaseType===2"  :rules="rules.select" prop="supplyType" filterable>
                      <span v-if="form.supplier.categoryName && form.supplier.categoryName" v-cloak>{{form.supplier.categoryName}}</span>
                    </el-form-item>

                    <el-form-item label="采购员:" :rules="rules.select" v-else  prop="buyerId">
                       <span v-if="form.buyer && form.buyer.buyerName" v-cloak>{{form.buyer.buyerName}}</span>
                    </el-form-item>

                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="供应商:" :rules="rules.select"  v-if="form.purchaseType===2" prop="supplyId">
                      <span v-cloak>{{form.supplier.supplierName}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="品牌:">
                      <span v-cloak>{{form.brandName}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="所属仓库:" :rules="rules.select">
                      <span v-cloak>{{form.stockName}}</span>
                       <el-tooltip content="请认真选择！为防止随意将商品更改仓库，只有新增商品时才能选择所属仓库。供应链部门可在【商品换仓】更改。" placement="top"  effect="light">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="保质期:">
                      <span v-cloak>{{form.expiry}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="10" :md="8" :lg="6">
                    <el-form-item label="储藏方式:">
                      <span v-cloak>{{form.storage}}</span>
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
                        <el-radio disabled v-model="form.goodsStatus" label="0">上架出售</el-radio>
                        <el-radio disabled v-model="form.goodsStatus" label="1">下架</el-radio>
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
                      <!-- <el-button type="text" v-if="index===0" class="left">商品主图</el-button> -->
                      <!-- <el-button @click.stop="setBannerPic(item,index)" type="text" v-else class="left">设为主图</el-button>
                      <el-button @click.stop="delBannerPic(item,index)" type="text" style="color:red" class="right">删除图片</el-button> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row-item">
            <div class="row-title">
              图文详情描述 <span class="desc">大小≤2MB，支持JPG、PNG、JPEG,最多支持15张图片,图片宽度480 ~ 620像素、高度小于等于960像素的图片</span>
            </div>
            <div class="row-content">
              <!-- <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model.trim="form.details" /> -->
              <!-- <div class="editor_wrap">
                <NqQuillEditor isDisables class="NqQuillEditor" v-model="form.details"></NqQuillEditor>
              </div> -->
              <div class="details-content">
                <!-- 隐藏上传组件 -->
                <div v-for="(item,index) in detailsFileList" :key="index" class="details-item">
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
                     <el-form-item label="基本单位:" prop="baseUnit">
												<span v-cloak>{{form.baseUnitName}}</span>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="最近采购单价:" label-width="180px">
                      <span v-cloak>{{form.purchasePrice}}</span>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="销售单价:" prop="basePrice" :rules="rules.input">
											<span v-cloak>{{form.basePrice}}</span>
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
                  <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.$index + 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="skuTitle" label="规格" align="center"></el-table-column>
                  <el-table-column prop="summary" label="规格备注" align="center"></el-table-column>
                  <el-table-column prop="price" label="市场价格(全国)" align="center"></el-table-column>
                  <el-table-column label="客户类别价" align="center">
                    <template slot-scope="scope">
                      <span v-for="(item,index) in scope.row.customerPrice" :key="index"> 
                        <div v-cloak> {{item.title}} : {{item.price}} </div>
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
import { fecthGoodsClass, fecthUnit, fecthSupplierList, fecthSalerList, fecthByCategoryId } from '@/api/goodsList.js'
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
      ifInfo: true,
      isSku: false,
      detailsFileList: [],
      UploadImgArr: [],
      innerVisible: false,
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
      // 文本
    }
  },
  created() {
    this.tabTitles = [
      { title: '商品相关信息', value: 0 },
      { title: 'SKU相关信息', value: 1 }
    ]

    if (this.viewData) {
      this.form = {
        brandName: this.viewData.info.brandName,
        stockName: this.viewData.info.stockName,
        expiry: this.viewData.info.expiry,
        storage: this.viewData.info.storage,
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
        goodsStatus: this.viewData.info.goodsStatus + '', // 商品状态, 0 代表上架，1代表下架
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

      // 处理编辑图片展示问题
      if (this.viewData.info.bannerIds) {
        const arr = this.viewData.info.bannerIds.split(',')
        this.UploadImgArr = arr
      }
      if (this.viewData.info.details) {
        const arr = this.viewData.info.details.split(',')
        this.detailsFileList = arr
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
  mounted() {
    // this.fetchGoodClassList()
    // this.fecthUnitList()
    // this.fecthSupplierList()
    // this.fecthSalerList()
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
    tabsCallBack(item) {
      if (item.value === 0) {
        this.ifInfo = true
        this.isSku = false
      } else {
        this.ifInfo = false
        this.isSku = true
      }
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
      fecthSalerList().then(({ data }) => {
        this.options.salerList = data
      }).catch(e => {
        console.log(e)
      })
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
          if (this.UploadImgArr.length > 0) {
            this.form.bannerIds = this.UploadImgArr.map(item => {
              return item
            }).toString()
            this.form.goodsImage = this.UploadImgArr[0]
          } else {
            this.$message({ type: 'warning', message: '至少上传一张图片' })
            return
          }
          this.form.sortFlag = this.form.sortFlag ? 0 : 1 // // 0是 1 不是
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
			margin-bottom: 6px;
		}
	}
 
  .img-items{
    display: flex;
    // align-items: center;
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
</style>