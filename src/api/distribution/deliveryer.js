import request from '@/utils/request'
// 加载列表
export function fetchList(params) {
  return request({
    url: 'cmm/scmShipDriverinfo/list',
    method: 'get',
    params
  })
}
export function createRow(data) {
  return request({
    url: 'cmm/scmShipDriverinfo/add',
    method: 'post',
    data
  })
}
export function deleteRow(params) {
  return request({
    url: 'cmm/scmShipDriverinfo/delete',
    method: 'delete',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/scmShipDriverinfo/detail',
    method: 'get',
    params
  })
}

export function updateRow(data) {
  return request({
    url: 'cmm/scmShipDriverinfo/update',
    method: 'PUT',
    data
  })
}
export function resetPassword(data) {
  return request({
    url: 'cmm/scmShipDriverinfo/resetPassword',
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
