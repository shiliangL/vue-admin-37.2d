import request from '@/utils/request'

export function fecthList(params) {
  return request({
    url: 'cmm/productInfo/listProductInfo',
    method: 'get',
    params
  })
}
// 获取分类
export function fecthGoodsClass(params) {
  return request({
    url: 'cmm/productCategory/listAll',
    method: 'get',
    params
  })
}
// 获取计量单位 - 基本单位
export function fecthUnit(params) {
  return request({
    url: 'cmm/productUnitInfo/listAll',
    method: 'get',
    params
  })
}
// 根据选择的销售单位, 的到基本到位
export function fecthSwitchUnit(params) {
  return request({
    url: 'cmm/productUnitInfo/getCon',
    method: 'get',
    params
  })
}
// 获取所有供应商类别
export function fecthSupplierList(params) {
  return request({
    url: 'cmm/supplierCategory/listAll',
    method: 'get',
    params
  })
}
// 根据供应商 id 加载供应商
export function fecthByCategoryId(params) {
  return request({
    url: 'cmm/supplier/listByCategoryId',
    method: 'get',
    params
  })
}

// 获取所有采购员
export function fecthSalerList(params) {
  return request({
    url: 'cmm/purchaseStaffRelation/queryNormalStateList',
    method: 'get',
    params
  })
}

// 删除
export function deletepProduct(params) {
  return request({
    url: 'cmm/productInfo/deleteProductInfo',
    method: 'delete',
    params
  })
}
// 下架
export function productsDown(params) {
  return request({
    url: 'cmm/productInfo/frameGoods',
    method: 'PUT',
    params
  })
}
// 上架
export function productsUp(params) {
  return request({
    url: 'cmm/productInfo/upperGoods',
    method: 'PUT',
    params
  })
}

// 详情
export function productDetail(params) {
  return request({
    url: 'cmm/productInfo/getProductInfo',
    method: 'get',
    params
  })
}
// 新增
export function productCreate(data) {
  return request({
    url: 'cmm/productInfo/createProductInfoDao',
    method: 'post',
    data
  })
}
// 更新
export function productUpdate(data) {
  return request({
    url: 'cmm/productInfo/updateProductInfo',
    method: 'PUT',
    data
  })
}

// 加载库存明细
export function fecthProductInventory(params) {
  return request({
    url: 'cmm/productInfo/pageProductInventory',
    method: 'get',
    params
  })
}
// 设置库存上下限
export function updateSafeStock(data) {
  return request({
    url: 'cmm/productInfo/updateSafeStock',
    method: 'POST',
    data
  })
}

// 客户类别
export function customerType(params) {
  return request({
    url: 'cmm/customerCategory/listAll',
    method: 'get',
    params
  })
}

export function exportFile(params) {
  return request({
    url: 'cmm/productInfo/exportFile',
    method: 'get',
    params
  })
}
export function fetchHistoryPrice(params) {
  return request({
    url: 'cmm/productInfo/getHistoryProductPrice',
    method: 'get',
    params
  })
}

export function fetchPurchasePriceHistory(params) {
  return request({
    url: 'cmm/productPurchasePriceHistory/page',
    method: 'get',
    params
  })
}

// 验证商品名称
export function existTitle(params) {
  return request({
    url: 'cmm/productInfo/existTitle',
    method: 'get',
    params
  })
}
