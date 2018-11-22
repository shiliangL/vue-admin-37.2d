import request from '@/utils/request'
// 加载列表
export function fetchList(params) {
  return request({
    url: 'cmm/scmshipOrderInfo/list',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/scmshipOrderInfo/detail',
    method: 'get',
    params
  })
}

export function createRow(data) {
  return request({
    url: 'cmm/scmshipOrderInfo/add',
    method: 'POST',
    data
  })
}
export function updateRow(data) {
  return request({
    url: 'cmm/scmshipRegionInfo/update',
    method: 'PUT',
    data
  })
}

// 加载下拉选项
export function fetchDriverList(params) {
  return request({
    url: 'cmm/scmShipDriverinfo/list',
    method: 'get',
    params
  })
}

export function fetchViewList(params) {
  return request({
    url: 'cmm/customer/regionPage',
    method: 'get',
    params
  })
}

// 加载仓库
export function fecthStockList(params) {
  return request({
    url: 'cmm/stockInfo/list',
    method: 'get',
    params
  })
}

// 新增
export function shipOrderAddList(params) {
  return request({
    url: 'cmm/scmshipOrderInfo/shipOrderAddList',
    method: 'get',
    params
  })
}

// 加载所有配送区域
export function fecthListRegion(params) {
  return request({
    url: 'cmm/scmshipRegionInfo/listRegion',
    method: 'get',
    params
  })
}
// 加载所有配员
export function fecthListListDrive(params) {
  return request({
    url: 'cmm/scmshipRegionInfo/listDrive',
    method: 'get',
    params
  })
}
export function fecthPrint(params) {
  return request({
    url: 'cmm/scmshipOrderInfo/detailNotPage',
    method: 'get',
    params
  })
}

export function getMapPos(params) {
  return request({
    url: 'cmm/departureRecord/queryCoordinateByShipId',
    method: 'get',
    params
  })
}
