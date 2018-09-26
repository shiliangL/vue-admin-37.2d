import request from '@/utils/request'

// 加载列表
export function fetchList(params) {
  return request({
    url: 'department/list',
    method: 'get',
    params
  })
}
export function fetchStaffList(params) {
  return request({
    url: 'staff/list',
    method: 'get',
    params
  })
}
// 获取随机密码
export function fetchKey(params) {
  return request({
    url: 'data/getPassword',
    method: 'get',
    params
  })
}
// 开通员工 账号
export function createOperator(data) {
  return request({
    url: 'operator/createOperator4Staff',
    method: 'POST',
    data
  })
}

export function createRow(data) {
  return request({
    url: 'staff/createStaff',
    method: 'POST',
    data
  })
}

export function updateRow(data) {
  return request({
    url: 'staff/update',
    method: 'POST',
    data
  })
}

export function fetchDetail(params) {
  return request({
    url: 'staff/getDetail',
    method: 'get',
    params
  })
}
