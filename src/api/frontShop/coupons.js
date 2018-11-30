import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'cmm/patMarketingCouponInfo/list',
    method: 'get',
    params
  })
}

export function fetchHeader(params) {
  return request({
    url: 'cmm/patMarketingCouponInfo/detail',
    method: 'get',
    params
  })
}
export function fetchTable(params) {
  return request({
    url: 'cmm/patMarketingCouponInfo/listDeatils',
    method: 'get',
    params
  })
}

export function createCouPon(data) {
  return request({
    url: 'cmm/patMarketingCouponInfo/createCouPon',
    method: 'POST',
    data
  })
}
