import request from '@/utils/request'

export function fecthList(params) {
  return request({
    url: 'pateventreCommend/list',
    method: 'get',
    params
  })
}
export function fecthListSku(params) {
  return request({
    url: 'pateventreCommend/sku',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'pateventreCommend/detail',
    method: 'get',
    params
  })
}

export function createRow(data) {
  return request({
    url: 'pateventreCommend/add',
    method: 'POST',
    data
  })
}
export function deleteRow(params) {
  return request({
    url: 'pateventreCommend/delete',
    method: 'delete',
    params
  })
}

export function updateRow(data) {
  return request({
    url: 'pateventreCommend/update',
    method: 'PUT',
    data
  })
}

