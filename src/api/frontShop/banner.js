import request from '@/utils/request'

export function fecthList(params) {
  return request({
    url: 'cmm/pateventreCommend/list',
    method: 'get',
    params
  })
}
export function fecthListSku(params) {
  return request({
    url: 'cmm/pateventreCommend/sku',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/pateventreCommend/detail',
    method: 'get',
    params
  })
}

export function createRow(data) {
  return request({
    url: 'cmm/pateventreCommend/add',
    method: 'POST',
    data
  })
}
export function deleteRow(params) {
  return request({
    url: 'cmm/pateventreCommend/delete',
    method: 'delete',
    params
  })
}

export function updateRow(data) {
  return request({
    url: 'cmm/pateventreCommend/update',
    method: 'PUT',
    data
  })
}

