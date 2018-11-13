import request from '@/utils/request'

export function fecthList(params) {
  return request({
    url: 'cmm/purchaseOrderRequestProcess/pageProcess',
    method: 'get',
    params
  })
}
// 新增
export function save(data) {
  return request({
    url: 'cmm/purchaseOrderRequest/save?sourceType=2',
    method: 'post',
    data
  })
}

// 详情H
export function headerDetail(params) {
  return request({
    url: 'cmm/purchaseOrderRequest/getDetail',
    method: 'get',
    params
  })
}
// 详情B
export function bodyDetail(params) {
  return request({
    url: 'cmm/purchaseOrderRequestDetails/checkList',
    method: 'get',
    params
  })
}
// 申请采购计划
export function applyCreate(data) {
  return request({
    url: 'cmm/purchaseOrderRequestProcess/create',
    method: 'POST',
    data
  })
}

// 同意采购审核 --
export function applyPassCreate(data) {
  return request({
    url: 'cmm/purchaseOrderRequestProcess/create',
    method: 'POST',
    data
  })
}

// 采购清单
export function purchaseList(params) {
  return request({
    url: 'cmm/scmSalesOrder/productPurchase',
    method: 'get',
    params
  })
}

// 采购审核
export function saveList(data) {
  return request({
    url: 'cmm/purchaseOrderRequest/save?sourceType=1',
    method: 'post',
    data
  })
}
