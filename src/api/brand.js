import request from '@/utils/request'

// 加载列表
export function packagingList(params) {
  return request({
    url: 'productBrand/listProductBrand',
    method: 'get',
    params
  })
}
// 新增
export function createPackaging(data) {
  return request({
    url: 'productBrand/createProductBrand',
    method: 'post',
    data
  })
}
// 删除
export function deletePackaging(params) {
  return request({
    url: 'productBrand/deleteProductBrand',
    method: 'delete',
    params
  })
}
// 加载明细 by id
export function packagingInfo(params) {
  return request({
    url: 'productBrand/getProductBrand',
    method: 'get',
    params
  })
}
// 更新包装单位 id
export function packagingUpdate(data) {
  return request({
    url: 'productBrand/updateProductBrand',
    method: 'PUT',
    data
  })
}
