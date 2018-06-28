import request from '@/utils/request'

// 获取今天昨天明天数据
export function fecthTipsBar(params) {
  return request({
    url: 'scmSalesOrder/getCountData',
    method: 'get',
    params
  })
}

export function fecthList(params) {
  return request({
    url: 'purchaseOrderRequest/page',
    method: 'get',
    params
  })
}
// 新增
export function save(data) {
  return request({
    url: 'purchaseOrderRequest/save',
    method: 'post',
    data
  })
}

// 详情
export function detail(params) {
  return request({
    url: 'purchaseOrderRequest/getDetail',
    method: 'get',
    params
  })
}
