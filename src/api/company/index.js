import request from '@/utils/request'

// 获取子企业列表
export function fetchSonList(params) {
  return request({
    url: 'rtusapi/enterprise/getsonenterprise',
    method: 'GET',
    params
  })
}

export function createData(query) {
  return request({
    url: 'rtusapi/enterprise/createenterprise',
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

