import request from '@/utils/request'

// 获取订单列表
export function orderList(params) {
  return request({
    url: 'scmSalesOrder/list',
    method: 'get',
    params
  })
}

// 加载订单列表明细
export function orderDetail(params) {
  return request({
    url: 'scmSalesOrder/detail',
    method: 'get',
    params
  })
}

// 加载包装单位列表
export function packagingList(params) {
  return request({
    url: 'productPackageInfo/getProductList',
    method: 'get',
    params
  })
}
// 新增包装单位
export function createPackaging(data) {
  return request({
    url: 'productPackageInfo/createProductPackag',
    method: 'post',
    data
  })
}

// 删除包装单位 id
export function deletePackaging(params) {
  return request({
    url: 'productPackageInfo/deleteProductCategory',
    method: 'delete',
    params
  })
}
// 加载明细包装单位 id
export function packagingInfo(params) {
  return request({
    url: 'productPackageInfo/getProductPackag',
    method: 'get',
    params
  })
}
// 更新包装单位 id
export function packagingUpdate(data) {
  return request({
    url: 'productPackageInfo/updateProductPackag',
    method: 'PUT',
    data
  })
}
