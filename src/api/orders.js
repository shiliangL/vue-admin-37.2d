import request from '@/utils/request'

// 获取订单列表
export function orderList(params) {
  return request({
    url: 'cmm/scmSalesOrder/list',
    method: 'get',
    params
  })
}

// 加载订单列表明细
export function orderDetail(params) {
  return request({
    url: 'cmm/scmSalesOrder/detailGetPage',
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
export function orderAdd(data) {
  return request({
    url: 'cmm/scmSalesOrder/add',
    method: 'POST',
    data
  })
}
// 根据商品获取 商品的规格
export function fetchSkuList(params) {
  return request({
    url: 'cmm/productInfo/getSkuList',
    method: 'get',
    params
  })
}
// 获取服务器时间
export function getTime(params) {
  return request({
    url: 'cmm/scmSalesOrder/getTime',
    method: 'get',
    params
  })
}
export function deleteOne(params) {
  return request({
    url: 'cmm/scmSalesOrder/delete',
    method: 'delete',
    params
  })
}
