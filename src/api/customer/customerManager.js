import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'ScmSalesStaffRelation/list',
    method: 'get',
    params
  })
}
export function fetchDetail(params) {
  return request({
    url: 'ScmSalesStaffRelation/getDetail',
    method: 'get',
    params
  })
}
export function createRow(data) {
  return request({
    url: 'ScmSalesStaffRelation/createCustomer',
    method: 'post',
    data
  })
}
export function updateRow(data) {
  return request({
    url: 'ScmSalesStaffRelation/updateTel',
    method: 'POST',
    data
  })
}
export function resetKey(id) {
  return request({
    url: 'operator/resetPassword?id=' + `${id}`,
    method: 'POST'
  })
}

