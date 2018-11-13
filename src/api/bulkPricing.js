import request from '@/utils/request'

// 加载列表
export function fetchList(params) {
  return request({
    url: 'cmm/productInfo/changePrice',
    method: 'get',
    params
  })
}

export function updateRow(data) {
  return request({
    url: 'cmm/productInfo/updatePrice',
    method: 'POST',
    data
  })
}

export function importPurchasePriceHistoryExcel(data) {
  return request({
    url: 'cmm/productPurchasePriceHistory/importPurchasePriceHistoryExcel',
    method: 'POST',
    data
  })
}
