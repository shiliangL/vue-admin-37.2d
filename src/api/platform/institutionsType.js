import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'cmm/orgType/list',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/orgType/getDetail',
    method: 'get',
    params
  })
}

export function deleteRow(params) {
  return request({
    url: 'cmm/orgType/delete',
    method: 'delete',
    params
  })
}

export function createRow(data) {
  return request({
    url: 'cmm/orgType/create',
    method: 'POST',
    data
  })
}

export function updateRow(data) {
  return request({
    url: 'cmm/orgType/update',
    method: 'POST',
    data
  })
}

