import request from '@/utils/request'

// 加载列表
export function fetchList(params) {
  return request({
    url: 'cmm/operator/list',
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

// 已经分配的角色
export function list4operator(params) {
  return request({
    url: 'cmm/role/list4operator',
    method: 'get',
    params
  })
}

// 禁用
export function forbiddenRow(id) {
  return request({
    url: `cmm/operator/forbidden?id=${id}`,
    method: 'POST'
  })
}

// 解除禁用
export function unForbiddenRow(id) {
  return request({
    url: `cmm/operator/relieveForbidden?id=${id}`,
    method: 'POST'
  })
}

export function resetKey(id) {
  return request({
    url: 'cmm/operator/resetPassword?id=' + `${id}`,
    method: 'POST'
  })
}

