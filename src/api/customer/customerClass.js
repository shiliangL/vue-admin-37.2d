import request from '@/utils/request'

// 加载列表
export function fetchList(params) {
  return request({
    url: 'customer/list',
    method: 'get',
    params
  })
}
// 新增
export function create(data) {
  return request({
    url: 'customer/createCustomer',
    method: 'post',
    data
  })
}
// 明细
export function fecthDetail(params) {
  return request({
    url: 'customer/getDetail',
    method: 'get',
    params
  })
}
// 更新
export function update(data) {
  return request({
    url: 'customer/update',
    method: 'POST',
    data
  })
}

// 加载下拉选项
export function fetchOptions(params) {
  return request({
    url: 'scmshipRegionInfo/listAll',
    method: 'get',
    params
  })
}

// 根据客户 id 加载地址
export function fetchCustomersAddress(params) {
  return request({
    url: 'customerShippingAddress/list',
    method: 'get',
    params
  })
}
