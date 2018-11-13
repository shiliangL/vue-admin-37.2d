import request from '@/utils/request'
// 加载列表
export function fetchList(params) {
  return request({
    url: 'cmm/scmshipRegionInfo/list',
    method: 'get',
    params
  })
}
export function fetchAllList(params) {
  return request({
    url: 'cmm/scmshipRegionInfo/listAll',
    method: 'get',
    params
  })
}
export function createRow(data) {
  return request({
    url: 'cmm/scmshipRegionInfo/add',
    method: 'post',
    data
  })
}
export function deleteRow(params) {
  return request({
    url: 'cmm/scmshipRegionInfo/delete',
    method: 'delete',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/scmshipRegionInfo/detail',
    method: 'get',
    params
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
