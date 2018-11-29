import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'cmm/patMarketingCouponInfo/list',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/patMarketingCouponInfo/detail',
    method: 'get',
    params
  })
}

export function createCouPon(params) {
  return request({
    url: 'cmm/patMarketingCouponInfo/createCouPon',
    method: 'get',
    params
  })
}
