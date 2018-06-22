import request from '@/utils/request'

// 加载列表
export function packagingList(params) {
  return request({
    url: 'productUnitInfo/getProductList',
    method: 'get',
    params
  })
}
// 新增
export function createPackaging(data) {
  return request({
    url: 'productUnitInfo/createProductUnit',
    method: 'post',
    data
  })
}
// 删除
export function deletePackaging(params) {
  return request({
    url: 'productUnitInfo/deleteProductUnit',
    method: 'delete',
    params
  })
}
// 加载明细 by id
export function packagingInfo(params) {
  return request({
    url: 'productUnitInfo/getProductUnit',
    method: 'get',
    params
  })
}
// 更新包装单位 id
export function packagingUpdate(data) {
  return request({
    url: 'productUnitInfo/updateProductUnit',
    method: 'PUT',
    data
  })
}
