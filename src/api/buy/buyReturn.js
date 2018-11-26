import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'cmm/purchaseReturnsGoods/page',
    method: 'get',
    params
  })
}
export function fetchOptions(params) {
  return request({
    url: 'cmm/workbenchUser/querySelect',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/purchaseReturnsGoods/getDetail',
    method: 'get',
    params
  })
}

export function fetchTable(params) {
  return request({
    url: 'cmm/purchaseReturnsGoodsDetails/listByReturnsId',
    method: 'get',
    params
  })
}
