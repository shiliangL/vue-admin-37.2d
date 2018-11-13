import request from '@/utils/request'

// 加载列表
export function fetchList(params) {
  return request({
    url: 'cmm/role/list',
    method: 'get',
    params
  })
}

export function createRow(data) {
  return request({
    url: 'cmm/role/create',
    method: 'POST',
    data
  })
}

export function deleteRow(params) {
  return request({
    url: 'cmm/role/delete',
    method: 'delete',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/role/getDetail',
    method: 'get',
    params
  })
}

// 可以分配的角色
export function list4RelateRole(params) {
  return request({
    url: 'cmm/role/list4RelateRole',
    method: 'get',
    params
  })
}

export function list4operator(params) {
  return request({
    url: 'cmm/role/list4operator',
    method: 'get',
    params
  })
}

//  获取角色相关的资源列表
export function fetchMenuByRole(params) {
  return request({
    url: 'cmm/resource/list4Role',
    method: 'get',
    params
  })
}

export function updateRow(data) {
  return request({
    url: 'cmm/role/update',
    method: 'POST',
    data
  })
}

export function addRole(data) {
  return request({
    url: 'cmm/operatorRole/allotRole4Operator',
    method: 'POST',
    data
  })
}

// 确认分配菜单
export function roleRelated(data) {
  return request({
    url: 'cmm/roleResource/related',
    method: 'POST',
    data
  })
}

