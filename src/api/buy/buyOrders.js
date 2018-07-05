import request from '@/utils/request'

export function fecthList(params) {
  return request({
    url: 'purchaseOrderInfo/page',
    method: 'get',
    params
  })
}
// 详情
export function Detail(params) {
  return request({
    url: 'purchaseOrderInfo/getDetail',
    method: 'get',
    params
  })
}
// 详情tbale
export function tableDetail(params) {
  return request({
    url: 'purchaseOrderDetails/page',
    method: 'get',
    params
  })
}

