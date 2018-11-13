import request from '@/utils/request'

export function fetchTypeDropDown(params) {
  return request({
    url: 'cmm/orgType/list4DropDown',
    method: 'get',
    params
  })
}

export function fetchList(params) {
  return request({
    url: 'cmm/organization/list',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/organization/getDetail',
    method: 'get',
    params
  })
}

export function deleteRow(params) {
  return request({
    url: 'cmm/organization/delete',
    method: 'delete',
    params
  })
}

export function createRow(data) {
  return request({
    url: 'cmm/organization/create',
    method: 'POST',
    data
  })
}

export function updateRow(data) {
  return request({
    url: 'cmm/organization/update',
    method: 'POST',
    data
  })
}
export function updateApplication(data) {
  return request({
    url: 'cmm/organization/commitUpdateApplication',
    method: 'POST',
    data
  })
}

