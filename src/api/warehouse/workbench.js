import request from '@/utils/request'

// 加载仓库列表
export function fecthList(params) {
  return request({
    url: 'workbench/page',
    method: 'get',
    params
  })
}

// 仓库List
export function fecthStockList(params) {
  return request({
    url: 'stockInfo/list',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: 'workbench/create',
    method: 'post',
    data
  })
}

export function deleteRow(params) {
  return request({
    url: 'workbench/delete',
    method: 'delete',
    params
  })
}
// 明细CK
export function detailRow(params) {
  return request({
    url: 'workbench/getDetail',
    method: 'get',
    params
  })
}
// 更新CK
export function updateRow(data) {
  return request({
    url: 'workbench/update',
    method: 'POST',
    data
  })
}

