import request from '@/utils/request'
// 加载列表
export function fetchList(params) {
  return request({
    url: 'scmshipRegionInfo/list',
    method: 'get',
    params
  })
}
export function createRow(data) {
  return request({
    url: 'scmshipRegionInfo/add',
    method: 'post',
    data
  })
}
export function deleteRow(params) {
  return request({
    url: 'scmshipRegionInfo/delete',
    method: 'delete',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'scmshipRegionInfo/detail',
    method: 'get',
    params
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
