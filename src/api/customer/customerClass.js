import request from '@/utils/request'

// 加载列表
export function fetchList(params) {
  return request({
    url: 'cmm/customer/list',
    method: 'get',
    params
  })
}
// 新增
export function create(data) {
  return request({
    url: 'cmm/customer/createCustomer',
    method: 'post',
    data
  })
}
// 明细
export function fecthDetail(params) {
  return request({
    url: 'cmm/customer/getDetail',
    method: 'get',
    params
  })
}
// 更新
export function update(data) {
  return request({
    url: 'cmm/customer/update',
    method: 'POST',
    data
  })
}
// 拒绝
export function updateCustomerStatus(params) {
  return request({
    url: 'cmm/customer/updateCustomerStatus',
    method: 'post',
    params
  })
}

// 加载下拉选项
export function fetchOptions(params) {
  return request({
    url: 'cmm/scmshipRegionInfo/listAll',
    method: 'get',
    params
  })
}

// 根据客户 id 加载地址
export function fetchCustomersAddress(params) {
  return request({
    url: 'cmm/customerShippingAddress/list',
    method: 'get',
    params
  })
}
