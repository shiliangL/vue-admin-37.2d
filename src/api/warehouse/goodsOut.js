import request from '@/utils/request'

// 入库单-------------
// 加载列表
export function fecthList(params) {
  return request({
    url: 'stockInInfo/page',
    method: 'get',
    params
  })
}
// 明细
export function detailRk(params) {
  return request({
    url: 'stockInInfo/getDetail',
    method: 'get',
    params
  })
}

// 新增仓位
export function createRk(data) {
  return request({
    url: 'stockInInfo/create',
    method: 'post',
    data
  })
}
// 入库单-------------
export function fecthListInfo(params) {
  return request({
    url: 'stockInDetails/page',
    method: 'get',
    params
  })
}

// 采购收货传递仓库 id stockId
export function findMore(params) {
  return request({
    url: 'purchaseAcceptInfo/list',
    method: 'get',
    params
  })
}

// 加载仓库
export function fecthStockList(params) {
  return request({
    url: 'stockInfo/list',
    method: 'get',
    params
  })
}
