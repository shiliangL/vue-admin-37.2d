import request from '@/utils/request'

// 加载列表验收台-采购入库
export function inViewFetchList(params) {
  return request({
    url: 'purchaseOrderInfo/inspectorPage',
    method: 'get',
    params
  })
}
export function inViewHeaderDetail(params) {
  return request({
    url: 'purchaseOrderInfo/inspectorGetDetail',
    method: 'get',
    params
  })
}
export function inViewBodyDetail(params) {
  return request({
    url: 'purchaseOrderDetails/inspectorList',
    method: 'get',
    params
  })
}
export function updateInView(data) {
  return request({
    url: 'purchaseOrderDetails/inspectorPrintLabel',
    method: 'POST',
    data
  })
}
// 退换货
export function returnFetchList(params) {
  return request({
    url: 'scmsaleRreturnsgoods/findAccept',
    method: 'get',
    params
  })
}
export function returnChangeDetail(params) {
  return request({
    url: 'scmsaleRreturnsgoods/findOneAccept',
    method: 'get',
    params
  })
}
export function updateReturnChange(data) {
  return request({
    url: 'scmsaleRreturnsgoods/updateReturnDto',
    method: 'PUT',
    data
  })
}

// 新增
export function createPackaging(data) {
  return request({
    url: 'productUnitInfo/createProductUnit',
    method: 'post',
    data
  })
}
// 删除
export function deletePackaging(params) {
  return request({
    url: 'productUnitInfo/deleteProductUnit',
    method: 'delete',
    params
  })
}
// 加载明细 by id
export function packagingInfo(params) {
  return request({
    url: 'productUnitInfo/getProductUnit',
    method: 'get',
    params
  })
}
// 更新包装单位 id
export function packagingUpdate(data) {
  return request({
    url: 'productUnitInfo/updateProductUnit',
    method: 'PUT',
    data
  })
}
