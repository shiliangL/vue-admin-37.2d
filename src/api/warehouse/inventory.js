import request from '@/utils/request'

export function fecthStockCategory(params) {
  return request({
    url: 'stockCategory/listAll',
    method: 'get',
    params
  })
}
export function fecthStockList(params) {
  return request({
    url: 'stockInfo/list',
    method: 'get',
    params
  })
}

// // 仓库List
// export function fecthStockList(params) {
//   return request({
//     url: 'stockInfo/list',
//     method: 'get',
//     params
//   })
// }

// export function create(data) {
//   return request({
//     url: 'stockStorageInfo/create',
//     method: 'post',
//     data
//   })
// }

// // 删除CK
// export function deleteRow(params) {
//   return request({
//     url: 'stockInfo/delete',
//     method: 'delete',
//     params
//   })
// }
// // 明细CK
// export function detailCK(params) {
//   return request({
//     url: 'customerCategory/detail',
//     method: 'get',
//     params
//   })
// }
// // 明细CW
// export function detailCW(params) {
//   return request({
//     url: 'customerCategory/detail',
//     method: 'get',
//     params
//   })
// }
// // 更新CK
// export function updateCK(data) {
//   return request({
//     url: 'customerCategory/update',
//     method: 'POST',
//     data
//   })
// }
// // 更新CW
// export function updateCW(data) {
//   return request({
//     url: 'customerCategory/update',
//     method: 'POST',
//     data
//   })
// }

// // 新增-仓库类别
// export function createType(data) {
//   return request({
//     url: 'stockCategory/create',
//     method: 'post',
//     data
//   })
// }
// export function deleteType(params) {
//   return request({
//     url: 'stockCategory/delete',
//     method: 'delete',
//     params
//   })
// }
// export function updateType(data) {
//   return request({
//     url: 'stockCategory/update',
//     method: 'POST',
//     data
//   })
// }

