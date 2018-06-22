import request from '@/utils/request'

// 获取订单列表
export function orderList(params) {
  return request({
    url: 'scmSalesOrder/list',
    method: 'get',
    params
  })
}

// 加载订单列表明细
export function orderDetail(params) {
  return request({
    url: 'scmSalesOrder/detailGetPage',
    method: 'get',
    params
  })
}

export function orderDetailNoPage(params) {
  return request({
    url: 'scmSalesOrder/detail',
    method: 'get',
    params
  })
}

export function orderDetailUpdate(data) {
  return request({
    url: 'scmSalesOrder/update',
    method: 'PUT',
    data
  })
}
