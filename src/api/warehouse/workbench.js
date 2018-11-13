import request from '@/utils/request'

// 加载仓库列表
export function fecthList(params) {
  return request({
    url: 'cmm/workbench/page',
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

export function create(data) {
  return request({
    url: 'cmm/workbench/create',
    method: 'post',
    data
  })
}

export function deleteRow(params) {
  return request({
    url: 'cmm/workbench/delete',
    method: 'delete',
    params
  })
}
// 明细CK
export function detailRow(params) {
  return request({
    url: 'cmm/workbench/getDetail',
    method: 'get',
    params
  })
}
// 更新CK
export function updateRow(data) {
  return request({
    url: 'cmm/workbench/update',
    method: 'POST',
    data
  })
}

