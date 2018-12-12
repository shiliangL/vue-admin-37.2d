import request from '@/utils/request'

export function fetchCountHome(params) {
  return request({
    url: 'cmm/scmSalesOrder/countHome',
    method: 'get',
    params
  })
}

// 待核查库存
export function countPendingVerificationProduct(params) {
  return request({
    url: 'cmm/stockInventory/countPendingVerificationProduct',
    method: 'get',
    params
  })
}

export function countPurchaseOrderRequestByStatus(params) {
  return request({
    url: 'cmm/purchaseOrderRequest/countPurchaseOrderRequestByStatus',
    method: 'get',
    params
  })
}

