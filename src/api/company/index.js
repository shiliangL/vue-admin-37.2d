import request from '@/utils/request'

// 获取子企业列表
export function fetchSonList(params) {
  return request({
    url: 'rtusapi/enterprise/getsonenterprise',
    method: 'GET',
    params
  })
}
// 获取子企业列表
export function fetchSubSonList(params) {
  return request({
    url: 'rtusapi/enterprise/getsubenterprise?',
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

// company_member
export function fetchMemberList(params) {
  return request({
    url: 'rtusapi/enterprise/getuserslist',
    method: 'GET',
    params
  })
}

export function createMember(query) {
  return request({
    url: 'rtusapi/enterprise/adduser',
    method: 'POST',
    data: query
  })
}

export function deleteMember(query) {
  return request({
    url: 'rtusapi/enterprise/deleteuser',
    method: 'POST',
    data: query
  })
}
