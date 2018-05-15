import request from '@/utils/request'

// 获取未分组设备
export function fetchList(query) {
  return request({
    url: 'rtusapi/devices/getdevnogroup',
    method: 'get',
    params: query
  })
}
// 新建设备
export function create(query) {
  return request({
    url: 'rtusapi/devices/createdevice',
    method: 'POST',
    data: query
  })
}
// 设备修改名称
export function rename(query) {
  return request({
    url: 'rtusapi/devices/renamedevice',
    method: 'POST',
    data: query
  })
}

// 获取所有设备类型
export function getalltypes(query) {
  return request({
    url: 'rtusapi/devices/getalltypes',
    method: 'get',
    params: query
  })
}

// 设备绑定类型
export function bindingtype(query) {
  return request({
    url: 'rtusapi/devices/bindingtype',
    method: 'POST',
    data: query
  })
}
