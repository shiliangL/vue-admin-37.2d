import request from '@/utils/request'

// 加载仓库列表
export function fecthList(params) {
  return request({
    url: 'stockInfo/list',
    method: 'get',
    params
  })
}
export function fecthCKDetail(params) {
  return request({
    url: 'stockInfo/getDetail',
    method: 'get',
    params
  })
}
// 加载仓位列表
export function fecthTableList(params) {
  return request({
    url: 'stockStorageInfo/page',
    method: 'get',
    params
  })
}
// 仓库类别List
export function stockCategory(params) {
  return request({
    url: 'stockCategory/listAll',
    method: 'get',
    params
  })
}
// 仓库List
export function fetchStock(params) {
  return request({
    url: 'stockInfo/list',
    method: 'get',
    params
  })
}
// 新增仓库
export function createCK(data) {
  return request({
    url: 'stockInfo/create',
    method: 'post',
    data
  })
}
// 新增仓位
export function createCW(data) {
  return request({
    url: 'stockStorageInfo/create',
    method: 'post',
    data
  })
}

// 删除CK
export function deleteCK(params) {
  return request({
    url: 'stockInfo/delete',
    method: 'delete',
    params
  })
}
// 删除CW
export function deleteCW(params) {
  return request({
    url: 'stockStorageInfo/delete',
    method: 'delete',
    params
  })
}
// 明细CK
// export function detailCK(params) {
//   return request({
//     url: 'customerCategory/detail',
//     method: 'get',
//     params
//   })
// }
// 明细CW
// export function detailCW(params) {
//   return request({
//     url: 'customerCategory/detail',
//     method: 'get',
//     params
//   })
// }
// 更新CK
export function updateCK(data) {
  return request({
    url: 'stockInfo/update',
    method: 'POST',
    data
  })
}
// 更新CW
// export function updateCW(data) {
//   return request({
//     url: 'customerCategory/update',
//     method: 'POST',
//     data
//   })
// }

// 仓库类别设置
// 新增-仓库类别
export function createType(data) {
  return request({
    url: 'stockCategory/create',
    method: 'post',
    data
  })
}
export function deleteType(params) {
  return request({
    url: 'stockCategory/delete',
    method: 'delete',
    params
  })
}
export function updateType(data) {
  return request({
    url: 'stockCategory/update',
    method: 'POST',
    data
  })
}
// 明细CW
export function detailType(params) {
  return request({
    url: 'stockCategory/getDetail',
    method: 'get',
    params
  })
}

// ------------------------------------
// 根据类别加载 仓库
export function fecthStockByType(params) {
  return request({
    url: 'stockInfo/listByCategoryId',
    method: 'get',
    params
  })
}
// 获取所有仓位
export function fecthAllCW(params) {
  return request({
    url: 'stockInfo/getStockMap',
    method: 'get',
    params
  })
}

// stockInfo / update
