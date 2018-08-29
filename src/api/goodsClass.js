import request from '@/utils/request'

// 获取订单列表
export function list(params) {
  return request({
    url: 'productCategory/listAll',
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

// 新增大类
export function createClass(data) {
  return request({
    url: 'productCategory/createProductCategory',
    method: 'post',
    data
  })
}

// 删除大类 id
export function deleteClass(params) {
  return request({
    url: 'productCategory/deleteProductCategory',
    method: 'delete',
    params
  })
}
// 加载大类明细 id
export function classInfo(params) {
  return request({
    url: 'productCategory/getProductCategory',
    method: 'get',
    params
  })
}
// 更新包装单位 id
export function classUpdate(data) {
  return request({
    url: 'productCategory/updateProductCategory',
    method: 'PUT',
    data
  })
}
export function updateSort(data) {
  return request({
    url: 'productCategory/updateSort',
    method: 'PUT',
    data
  })
}
