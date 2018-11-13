import request from '@/utils/request'

export function fecthList(params) {
  return request({
    url: 'cmm/deviceInfo/page',
    method: 'get',
    params
  })
}

// 仓库List
export function fecthStockList(params) {
  return request({
    url: 'cmm/stockInfo/list',
    method: 'get',
    params
  })
}
// 工作台+分页+仓库 id + 分
export function fecthWorkbenchList(params) {
  return request({
    url: 'cmm/workbench/page?',
    method: 'get',
    params
  })
}

export function createRow(data) {
  return request({
    url: 'cmm/deviceInfo/create',
    method: 'post',
    data
  })
}

export function deleteRow(params) {
  return request({
    url: 'cmm/deviceInfo/delete',
    method: 'delete',
    params
  })
}
// 明细CK
export function detailRow(params) {
  return request({
    url: 'cmm/deviceInfo/getDetail',
    method: 'get',
    params
  })
}
// 更新CK
export function updateRow(data) {
  return request({
    url: 'cmm/deviceInfo/update',
    method: 'POST',
    data
  })
}

