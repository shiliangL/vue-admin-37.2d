import request from '@/utils/request'

export function getalltypes(query) {
  return request({
    url: 'rtusapi/devices/getalltypes',
    method: 'GET',
    query
  })
}

export function createtype(query) {
  return request({
    url: 'rtusapi/devices/createtype',
    method: 'POST',
    data: query
  })
}
export function deletetype(query) {
  return request({
    url: 'rtusapi/devices/deletetype',
    method: 'POST',
    data: query
  })
}

