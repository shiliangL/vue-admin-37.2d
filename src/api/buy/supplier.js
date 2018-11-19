import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'cmm/supplierInfo/page',
    method: 'get',
    params
  })
}

export function fecthDetail(params) {
  return request({
    url: 'cmm/supplierInfo/getDetail',
    method: 'get',
    params
  })
}

export function updateRow(data) {
  return request({
    url: 'cmm/supplierInfo/update',
    method: 'post',
    data
  })
}

export function createRow(data) {
  return request({
    url: 'cmm/supplierInfo/create',
    method: 'post',
    data
  })
}

export function deleteRow(data) {
  return request({
    url: 'cmm/supplierInfo/delete',
    method: 'post',
    data
  })
}

// 供应商关联采购单
export function fetchPurchaseOrderInfo(params) {
  return request({
    url: 'cmm/purchaseOrderInfo/page',
    method: 'get',
    params
  })
}
// 供应商关联采购单详情
export function fetchPurchaseOrderHeaderInfoDetail(params) {
  return request({
    url: 'cmm/purchaseOrderInfo/getDetail',
    method: 'get',
    params
  })
}
export function fetchPurchaseOrderTableInfoDetail(params) {
  return request({
    url: 'cmm/purchaseOrderDetails/page',
    method: 'get',
    params
  })
}
