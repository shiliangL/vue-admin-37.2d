import request from '@/utils/request'

export function fetchTypeDropDown(params) {
  return request({
    url: 'orgType/list4DropDown',
    method: 'get',
    params
  })
}

export function fetchList(params) {
  return request({
    url: 'organization/list',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'organization/getDetail',
    method: 'get',
    params
  })
}

export function deleteRow(params) {
  return request({
    url: 'organization/delete',
    method: 'delete',
    params
  })
}

export function createRow(data) {
  return request({
    url: 'organization/create',
    method: 'POST',
    data
  })
}

export function updateRow(data) {
  return request({
    url: 'organization/update',
    method: 'POST',
    data
  })
}
export function updateApplication(data) {
  return request({
    url: 'organization/commitUpdateApplication',
    method: 'POST',
    data
  })
}

