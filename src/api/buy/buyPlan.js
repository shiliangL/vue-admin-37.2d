import request from '@/utils/request'

// 获取今天昨天明天数据
export function fecthTipsBar(params) {
  return request({
    url: 'scmSalesOrder/getCountData',
    method: 'get',
    params
  })
}

export function fecthList(params) {
  return request({
    url: 'purchaseOrderRequest/page',
    method: 'get',
    params
  })
}
export function fecthTree(params) {
  return request({
    url: 'supplier/listSupplierTree',
    method: 'get',
    params
  })
}
// 新增
export function save(data) {
  return request({
    url: 'purchaseOrderRequest/save?sourceType=2',
    method: 'post',
    data
  })
}

// 详情H
export function headerDetail(params) {
  return request({
    url: 'purchaseOrderRequest/getDetail',
    method: 'get',
    params
  })
}
// 详情B
export function bodyDetail(params) {
  return request({
    url: 'purchaseOrderRequestDetails/checkList',
    method: 'get',
    params
  })
}
// 申请采购计划
export function applyCreate(data) {
  return request({
    url: 'purchaseOrderRequestProcess/create',
    method: 'POST',
    data
  })
}
// 采购清单
export function purchaseList(params) {
  return request({
    url: 'scmSalesOrder/productPurchase',
    method: 'get',
    params
  })
}

// 采购审核
export function saveList(data) {
  return request({
    url: 'purchaseOrderRequest/save?sourceType=1',
    method: 'post',
    data
  })
}