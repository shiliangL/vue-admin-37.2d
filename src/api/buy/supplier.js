import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'cmm/supplierInfo/page',
    method: 'get',
    params
  })
}

export function fecthDetail(params) {
  return request({
    url: 'cmm/supplierInfo/getDetail',
    method: 'get',
    params
  })
}

export function updateRow(data) {
  return request({
    url: 'cmm/supplierInfo/update',
    method: 'post',
    data
  })
}

export function createRow(data) {
  return request({
    url: 'cmm/supplierInfo/create',
    method: 'post',
    data
  })
}

export function deleteRow(data) {
  return request({
    url: 'cmm/supplierInfo/delete',
    method: 'post',
    data
  })
}
