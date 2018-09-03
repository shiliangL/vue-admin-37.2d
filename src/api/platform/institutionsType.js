import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'orgType/list',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'orgType/getDetail',
    method: 'get',
    params
  })
}

export function deleteRow(params) {
  return request({
    url: 'orgType/delete',
    method: 'delete',
    params
  })
}

export function createRow(data) {
  return request({
    url: 'orgType/create',
    method: 'POST',
    data
  })
}

export function updateRow(data) {
  return request({
    url: 'orgType/update',
    method: 'POST',
    data
  })
}

