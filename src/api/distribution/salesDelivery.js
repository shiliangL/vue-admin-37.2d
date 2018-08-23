import request from '@/utils/request'
// 加载列表
export function fetchList(params) {
  return request({
    url: 'scmshipOrderInfo/list',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'scmshipOrderInfo/detail',
    method: 'get',
    params
  })
}

export function createRow(data) {
  return request({
    url: 'scmshipOrderInfo/add',
    method: 'POST',
    data
  })
}
export function updateRow(data) {
  return request({
    url: 'scmshipRegionInfo/update',
    method: 'PUT',
    data
  })
}

// 加载下拉选项
export function fetchDriverList(params) {
  return request({
    url: 'scmShipDriverinfo/list',
    method: 'get',
    params
  })
}

export function fetchViewList(params) {
  return request({
    url: 'customer/regionPage',
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

// 新增
export function shipOrderAddList(params) {
  return request({
    url: 'scmshipOrderInfo/shipOrderAddList',
    method: 'get',
    params
  })
}

// 加载所有配送区域
export function fecthListRegion(params) {
  return request({
    url: 'scmshipRegionInfo/listRegion',
    method: 'get',
    params
  })
}
// 加载所有配员
export function fecthListListDrive(params) {
  return request({
    url: 'scmshipRegionInfo/listDrive',
    method: 'get',
    params
  })
}
