import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'rtusapi/devices/getgroups',
    method: 'get',
    params: query
  })
}

export function creategroup(query) {
  return request({
    url: 'rtusapi/devices/creategroup',
    method: 'POST',
    data: query
  })
}

export function deletegroup(query) {
  return request({
    url: 'rtusapi/devices/deletegroup',
    method: 'POST',
    data: query
  })
}
export function updategroup(query) {
  return request({
    url: 'rtusapi/devices/renamegroup',
    method: 'POST',
    data: query
  })
}
