import request from '@/utils/request'

// 加载列表 -- 出库----------------
export function fecthOutList(params) {
  return request({
    url: 'stockOutRecords/page',
    method: 'get',
    params
  })
}

export function fecthOutRe(params) {
  return request({
    url: 'stockOutDetails/page',
    method: 'get',
    params
  })
}
// 明细
export function fecthOutDetail(params) {
  return request({
    url: 'stockOutRecords/getDetail',
    method: 'get',
    params
  })
}
// 加载列表 -- 出库----------------
export function fecthOutTableDetail(params) {
  return request({
    url: 'stockOutDetails/list',
    method: 'get',
    params
  })
}

export function fecthOutReList(params) {
  return request({
    url: 'stockOutDetails/page',
    method: 'get',
    params
  })
}

// export function fecthListInfo(params) {
//   return request({
//     url: 'stockOutDetails/page',
//     method: 'get',
//     params
//   })
// }

// // 采购收货传递仓库 id stockId
// export function findMore(params) {
//   return request({
//     url: 'purchaseAcceptInfo/list',
//     method: 'get',
//     params
//   })
// }

// 加载仓库 公共
export function fecthStockList(params) {
  return request({
    url: 'stockInfo/list',
    method: 'get',
    params
  })
}
