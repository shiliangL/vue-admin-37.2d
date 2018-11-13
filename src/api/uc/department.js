import request from '@/utils/request'

// 加载列表
export function fetchList(params) {
  return request({
    url: 'cmm/department/list',
    method: 'get',
    params
  })
}
export function fetchStaffList(params) {
  return request({
    url: 'cmm/staff/list',
    method: 'get',
    params
  })
}
// 获取随机密码
export function fetchKey(params) {
  return request({
    url: 'cmm/data/getPassword',
    method: 'get',
    params
  })
}
// 开通员工 账号
export function createOperator(data) {
  return request({
    url: 'cmm/operator/createOperator4Staff',
    method: 'POST',
    data
  })
}

export function createRow(data) {
  return request({
    url: 'cmm/department/create',
    method: 'POST',
    data
  })
}

export function createDepartment(data) {
  return request({
    url: 'cmm/staff/createStaff',
    method: 'POST',
    data
  })
}

export function updateRow(data) {
  return request({
    url: 'cmm/staff/update',
    method: 'POST',
    data
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/staff/getDetail',
    method: 'get',
    params
  })
}

export function DepartmentDetail(params) {
  return request({
    url: 'cmm/department/getDetail',
    method: 'get',
    params
  })
}

export function DepartmentUpdate(data) {
  return request({
    url: 'cmm/department/update',
    method: 'POST',
    data
  })
}
