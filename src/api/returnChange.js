import request from '@/utils/request'

// 获取订单列表
export function orderList(params) {
  return request({
    url: 'cmm/scmsaleRreturnsgoods/list',
    method: 'get',
    params
  })
}

// 加载订单列表明细
export function orderDetail(params) {
  return request({
    url: 'cmm/scmsaleRreturnsgoods/detail',
    method: 'get',
    params
  })
}

export function orderDetailNoPage(params) {
  return request({
    url: 'cmm/scmSalesOrder/detail',
    method: 'get',
    params
  })
}

export function orderDetailUpdate(data) {
  return request({
    url: 'cmm/scmSalesOrder/update',
    method: 'PUT',
    data
  })
}
export function orderDetailUpdatePass(data) {
  return request({
    url: 'cmm/scmsaleRreturnsgoods/update',
    method: 'PUT',
    data
  })
}
